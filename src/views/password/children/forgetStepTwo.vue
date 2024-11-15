<script setup lang="ts">
import Motion from "../../login/utils/motion";
import { useRouter } from "vue-router";
import { message } from "@/utils/message";
import { forgetRules } from "../utils/rule";
import type { FormInstance } from "element-plus";
import { resetPassword } from "@/api/user";
import { useRenderIcon } from "@/components/ReIcon/src/hooks";
import { ref, computed, reactive, onMounted, onBeforeUnmount } from "vue";
import { ROUTER_LOGIN_NAME } from "@/config/constants";

import Lock from "@iconify-icons/ri/lock-fill";

defineOptions({
  name: "ForgetPasswordStepTwoForm"
});

const props = defineProps<{
  params: Record<string, any>;
}>();

const router = useRouter();
const loading = ref(false);
const ruleFormRef = ref<FormInstance>();

const ruleForm = reactive({
  newPassword: "",
  confirmPassword: ""
});

const confirmPasswordRules = computed(() => [
  {
    validator: (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输确认密码"));
      } else if (ruleForm.newPassword && ruleForm.newPassword !== value) {
        callback(new Error("两次密码输入不一致"));
      } else {
        callback();
      }
    },
    trigger: "blur"
  }
]);

const onModify = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      loading.value = true;
      resetPassword({
        newPassword: ruleForm.newPassword,
        mobile: props.params.mobile!
      })
        .then(() => {
          // 获取后端路由
          message("密码已修改！", { type: "success" });
          onBackLogin();
        })
        .finally(() => (loading.value = false));
    }
  });
};

function onBackLogin() {
  router.replace({ name: ROUTER_LOGIN_NAME });
}

/** 使用公共函数，避免`removeEventListener`失效 */
function onkeypress({ code }: KeyboardEvent) {
  if (["Enter", "NumpadEnter"].includes(code)) {
    onModify(ruleFormRef.value);
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
    class="ap-password-forget-two"
    :model="ruleForm"
    :rules="forgetRules"
    size="large"
  >
    <Motion :delay="100">
      <el-form-item prop="newPassword">
        <el-input
          v-model="ruleForm.newPassword"
          clearable
          show-password
          placeholder="新密码"
          :prefix-icon="useRenderIcon(Lock)"
        />
      </el-form-item>
    </Motion>

    <Motion :delay="150">
      <el-form-item prop="confirmPassword" :rules="confirmPasswordRules">
        <el-input
          v-model="ruleForm.confirmPassword"
          clearable
          show-password
          placeholder="确认密码"
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
        @click="onModify(ruleFormRef)"
      >
        重置密码
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
