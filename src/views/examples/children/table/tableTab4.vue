<template>
  <RePageCard>
    <div class="flex items-center mb-4">
      <span class="text-gray-700 text-[14px]">Virtual Edit：</span>
      <el-switch v-model="virtual" />
    </div>
  </RePageCard>
  <RePageCard v-if="virtual">
    <ReVirtualEditTable
      v-model:data="tableData"
      :columns="columns"
      :pageSize="10"
    />
  </RePageCard>
  <RePageCard v-if="!virtual">
    <div class="flex items-center mb-4">
      <span class="text-gray-700 text-[14px]">Pagination：</span>
      <el-switch v-model="pagination" />
    </div>
    <ReEditTable
      v-model:data="tableData"
      :pagination="pagination"
      :columns="columns"
      :pageSize="10"
    />
  </RePageCard>
</template>

<script setup lang="ts">
import { onBeforeMount, ref } from "vue";

const pagination = ref(false);
const virtual = ref(true);

const tableData = ref([]);

const columns = ref([
  { label: "日期", prop: "date" },
  {
    editable: true,
    required: true,
    label: "姓名",
    prop: "name",
    defaultValue: "",
    comp: "el-input",
    props: { placeholder: "please input" }
  },
  {
    editable: true,
    label: "性别",
    prop: "sex",
    labelKey: "name",
    valueKey: "value",
    options: [
      { name: "男", value: 1 },
      { name: "女", value: 2 }
    ],
    rules: { required: true },
    comp: "el-radio-group",
    childComp: "el-radio"
  },
  {
    label: "年龄",
    prop: "age",
    editable: true,
    comp: "el-input-number",
    props: { step: 1, controlsPosition: "right" },
    rules: [
      { required: true, message: "required!!" },
      { type: "number", min: 1, trigger: "change" }
    ]
  },
  { label: "年龄1", prop: "age1" }
  // { label: "地址", prop: "address" }
]);

onBeforeMount(() => {
  for (let i = 1; i < 1000; i++) {
    tableData.value.push({
      date: "2016-05-03",
      name: `Tom${i}`,
      age: i,
      age1: i,
      sex: (i % 2) + 1
    });
  }
});
</script>
