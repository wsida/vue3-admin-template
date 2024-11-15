<template>
  <div>
    <el-alert :closable="false" class="mb-4"
      >设置slot自定义控件插槽，通过插槽自定义控件，可以外层绑定modelValue同步表单数据</el-alert
    >
    <el-alert :closable="false" class="mb-4"
      >控件插槽带有作用域参数item，为内置的控件配置项，可直接绑定配置的属性以及事件，无需手动绑定数据</el-alert
    >
    <el-alert :closable="false" class="mb-4"
      >若想自己绑定数据，则需要声明表单数据，可通过uesForm获取默认表单数据，在转换ref对象，当然你也可以直接定义一个ref对象</el-alert
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
      v-model="localFormData"
      size="default"
      :label-width="100"
      :label-position="labelPosition"
      :items="formItems"
      @submit="handleSubmit"
    >
      <template #name-control="slotScoped">
        <el-input
          v-bind="slotScoped.item.props"
          v-on="slotScoped.item.events"
        />
        <div class="ml-2">custom name control</div>
      </template>
      <template #age-control>
        <el-input-number v-model="localFormData.age" :min="1" :max="9999" />
        <div class="ml-2">custom age control</div>
      </template>
    </ReForm>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useForm } from "@/components/ReForm";
import type { ReFormItem } from "@/components/ReForm/types";

const labelPosition = ref("right");

const formItems = ref<ReFormItem[]>([
  {
    label: "Name",
    field: "name",
    defaultValue: "",
    comp: "el-input",
    // labelSlot: "name-label", 默认字段标签名插槽命名规则 [field]-label，也可以自定义
    slot: "name-control",
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
  }
]);

const { formData } = useForm(formItems);

const localFormData = ref(formData.value);
/* const localFormData = ref(「
  name: '',
  age: undefined,
  ...
); */

function handleSubmit(formData) {
  console.log("submit form data", formData, localFormData.value);
}
</script>
