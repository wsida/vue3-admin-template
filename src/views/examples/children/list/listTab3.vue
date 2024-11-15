<template>
  <RePageCard>
    <div class="flex items-center mb-4">
      <span class="text-gray-700 text-[14px]">Trigger：</span>
      <el-radio-group v-model="trigger">
        <el-radio value="scroll" label="scroll" />
        <el-radio value="custom" label="custom" />
      </el-radio-group>
    </div>
  </RePageCard>
  <RePageCard>
    <ReScrollList
      ref="scrollListRef"
      v-model:items="remoteItems"
      v-model:total="total"
      :metas="metas"
      :remote-method="remoteMethod"
      :grid="{ xl: 3, lg: 2 }"
      :trigger="trigger"
      type="card"
      ghost
      title="Scroll Card List"
    >
      <template #extra
        ><el-button link @click="refresh">刷新</el-button></template
      >
    </ReScrollList>
  </RePageCard>
</template>

<script setup lang="ts">
import ReScrollList from "@/components/ReList/src/ScrollList.vue";
import { ReListItemMetas } from "@/components/ReList";
import { UserFilled } from "@element-plus/icons-vue";
import { ref, shallowRef, computed, watch, h, nextTick, triggerRef } from "vue";
import { ElButton } from "element-plus";
import { RePageCard } from "@/components/RePage";

const scrollListRef = ref<InstanceType<typeof ReScrollList> | null>(null);

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

const trigger = ref<"scroll" | "custom">("scroll");
const remoteItems = shallowRef([]);
const total = ref(0);
const totalRandom = Math.round(Math.random() * 500 + 50);

watch(trigger, () => {
  refresh();
});

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

function refresh() {
  scrollListRef.value && scrollListRef.value.refresh();
}
</script>
