<template>
  <RePageCard>
    <ReTableSelect
      v-model="selected"
      style="width: 220px"
      labelKey="name"
      clearable
      :disabled="false"
      :multiple="true"
      :show-tags="true"
      :collapseTags="false"
      :collapseTagsTooltip="true"
      :maxCollapseTags="0"
      :multiple-limit="2"
      :data="tableData"
      :columns="columns"
      :pagination="true"
      :showToolbox="true"
      :filterable="false"
      :selectable="(row, index) => index > 3"
      popperStyle="min-width: 720px"
      :max-height="400"
      @change="onChange"
    >
      <!-- <template #header><div>header</div></template> -->
      <!-- <template #footer><div>Footer</div></template> -->
      <template #prefix>Label:</template>
      <template #label="{ label, value }">{{ label }} - {{ value }}</template>
      <template #date-slot="scopeSlot"
        ><el-tag>tag</el-tag>data: {{ scopeSlot.$index }}</template
      >
    </ReTableSelect>
    <div>selected: {{ selected }}</div>
  </RePageCard>
</template>

<script setup lang="ts">
import { onBeforeMount, ref } from "vue";

const tableData = ref([]);
// const selected = ref(6);
const selected = ref([1, 2, 3]);

const columns = ref([
  { label: "日期", prop: "date", slot: "date-slot" },
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

onBeforeMount(() => {
  const data = [];
  for (let i = 0; i < Math.floor(Math.random() * 200); i++) {
    data.push({
      id: i,
      date: "2016-05-03",
      name: `Tom${i}`,
      age: i,
      age1: 100 - i,
      sex: Math.floor(Math.random() * 1) + 1,
      address: "No. 189, Grove St, Los Angeles"
    });
  }
  tableData.value = data;
});

function onChange(value: any, selections: any) {
  console.log("change", value, selections);
}
</script>
