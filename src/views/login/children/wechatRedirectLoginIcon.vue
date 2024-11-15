<template>
  <span
    v-tippy="{
      content: '微信登录',
      hideOnClick: 'toggle',
      placement: 'bottom'
    }"
    class="cursor-pointer inline-flex items-center justify-center rounded-[100%] w-[24px] h-[24px] bg-[var(--el-text-color-placeholder)]"
    @click="onClick"
  >
    <IconifyIconOffline class="text-[18px] text-white" :icon="WeChatIcon" />
  </span>
</template>

<script setup lang="ts">
import WeChatIcon from "@iconify-icons/ri/wechat-2-fill";
import { computed } from "vue";
import useUid from "./useUid";

const YOUR_APP_ID = "102151278";
const YOU_REDIRECT_URL = "http://127.0.0.1:8848/#/login/redirect/wechat"; // 注意区分环境

const { uid } = useUid();
const wechatLoginHref = computed(() => {
  return `https://open.weixin.qq.com/connect/qrconnect?appid=${YOUR_APP_ID}&redirect_uri=${encodeURIComponent(YOU_REDIRECT_URL)}&response_type=code&scope=snsapi_login&state=${uid.value}#wechat_redirect`;
});

// 微信开发者工具配置回调地址 http://127.0.0.1:8848/#/login/redirect/wechat
// 用户微信登录授权后自动跳转回调地址，回调地址中的code / state会作为查询参数传递，code用于获取鉴权信息，state用于身份校验-防止csr伪造
// const code = '从查询字符串中获取code';

// 通过code获取access_token
// https://api.weixin.qq.com/sns/oauth2/access_token?appid=${YOUR_APP_ID}&secret=${YOUR_SECRET}&code=${CODE}&grant_type=authorization_code

function onClick() {
  window.open(wechatLoginHref.value);
}
</script>
