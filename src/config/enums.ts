/**
 * 枚举值配置 / 常量字段
 */
// export * from "./constants";
// export * from "./storageNames";

// 数据字典
export const BASE_STATUS = [
  { label: "启用", value: 1 },
  { label: "禁用", value: 0 }
];

export const USER_STATUS = [
  { label: "未验证", value: 0 },
  { label: "正常", value: 1 },
  { label: "已禁用", value: 2 }
];

export const SHOW_STATUS = [
  { label: "显示", value: 1 },
  { label: "隐藏", value: 0 }
];

export const PATTERNS = [
  {
    label: "账号密码",
    key: "PSW",
    value:
      /^(?![0-9]+$)(?![a-z]+$)(?![A-Z]+$)(?!([^(0-9a-zA-Z)]|[()])+$)(?!^.*[\u4E00-\u9FA5].*$)([^(0-9a-zA-Z)]|[()]|[a-z]|[A-Z]|[0-9]){8,18}$/,
    message: "密码格式应为8-18位数字、字母、符号的任意两种组合"
  },
  {
    label: "验证码",
    key: "CAPTCHA4",
    value: /^[0-9]{4}$/,
    message: "验证码应为4位数字"
  },
  {
    label: "验证码",
    key: "CAPTCHA6",
    value: /^[0-9]{6}$/,
    message: "验证码应为6位数字"
  },
  {
    label: "手机号码（国内）",
    key: "MOBILE",
    value: /^1[3-9][0-9]{9}$/,
    message: "手机号码有误"
  }
];
