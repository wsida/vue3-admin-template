<template>
  <ReGridPage :columns="{ sm: 2, lg: 3, _960px: 3 }">
    <ReGridPageItem
      ><RePageCard
        ><ReEllipsis
          :content="content"
          :show-collapsed="showCollapsed" /></RePageCard
    ></ReGridPageItem>
    <ReGridPageItem :c-span="3"
      ><RePageCard
        ><ReEllipsis :show-collapsed="showCollapsed" :rows="3"
          ><span>{{ content }}</span></ReEllipsis
        ></RePageCard
      ></ReGridPageItem
    >
    <ReGridPageItem :height="200"
      ><RePageCard
        >Show collapsed：<el-switch v-model="showCollapsed" /></RePageCard
    ></ReGridPageItem>
    <ReGridPageItem
      ><RePageCard
        ><el-button @click="random">随机串</el-button></RePageCard
      ></ReGridPageItem
    >
    <ReGridPageItem :c-span="2"
      ><RePageCard><ReEllipsis :height="60" :content="content" /></RePageCard
    ></ReGridPageItem>
    <ReGridPageItem
      ><RePageCard
        ><ReEllipsis :char-count="100" :content="content" /></RePageCard
    ></ReGridPageItem>
    <ReGridPageItem><RePageCard>Role1</RePageCard></ReGridPageItem>
    <ReGridPageItem><RePageCard>Role1</RePageCard></ReGridPageItem>
    <ReGridPageItem :c-span="6"><RePageCard>Role1</RePageCard></ReGridPageItem>
    <ReGridPageItem :height="200"
      ><RePageCard>Role1</RePageCard></ReGridPageItem
    >
    <ReGridPageItem :r-span="2"><RePageCard>Role1</RePageCard></ReGridPageItem>
    <ReGridPageItem><RePageCard>Role1</RePageCard></ReGridPageItem>
  </ReGridPage>
</template>
<script setup lang="ts">
import { ref } from "vue";
import generateRandomString from "@/utils/randomString";
const content = ref(generateRandomString(400));
const showCollapsed = ref(false);

function random() {
  content.value = generateRandomString(Math.floor(Math.random() * 300 + 100));
}
</script>
