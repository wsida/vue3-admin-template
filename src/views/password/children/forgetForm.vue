<script setup lang="ts">
import { ref, reactive } from "vue";
import ForgetStepOne from "./forgetStepOne.vue";
import ForgetStepTwo from "./forgetStepTwo.vue";

defineOptions({
  name: "ForgetPasswordForm"
});

const minHeight = "380px";
const step = ref(1);
const params = reactive({
  mobile: ""
});

function handleAuth(mobile: string) {
  params.mobile = mobile;
  step.value = 2;
}
</script>

<template>
  <div class="ap-password-forget">
    <ForgetStepOne
      v-if="step === 1"
      :style="{ minHeight: minHeight }"
      @check="handleAuth"
    />
    <ForgetStepTwo
      v-if="step === 2"
      :style="{ minHeight: minHeight }"
      :params="params"
    />
  </div>
</template>
