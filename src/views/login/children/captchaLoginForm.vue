<script setup lang="ts">
import Motion from "../utils/motion";
import { useRouter } from "vue-router";
import { message } from "@/utils/message";
import { loginRules } from "../utils/rule";
import type { FormInstance } from "element-plus";
import { useUserStoreHook } from "@/store/modules/user";
import { initRouter, getTopMenu } from "@/router/utils";
import { useRenderIcon } from "@/components/ReIcon/src/hooks";
import { getCaptcha } from "@/api/user";
import { ref, reactive, onMounted, onBeforeUnmount } from "vue";
import LoginFormFooter from "../components/loginFormFooter.vue";

import Phone from "@iconify-icons/ri/smartphone-line";
import Lock from "@iconify-icons/ri/lock-fill";

defineOptions({
  name: "CaptchaLoginForm"
});
const router = useRouter();
const interval = ref(0);
const loading = ref(false);
const ruleFormRef = ref<FormInstance>();

const ruleForm = reactive({
  mobile: "1888888888",
  captcha: "8888"
});

const onLogin = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      loading.value = true;
      useUserStoreHook()
        .loginByCaptcha({ mobile: ruleForm.mobile, captcha: ruleForm.captcha })
        .then(res => {
          // 获取后端路由
          return initRouter().then(() => {
            router.push(getTopMenu(true).path).then(() => {
              message("登录成功", { type: "success" });
            });
          });
        })
        .finally(() => (loading.value = false));
    }
  });
};

/** 使用公共函数，避免`removeEventListener`失效 */
function onkeypress({ code }: KeyboardEvent) {
  if (["Enter", "NumpadEnter"].includes(code)) {
    onLogin(ruleFormRef.value);
  }
}

/** 获取验证码 */
function handleGetCaptcha() {
  ruleFormRef.value &&
    ruleFormRef.value.validateField("mobile", valid => {
      if (valid) {
        getCaptcha({ mobile: ruleForm.mobile }).then(() => {
          let raf = -1;
          let lastTimestap = new Date().getTime();
          const intervalFunc = () => {
            if (interval.value <= 0) {
              cancelAnimationFrame(raf);
            } else {
              const _timestap = new Date().getTime();
              if (_timestap - lastTimestap >= 1000) {
                interval.value -= 1;
                lastTimestap = _timestap;
              }
              raf = requestAnimationFrame(intervalFunc);
            }
          };
          interval.value = 59;
          raf = requestAnimationFrame(intervalFunc);
        });
      }
    });
}

onMounted(() => {
  window.document.addEventListener("keypress", onkeypress);
});

onBeforeUnmount(() => {
  window.document.removeEventListener("keypress", onkeypress);
});
</script>

<template>
  <el-form
    ref="ruleFormRef"
    class="ap-login-captcha"
    :model="ruleForm"
    :rules="loginRules"
    size="large"
  >
    <Motion :delay="100">
      <el-form-item prop="mobile">
        <el-input
          v-model="ruleForm.mobile"
          clearable
          placeholder="手机号"
          :prefix-icon="useRenderIcon(Phone)"
        />
      </el-form-item>
    </Motion>

    <Motion :delay="150">
      <el-form-item prop="captcha">
        <el-input
          v-model="ruleForm.captcha"
          clearable
          placeholder="验证码"
          :prefix-icon="useRenderIcon(Lock)"
        >
          <template #append>
            <el-tooltip
              :disabled="!interval"
              placement="top"
              content="已发送短信获取验证码，请注意查收"
            >
              <el-button
                :disabled="!!interval"
                style="width: 140px"
                @click="handleGetCaptcha"
                >{{
                  interval > 0 ? `${interval}s后重新获取` : "获取验证码"
                }}</el-button
              >
            </el-tooltip>
          </template>
        </el-input>
      </el-form-item>
    </Motion>

    <Motion :delay="250">
      <el-button
        class="w-full mt-[32px]"
        size="large"
        type="primary"
        :loading="loading"
        @click="onLogin(ruleFormRef)"
      >
        登录
      </el-button>
    </Motion>

    <Motion :delay="300">
      <LoginFormFooter />
    </Motion>
  </el-form>
</template>

<style lang="scss">
.ap-login-captcha {
  :deep(.el-input-group__append, .el-input-group__prepend) {
    padding: 0;
  }
}
</style>
