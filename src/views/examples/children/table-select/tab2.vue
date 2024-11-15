<template>
  <RePageCard>
    <ReTableSelect
      v-model="selected"
      style="width: 220px"
      labelKey="name"
      clearable
      remote
      :total="total"
      :remote-method="remoteMethod"
      :first-remote="true"
      :multiple="true"
      :show-tags="true"
      :collapseTags="true"
      :collapseTagsTooltip="true"
      :maxCollapseTags="3"
      :data="tableData"
      :columns="columns"
      :pagination="true"
      :showToolbox="true"
      :filterable="true"
      popperStyle="min-width: 720px"
      :max-height="400"
      @change="onChange"
    >
      <!-- <template #header><div>header</div></template> -->
      <!-- <template #footer><div>Footer</div></template> -->
    </ReTableSelect>
    <div>selected: {{ selected }}</div>
  </RePageCard>
</template>

<script setup lang="ts">
import { ref } from "vue";

const total = ref(Math.floor(Math.random() * 100));
// const total = ref(0);
const tableData = ref([]);
const selected = ref();

const columns = ref([
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

function remoteMethod({ currentPage, pageSize }, filters, sorts) {
  return new Promise(resolve => {
    setTimeout(() => {
      const data = [];
      const sid = (currentPage - 1) * pageSize;
      const eid = sid + pageSize;
      for (let i = sid; i < eid; i++) {
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
      resolve({
        rows: data,
        total: total
      });
    }, 1500);
  });
}

function onChange(value: any, selections: any) {
  console.log("change", value, selections);
}
</script>
