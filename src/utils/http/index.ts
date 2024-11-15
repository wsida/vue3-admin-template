import Axios, {
  type AxiosInstance,
  type AxiosRequestConfig,
  type CustomParamsSerializer
} from "axios";
import type {
  PureHttpError,
  RequestMethods,
  PureHttpResponse,
  PureHttpRequestConfig,
  PureHttpResonseData
} from "./types.d";
import { getConfig } from "@/config";
import { stringify } from "qs";
import NProgress from "../progress";
import { getToken, formatToken } from "@/utils/auth";
import { useUserStoreHook } from "@/store/modules/user";
import { message } from "../message";
import { encryptData } from "../crypto";
import { isEmpty } from "lodash-es";
import { noop } from "@vueuse/core";

// 相关配置请参考：www.axios-js.com/zh-cn/docs/#axios-request-config-1
const defaultConfig: PureHttpRequestConfig = {
  // 请求超时时间
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 30000, // 30 * 1000,
  headers: {
    Accept: "application/json, text/plain, */*",
    "Content-Type": "application/json",
    "X-Requested-With": "XMLHttpRequest"
  },
  // 数组格式参数序列化（https://github.com/axios/axios/issues/5142）
  paramsSerializer: {
    serialize: stringify as unknown as CustomParamsSerializer
  },
  autoNotification: true, // 接口异常自动消息提示
  autoUnpack: false, // 自动解响应数据 - response.data.data
  completeResponse: false, // resolve 完整响应数据- {status、headers、data}
  encrypt: false // 数据加密 - request body 完整加密
};

// 不需要鉴权的api
export const AUTH_WHITELIST = ["/refresh-token", "/login", "/captcha"];

export const defaultBeforeRequestCallback = noop;
export const defaultbBeforeResponseCallback = noop;

export class PureHttp {
  constructor() {
    this.httpInterceptorsRequest();
    this.httpInterceptorsResponse();
  }

  /** `token`过期后，暂存待执行的请求 */
  private static requests = [];

  /** 防止重复刷新`token` */
  private static isRefreshing = false;

  /** 初始化配置对象 */
  private static initConfig: PureHttpRequestConfig = {
    beforeRequestCallback(config) {
      // 自动注入时间戳
      if (config.params) {
        config.params.t = new Date().getTime();
      } else {
        config.params = {
          t: new Date().getTime()
        };
      }

      // 加密处理
      if (config.encrypt && config.data && !isEmpty(config.data)) {
        config.data = encryptData(JSON.stringify(config.data));
        config.headers["Content-Type"] = "text/plain";
      }
    }
  };

  /** 保存当前`Axios`实例对象 */
  private static axiosInstance: AxiosInstance = Axios.create(defaultConfig);

  /** 重连原始请求 */
  private static retryOriginalRequest(config: PureHttpRequestConfig) {
    return new Promise(resolve => {
      PureHttp.requests.push((token: string) => {
        config.headers["Authorization"] = formatToken(token);
        resolve(config);
      });
    });
  }

  /** 请求拦截 */
  private httpInterceptorsRequest(): void {
    PureHttp.axiosInstance.interceptors.request.use(
      async (config: PureHttpRequestConfig): Promise<any> => {
        // 开启进度条动画
        !config.hideProgress && NProgress.start();
        // 优先判断post/get等方法是否传入回调，否则执行初始化设置等回调
        if (typeof config.beforeRequestCallback === "function") {
          config.beforeRequestCallback(config);
          return config;
        }
        if (PureHttp.initConfig.beforeRequestCallback) {
          PureHttp.initConfig.beforeRequestCallback(config);
          return config;
        }
        /** 请求白名单，放置一些不需要`token`的接口（通过设置请求白名单，防止`token`过期后再请求造成的死循环问题） */
        const whiteList = AUTH_WHITELIST;
        return whiteList.some(url => config.url.endsWith(url))
          ? config
          : new Promise(resolve => {
              const data = getToken();
              if (data) {
                const now = new Date().getTime();
                const expired = parseInt(data.expires) - now <= 0;
                if (expired && getConfig()?.AutoRefreshToken) {
                  if (!PureHttp.isRefreshing) {
                    PureHttp.isRefreshing = true;
                    // token过期刷新
                    useUserStoreHook()
                      .handRefreshToken({ refreshToken: data.refreshToken })
                      .then(res => {
                        const token = res.data.accessToken;
                        config.headers["Authorization"] = formatToken(token);
                        PureHttp.requests.forEach(cb => cb(token));
                        PureHttp.requests = [];
                      })
                      .finally(() => {
                        PureHttp.isRefreshing = false;
                      });
                  }
                  resolve(PureHttp.retryOriginalRequest(config));
                } else {
                  config.headers["Authorization"] = formatToken(
                    data.accessToken
                  );
                  resolve(config);
                }
              } else {
                resolve(config);
              }
            });
      },
      error => {
        return Promise.reject(error);
      }
    );
  }

