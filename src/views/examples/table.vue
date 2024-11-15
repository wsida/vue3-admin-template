<template>
  <RePage>
    <ReTabs v-model="activeTab" :tabs="tabs" />
    <TableTab1 v-if="activeTab === 'tab1'" />
    <TableTab2 v-if="activeTab === 'tab2'" />
    <TableTab3 v-if="activeTab === 'tab3'" />
    <TableTab4 v-if="activeTab === 'tab4'" />
  </RePage>
</template>

<script setup lang="ts">
import { ref } from "vue";
import TableTab1 from "./children/table/tableTab1.vue";
import TableTab2 from "./children/table/tableTab2.vue";
import TableTab3 from "./children/table/tableTab3.vue";
import TableTab4 from "./children/table/tableTab4.vue";

const activeTab = ref("tab1");
const tabs = ref([
  { label: "基础分页Table", name: "tab1" },
  { label: "页面Table", name: "tab2" },
  { label: "可编辑Table", name: "tab3" },
  { label: "虚拟滚动编辑Table", name: "tab4" }
]);
</script>
