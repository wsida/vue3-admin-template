<template>
  <div class="w-full flex justify-between items-center mt-[12px]">
    <redirectLoginList />
    <el-button link size="default" type="primary" @click="onForgetPassword">
      忘记密码？
    </el-button>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { ROUTER_FORGET_PASSWORD_NAME } from "@/config/constants";
import redirectLoginList from "./redirectLoginList.vue";

const router = useRouter();

/** 忘记密码 */
function onForgetPassword() {
  router.replace({ name: ROUTER_FORGET_PASSWORD_NAME });
}
</script>
