<template>
  <RePage>
    <RePageCard>
      <ReForm
        v-model="formData"
        class="py-[24px] max-w-[400px] mx-auto w-full"
        size="default"
        label-position="top"
        :items="formItems"
        @submit="handleSubmit"
        @cancel="handleCancel"
      />
    </RePageCard>
  </RePage>
</template>

<script setup lang="ts">
import { ref, shallowRef } from "vue";
import { useRouter } from "vue-router";
import { forgetRules } from "./utils/rule";
import { useRenderIcon } from "@/components/ReIcon/src/hooks";
import Lock from "@iconify-icons/ri/lock-fill";

defineOptions({
  name: "ModifyPassword"
});

const formData = ref({
  oldPassword: "",
  newPassword: "",
  confirmPassword: ""
});
const router = useRouter();

const formItems = shallowRef([
  {
    label: "旧密码",
    field: "oldPassword",
    defaultValue: "",
    comp: "el-input",
    props: {
      clearable: true,
      showPassword: true,
      prefixIcon: useRenderIcon(Lock)
    },
    rules: forgetRules.oldPassword
  },
  {
    label: "新密码",
    field: "newPassword",
    defaultValue: "",
    comp: "el-input",
    props: {
      clearable: true,
      showPassword: true,
      prefixIcon: useRenderIcon(Lock)
    },
    rules: forgetRules.newPassword
  },
  {
    label: "确认密码",
    field: "confirmPassword",
    defaultValue: "",
    comp: "el-input",
    props: {
      clearable: true,
      showPassword: true,
      prefixIcon: useRenderIcon(Lock)
    },
    rules: [
      ...(forgetRules.confirmPassword as any),
      {
        validator: (rule, value, callback) => {
          if (value === "") {
            callback(new Error("请输确认密码"));
          } else if (
            formData.value.newPassword &&
            formData.value.newPassword !== value
          ) {
            callback(new Error("两次密码输入不一致"));
          } else {
            callback();
          }
        },
        trigger: "blur"
      }
    ]
  }
]);

function handleSubmit(formData: Record<string, any>) {}
function handleCancel() {
  router.back();
}
</script>
