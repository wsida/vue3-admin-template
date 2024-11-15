<template>
  <RePage>
    <ReTabs v-model="activeTab" :tabs="tabs" />
    <ListTab1 v-if="activeTab === 'tab1'" />
    <ListTab2 v-if="activeTab === 'tab2'" />
    <ListTab3 v-if="activeTab === 'tab3'" />
    <ListTab4 v-if="activeTab === 'tab4'" />
    <ListTab5 v-if="activeTab === 'tab5'" />
  </RePage>
</template>

<script setup lang="ts">
import { ref } from "vue";
import ListTab1 from "./children/list/listTab1.vue";
import ListTab2 from "./children/list/listTab2.vue";
import ListTab3 from "./children/list/listTab3.vue";
import ListTab4 from "./children/list/listTab4.vue";
import ListTab5 from "./children/list/listTab5.vue";

const activeTab = ref("tab1");
const tabs = ref([
  { label: "基础List", name: "tab1" },
  { label: "分页List", name: "tab2" },
  { label: "滚动加载List", name: "tab3" },
  { label: "虚拟List", name: "tab4" },
  { label: "滚动加载虚拟List", name: "tab5" }
]);
</script>
