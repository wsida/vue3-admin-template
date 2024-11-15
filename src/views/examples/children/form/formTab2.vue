<template>
  <div>
    <el-alert :closable="false" class="mb-4"
      >设置cols属性控制栅格列数，默认为cols，自动占满一行，控件配置可以搭配span字段控制占位，默认为1。支持响应配置</el-alert
    >
    <div class="flex items-center mb-4">
      <span class="text-gray-700 text-[14px]">只读：</span>
      <el-switch v-model="readonly" />
    </div>
    <div class="flex items-center mb-4">
      <span class="text-gray-700 text-[14px]">标签位置：</span>
      <el-radio-group v-model="labelPosition">
        <el-radio value="left" label="left" />
        <el-radio value="right" label="right" />
        <el-radio value="top" label="top" />
      </el-radio-group>
    </div>
    <ReForm
      size="default"
      :editable="!readonly"
      :cols="{ lg: 2, sm: 1, xl: 3 }"
      :label-width="100"
      :label-position="labelPosition"
      :items="formItems"
      @submit="handleSubmit"
    >
      <template #name-label>
        <span>name插槽</span>
      </template>
    </ReForm>
  </div>
</template>

<script setup lang="ts">
import type { ReFormItem } from "@/components/ReForm/types";
import { message } from "@/utils/message";
import { ref } from "vue";

const labelPosition = ref("right");
const readonly = ref(false);

const formItems = ref<ReFormItem[]>([
  {
    label: "Name",
    field: "name",
    defaultValue: "",
    comp: "el-input",
    span: 1,
    // labelSlot: "name-label", 默认字段标签名插槽命名规则 [field]-label，也可以自定义
    // span: 1, // 默认为1
    tooltip: "这是tooltip",
    props: {
      clearable: true
    },
    rules: [{ required: true, message: "不能为空" }]
  },
  {
    label: "Age",
    field: "age",
    comp: "el-input",
    span: 1,
    props: {
      type: "number",
      min: 1,
      max: 9999
    },
    events: {
      focus: handleNumberFocus,
      blur: handleNumberBlur
    }
  },
  {
    label: "Remark",
    field: "remark",
    comp: "el-textarea",
    span: { xl: 3, lg: 2 },
    props: {
      rows: 4
    }
  },
  {
    label: "Birthday",
    field: "birthday",
    comp: "el-date-picker",
    tooltip: "这是tooltip",
    span: { xl: 2, lg: 1 },
    props: {
      type: "date",
      format: "YYYY/MM/DD",
      style: "width: 100%!important"
    }
  },
  {
    label: "Subject",
    field: "subject",
    comp: "el-select",
    tooltip: "这是tooltip",
    tips: "这是显眼的tips",
    span: { xl: 2, lg: 1 },
    options: [
      {
        label: "Subject1",
        value: "1"
      },
      {
        label: "Subject2",
        value: "2"
      },
      {
        label: "Subject3",
        value: "3"
      }
    ],
    rules: [{ required: true, message: "不能为空" }],
    props: {
      clearable: true
    }
  },
  {
    label: "Hobby",
    field: "hobby",
    comp: "el-checkbox-group",
    labelKey: "name",
    valueKey: "id",
    span: { xl: 1, sm: 2 },
    options: [
      {
        name: "hobby1",
        id: "1"
      },
      {
        name: "hobby2",
        id: "2"
      },
      {
        name: "hobby3",
        id: "3"
      }
    ],
    defaultValue: ["1"],
    props: {
      clearable: true
    }
  },
  {
    label: "Marry",
    field: "marry",
    comp: "el-radio-group",
    span: 2,
    options: [
      {
        label: "married",
        value: "1"
      },
      {
        label: "none",
        value: "2"
      }
    ],
    defaultValue: "2",
    props: {
      clearable: true
    }
  }
]);

function handleNumberFocus() {
  message("number focus", { type: "warning" });
}

function handleNumberBlur() {
  message("number blur", { type: "warning" });
}

function handleSubmit(formData) {
  console.log("submit form data", formData);
}
</script>
