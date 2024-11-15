<template>
  <div class="text-center">
    <Motion :delay="100">
      <div
        class="relative rounded-[var(--el-border-radius-base)] border-[1px] border-solid border-[var(--el-border-color-light)]"
      >
        <div
          :id="YOUR_QRCODE_ID"
          class="relative inline-block w-full h-auto max-w-[320px] max-h-[320px]"
        />
      </div>
    </Motion>
    <Motion :delay="150">
      <div class="mt-[12px]">
        <span class="text-[16px] leading-6 text-[var(--el-text-color-regular)]"
          >请用微信扫描上方二维码</span
        >
      </div>
    </Motion>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, nextTick, ref } from "vue";
import Motion from "../utils/motion";
import useUid from "./useUid";
import { loadScript } from "@/utils/loadResource";

const YOUR_QRCODE_ID = "ap-wechat-login-qrcode";
const YOUR_APP_ID = "102151278";
const YOU_REDIRECT_URL = "http://127.0.0.1:8848/#/login/redirect/wechat"; // 注意区分环境
const wxLoginSrc =
  "http://res.wx.qq.com/connect/zh_CN/htmledition/js/wxLogin.js";

const { uid } = useUid();
const wsLoginInstance = ref(null);

function loadQrCode() {
  nextTick(() => {
    wsLoginInstance.value = new window.WxLogin({
      self_redirect: true,
      id: YOUR_QRCODE_ID,
      appid: YOUR_APP_ID,
      scope: "snsapi_login",
      redirect_uri: YOU_REDIRECT_URL,
      state: uid.value,
      style: "black"
    });
  });
}

onMounted(() => {
  loadScript(wxLoginSrc, () => {
    loadQrCode();
  });
});
</script>
