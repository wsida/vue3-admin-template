---
title: ReEllipsis
---

# 省略文本ReEllipsis

当传统的css省略方式不能满足省略文本展示的时候，就需要考虑使用该组件，通过消耗一些性能获得更加丰富的省略文本展示。

:::warning
只有当css样式省略的方式不满足需求在考虑此组件，同时避免一个页面存在非常多的省略组件，这会对页面的渲染性能有一定的损耗。同时需要注意一些抽屉/模态框内使用，要考虑首次渲染的时机问题，建议通过visible同时控制省略组件的展示。
:::

## 行省略

可以通过 `content` 或 default 默认插槽设置省略文本，通过 `rows` 控制省略展示行数。

:::demo

<!--@include: ../demo/other/ellipsis-row.md-->

:::

## 字符数省略

通过 `char-count` 控制省略展示字符数。

:::demo

<!--@include: ../demo/other/ellipsis-char.md-->

:::

## 高度省略

通过 `height` 控制省略展示高度。

:::demo

<!--@include: ../demo/other/ellipsis-height.md-->

:::

## 展示tooltip

通过设置 `tooltip` 查看完整的文本内容。tooltip支持直接配置ElTooltip属性用于自定义展示。

:::demo

<!--@include: ../demo/other/ellipsis-tooltip.md-->

:::

## 支持展开查看

通过设置 `show-collapsed` 显示折叠按钮用于查看完整文本。允许通过 `default-collapsed` 修改默认折叠状态。

:::demo

<!--@include: ../demo/other/ellipsis-collapsed.md-->

:::

## ReEllipsis属性

| 字段              | 说明                                |                类型                | 默认值 |
| :---------------- | :---------------------------------- | :--------------------------------: | :----: |
| content           | 省略文本，优先级比slot更高          |               string               |   -    |
| rows              | 省略行数                            |               number               |   1    |
| char-count        | 省略字符数                          |               number               |   -    |
| height            | 省略高度                            |               number               |   -    |
| lineHeight        | 文字行高，建议指定                  |               number               |   16   |
| word-break        | 是否拆分单词                        |              boolean               | false  |
| tooltip           | 是否在省略时显示tooltip查看完整内容 | boolean ｜ Partial\<TooltipProps\> |  true  |
| word-break        | 是否拆分单词                        |              boolean               | false  |
| ellipsis-style    | 自定义样式                          |      string ｜ CssProperties       |   -    |
| show-collapsed    | 是否展示折叠按钮                    |              boolean               | false  |
| default-collapsed | 折叠按钮默认状态，默认折叠（true）  |              boolean               |  true  |

## ReEllipsis事件

| 事件名   | 说明                 | 格式 ｜                       |
| :------- | :------------------- | :---------------------------- |
| ellipsis | 计算省略完成后时触发 | `(ellipsis: boolean) => void` |

## ReEllipsis插槽

| 插槽名  | 说明                       |
| :------ | :------------------------- |
| default | 省略文本，必须是存文字节点 |

## ReEllipsis Expose

| 字段   | 说明             | 类型         |
| :----- | :--------------- | :----------- |
| update | 重新渲染省略组件 | `() => void` |
