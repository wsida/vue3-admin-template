---
title: ReVirtualList
---

# 虚拟滚动高级列表ReVirtualList

> 在 `ReList` 的基础上，增加虚拟列表功能，在固定高度的基础上，可以优化大数据列表展示

滚动容器默认使用List列表的父节点，需要配置 `height` 设置List的高度用于展示滚动条。

如果滚动容器不想使用List的父节点，可以通过 `scrollTarget` 指定，但是 `height` 需要设置为 `auto`，避免List内置滚动。

## 基础

通过 `items` 绑定全量数据，自动进行虚拟滚动计算渲染。虚拟滚动需要指定列表项固定高度，使用前可以通过实际渲染高度或UI设计稿高度定义，默认列表项会直接使用固定高度渲染，内容超出会被隐藏。

:::demo

<!--@include: ../demo/list/virtual.md-->

:::

## 卡片列表

支持网格卡片列表的虚拟滚动展示，会自动根据网格数量进行虚拟滚动计算，得到能够占满当前滚动视图的网格数量。

:::demo

<!--@include: ../demo/list/virtual-card.md-->

:::

## ReVirtualList属性

| 字段      | 说明                                         |                  类型                  | 默认值 |
| :-------- | :------------------------------------------- | :------------------------------------: | :----: |
| items     | 必填，列表项数据集                           |        Record\<string, any\>[]         |   -    |
| metas     | 必填，列表项展示配置                         |            ReListItemMetas             |   -    |
| title     | 列表标题                                     |                 string                 |   -    |
| height    | 列表高度，不包括页头和页脚，默认按像素值处理 |            string ｜ number            |  400   |
| skeleton  | 是否显示骨架屏                               |                boolean                 |  true  |
| rowHeight | 列表项高度，建议根据实际渲染指定             |                 number                 |   -    |
| type      | 列表类型                                     |            "card" ｜ "list"            | "list" |
| grid      | 响应网格，仅在type="card"下有效              |       number ｜ ReGridResponsive       |   1    |
| gutter    | 网格间距，仅在type="card"下有效              | number ｜ [number] ｜ [number, number] |   16   |

_除了上述属性，支持ReList所有属性，默认会被ReList实例继承_

_同时ReVirtualList属性也继承了CustomVirtualScrollProps属性_

## CustomVirtualScrollProps

| 字段         | 说明                                                                                |                  类型                   | 默认值 |
| :----------- | :---------------------------------------------------------------------------------- | :-------------------------------------: | :----: |
| scrollTarget | 必填，滚动容器                                                                      |   HTMLElement ｜ (() => HTMLElement)    |   -    |
| pageSize     | 页大小                                                                              |           MaybeRef\<number\>            |   20   |
| rowHeight    | 列表项高度                                                                          | number ｜ `((index: number) => number)` |   -    |
| previewRows  | 预加载数量，默认同pageSize                                                          |           MaybeRef\<number\>            |   -    |
| ~~cols~~     | 多列参数，作为虚拟滚动计算参数，VirtualList会自动响应列表的网格数量，不需要手动配置 |           MaybeRef\<number\>            |   1    |
| debounce     | 滚动事件时延                                                                        |                 number                  |  300   |

## ReVirtualList事件

| 事件名        | 说明                     | 格式                                                                          |
| :------------ | :----------------------- | :---------------------------------------------------------------------------- |
| update:checks | 已选中列表发生变化时触发 | `(checks: Array<string ｜ number>) => void`                                   |
| check         | 点击某个复选框时触发     | `(checked: boolean, id: string ｜ number, item: Record<string, any>) => void` |

## ReVirtualList插槽

| 插槽名  | 说明                                              |
| :------ | :------------------------------------------------ |
| default | 列表项作用域插槽，带有 item、metas 两个作用域变量 |
| title   | List页头标题插槽                                  |
| extra   | List页头额外信息插槽                              |
| footer  | PageList页脚插槽，在分页器之前                    |

## ReVirtualList Expose

| 字段          | 说明                       | 类型                          |
| :------------ | :------------------------- | :---------------------------- |
| scrollTop     | 当前滚动位置离容器顶部距离 | number                        |
| startPadding  | 前置占位高度               | number                        |
| endPadding    | 后置占位高度               | number                        |
| startIndex    | 渲染数据开始索引           | number                        |
| endIndex      | 渲染数据结束索引           | Ref\<number\>                 |
| scrollTo      | 滚动到指定距离             | `(scrollTop: number) => void` |
| scrollToIndex | 滚动到指定索引位置         | `(index: number) => void`     |
