<template>
  <RePageCard>
    <RePageList expandable checkable :items="items" :metas="metas" title="List">
      <template #extra><el-button link>刷新</el-button></template>
    </RePageList>
  </RePageCard>
  <RePageCard>
    <RePageList
      :items="items"
      :metas="metas"
      type="card"
      ghost
      :grid="{ xl: 3, lg: 2 }"
      title="Card List"
    >
      <template #extra><el-button link>刷新</el-button></template>
    </RePageList>
  </RePageCard>
  <RePageCard>
    <RePageList
      v-model:items="remoteItems"
      v-model:total="total"
      title="Remote List"
      itemLayout="vertical"
      expandable
      remote
      :remote-method="remoteMethod"
      :metas="metas"
    >
      <template #extra><el-button link>刷新</el-button></template>
    </RePageList>
  </RePageCard>
</template>

<script setup lang="ts">
import { ReListItemMetas } from "@/components/ReList";
import { UserFilled } from "@element-plus/icons-vue";
import { ref, shallowRef, computed, h, onMounted } from "vue";
import { ElButton } from "element-plus";

const metas = computed(() => {
  const metas: ReListItemMetas = {
    avatar: {},
    title: {},
    subTitle: {},
    description: {},
    content: {},
    actions: [
      {
        text: "查看",
        events: {
          click: item => {
            console.log("click 查看", item);
          }
        }
      },
      {
        text: "删除",
        props: { type: "danger" },
        events: {
          click: item => {
            console.log("click 删除", item);
          }
        }
      },
      {
        text: "自定义",
        render: item =>
          h(
            ElButton,
            {
              text: true,
              bg: true,
              type: "primary",
              onClick: item => {
                console.log("click 自定义", item);
              }
            },
            () => "自定义"
          )
      }
    ]
  };
  return metas;
});

const items = shallowRef([]);
const remoteItems = shallowRef([]);
const total = ref(0);
const totalRandom = Math.round(Math.random() * 100);

function remoteMethod(params: { currentPage: number; pageSize: number }) {
  return new Promise(resolve => {
    const startIndex = (params.currentPage - 1) * params.pageSize;
    const isEnd = totalRandom < params.currentPage * params.pageSize;
    const size = isEnd ? totalRandom % params.pageSize : params.pageSize;
    const items = [];
    for (let i = 0; i < size; i++) {
      items.push({
        id: startIndex + i,
        title: `Title${startIndex + i}`,
        subTitle: "Sub-title",
        description: "Description",
        content: "Content",
        avatar: UserFilled
      });
    }
    setTimeout(() => {
      // total.value = totalRandom;
      // remoteItems.value = items;
      resolve({
        rows: items,
        total: totalRandom,
        currentPage: params.currentPage,
        pageSize: params.pageSize
      });
    }, Math.random() * 2000);
  });
}

onMounted(() => {
  const value = [];
  for (let i = 0; i < totalRandom; i++) {
    value.push({
      id: i,
      title: "Title" + i,
      subTitle: "Sub-title",
      description: "Description",
      content: "Content",
      avatar: UserFilled
    });
  }
  items.value = value;
});
</script>
