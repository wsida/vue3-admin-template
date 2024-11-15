<template>
  <div class="fixed left-0 top-0 w-[100vw] h-[100vh] z-10">
    <div
      class="w-full h-full flex items-center justify-center relative overflow-hidden"
    >
      <div class="loader" />
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * 第三方登录redirect
 */
import { useRoute, useRouter } from "vue-router";
import { useUserStoreHook } from "@/store/modules/user";
import {
  ROUTER_LOGIN_NAME,
  ROUTER_AUDIT_WAITING_PATH
} from "@/config/constants";
import { message } from "@/utils/message";
import { onBeforeMount, onMounted, ref } from "vue";
import { initRouter, getTopMenu } from "@/router/utils";

defineOptions({
  name: "LoginRedirect"
});

const route = useRoute();
const router = useRouter();
const authType = ref(route.params.type);
const code = ref(route.query.code);

onBeforeMount(() => {
  if (!code.value || !authType.value) {
    router.replace({ name: ROUTER_LOGIN_NAME });
  }
});

onMounted(() => {
  /* if (code.value && authType.value) {
    useUserStoreHook()
      .loginByAccessToken({ decodeData: code.value, authType: authType.value }) // 根据扫码登录鉴权方式 + 鉴权code 获取用户信息
      .then(res => {
        if (res.data.status === 0) {
          const toPath = decodeURIComponent(ROUTER_AUDIT_WAITING_PATH);
          message("验证成功，请等待管理员审批", { type: "success" });
          router.push(toPath);
        } else {
          // 获取后端路由
          return initRouter().then(() => {
            const toPath = decodeURIComponent(getTopMenu(true).path as string);
            router.push(toPath).then(() => {
              message("登录成功，即将进入系统", { type: "success" });
            });
          });
        }
      })
      .catch(() => {})
      .finally(() => {});
  } */
});
</script>

<style scoped>
.loader,
.loader::before,
.loader::after {
  width: 2.5em;
  height: 2.5em;
  border-radius: 50%;
  animation: load-animation 1.8s infinite ease-in-out;
  animation-fill-mode: both;
}

.loader {
  position: relative;
  top: 0;
  margin: 80px auto;
  font-size: 10px;
  color: #406eeb;
  text-indent: -9999em;
  transform: translateZ(0);
  transform: translate(-50%, 0);
  animation-delay: -0.16s;
}

.loader::before,
.loader::after {
  position: absolute;
  top: 0;
  content: "";
}

.loader::before {
  left: -3.5em;
  animation-delay: -0.32s;
}

.loader::after {
  left: 3.5em;
}

@keyframes load-animation {
  0%,
  80%,
  100% {
    box-shadow: 0 2.5em 0 -1.3em;
  }

  40% {
    box-shadow: 0 2.5em 0 0;
  }
}
</style>
