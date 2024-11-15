<template>
  <RePageCard>
    <div class="flex items-center mb-4">
      <span class="text-gray-700 text-[14px]">Editable：</span>
      <el-switch v-model="editable" />
    </div>
    <div class="flex items-center mb-4">
      <span class="text-gray-700 text-[14px]">EditTrigger：</span>
      <el-radio-group v-model="editTrigger">
        <el-radio label="cell" value="cell" />
        <el-radio label="row" value="row" />
        <el-radio label="custom" value="custom" />
      </el-radio-group>
    </div>
    <div class="flex items-center mb-4">
      <span class="text-gray-700 text-[14px]">ShowAddBtn：</span>
      <el-switch v-model="showAddBtn" />
    </div>
    <div v-if="showAddBtn" class="flex items-center mb-4">
      <span class="text-gray-700 text-[14px]">AddBtnPosition：</span>
      <el-radio-group v-model="addBtnPosition">
        <el-radio label="top" value="top" />
        <el-radio label="bottom" value="bottom" />
      </el-radio-group>
    </div>
    <div v-if="editTrigger !== 'cell'" class="flex items-center mb-4">
      <span class="text-gray-700 text-[14px]">RenderAction：</span>
      <el-switch v-model="renderAction" />
    </div>
    <div class="flex items-center mb-4">
      <span class="text-gray-700 text-[14px]">Pagination：</span>
      <el-switch v-model="pagination" />
    </div>
  </RePageCard>
  <RePageCard>
    <ReEditTable
      v-model:data="tableData"
      :editable="editable"
      :columns="columns"
      :showAddBtn="showAddBtn"
      :addBtnPosition="addBtnPosition"
      :renderAction="renderAction"
      :pagination="pagination"
      :editTrigger="editTrigger"
    >
      <template #name-control="slotScope">
        <el-input
          v-if="slotScope.editable"
          :modelValue="slotScope.cellValue"
          @update:modelValue="slotScope.handler"
        />
        <el-tag v-else>{{ slotScope.cellValue }}</el-tag>
      </template>
    </ReEditTable>
  </RePageCard>
</template>

<script setup lang="ts">
import { ref } from "vue";

const showAddBtn = ref(true);
const addBtnPosition = ref("bottom");
const renderAction = ref(true);
const pagination = ref(false);
const editable = ref(false);
const editTrigger = ref("custom");

const tableData = ref([
  {
    date: "2016-05-03",
    name: "Tom1",
    age: 1,
    age1: 1,
    sex: 1,
    address: "No. 189, Grove St, Los Angeles"
  },
  {
    date: "2016-05-02",
    name: "Tom2",
    age: 2,
    age1: 12,
    sex: 1,
    address: "No. 189, Grove St, Los Angeles"
  },
  {
    date: "2016-05-04",
    name: "Tom3",
    age: undefined,
    age1: 2,
    sex: 2,
    address: "No. 189, Grove St, Los Angeles"
  },
  {
    date: "2016-05-01",
    name: "Tom4",
    age: 1,
    age1: 22,
    sex: 2,
    address: "No. 189, Grove St, Los Angeles"
  },
  {
    date: "2016-05-03",
    name: "Tom5",
    age: 10,
    sex: 1,
    address: "No. 189, Grove St, Los Angeles"
  },
  {
    date: "2016-05-02",
    name: "Tom6",
    age: 6,
    age1: 21,
    sex: 2,
    address: "No. 189, Grove St, Los Angeles"
  },
  {
    date: "2016-05-04",
    name: "Tom7",
    age: 7,
    age1: 12,
    sex: 2,
    address: "No. 189, Grove St, Los Angeles"
  },
  {
    date: "2016-05-01",
    name: "Tom8",
    age: 8,
    age1: 10,
    sex: 2,
    address: "No. 189, Grove St, Los Angeles"
  },
  {
    date: "2016-05-03",
    name: "Tom9",
    age: 9,
    age1: 3,
    sex: 1,
    address: "No. 189, Grove St, Los Angeles"
  },
  {
    date: "2016-05-02",
    name: "Tom10",
    age: 11,
    sex: 1,
    address: "No. 189, Grove St, Los Angeles"
  },
  {
    date: "2016-05-04",
    name: "Tom11",
    age: 1,
    age1: 2,
    sex: 2,
    address: "No. 189, Grove St, Los Angeles"
  },
  {
    date: "2016-05-01",
    name: "Tom12",
    age: 1,
    age1: 2,
    sex: 2,
    address: "No. 189, Grove St, Los Angeles"
  }
]);

const columns = ref([
  { label: "日期", prop: "date" },
  {
    editable: true,
    required: true,
    label: "姓名",
    prop: "name",
    defaultValue: "",
    comp: "el-input",
    slot: "name-control",
    props: { placeholder: "please input" }
  },
  {
    editable: true,
    label: "性别",
    prop: "sex",
    labelKey: "name",
    valueKey: "value",
    options: [
      { name: "男", value: 1 },
      { name: "女", value: 2 }
    ],
    rules: { required: true },
    comp: "el-radio-group",
    childComp: "el-radio"
  },
  {
    label: "年龄",
    prop: "age",
    editable: true,
    comp: "el-input-number",
    props: { step: 1, controlsPosition: "right" },
    rules: [
      { required: true, message: "required!!" },
      { type: "number", min: 1, trigger: "change" }
    ]
  },
  { label: "年龄1", prop: "age1" }
  // { label: "地址", prop: "address" }
]);
</script>
