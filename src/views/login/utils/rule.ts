import { reactive } from "vue";
import { useEnumPatternItemHook } from "@/store/modules/enums";
import type { FormRules } from "element-plus";

/** 登录校验 */
const loginRules = reactive(<FormRules>{
  username: [
    {
      required: true,
      message: "请输入账号",
      trigger: "blur"
    }
  ],
  password: [
    {
      validator: (rule, value, callback) => {
        const patternItem = useEnumPatternItemHook("PSW");
        if (value === "") {
          callback(new Error("请输入密码"));
        } else if (patternItem && !patternItem.value.test(value)) {
          callback(new Error(patternItem.message));
        } else {
          callback();
        }
      },
      trigger: "blur"
    }
  ],
  captcha: [
    {
      validator: (rule, value, callback) => {
        const patternItem = useEnumPatternItemHook("CAPTCHA4");
        if (value === "") {
          callback(new Error("请输入验证码"));
        } else if (patternItem && !patternItem.value.test(value)) {
          callback(new Error(patternItem.message));
        } else {
          callback();
        }
      },
      trigger: "blur"
    }
  ],
  mobile: [
    {
      required: true,
      message: "请输入手机号",
      trigger: "blur"
    },
    {
      validator: (rule, value, callback) => {
        const patternItem = useEnumPatternItemHook("MOBILR");
        if (value && patternItem && !patternItem.value.test(value)) {
          callback(new Error(patternItem.message));
        } else {
          callback();
        }
      },
      trigger: "blur"
    }
  ]
});

export { loginRules };
