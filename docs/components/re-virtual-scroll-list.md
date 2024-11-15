---
title: ReVirtualScrollList
---

# 虚拟滚动加载高级列表ReVirtualScrollList

> 结合 `ReScrollList` 和 `ReVirtualList` 的功能，优化大数据列表展示，具体使用可以按照实际应用选择

## 基础

:::demo

<!--@include: ../demo/list/virtual-scroll.md-->

:::

## ReVirtualScrollList属性

| 字段  | 说明                 |          类型           | 默认值 |
| :---- | :------------------- | :---------------------: | :----: |
| items | 必填，列表项数据集   | Record\<string, any\>[] |   -    |
| metas | 必填，列表项展示配置 |     ReListItemMetas     |   -    |
| title | 列表标题             |         string          |   -    |

_除了上述属性，支持ReList所有属性，默认会被ReList实例继承_

_同时ReVirtualScrollList属性也继承了ReVirtualList属性和ReScrollList属性_

## ReVirtualScrollList事件

| 事件名        | 说明                     | 格式                                                                          |
| :------------ | :----------------------- | :---------------------------------------------------------------------------- |
| update:checks | 已选中列表发生变化时触发 | `(checks: Array<string ｜ number>) => void`                                   |
| check         | 点击某个复选框时触发     | `(checked: boolean, id: string ｜ number, item: Record<string, any>) => void` |
| update:items  | 列表项集合更新时触发     | `(items: ReListProps["items"]) => void`                                       |
| scroll        | 容器滚动时触发           | `(scrollTop: number) => void`                                                 |
| scroll-bottom | 滚动到底时触发           | `() => void`                                                                  |
| update:total  | 数据总数切换时触发       | `(total: number) => void`                                                     |

## ReVirtualScrollList插槽

| 插槽名  | 说明                                              |
| :------ | :------------------------------------------------ |
| default | 列表项作用域插槽，带有 item、metas 两个作用域变量 |
| title   | List页头标题插槽                                  |
| extra   | List页头额外信息插槽                              |
| footer  | PageList页脚插槽，在分页器之前                    |

## ReVirtualScrollList Expose

| 字段          | 说明                                                       | 类型                                             |
| :------------ | :--------------------------------------------------------- | :----------------------------------------------- |
| disabledLoad  | 是否加载完成                                               | Ref\<boolean\>                                   |
| checks        | 已选中集合                                                 | Array\<string ｜ number\>                        |
| scrollTop     | 当前滚动位置离容器顶部距离                                 | number                                           |
| startPadding  | 前置占位高度                                               | number                                           |
| endPadding    | 后置占位高度                                               | number                                           |
| startIndex    | 渲染数据开始索引                                           | number                                           |
| endIndex      | 渲染数据结束索引                                           | Ref\<number\>                                    |
| loading       | 加载状态                                                   | Ref\<boolean\>                                   |
| currentPage   | 当前页码                                                   | Ref\<number\>                                    |
| pageSize      | 页大小                                                     | Ref\<number\>                                    |
| total         | 数据总数，remote时为 props.total                           | InstanceType\<typeof ElPagination\>              |
| dataSource    | 列表项集合                                                 | Ref\<ReTableRow[]\>                              |
| toRemote      | 发起数据请求，需要手动设置页码后在调用，否则数据更新会重复 | `(callback: (success: boolean) => void) => void` |
| refresh       | 刷新，页码从1开始                                          | `() => void`                                     |
| nextPage      | 请求下一页数据                                             | `() => void`                                     |
| scrollTo      | 滚动到指定距离                                             | `(scrollTop: number) => void`                    |
| scrollToIndex | 滚动到指定索引位置                                         | `(index: number) => void`                        |
