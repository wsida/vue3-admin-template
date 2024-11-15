import { defineConfig } from "vitepress";
import path from "path";
import componentsJson from "../components/config.json?raw";
import guideJson from "../guide/config.json?raw";
import rulesJson from "../rules/config.json?raw";
import {
  demoblockPlugin,
  demoblockVitePlugin
} from "vitepress-theme-demoblock";
// import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "AP-Admin Document",
  description: "Just a document",
  head: [["link", { rel: "icon", href: "/favicon.ico" }]],
  themeConfig: {
    logo: "/logo.svg",
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "首页", link: "/" },
      { text: "指南", link: "/guide/" },
      { text: "规范", link: "/rules/" },
      { text: "组件", link: "/components/" }
    ],

    sidebar: {
      components: [
        {
          text: "组件",
          items: componentsJson || []
        }
      ],
      rules: [
        {
          text: "UI规范",
          items: rulesJson || []
        }
      ],
      guide: [
        {
          text: "开发指南",
          items: guideJson || []
        }
      ]
    },

    socialLinks: [
      { icon: "github", link: "https://github.com/vuejs/vitepress" }
    ]
  },
  rewrites: {
    "/guide/index.md": "/guide/route.md",
    "/rules/index.md": "/rules/layout.md"
  },
  markdown: {
    config: md => {
      md.use(demoblockPlugin, {
        customClass: "ap-demoblock-custom"
      });
    }
  },
  vite: {
    server: {
      port: 8858,
      host: "0.0.0.0"
    },
    resolve: {
      alias: {
        "@": path.join(__dirname, "../../src")
      }
    },
    plugins: [
      demoblockVitePlugin(),
      // jsx、tsx语法支持
      vueJsx()
    ],
    css: {
      preprocessorOptions: {
        scss: {
          additionalData:
            '@import "@/style/variable.scss"; @import "@/style/mixins/mixins.scss";'
        }
      }
    }
  }
});
