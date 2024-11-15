---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "AP-Admin Document"
  text: "Just a document"
  tagline: Vue3 + Element Plus + Vite
  actions:
    - theme: brand
      text: 组件
      link: /components/
    - theme: alt
      text: UI规范
      link: /rules/

features:
  - icon: 🧭
    title: 开发指南 / Developer's Guide
    details: 路由说明、权限说明、api调用说明、字典值配置说明
    link: /guide/
  - icon: 🎨
    title: 开发规范 / Developer's Specification
    details: 布局规范、组件规范、样式规范、Git提交规范
    link: /rules/
  - icon: 🛠️
    title: 组件 / Components
    details: 内置组件文档说明、使用示例
    link: /components/
---

<br/>

# 开发须知

🔴 请严格按照UI规范进行开发

🔵 请尽量使用现有组件开发

🟢 请及时更新组件文档

<br/>

<script setup>
import { VPTeamMembers } from 'vitepress/theme'

const members = [
  {
    avatar: 'https://avatars.githubusercontent.com/u/40385970?v=4',
    name: 'Wangsida',
    title: 'Creator',
    links: [
      // { icon: 'github', link: 'https://github.com/wsida?tab=repositories' }
    ]
  },
  {
    avatar: 'https://avatars.githubusercontent.com/u/40385970?v=4',
    name: 'Zhuxiaodong',
    title: 'Member',
    links: [
      // { icon: 'github', link: '' }
    ]
  }
]
</script>

# 我们的小组

<VPTeamMembers size="small" :members="members" />