  /** 响应拦截 */
  private httpInterceptorsResponse(): void {
    const instance = PureHttp.axiosInstance;
    instance.interceptors.response.use(
      (response: PureHttpResponse) => {
        const $config: PureHttpRequestConfig = response.config;
        // 关闭进度条动画
        NProgress.done();
        // 优先判断post/get等方法是否传入回调，否则执行初始化设置等回调
        if (typeof $config.beforeResponseCallback === "function") {
          $config.beforeResponseCallback(response);
          return response.data;
        }
        if (PureHttp.initConfig.beforeResponseCallback) {
          PureHttp.initConfig.beforeResponseCallback(response);
          return response.data;
        }
        let responseData: PureHttpResonseData | string = "";
        try {
          responseData = JSON.parse(response.data);
        } catch {
          responseData = response.data;
        }
        if (typeof responseData === "string")
          return $config.completeResponse ? response : responseData;
        // json 数据处理
        if ($config.autoNotification) {
          if (typeof responseData === "object") {
            if (responseData.code && parseInt(responseData.code) !== 0) {
              const msg = responseData.message || "请求有误!";
              message(msg, { type: "error" });
              return Promise.reject(
                $config.completeResponse ? response : responseData
              );
            }
          }
        }
        return $config.completeResponse
          ? response
          : $config.autoUnpack
            ? responseData.data
            : responseData;
      },
      (error: PureHttpError) => {
        const $error = error;
        $error.isCancelRequest = Axios.isCancel($error);
        if ($error.response) {
          switch ($error.response.status) {
            case 401:
              message("登录已经过期，请重新登录!", { type: "error" });
              useUserStoreHook().logOut();
              break;
            case 403:
              message("您暂无权限!请联系管理员授权！", { type: "error" });
              break;
            case 500:
            case 501:
            case 502:
            case 503:
            case 504:
            case 505:
              message("服务器出了点问题!", { type: "error" });
              break;
            default:
          }
        }
        // 关闭进度条动画
        NProgress.done();
        // 所有的响应异常 区分来源为取消请求/非取消请求
        return Promise.reject($error);
      }
    );
  }

  /** 通用请求工具函数 */
  public request<T>(
    method: RequestMethods,
    url: string,
    params?: AxiosRequestConfig["data"] | AxiosRequestConfig["params"],
    axiosConfig?: PureHttpRequestConfig
  ): Promise<T> {
    const paramsKey = ["get"].includes(method) ? "params" : "data";
    const config = {
      method,
      url,
      [paramsKey]: params,
      ...(axiosConfig || {})
    } as PureHttpRequestConfig;

    // 单独处理自定义请求/响应回调
    return new Promise((resolve, reject) => {
      PureHttp.axiosInstance
        .request(config)
        .then((response: undefined) => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  /** 单独抽离的`post`工具函数 */
  public post<T>(
    url: string,
    params?: AxiosRequestConfig["data"],
    config?: PureHttpRequestConfig
  ): Promise<T> {
    return this.request<T>("post", url, params, config);
  }

  /** 单独抽离的`get`工具函数 */
  public get<T>(
    url: string,
    params?: AxiosRequestConfig["params"],
    config?: PureHttpRequestConfig
  ): Promise<T> {
    return this.request<T>("get", url, params, config);
  }
}

export const http = new PureHttp();
