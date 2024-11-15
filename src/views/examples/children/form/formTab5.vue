<template>
  <div>
    <div class="flex items-center mb-4">
      <span class="text-gray-700 text-[14px]">标签位置：</span>
      <el-radio-group v-model="labelPosition">
        <el-radio value="left" label="left" />
        <el-radio value="right" label="right" />
        <el-radio value="top" label="top" />
      </el-radio-group>
    </div>
    <div class="flex items-center mb-4">
      <span class="text-gray-700 text-[14px]">Disabled：</span>
      <el-radio-group v-model="disabled">
        <el-radio :value="false" label="false" />
        <el-radio :value="true" label="true" />
      </el-radio-group>
    </div>
    <div class="flex items-center mb-4">
      <span class="text-gray-700 text-[14px]">Direction：</span>
      <el-radio-group v-model="direction">
        <el-radio value="ttb" label="ttb" />
        <el-radio value="ltr" label="ltr" />
        <el-radio value="btt" label="btt" />
        <el-radio value="rtl" label="rtl" />
      </el-radio-group>
    </div>
    <el-button @click="visible = true">打卡抽屉</el-button>
    <ReDrawerForm
      v-model="visible"
      v-model:formData="formData"
      size="640px"
      title="这是标题"
      :direction="direction"
      :items="formItems"
      :formProps="{ labelPosition, labelWidth: 100 }"
      :disabled="disabled"
      @submit="handleSubmit"
    >
      <template #header>
        <div>这是标题slot</div>
      </template>
      <!-- <template #footer>
        <div>这是footer slot</div>
      </template> -->
    </ReDrawerForm>
  </div>
</template>

<script setup lang="ts">
import { useForm } from "@/components/ReForm";
import type { ReFormItem } from "@/components/ReForm/types";
import { ref } from "vue";

const direction = ref("rtl");
const labelPosition = ref("right");
const disabled = ref(false);
const visible = ref(false);

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
    },
    rules: [{ required: true, message: "不能为空" }]
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
      format: "YYYY/MM/DD",
      class: "w-full"
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
]);

const { formData } = useForm(formItems);
// const formData = ref({
//   age: "3123",
//   birthday: undefined,
//   hobby: ["1"],
//   id: "just text content",
//   marry: "1",
//   name: "3123123",
//   remark: "undefined",
//   subject: "1"
// });

function handleSubmit(data) {
  console.log("submit form data", data, formData);
}
</script>
