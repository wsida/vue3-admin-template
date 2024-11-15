---
title: 开发指南 / Developer's Guide
---

# 🧭 开发指南 / Developer's Guide

> 通过本文，你可以清楚的了解到本项目模版的整体框架以及目录结构，后续还会详细介绍常用功能（目录）的具体使用指南。

## 简介

### 开发框架

<p style="font-size: 16px">
<el-tag size="large" round type="primary"><a href="https://cn.vuejs.org/" target="_blank">Vue3</a></el-tag> ➕ <el-tag size="large" round type="primary"><a href="https://cn.vitejs.dev/" target="_blank">Vite</a></el-tag> ➕ <el-tag size="large" round type="primary"><a href="https://element-plus.org/zh-CN/component/overview.html" target="_blank">Element Plus</a></el-tag>
</p>

:::info 小TIP
_模版基于[pure-admin-thin](https://github.com/pure-admin/pure-admin-thin)进行调整优化。_
:::

### 适用范围

<el-tag size="large" round type="primary">PC端中后台项目</el-tag>

:::info 小TIP
_如果不考虑SEO的PC端应用项目或门户网站也可以使用，但是若要加强SEO，建议走 SSR模版（后续会推出）_
:::

### 上手准备

- [Vue3基础语法](https://cn.vuejs.org/)
- Typescript基础
- [Vue-Router@4.x路由使用](https://router.vuejs.org/zh/introduction.html)
- [Pinia全局状态管理](https://pinia.vuejs.org/)
- [Axios工具使用](https://www.kancloud.cn/yunye/axios/234845)
- [Vite基础配置](https://cn.vitejs.dev/)：如环境变量/Proxy/构建相关配置
- [tailwindCss基础应用](https://www.tailwindcss.cn/docs/installation)
- ...

### 内置功能

- 主题切换：基于主色调整，暗黑默认是切换。
- 基础中后台应用布局：带移动端适配，支持配置调整或者开启动态调整，同时可通过路由配置控制布局差异展示（菜单栏，历史tab等显示隐藏）。
- 集成路由配置：基于路由配置可自动生成菜单。
- 集成Pinia：维护全局状态，目前动态路由/菜单有依赖，【不建议】去除。
- 集成Axios：提供一些常见拦截器封装，包括请求参数加密，全局头部等处理；响应拆包，全局消息提示等。
- 支持多种路由权限解决方案：包括后端返回动态路由方式，权限码控制，可通过配置切换。
- 支持多种页面权限判断方式：包括指令v-auth、组件\<re-auth\>，以及hook方法usePermissionHook。
- 内置常用高级组件，如分页表格，列表，动态表单，以及虚拟滚动列表，可编辑表格等，方便日常基础开发。
- 内置封装hook方法，如分页，滚动加载，虚拟滚动等。
- 提供登录页示例，支持多种登录方式，需要手动调整登录鉴权。
- ...

## 目录

- root
  - 📂 build 一些vite构建配置
  - 📂 docs 文档站内容，不影响项目构建
  - 📂 mock 一些接口mock，基于vite-plugin-fake-server
  - 📂 public 静态资源，不会被编译，采用复制
    - 📄 platform-config.json 【重点】模版功能配置，涉及主题、布局、权限方案等。
  - 📂 src 主要目录文件
    - 📂 api 接口声明目录，参考示例声明引用即可。
    - 📂 assets 静态资源，会被vite编译
    - 📂 components 组件目录，内置一些常用组件
    - 📂 config 项目常量配置目录，包含一些常用路由地址、枚举值、正则、storage常量名称
    - 📂 directives 全局指令声明目录，已经内置几个指令
    - 📂 hooks 全局hook方法声明目录，已经内置几个hook方法
    - 📂 layout 项目布局组件目录，除了导航栏用户信息，一般不怎么涉及。
    - 📂 plugins 一些插件使用引用，可有可无。
    - 📂 router 【重点】项目路由声明目录
      - 📂 modules 按功能模块创建路由配置
        - 📂 page 功能模块路由声明目录，文件内容按功能模块声明，所声明的路由会经过路由权限判断
        - 📄 default.ts 放置一些全局路由，不需要经过路由权限判断。如果是基础功能页，所有用户角色都有的页面可在此文件配置。
        - 📄 error.ts 异常页路由，不需要经过路由权限判断
        - 📄 home.ts 根据路由，**不建议**也不需要在这个文件声明
        - 📄 remaining.ts 不需要身份鉴权的路由，换句话说就是未登录也能访问的路由，如登录页，忘记密码页等。
      - 📄 index.ts
      - 📄 utils.ts
    - 📂 store 全局状态管理目录
      - 📂 modules 按功能声明全局状态
        - 📄 enums.ts 全局枚举值管理，包括静态枚举值（config/enums.ts）和动态枚举值，动态枚举值根据项目自行添加字段以及接口。
        - 📄 permission.ts 包含动态路由、动态菜单、权限码，用于权限判断。
        - 📄 user.ts 登录用户信息
        - 📄 app.ts 一些应用信息
        - 📄 setting.ts 项目配置信息
        - 📄 multiTags.ts 页面历史页面tabs维护
      - 📄 index.ts pinia实例声明
      - 📄 types.ts 一些ts类型声明
      - 📄 utils.ts 一些工具方法
    - 📂 style 全局样式声明文件目录，可声明全局样式变量、全局样式规则、或者一些工具函数，一般组件建议还是放在vue文件内。
    - 📂 utils 一些工具方法
    - 📂 views 【重点】模块目录
    - 📄 App.vue 【重点】根组件
    - 📄 main.ts 【重点】应用入口文件
  - 📂 types 全局ts类型声明
  - 📄 index.html index模版，如果需要多页，需另外自行创建。
  - 📄 .env.development 开发环境变量声明文件
  - 📄 .env.production 生产环境变量声明文件
  - 📄 .env.staging 预发布环境变量声明文件
  - 📄 .prettierrc.js prettier 格式化配置
  - 📄 stylelint.config.js stylelint 样式规范配置
  - 📄 eslint.config.js eslint 规范配置
  - 📄 vite.config.ts vite构建配置
  - 📄 tailwind.config.ts tailwindcss配置，可配置全局变量、媒体查询规范等
  - 📄 tsconfig.json typescript编译校验配置
  - 📄 commitlint.config.js git提交规范配置，限制git提交message格式。
  - ...
