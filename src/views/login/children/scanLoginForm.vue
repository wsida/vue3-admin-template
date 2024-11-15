<template>
  <div class="text-center">
    <Motion :delay="100">
      <div
        class="relative rounded-[var(--el-border-radius-base)] border-[1px] border-solid border-[var(--el-border-color-light)]"
      >
        <img
          v-if="src"
          :src="src"
          class="relative inline-block w-full h-auto max-w-[320px]"
        />
      </div>
    </Motion>
    <Motion :delay="150">
      <div class="mt-[12px]">
        <span class="text-[16px] leading-6 text-[var(--el-text-color-regular)]"
          >请用企业微信扫描上方二维码</span
        >
      </div>
    </Motion>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, onUnmounted, ref } from "vue";
import Motion from "../utils/motion";
import { useRoute, useRouter } from "vue-router";
import { message } from "@/utils/message";
import { UrlUtils } from "@/utils/urlUtils";
import { Timer } from "@/utils/websocket/timer";
import { WebSocketClient } from "@/utils/websocket/websocketClient";
import { EventBus } from "@/utils/websocket/eventBus";
import { isEmpty } from "lodash-es";
import { checkAuth } from "@/api/user";
import useUid from "./useUid";
import {
  uServiceAuthQrcodeUrl,
  uServiceWebsocketUrl
} from "@/config/constants";
import { useUserStoreHook } from "@/store/modules/user";
import { initRouter, getTopMenu } from "@/router/utils";
import { ROUTER_AUDIT_WAITING_PATH } from "@/config/constants";

const { uid, removeUid } = useUid();
const src = ref(null);
const route = useRoute();
const router = useRouter();

const wsClient = new WebSocketClient();
const timer = new Timer(3000, 1000, true, function () {
  heartBeatCheckAuthLogin();
});

function initWebSocketClient() {
  wsClient.host = UrlUtils.buildLink(uServiceWebsocketUrl, {
    userId: uid.value,
    tag: "*"
  });
  wsClient.init(function () {
    wsClient.getTime();
    wsClient.registerMe("expowell_ep", uid.value, "*");
    wsClient.findAllUser();
    timer.beatInterval = 30000;
  });
  EventBus.occupy("ws-authLogin", uid.value, function (data) {
    doLogin(data);
  });
  timer.start();
}

function doLogin(params) {
  if (!params || !params.data) return;
  useUserStoreHook()
    .loginByAccessToken({ decodeData: params.data })
    .then(res => {
      if (res.data.status === 0) {
        const toPath = decodeURIComponent(ROUTER_AUDIT_WAITING_PATH);
        message("验证成功，请等待管理员审批", { type: "success" });
        deleteUserId();
        router.push(toPath);
      } else {
        // 获取后端路由
        return initRouter().then(() => {
          const toPath = decodeURIComponent(
            (route.query?.redirect || getTopMenu(true).path) as string
          );
          router.push(toPath).then(() => {
            message("登录成功，即将进入系统", { type: "success" });
          });
        });
      }
    })
    .catch(() => {})
    .finally(() => {});
}

function heartBeatCheckAuthLogin() {
  checkAuth({ id: uid.value })
    .then(res => {
      doLogin(res);
    })
    .catch(() => {})
    .finally(() => {});
}

function release() {
  timer.stop();
  wsClient.disconnect();
}

function deleteUserId() {
  if (!isEmpty(uid.value)) {
    EventBus.deleteBySubscriberId(uid.value);
    removeUid;
  }
}

onMounted(() => {
  const url = UrlUtils.buildLink(uServiceAuthQrcodeUrl, {
    id: uid.value,
    name: uid.value,
    tag: "*"
  });
  src.value = url;
  initWebSocketClient();
});

onUnmounted(() => {
  release();
});
</script>
