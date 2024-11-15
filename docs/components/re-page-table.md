---
title: RePageTable
---

# 页面级分页表格RePageTable

主要用于页面级别的展示，通常会搭配ReSearchForm一起快速构造页面。在 `ReTable` 的基础上，增加了一些自定义功能，如间距、条纹、边框、全屏、列显隐、列排序。

## 基础

支持控制自定义功能的展示和隐藏。

:::demo

<!--@include: ../demo/table/page-table.md-->

:::

## RePageTable属性

| 字段               | 说明                               |               类型               | 默认值 |
| :----------------- | :--------------------------------- | :------------------------------: | :----: |
| fullscreenTarget   | 全屏元素，默认取组件根节点的父节点 | HTMLElement ｜ () => HTMLElement |   -    |
| defaultGutter      | 默认表格间距                       |              string              |   -    |
| defaultSize        | 默认表格尺寸                       |              string              |   -    |
| defaultBorder      | 默认是否表格带边框                 |              string              |   -    |
| defaultStripe      | 默认是否是条纹表格                 |              string              |   -    |
| defaultResizable   | 默认是否可拖拽                     |              string              |   -    |
| showResizeIcon     | 是否显示可拖拽改变列宽Icon         |             boolean              |  true  |
| showGutterIcon     | 是否显示表格间距切换Icon           |             boolean              |  true  |
| showSizeIcon       | 是否显示表格尺寸切换Icon           |             boolean              | false  |
| showBorderIcon     | 是否显示表格边框切换Icon           |             boolean              |  true  |
| showStripeIcon     | 是否显示条纹表格切换Icon           |             boolean              |  true  |
| showFullscreenIcon | 是否显示全屏展示切换Icon           |             boolean              |  true  |
| showSettingIcon    | 是否显示列配置Icon                 |             boolean              |  true  |
| defaultMinWidth    | 默认最小列宽                       |         string ｜ number         |   56   |
| columns            | 必填，RePageTable列配置            |       RePageTableColumn[]        |   -    |

_除了上述字段之外，ReTable支持的属性均支持，默认会被ReTable实例继承_

## RePageTableColumn字段

| 字段             | 说明                                                          |  类型   | 默认值 |
| :--------------- | :------------------------------------------------------------ | :-----: | :----: |
| fixed-show       | 列是否固定展示，不能被隐藏，只在 `showSettingIcon` 生效时有效 | boolean | false  |
| defaul-show      | 列是否默认展示                                                | boolean |  true  |
| ignore-resizable | 列是否支持改变大小，默认会继承 RePageTable.resizable          | boolean | false  |

_除了上述字段以外，ReTableColumn字段也都支持_

## RePageTable事件

| 事件名  | 说明                 | 格式         |
| :------ | :------------------- | :----------- |
| refresh | 点击刷新icon后触发   | `() => void` |
| reset   | 点击列配置重置后触发 | `() => void` |

_除了上述事件之外，ReTable支持的事件也支持，默认会被ReTable实例继承_

## RePageTable插槽

| 插槽名        | 说明                                             |
| :------------ | :----------------------------------------------- |
| empty         | 空状态展示                                       |
| toolbox-left  | 工具栏左侧内容插槽，通常用于放置批量处理功能按钮 |
| toolbox-right | 工具栏右侧内容插槽，插槽内容在默认工具功能之前   |

_除了上述插槽之外，列配置项配置的插槽也支持_

## RePageTable Expose

| 字段       | 说明            | 类型                           |
| :--------- | :-------------- | :----------------------------- |
| reTableRef | ReTable组件实例 | InstanceType\<typeof ReTable\> |
