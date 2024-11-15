// .vitepress/theme/index.js
import DefaultTheme from "vitepress/theme";
import "../style/index.css";
import "vitepress-theme-demoblock/dist/theme/styles/index.css";
import Demo from "vitepress-theme-demoblock/dist/client/components/Demo.vue";
import DemoBlock from "vitepress-theme-demoblock/dist/client/components/DemoBlock.vue";
import setup from "@/components";
import ElementPlus from "element-plus";
import zhCn from "element-plus/es/locale/lang/zh-cn";

/** @type {import('vitepress').Theme} */
export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    // 注册自定义全局组件
    app.use(ElementPlus, { locale: zhCn });
    app.component("Demo", Demo);
    app.component("DemoBlock", DemoBlock);
    setup(app);
  }
};
