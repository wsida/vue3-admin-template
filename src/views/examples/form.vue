<template>
  <RePage>
    <RePageCard
      v-model:tab="activeTab"
      :tabs="[
        { label: '基础表单', name: 'tab1' },
        { label: '响应栅格布局表单', name: 'tab2' },
        { label: '自定义控件', name: 'tab3' },
        { label: '分组表单', name: 'tab4' },
        { label: '表单抽屉', name: 'tab5' },
        { label: '表单模态框', name: 'tab6' }
      ]"
      :tabsInner="false"
    >
      <FormTab1 v-if="activeTab === 'tab1'" />
      <FormTab2 v-if="activeTab === 'tab2'" />
      <FormTab3 v-if="activeTab === 'tab3'" />
      <FormTab4 v-if="activeTab === 'tab4'" />
      <FormTab5 v-if="activeTab === 'tab5'" />
      <FormTab6 v-if="activeTab === 'tab6'" />
    </RePageCard>
  </RePage>
</template>

<script setup lang="ts">
import { ref } from "vue";
import FormTab1 from "./children/form/formTab1.vue";
import FormTab2 from "./children/form/formTab2.vue";
import FormTab3 from "./children/form/formTab3.vue";
import FormTab4 from "./children/form/formTab4.vue";
import FormTab5 from "./children/form/formTab5.vue";
import FormTab6 from "./children/form/formTab6.vue";

const activeTab = ref("tab1");
</script>
