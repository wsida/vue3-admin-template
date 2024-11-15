---
title: ReExpandedBtn
---

# 折叠按钮ReExpandedBtn

统一的展开图标按钮组件。

_与ReCollapsedBtn折叠按钮就是交互展示差异_

## 使用

可以通过 `direction` 属性改变展开方向

:::demo

<!--@include: ../demo/other/expanded-btn.md-->

:::

## ReExpandedBtn属性

| 字段                  | 说明           |       类型        |  默认值  |
| :-------------------- | :------------- | :---------------: | :------: |
| modelValue（v-model） | 必填，展开状态 |      boolean      |    -     |
| disabled              | 按钮禁用       |      boolean      |  false   |
| direction             | 展开方法       | "top" ｜ "bottom" | "bottom" |

## ReExpandedBtn事件

| 事件名           | 说明                   | 格式 ｜                        |
| :--------------- | :--------------------- | :----------------------------- |
| click            | 按钮点击时触发         | `() => void`                   |
| update:modeValue | 按钮展开状态改变时触发 | `(collapsed: boolean) => void` |
