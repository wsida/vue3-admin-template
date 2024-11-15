<template>
  <RePageCard ignorePaddingBottom>
    <ReSearchForm
      :cols="4"
      :showLabel="false"
      :items="formItems"
      @search="handleSearch"
    />
  </RePageCard>
  <RePageCard body-bg>
    <RePageTable
      :data="tableData"
      :columns="columns"
      @header-click="handleHeaderClick"
    />
  </RePageCard>
</template>

<script setup lang="ts">
import type { ReFormItem } from "@/components/ReForm/types";
import { onMounted, ref } from "vue";

const formItems = ref<ReFormItem[]>([
  {
    label: "Name",
    field: "name",
    defaultValue: "",
    comp: "el-input"
  },
  {
    label: "忽略大小写",
    field: "ignoreCase",
    defaultValue: false,
    comp: "el-radio-group",
    options: [
      { label: "是", value: true },
      { label: "否", value: false }
    ]
  }
]);

const tableData = ref<any>([]);

const columns = ref([
  { label: "ID", prop: "id", fixedShow: true },
  { label: "日期", prop: "date" },
  { label: "姓名", prop: "name" },
  {
    label: "性别",
    prop: "sex",
    filterable: true,
    labelKey: "name",
    valueKey: "value",
    options: [
      { name: "男", value: 1 },
      { name: "女", value: 2 }
    ]
  },
  { label: "年龄", prop: "age", sortable: true },
  { label: "年龄1", prop: "age1", sortable: true },
  { label: "地址", prop: "address" }
]);

onMounted(() => {
  const count = Math.floor(Math.random() * 100);
  for (let i = 0; i < count; i++) {
    tableData.value.push({
      id: i,
      date: "2016-05-03",
      name: `Tom${i}`,
      age: i,
      age1: 100 - i,
      sex: Math.floor(Math.random() * 1) + 1,
      address: "No. 189, Grove St, Los Angeles"
    });
  }
});

function handleHeaderClick(column: any) {
  console.log("header click", column);
}

function handleSearch(formData) {
  console.log("formData", formData);
}
</script>
