<script setup lang="ts">
import Motion from "./utils/motion";
import { useNav } from "@/layout/hooks/useNav";
import { useLayout } from "@/layout/hooks/useLayout";
import { bg, avatar, illustration } from "./utils/static";
import { toRaw } from "vue";
import { useDataThemeChange } from "@/layout/hooks/useDataThemeChange";
import LayFooter from "@/layout/components/lay-footer/index.vue";
// import PasswordLoginForm from "./children/passwordLoginForm.vue";
// import CaptchaLoginForm from "./children/captchaLoginForm.vue";
// import ScanLoginForm from "./children/scanLoginForm.vue";
import CompositeLoginForm from "./children/compositeLoginForm.vue";

import dayIcon from "@/assets/svg/day.svg?component";
import darkIcon from "@/assets/svg/dark.svg?component";

defineOptions({
  name: "Login"
});

const { initStorage } = useLayout();
initStorage();

const { dataTheme, overallStyle, dataThemeChange } = useDataThemeChange();
dataThemeChange(overallStyle.value);
const { title } = useNav();
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
    <div class="login-container">
      <div class="img">
        <component :is="toRaw(illustration)" />
      </div>
      <div class="login-box">
        <div class="login-form">
          <avatar class="avatar" />
          <Motion>
            <h2 class="outline-none">{{ title }}</h2>
          </Motion>
          <!--登录表单-->
          <!-- <PasswordLoginForm /> -->
          <!-- <CaptchaLoginForm /> -->
          <!-- <ScanLoginForm /> -->
          <CompositeLoginForm />
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
