<script setup lang="ts">
import Motion from "../utils/motion";
import { useRouter } from "vue-router";
import { message } from "@/utils/message";
import { loginRules } from "../utils/rule";
import type { FormInstance } from "element-plus";
import { useUserStoreHook } from "@/store/modules/user";
import { initRouter, getTopMenu } from "@/router/utils";
import { useRenderIcon } from "@/components/ReIcon/src/hooks";
import { ref, reactive, onMounted, onBeforeUnmount } from "vue";
import LoginFormFooter from "../components/loginFormFooter.vue";

import Lock from "@iconify-icons/ri/lock-fill";
import User from "@iconify-icons/ri/user-3-fill";

defineOptions({
  name: "PasswordLoginForm"
});
const router = useRouter();
const loading = ref(false);
const ruleFormRef = ref<FormInstance>();

const ruleForm = reactive({
  username: "admin",
  password: "admin123"
});

const onLogin = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      loading.value = true;
      useUserStoreHook()
        .loginByPassword({ username: ruleForm.username, password: "admin123" })
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
    class="ap-login-password"
    :model="ruleForm"
    :rules="loginRules"
    size="large"
  >
    <Motion :delay="100">
      <el-form-item prop="username">
        <el-input
          v-model="ruleForm.username"
          clearable
          placeholder="账号"
          :prefix-icon="useRenderIcon(User)"
        />
      </el-form-item>
    </Motion>

    <Motion :delay="150">
      <el-form-item prop="password">
        <el-input
          v-model="ruleForm.password"
          clearable
          show-password
          placeholder="密码"
          :prefix-icon="useRenderIcon(Lock)"
        />
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
.ap-login-password {
  :deep(.el-input-group__append, .el-input-group__prepend) {
    padding: 0;
  }
}
</style>
