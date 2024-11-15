<template>
  <RePage>
    <RePageCard
      :tabs="[
        { label: 'Tab1', name: 'tab1', disabled: false },
        { label: 'Tab2', name: 'tab2' }
      ]"
      :tabsInner="false"
      :shadow="false"
      :border="false"
      defaultTab="tab1"
    >
      个人设置
      <div>
        <!-- {{ userStatus }} {{ userStatus.length }} -->
        <!-- {{ enums.USER_STATUS }} {{ enums.USER_STATUS.length }} -->
        {{ useEnumHook("USER_STATUS") }} {{ useEnumHook("USER_STATUS").length }}
        <el-button @click="handleClick">点击</el-button>
      </div>
    </RePageCard>

    <RePageCard :shadow="false" :border="false">
      <div><re-tag-list size="default" :tags="tagList" /></div>
      <el-divider direction="horizontal" />
      <div style="width: 200px">
        <re-tag-list size="default" showOverflowTooltip :tags="tag1List" />
      </div>
      <el-divider direction="horizontal" />
      <div><re-tag-list v-model:tags="tagList" editable size="default" /></div>
      <el-divider direction="horizontal" />
      <div>
        <re-tag-list
          v-model:tags="tagList"
          editable
          input-responsive
          size="default"
        />
      </div>
      <el-divider direction="horizontal" />
      <div>
        <re-tag-list
          v-model:tags="tagList"
          v-model="checks"
          checkable
          tagType="info"
          tagEffect="dark"
          size="default"
        />
      </div>
      <el-divider direction="horizontal" />
      <div>
        <re-tag-list
          v-model:tags="tagList"
          v-model="checks"
          checkable
          tagType="primary"
          tagEffect="dark"
          size="default"
        />
      </div>
      <el-divider direction="horizontal" />
      <div>
        <re-tag-list
          v-model:tags="tagList"
          v-model="checks"
          checkable
          tagType="danger"
          tagEffect="dark"
          size="default"
        />
      </div>
      <el-divider direction="horizontal" />
      <div>
        <re-tag-list
          v-model:tags="tagList"
          v-model="checks"
          checkable
          tagType="info"
          tagEffect="light"
          size="default"
        />
      </div>
      <el-divider direction="horizontal" />
      <div>
        <re-tag-list
          v-model:tags="tagList"
          v-model="checks"
          checkable
          tagType="primary"
          tagEffect="light"
          size="default"
        />
      </div>
      <el-divider direction="horizontal" />
      <div>
        <re-tag-list
          v-model:tags="tagList"
          v-model="checks"
          checkable
          tagType="danger"
          tagEffect="light"
          size="default"
        />
      </div>
      <el-divider direction="horizontal" />
      <div>
        <re-tag-list
          v-model:tags="tagList"
          v-model="checks"
          checkable
          tagType="info"
          tagEffect="plain"
          size="default"
        />
      </div>
      <el-divider direction="horizontal" />
      <div>
        <re-tag-list
          v-model:tags="tagList"
          v-model="checks"
          checkable
          tagType="primary"
          tagEffect="plain"
          size="default"
        />
      </div>
      <el-divider direction="horizontal" />
      <div>
        <re-tag-list
          v-model:tags="tagList"
          v-model="checks"
          checkable
          tagType="danger"
          tagEffect="plain"
          size="default"
        />
      </div>
    </RePageCard>
  </RePage>
</template>

<script setup lang="ts">
import {
  useEnumsStore,
  useEnumHook, // 响应
  useEnumRefHook // 响应
  // useEnumsStoreHook
} from "@/store/modules/enums";
import { isReactive, isRef, ref, watch } from "vue";

const fillArray = (char: string): string => {
  return new Array(Math.ceil(Math.random() * 300 + 10)).fill(char).join("");
};

const tagList = ref(["Tag1", "Tag2", "Tag3", "Tag4", "Tag5", "Tag6", "Tag7"]);
const tag1List = ref([
  fillArray("a"),
  fillArray("b"),
  fillArray("c"),
  fillArray("d"),
  fillArray("e")
]);
const checks = ref<string[]>([]);

const enums = useEnumsStore();
const userStatus = enums.USER_STATUS; // useEnumRefHook("USER_STATUS"); // 不响应
// console.log(userStatus, isReactive(userStatus), isRef(userStatus));

watch(userStatus, () => {
  console.log("userStatus change");
});
function handleClick() {
  enums.USER_STATUS = [];
  // enums.setEnum("USER_STATUS", []);

  // console.log(enums);
}
</script>
