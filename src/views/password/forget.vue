<script setup lang="ts">
import Motion from "../login/utils/motion";
import { useNav } from "@/layout/hooks/useNav";
import { useLayout } from "@/layout/hooks/useLayout";
import { bg, avatar, illustration } from "../login/utils/static";
import { toRaw } from "vue";
// import { useRouter } from "vue-router";
import { useDataThemeChange } from "@/layout/hooks/useDataThemeChange";
import LayFooter from "@/layout/components/lay-footer/index.vue";
import ForgetForm from "./children/forgetForm.vue";

import Back from "@iconify-icons/ri/arrow-left-s-line";

import dayIcon from "@/assets/svg/day.svg?component";
import darkIcon from "@/assets/svg/dark.svg?component";

defineOptions({
  name: "ForgetPassword"
});
// const router = useRouter();

const { initStorage } = useLayout();
initStorage();

const { dataTheme, overallStyle, dataThemeChange } = useDataThemeChange();
dataThemeChange(overallStyle.value);
const { title } = useNav();

// function onBackLogin() {
//   router.replace({ name: "Login" });
// }
</script>

<template>
  <div class="ap-login-page select-none">
    <img :src="bg" class="wave" />
    <div class="flex-c absolute right-5 top-3">
      <!-- 主题 -->
      <el-switch
        v-model="dataTheme"
        inline-prompt
        :active-icon="dayIcon"
        :inactive-icon="darkIcon"
        @change="dataThemeChange"
      />
    </div>
    <div class="flex-c absolute left-3 top-3">
      <!-- 主题 -->
      <!-- <el-button text type="default" class="px-2" @click="onBackLogin"
        ><IconifyIconOffline
          :icon="Back"
          class="text-[16px]"
        />返回登录</el-button
      > -->
    </div>
    <div class="login-container">
      <div class="img">
        <component :is="toRaw(illustration)" />
      </div>
      <div class="login-box">
        <div class="login-form">
          <avatar class="avatar" />
          <Motion>
            <h2 class="outline-none">忘记密码</h2>
          </Motion>
          <Motion>
            <h3 class="outline-none">{{ title }}</h3>
          </Motion>
          <!--修改密码表单-->
          <ForgetForm />
        </div>
      </div>
    </div>
    <!--页脚-->
    <LayFooter class="fixed bottom-0" />
  </div>
</template>

<style lang="scss">
@import url("@/style/login.scss");
</style>
