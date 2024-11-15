import type {
  Method,
  AxiosError,
  AxiosResponse,
  AxiosRequestConfig
} from "axios";

export type resultType = {
  accessToken?: string;
};

export type RequestMethods = Extract<
  Method,
  "get" | "post" | "put" | "delete" | "patch" | "option" | "head"
>;

export interface PureHttpError extends AxiosError {
  isCancelRequest?: boolean;
}

export interface PureHttpResponse extends AxiosResponse {
  config: PureHttpRequestConfig;
}

export interface PureHttpResonseData {
  code: string | number;
  data?: any;
  message: string;
}

export interface PureHttpRequestConfig extends AxiosRequestConfig {
  beforeRequestCallback?: (request: PureHttpRequestConfig) => void;
  beforeResponseCallback?: (response: PureHttpResponse) => void;
  autoNotification?: boolean;
  autoUnpack?: boolean;
  completeResponse?: boolean;
  encrypt?: boolean;
  hideProgress?: boolean;
}

export default class PureHttp {
  request<T>(
    method: RequestMethods,
    url: string,
    param?: AxiosRequestConfig,
    axiosConfig?: PureHttpRequestConfig
  ): Promise<T>;
  post<T>(
    url: string,
    params?: AxiosRequestConfig["data"],
    config?: PureHttpRequestConfig
  ): Promise<T>;
  get<T>(
    url: string,
    params?: AxiosRequestConfig["params"],
    config?: PureHttpRequestConfig
  ): Promise<T>;
}

export interface UploadConfig {
  params?: Record<string, any>;
  headers?: Record<string, string>;
  onProcess?: (percent: number, progress: number, total: number) => void;
  onSuccess?: (res: any) => void;
  onError?: (res: any) => void;
}
