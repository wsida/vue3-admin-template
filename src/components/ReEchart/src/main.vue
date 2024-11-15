<template>
  <div
    v-loading="loading"
    :style="{ width: wrapperWidth, height: wrapperHeight }"
    class="ap-echart-wrapper"
  >
    <v-echart
      v-show="!isNoData && !isLoadFail"
      class="ap-echart"
      :option="chartOption"
      :autoresize="autoresize"
      v-bind="$attrs"
    />
    <div class="ap-echart__empty">
      <slot name="empty">
        <el-empty v-if="isLoadFail" :description="loadFailText" />
        <el-empty v-else-if="isNoData" :description="noDataText" />
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { ReEchartProps } from "../types";
import { isNumber, merge } from "lodash-es";
import { defaultOption } from "../defaults";

defineOptions({
  name: "ReEchart",
  inheritAttrs: false
});

const props = withDefaults(defineProps<ReEchartProps>(), {
  width: "100%",
  height: "100%",
  noDataText: "暂无数据",
  loadFailText: "加载失败...",
  loading: false,
  isNoData: false,
  isLoadFail: false,
  autoresize: true
});

const chartOption = computed(() => merge({}, defaultOption, props.option));
const wrapperWidth = computed(() =>
  isNumber(props.width) ? `${props.width}px` : props.width || "100%"
);
const wrapperHeight = computed(() =>
  isNumber(props.height) ? `${props.height}px` : props.height || "100%"
);
</script>

<style lang="scss" scoped>
.ap-echart-wrapper {
  @apply relative;
}

.ap-echart {
  @apply relative w-full h-full;
}

.ap-echart__empty {
  @apply relative w-full h-full flex items-center justify-center;
}
</style>
