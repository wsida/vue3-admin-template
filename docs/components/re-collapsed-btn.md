---
title: ReCollapsedBtn
---

# 折叠按钮ReCollapsedBtn

统一的折叠/展开文字按钮组件

## 使用

:::demo

<!--@include: ../demo/other/collapsed-btn.md-->

:::

## ReCollapsedBtn属性

| 字段                  | 说明           |                  类型                  |      默认值      |
| :-------------------- | :------------- | :------------------------------------: | :--------------: |
| modelValue（v-model） | 必填，折叠状态 |                boolean                 |        -         |
| collapsedText         | 按钮文字       | string ｜ [string] ｜ [string, string] | ["展开", "收起"] |
| disabled              | 按钮禁用       |                boolean                 |      false       |
| hiddenText            | 隐藏文字       |                boolean                 |      false       |

## ReCollapsedBtn事件

| 事件名           | 说明                   | 格式 ｜                        |
| :--------------- | :--------------------- | :----------------------------- |
| click            | 按钮点击时触发         | `() => void`                   |
| update:modeValue | 按钮折叠状态改变时触发 | `(collapsed: boolean) => void` |
