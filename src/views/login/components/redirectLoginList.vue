<template>
  <div class="flex items-center justify-start">
    <span class="text-[14px] text-[var(--el-text-color-placeholder)] mr-[12px]"
      >其他登录方式</span
    >
    <!--登录方式Icon-->
    <qqRedirectLoginIcon class="mr-[8px]" />
    <wechatRedirectLoginIcon class="mr-[8px]" />
  </div>
</template>

<script setup lang="ts">
import wechatRedirectLoginIcon from "../children/wechatRedirectLoginIcon.vue";
import qqRedirectLoginIcon from "../children/qqRedirectLoginIcon.vue";
</script>
