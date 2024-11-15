import VEcharts, { THEME_KEY } from "vue-echarts";
import ReEchart from "./src/main.vue";
import * as echarts from "echarts/core";
import { getConfig } from "@/config";
import { CanvasRenderer } from "echarts/renderers";
import {
  GridComponent,
  TooltipComponent,
  ToolboxComponent,
  TitleComponent,
  LegendComponent,
  DatasetComponent,
  TransformComponent
} from "echarts/components";
import { LabelLayout, UniversalTransition } from "echarts/features";
import { LineChart, PieChart, BarChart } from "echarts/charts";
import { provide } from "vue";
import type { App } from "vue";

echarts.use([
  // 渲染器组件
  CanvasRenderer,
  // 可选工具组件
  GridComponent,
  TooltipComponent,
  ToolboxComponent,
  TitleComponent,
  LegendComponent,
  DatasetComponent,
  TransformComponent,
  // 渲染特性
  LabelLayout,
  UniversalTransition,
  // 报表组件
  LineChart,
  PieChart,
  BarChart
]);

export default {
  install(app: App) {
    app.component("VEchart", VEcharts);
    app.component("ReEchart", ReEchart);
    app.config.globalProperties.$echarts = echarts;
    provide(THEME_KEY, getConfig().Theme ?? "light");
    /* declare module "vue" {
      interface ComponentCustomProperties {
        $echarts: typeof echarts;
      }
    } */
  }
};
