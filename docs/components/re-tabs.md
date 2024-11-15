---
title: ReTabs
---

# 标签页组件ReTabs

基于 `ElTabs` 实现的标签页，与原组件不同的是，标签页内容不直接放置在 `ElTabPane` 内，方便实现逻辑复用和展示控制。

## 使用

通过`tabs`配置展示的标签页，绑定modelValue获取当前选中的标签页在进行自定义渲染

:::demo

<!--@include: ../demo/other/tabs.md-->

:::

## ReTabs属性

| 字段                  | 说明                   |     类型     | 默认值 |
| :-------------------- | :--------------------- | :----------: | :----: |
| modelValue（v-model） | 必填，当前选中的标签页 |    string    |   -    |
| tabs                  | 标签页配置             | Array\<Tab\> | false  |
| defaultTab            | 默认选中标签页         |    string    |   -    |

```ts
export interface Tab {
  label: string;
  name: string;
  disabled?: boolean;
}
```

## ReTabs事件

| 事件名           | 说明             | 格式 ｜                 |
| :--------------- | :--------------- | :---------------------- |
| update:modeValue | 切换标签页时触发 | `(tab: string) => void` |
