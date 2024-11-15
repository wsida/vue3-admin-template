import { http } from "@/utils/http";
import type { PureHttpResonseData } from "@/utils/http/types";

/** 修改密码 */
export const getEnums = (code: string) => {
  return http.request<PureHttpResonseData>("get", "/enums", { code });
};
