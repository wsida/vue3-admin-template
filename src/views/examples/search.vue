<template>
  <RePage>
    <RePageCard>
      <div class="flex items-center mb-4">
        <span class="text-gray-700 text-[14px]">Size：</span>
        <el-radio-group v-model="size">
          <el-radio value="small" label="small" />
          <el-radio value="default" label="default" />
          <el-radio value="large" label="large" />
        </el-radio-group>
      </div>
      <div class="flex items-center mb-4">
        <span class="text-gray-700 text-[14px]">展示标签：</span>
        <el-radio-group v-model="showLabel">
          <el-radio :value="true" label="true" />
          <el-radio :value="false" label="false" />
        </el-radio-group>
      </div>
      <div v-if="showLabel" class="flex items-center mb-4">
        <span class="text-gray-700 text-[14px]">标签宽度：</span>
        <el-radio-group v-model="labelWidth">
          <el-radio value="auto" label="auto" />
          <el-radio value="custom" label="custom" />
        </el-radio-group>
      </div>
      <div v-if="showLabel" class="flex items-center mb-4">
        <span class="text-gray-700 text-[14px]">标签位置：</span>
        <el-radio-group v-model="labelPosition">
          <el-radio value="left" label="left" />
          <el-radio value="right" label="right" />
          <el-radio value="top" label="top" />
        </el-radio-group>
      </div>
      <div class="flex items-center mb-4">
        <span class="text-gray-700 text-[14px]">展示折叠按钮：</span>
        <el-radio-group v-model="showCollapsedBtn">
          <el-radio :value="true" label="true" />
          <el-radio :value="false" label="false" />
        </el-radio-group>
      </div>
      <div class="flex items-center mb-4">
        <span class="text-gray-700 text-[14px]">默认折叠显示行数：</span>
        <el-input-number v-model="collapsedRows" :min="1" :max="3" />
      </div>
      <div class="flex items-center mb-4">
        <span class="text-gray-700 text-[14px]">按钮对齐位置：</span>
        <el-radio-group v-model="btnAlign">
          <el-radio value="left" label="left" />
          <el-radio value="right" label="right" />
        </el-radio-group>
      </div>
    </RePageCard>
    <RePageCard ignorePaddingBottom>
      <ReSearchForm
        :cols="{ xl: 4, lg: 3, sm: 2, _960px: 3 }"
        :size="size"
        :btnAlign="btnAlign"
        :showLabel="showLabel"
        :labelWidth="labelWidth === 'auto' ? '' : '100px'"
        :labelPosition="labelPosition"
        :items="formItems"
        :showCollapsedBtn="showCollapsedBtn"
        :collapsedRows="collapsedRows"
        :hideCollapsedBtnWhenNone="false"
        @reset="handleReset"
        @search="handleSearch"
      />
    </RePageCard>
  </RePage>
</template>

<script setup lang="ts">
import type { ReFormItem } from "@/components/ReForm/types";
import { ref } from "vue";

const showLabel = ref(false);
const labelPosition = ref("left");
const labelWidth = ref("auto");
const size = ref("default");
const showCollapsedBtn = ref(true);
const collapsedRows = ref(1);
const btnAlign = ref("left");

const formItems = ref<ReFormItem[]>([
  {
    label: "ID",
    field: "id",
    defaultValue: "just text content",
    type: "text",
    customClass: "is-required" // 通过样式类展示必填ico，不直接绑定required属性，会有校验问题
  },
  {
    label: "Name",
    field: "name",
    defaultValue: "",
    comp: "el-input",
    // labelSlot: "name-label", 默认字段标签名插槽命名规则 [field]-label，也可以自定义
    tooltip: "这是tooltip",
    props: {
      clearable: true
    }
  },
  {
    label: "Age",
    field: "age",
    comp: "el-input",
    props: {
      type: "number",
      min: 1,
      max: 9999
    }
  },
  {
    label: "Birthday",
    field: "birthday",
    comp: "el-date-picker",
    tooltip: "这是tooltip",
    props: {
      type: "date",
      format: "YYYY/MM/DD",
      class: "!w-full"
    }
  },
  {
    label: "Subject",
    field: "subject",
    comp: "el-select",
    tooltip: "这是tooltip",
    tips: "这是显眼的tips",
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
    // rules: [{ required: true, message: "不能为空" }],
    props: {
      clearable: true
    }
  }
  /* {
    label: "Marry",
    field: "marry",
    comp: "el-radio-group",
    childComp: "el-radio-button",
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
  } */
]);

function handleReset() {
  console.log("reset");
}

function handleSearch(formData) {
  console.log("search", formData);
}
</script>
