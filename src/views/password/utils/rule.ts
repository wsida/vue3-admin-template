import { reactive } from "vue";
import { useEnumPatternItemHook } from "@/store/modules/enums";
import type { FormRules } from "element-plus";

/** 登录校验 */
const forgetRules = reactive<FormRules>({
  oldPassword: [
    {
      validator: (rule, value, callback) => {
        const patternItem = useEnumPatternItemHook("PSW");
        if (value === "") {
          callback(new Error("请输入旧密码"));
        } else if (patternItem && !patternItem.value.test(value)) {
          callback(new Error(patternItem.message));
        } else {
          callback();
        }
      },
      trigger: "blur"
    }
  ],
  newPassword: [
    {
      validator: (rule, value, callback) => {
        const patternItem = useEnumPatternItemHook("PSW");
        if (value === "") {
          callback(new Error("请输新密码"));
        } else if (patternItem && !patternItem.value.test(value)) {
          callback(new Error(patternItem.message));
        } else {
          callback();
        }
      },
      trigger: "blur"
    }
  ],
  confirmPassword: [
    {
      validator: (rule, value, callback) => {
        const patternItem = useEnumPatternItemHook("PSW");
        if (value === "") {
          callback(new Error("请输确认密码"));
        } else if (patternItem && !patternItem.value.test(value)) {
          callback(new Error(patternItem.message));
        } else {
          callback();
        }
      },
      trigger: "blur"
    }
  ]
});

export { forgetRules };
