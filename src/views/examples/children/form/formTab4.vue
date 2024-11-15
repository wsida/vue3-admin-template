<template>
  <div>
    <el-alert :closable="false" class="mb-4"
      >配置项指定type=group，同时需要提供children嵌套控件配置</el-alert
    >
    <el-alert :closable="false" class="mb-4"
      >分组支持配置展开/收起触发器，同时提供groupSlot自定义插槽渲染触发器，需要配置实例方法控制展开/收起状态</el-alert
    >
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
      :cols="2"
      :label-width="100"
      :labelPosition="labelPosition"
      :items="formItems"
      @submit="handleSubmit"
    >
      <template #age-control="{ item }">
        <el-input-number v-bind="item.props" v-on="item.events" />
        <div class="ml-2">custom age control</div>
      </template>
      <template #age3-control="{ item }">
        <el-input-number v-bind="item.props" v-on="item.events" />
        <div class="ml-2">custom age3 control</div>
      </template>
    </ReForm>
  </div>
</template>

<script setup lang="ts">
import type { ReFormItem } from "@/components/ReForm/types";
import { ref } from "vue";

const labelPosition = ref("right");

const formItems = ref<ReFormItem[]>([
  {
    label: "Name",
    field: "name",
    defaultValue: "",
    comp: "el-input",
    // labelSlot: "name-label", 默认字段标签名插槽命名规则 [field]-label，也可以自定义
    tooltip: "这是tooltip",
    props: {
      clearable: true
    },
    rules: [{ required: true, message: "不能为空" }]
  },
  {
    label: "Age",
    field: "age",
    defaultValue: 3,
    slot: "age-control"
  },
  {
    type: "group",
    field: "extra", // 单纯为了一个唯一值，所以一定要配置，不记录表单数据
    defaultCollapsed: false, // 默认展开/收起
    collapsedText: "更多配置", // ['展开更多配置', '收起更多配置']
    // collapsedTriggerIndex: false, // 触发器缩紧
    // groupSlot: "extra-group", // 自定义触发器插槽，默认[field]-group
    children: [
      {
        label: "Age3",
        field: "age3",
        defaultValue: 3,
        slot: "age3-control"
      },
      {
        label: "Remark",
        field: "remark",
        comp: "el-textarea",
        props: {
          rows: 4
        }
      },
      {
        label: "Birthday",
        field: "birthday",
        comp: "el-date-picker",
        tooltip: "这是tooltip",
        props: {
          type: "date",
          format: "YYYY/MM/DD"
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
    ]
  },
  {
    label: "随意发挥",
    field: "easygoing",
    defaultValue: "",
    comp: "el-textarea",
    tooltip: "这是tooltip",
    props: {
      rows: 24
    },
    rules: [{ required: true, message: "不能为空" }]
  }
]);

function handleSubmit(formData) {
  console.log("submit form data", formData);
}
</script>
