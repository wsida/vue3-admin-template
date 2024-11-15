<script setup lang="ts">
import Motion from "../../login/utils/motion";
import { useRouter } from "vue-router";
import { loginRules } from "../../login/utils/rule";
import type { FormInstance } from "element-plus";
import { checkCaptcha, getCaptcha } from "@/api/user";
import { useRenderIcon } from "@/components/ReIcon/src/hooks";
import { ref, reactive, onMounted, onBeforeUnmount } from "vue";
import { ROUTER_LOGIN_NAME } from "@/config/constants";

import Phone from "@iconify-icons/ri/smartphone-line";
import Lock from "@iconify-icons/ri/lock-fill";

defineOptions({
  name: "ForgetPasswordStepOneForm"
});
const emits = defineEmits<{
  (e: "check", mobile: string): void;
}>();

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
      checkCaptcha({ mobile: ruleForm.mobile, captcha: ruleForm.captcha })
        .then(res => {
          emits("check", ruleForm.mobile);
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

function onBackLogin() {
  router.replace({ name: ROUTER_LOGIN_NAME });
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
    class="ap-password-forget-one"
    :model="ruleForm"
    :rules="loginRules"
    size="large"
  >
    <Motion :delay="100">
      <el-form-item
        :rules="[
          {
            required: true,
            message: '请输入手机号',
            trigger: 'blur'
          }
        ]"
        prop="mobile"
      >
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
        验证手机号
      </el-button>
    </Motion>

    <Motion :delay="300">
      <div class="w-full flex justify-between items-center mt-[12px]">
        <span><!--placeholder--></span>
        <el-button link size="default" type="primary" @click="onBackLogin">
          返回登录
        </el-button>
      </div>
    </Motion>
  </el-form>
</template>

<style lang="scss">
.ap-password-forget-one {
  :deep(.el-input-group__append, .el-input-group__prepend) {
    padding: 0;
  }
}
</style>
