/**
 * 全局定义常量
 */
const {
  VITE_GLOB_U_SERVICE_API_BASE,
  VITE_GLOB_U_SERVICE_AUTH_QRCODE_URL,
  VITE_GLOB_U_SERVICE_WEBSOCKET_URL
} = import.meta.env;

// 企业微信登录
export const uServiceAuthApiUrl = VITE_GLOB_U_SERVICE_API_BASE;
export const uServiceAuthQrcodeUrl = VITE_GLOB_U_SERVICE_AUTH_QRCODE_URL;
export const uServiceWebsocketUrl = VITE_GLOB_U_SERVICE_WEBSOCKET_URL;

export const ROUTER_LOGIN_NAME = "Login";
export const ROUTER_REDIRECT_NAME = "Redirect";
export const ROUTER_FORGET_PASSWORD_NAME = "ForgetPassword";
export const ROUTER_AUDIT_WAITING_PATH = "/waiting";
export const ROUTER_LOGIN_REDIRECT_PATH = "/login/redirect/:type";
