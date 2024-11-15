import { defineStore } from "pinia";
import {
  type userType,
  store,
  router,
  resetRouter,
  routerArrays,
  storageLocal
} from "../utils";
import {
  type UserInfoResponse,
  type RefreshTokenResponse,
  getLogin,
  refreshTokenApi,
  getUserInfo
} from "@/api/user";
import { useMultiTagsStoreHook } from "./multiTags";
import { type DataInfo, setToken, removeToken, userKey } from "@/utils/auth";

export const useUserStore = defineStore({
  id: "pure-user",
  state: (): userType => ({
    // 状态
    status: storageLocal().getItem<DataInfo<number>>(userKey)?.status ?? 0,
    // 头像
    avatar: storageLocal().getItem<DataInfo<number>>(userKey)?.avatar ?? "",
    // 用户名
    username: storageLocal().getItem<DataInfo<number>>(userKey)?.username ?? "",
    // 昵称
    nickname: storageLocal().getItem<DataInfo<number>>(userKey)?.nickname ?? "",
    // 手机
    mobile: storageLocal().getItem<DataInfo<number>>(userKey)?.mobile ?? "",
    // 昵称
    email: storageLocal().getItem<DataInfo<number>>(userKey)?.email ?? "",
    // 最近登录时间
    lastLoginTime:
      storageLocal().getItem<DataInfo<number>>(userKey)?.lastLoginTime ?? "",
    // 页面级别权限
    roles: storageLocal().getItem<DataInfo<number>>(userKey)?.roles ?? [],
    // 是否勾选了登录页的免登录
    isRemembered: false,
    // 登录页的免登录存储几天，默认7天
    loginDay: 7
  }),
  actions: {
    /**存储状态 */
    SET_STUATUS(status: number) {
      this.status = status;
    },
    /** 存储头像 */
    SET_AVATAR(avatar: string) {
      this.avatar = avatar;
    },
    /** 存储用户名 */
    SET_USERNAME(username: string) {
      this.username = username;
    },
    /** 存储昵称 */
    SET_NICKNAME(nickname: string) {
      this.nickname = nickname;
    },
    /** 存储手机 */
    SET_MOBILE(mobile: string) {
      this.mobile = mobile;
    },
    /** 存储邮箱 */
    SET_EMAIL(email: string) {
      this.email = email;
    },
    /** 存储最近登录时间 */
    SET_LASTLOGINTIME(lastLoginTime: string) {
      this.lastLoginTime = lastLoginTime;
    },
    /** 存储角色 */
    SET_ROLES(roles: Array<string>) {
      this.roles = roles;
    },
    /** 存储是否勾选了登录页的免登录 */
    SET_ISREMEMBERED(bool: boolean) {
      this.isRemembered = bool;
    },
    /** 设置登录页的免登录存储几天 */
    SET_LOGINDAY(value: number) {
      this.loginDay = Number(value);
    },
    /**获取用户信息 */
    async getUserInfo(data?: object) {
      return new Promise<UserInfoResponse>((resolve, reject) => {
        getUserInfo(data)
          .then(data => {
            setToken(data.data);
            resolve(data);
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    /**登录 - 密码登录 */
    async loginByPassword(data) {
      return new Promise<UserInfoResponse>((resolve, reject) => {
        getLogin(data)
          .then(data => {
            setToken(data.data);
            resolve(data);
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    /**登录 - 验证码登录 */
    async loginByCaptcha(data) {
      return new Promise<UserInfoResponse>((resolve, reject) => {
        getLogin(data)
          .then(data => {
            setToken(data.data);
            resolve(data);
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    /**登录 - 企业微信扫码登录 */
    async loginByAccessToken(data) {
      return new Promise<UserInfoResponse>((resolve, reject) => {
        getLogin(data)
          .then(data => {
            setToken(data.data);
            resolve(data);
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    /** 前端登出（不调用接口） */
    logOut() {
      this.username = "";
      this.roles = [];
      removeToken();
      useMultiTagsStoreHook().handleTags("equal", [...routerArrays]);
      resetRouter();
      router.push("/login");
    },
    /** 刷新`token` */
    async handRefreshToken(data) {
      return new Promise<RefreshTokenResponse>((resolve, reject) => {
        refreshTokenApi(data)
          .then(data => {
            if (data) {
              setToken(data.data);
              resolve(data);
            }
          })
          .catch(error => {
            reject(error);
          });
      });
    }
  }
});

export function useUserStoreHook() {
  return useUserStore(store);
}
