<template>
  <RePageCard>
    <div class="flex items-center mb-4">
      <span class="text-gray-700 text-[14px]">Expanded：</span>
      <el-switch v-model="expanded" />
    </div>
    <div class="flex items-center mb-4">
      <span class="text-gray-700 text-[14px]">Hover：</span>
      <el-switch v-model="hover" />
    </div>
    <div class="flex items-center mb-4">
      <span class="text-gray-700 text-[14px]">Border：</span>
      <el-switch v-model="border" />
    </div>
    <div class="flex items-center mb-4">
      <span class="text-gray-700 text-[14px]">Show Split：</span>
      <el-switch v-model="showSplit" />
    </div>
    <div class="flex items-center mb-4">
      <span class="text-gray-700 text-[14px]">Checkable：</span>
      <el-switch v-model="checkable" />
    </div>
    <div class="flex items-center mb-4">
      <span class="text-gray-700 text-[14px]">ItemLayout：</span>
      <el-radio-group v-model="itemLayout">
        <el-radio value="horizontal" label="horizontal" />
        <el-radio value="vertical" label="vertical" />
      </el-radio-group>
    </div>
    <div class="flex items-center mb-4">
      <span class="text-gray-700 text-[14px]">ShowExtra：</span>
      <el-switch v-model="showExtra" />
    </div>
  </RePageCard>
  <!-- <RePageCard ignorePaddingX ignorePaddingTop> -->
  <RePageCard>
    <ReList
      :border="border"
      :hover="hover"
      :split="showSplit"
      :expandable="expanded"
      :checkable="checkable"
      :itemLayout="itemLayout"
      :items="items"
      :metas="metas"
      title="List"
      rowClassName="ap-list-cutom-row-class"
    >
      <template #extra><el-button link>刷新</el-button></template>
    </ReList>
  </RePageCard>

  <RePageCard>
    <ReList :items="items" :metas="metas" title="Custom Render Item">
      <template #default="{ item }">
        <el-alert
          class="mb-2"
          :title="item.title"
          :description="item.description"
          :closable="false"
        />
      </template>
    </ReList>
  </RePageCard>

  <RePageCard>
    <div class="flex items-center mb-4">
      <span class="text-gray-700 text-[14px]">ItemLayout：</span>
      <el-radio-group v-model="itemLayout1">
        <el-radio value="horizontal" label="horizontal" />
        <el-radio value="vertical" label="vertical" />
      </el-radio-group>
    </div>
    <div class="flex items-center mb-4">
      <span class="text-gray-700 text-[14px]">ActionsPostions：</span>
      <el-radio-group v-model="actionPosition">
        <el-radio value="default" label="default" />
        <el-radio value="card-footer" label="card-footer" />
      </el-radio-group>
    </div>
    <div v-show="itemLayout1 === 'horizontal'" class="flex items-center mb-4">
      <span class="text-gray-700 text-[14px]">avatarPosition：</span>
      <el-radio-group v-model="avatarPosition">
        <el-radio value="left" label="left" />
        <el-radio value="right" label="right" />
      </el-radio-group>
    </div>
    <div class="flex items-center mb-4">
      <span class="text-gray-700 text-[14px]">Grid：</span>
      <el-input-number v-model="grid" :min="1" :max="3" />
    </div>
    <div class="flex items-center mb-4">
      <span class="text-gray-700 text-[14px]">Gutter：</span>
      <el-input-number v-model="gutter" :min="8" :max="30" />
    </div>
    <ReList
      :items="items"
      :metas="metas"
      :itemLayout="itemLayout1"
      :actionPosition="actionPosition"
      :avatarPosition="avatarPosition"
      type="card"
      ghost
      :grid="grid"
      :gutter="gutter"
      title="Card List"
      rowClassName="ap-list-cutom-row-class"
    >
      <template #extra><el-button link>刷新</el-button></template>
    </ReList>
  </RePageCard>
</template>

<script setup lang="ts">
import { ReListItemMetas } from "@/components/ReList";
import { UserFilled } from "@element-plus/icons-vue";
import { ref, computed, h, shallowRef } from "vue";
import { ElButton } from "element-plus";

const expanded = ref(true);
const checkable = ref(true);
const showExtra = ref(true);
const showSplit = ref(true);
const hover = ref(true);
const border = ref(false);
const grid = ref(2);
const gutter = ref(16);
const actionPosition = ref("default");
const itemLayout = ref("horizontal");
const itemLayout1 = ref("horizontal");
const avatarPosition = ref("left");
const metas = computed(() => {
  const metas: ReListItemMetas = {
    avatar: {},
    title: {},
    subTitle: {},
    description: {},
    content: {}
  };
  if (showExtra.value) {
    metas.actions = [
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
    ];
  }
  return metas;
});

const items = shallowRef([
  {
    id: 1,
    title: "Title",
    subTitle: "Sub-title",
    description: "Description",
    content: "Content",
    avatar: UserFilled
  },
  {
    id: 2,
    title: "Title1",
    subTitle: "Sub-title1",
    description: "Description1",
    content: "Content1",
    avatar: UserFilled
  }
]);
</script>
