<template>
  <span
    v-tippy="{
      content: 'QQ登录',
      hideOnClick: 'toggle',
      placement: 'bottom'
    }"
    class="cursor-pointer inline-flex items-center justify-center rounded-[100%] w-[24px] h-[24px] bg-[var(--el-text-color-placeholder)]"
    @click="onClick"
  >
    <IconifyIconOffline class="text-[18px] text-white" :icon="QQIcon" />
  </span>
</template>

<script setup lang="ts">
import QQIcon from "@iconify-icons/ri/qq-fill";
import { computed } from "vue";

const YOUR_APP_ID = "102151278";

const qqLoginHref = computed(() => {
  return `https://graph.qq.com/oauth2.0/show?which=login&response_type=code&client_id=${YOUR_APP_ID}`;
});

// qq开发者工具配置回调地址 http://127.0.0.1:8848/#/login/redirect/qq
// 用户qq登录授权后自动跳转回调地址，回调地址中的code会作为查询参数传递，code用于获取鉴权信息

// const postData = querystring.stringify({
//   grant_type: 'authorization_code',
//   client_id: 'YOUR_APP_ID',
//   client_secret: 'YOUR_APP_KEY',
//   code: code,
//   redirect_uri: 'http://127.0.0.1:8848/#/login/redirect/qq'
// });
// post: https://graph.qq.com/oauth2.0/token
// header: 'Content-Type': 'application/x-www-form-urlencoded',
//         'Content-Length': Buffer.byteLength(postData)
// data: postData

function onClick() {
  window.open(qqLoginHref.value);
}
</script>
