<template>
  <RePage>
    <ReTabs v-model="activeTab" :tabs="tabs" />
    <Tab1 v-if="activeTab === 'tab1'" />
    <Tab2 v-if="activeTab === 'tab2'" />
  </RePage>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Tab1 from "./children/table-select/tab1.vue";
import Tab2 from "./children/table-select/tab2.vue";

const activeTab = ref("tab1");
const tabs = ref([
  { label: "基础表格下拉选择", name: "tab1" },
  { label: "数据远程请求表格下拉选择", name: "tab2" }
]);
</script>
