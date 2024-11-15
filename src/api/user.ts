import {
  http,
  defaultBeforeRequestCallback,
  defaultbBeforeResponseCallback
} from "@/utils/http";
import type { PureHttpResonseData } from "@/utils/http/types";
import { uServiceAuthApiUrl } from "@/config/constants";

export interface AsyncMenusResponse extends PureHttpResonseData {
  data: {
    menus: Array<any>;
    auths?: Array<string>;
  };
}

export interface PermissionResponse extends PureHttpResonseData {
  data: Array<string>;
}

export interface UserInfoResponse extends PureHttpResonseData {
  data: {
    /** 用户状态 */
    status?: number;
    /** 头像 */
    avatar: string;
    /** 用户名 */
    username: string;
    /** 昵称 */
    nickname: string;
    /** 手机号码 */
    mobile?: string;
    /** 邮箱 */
    email?: string;
    /** 上次登录时间 */
    lastLoginTime?: string;
    /** 当前登录用户的角色 */
    roles: Array<string>;
    /** `token` */
    accessToken: string;
    /** 用于调用刷新`accessToken`的接口时所需的`token` */
    refreshToken: string;
    /** `accessToken`的过期时间（格式'xxxx/xx/xx xx:xx:xx'） */
    expires: Date;
  };
}

export interface RefreshTokenResponse extends PureHttpResonseData {
  data: {
    /** `token` */
    accessToken: string;
    /** 用于调用刷新`accessToken`的接口时所需的`token` */
    refreshToken: string;
    /** `accessToken`的过期时间（格式'xxxx/xx/xx xx:xx:xx'） */
    expires: Date;
  };
}

/** 登录 */
export const getLogin = (data?: object) => {
  return http.request<UserInfoResponse>("post", "/login", { data });
};

export const getUserInfo = (data?: object) => {
  return http.request<UserInfoResponse>("get", "/userinfo", { data });
};

/**扫码鉴权 */
export const checkAuth = (data?: object) => {
  return http.request<PureHttpResonseData>(
    "post",
    "/sys/heartBeatCheckAuthLogin",
    {
      data
    },
    {
      hideProgress: true,
      baseURL: uServiceAuthApiUrl,
      beforeRequestCallback: defaultBeforeRequestCallback,
      beforeResponseCallback: defaultbBeforeResponseCallback
    }
  );
};

/** 获取验证码 */
export const getCaptcha = (data?: object) => {
  return http.request<PureHttpResonseData>("post", "/captcha", data);
};

/** 刷新`token` */
export const refreshTokenApi = (data?: object) => {
  return http.request<RefreshTokenResponse>("post", "/refresh-token", data);
};

/** 用户权限相关 - 菜单/功能码 */
export const getAsyncMenus = () => {
  return http.request<AsyncMenusResponse>("get", "/get-async-menus");
};

/** 用户权限相关 - 功能码 */
export const getUserPermissions = () => {
  return http.request<PermissionResponse>("get", "/get-permissions");
};

/** 验证验证码 */
export const checkCaptcha = (data?: object) => {
  return http.request<PureHttpResonseData>("post", "/captcha/check", data);
};

/** 重置密码 */
export const resetPassword = (data?: object) => {
  return http.request<PureHttpResonseData>("post", "/password/reset", data);
};

/** 修改密码 */
export const modifyPassword = (data?: object) => {
  return http.request<PureHttpResonseData>("post", "/password/update", data);
};
