// 根据角色动态生成路由
import { defineFakeRoute } from "vite-plugin-fake-server/client";

const USER_INFOS = [
  {
    status: 1,
    avatar: "https://avatars.githubusercontent.com/u/44761321",
    username: "admin",
    nickname: "管理员",
    mobile: "18888888888",
    email: "admin@erker.com.cn",
    lastLoginTime: "2024-07-16 18:00:00",
    // 一个用户可能有多个角色
    roles: ["admin"],
    accessToken: "eyJhbGciOiJIUzUxMiJ9.admin",
    refreshToken: "eyJhbGciOiJIUzUxMiJ9.adminRefresh",
    expires: "2030/10/30 00:00:00"
  },
  {
    status: 1,
    avatar: "https://avatars.githubusercontent.com/u/52823142",
    username: "common",
    nickname: "小用户",
    roles: ["common"],
    accessToken: "eyJhbGciOiJIUzUxMiJ9.common",
    refreshToken: "eyJhbGciOiJIUzUxMiJ9.commonRefresh",
    expires: "2030/10/30 00:00:00"
  }
];

export default defineFakeRoute([
  {
    url: "/login",
    method: "post",
    response: ({ body }) => {
      if (
        !!body.decodeData ||
        body.username === "admin" ||
        body.mobile === "1888888888"
      ) {
        return {
          code: 0,
          message: "success",
          data: USER_INFOS[0]
        };
      } else {
        return {
          code: 0,
          message: "success",
          data: USER_INFOS[1]
        };
      }
    }
  },
  {
    url: "/userinfo",
    method: "get",
    response: () => ({
      code: 0,
      message: "success",
      data: USER_INFOS[0]
    })
  },
  {
    // 重置密码
    url: "/password/reset",
    method: "post",
    response: () => ({
      code: 0,
      message: "success"
    })
  },
  {
    // 修改密码
    url: "/password/update",
    method: "post",
    response: () => ({
      code: 0,
      message: "success"
    })
  },
  {
    // 获取验证码
    url: "/captcha",
    method: "post",
    response: () => ({
      code: 0,
      message: "success"
    })
  },
  {
    // 获取验证码
    url: "/captcha/check",
    method: "post",
    response: () => ({
      code: 0,
      message: "success"
    })
  },
  {
    // 获取验证码 - 独立扫码鉴全接口
    url: "/sys/heartBeatCheckAuthLogin",
    method: "post",
    response: () => ({
      code: 0,
      message: "success",
      data: ""
      // data: "abcd"
    })
  },
  {
    // 获取验证码 - 独立扫码鉴全接口
    url: "/sys/getScanLoginQrcode",
    method: "get",
    headers: {
      "Content-Type": "image/png"
    },
    response: () => null
  }
]);
