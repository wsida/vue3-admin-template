<template>
  <div class="ap-login-tabs">
    <ReTabs v-model="activeTab" :tabs="tabs">
      <div class="ap-login-tabs__content">
        <PasswordLoginForm
          v-if="activeTab === tabs[0].name"
          :style="{ minHeight: minHeight }"
        />
        <CaptchaLoginForm
          v-if="activeTab === tabs[1].name"
          :style="{ minHeight: minHeight }"
        />
        <ScanLoginForm
          v-if="activeTab === tabs[2].name"
          :style="{ minHeight: minHeight, maxHeight: minHeight }"
        />
        <WechatScanLoginForm
          v-if="activeTab === tabs[3].name"
          :style="{ minHeight: minHeight, maxHeight: minHeight }"
        />
      </div>
    </ReTabs>
  </div>
</template>

<script setup lang="ts">
import PasswordLoginForm from "./passwordLoginForm.vue";
import CaptchaLoginForm from "./captchaLoginForm.vue";
import ScanLoginForm from "./scanLoginForm.vue";
import WechatScanLoginForm from "./wechatScanLoginForm.vue";
import { ref } from "vue";
import type { Tab } from "@/components/ReTabs/types";

defineOptions({
  name: "CompositeLoginForm"
});

const minHeight = "360px";
const tabs = ref<Tab[]>([
  { label: "账号密码登录", name: "password" },
  { label: "验证码登录", name: "captcha" },
  { label: "企业微信登录", name: "scan" },
  { label: "微信登录", name: "wechat-scan" }
]);
const activeTab = ref(tabs.value[0].name);
</script>

<style lang="scss" scoped>
.ap-login-tabs {
  @apply relative;

  :deep(.el-tabs__nav) {
    @apply min-w-full justify-center;
  }

  &__content {
    @apply mt-[24px];
  }
}
</style>
