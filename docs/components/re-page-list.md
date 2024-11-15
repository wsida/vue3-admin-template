---
title: RePageList
---

# 分页高级列表RePageList

> 在 `ReList` 的基础上，增加分页功能。

:::warning
卡片风格分页展示数量与页大小pageSize有关，如果存在多列网格，请自行合理设置pageSize，避免出现奇数网格数时，一页不能占满所有网格。
:::

## 基础

绑定全量 `items` 数据自动完成分页展示

:::demo

<!--@include: ../demo/list/page.md-->

:::

## 远程请求

开启 `remote` 远程请求模式，配合 `remote-method` 远程请求方式完成分页接口请求。**注意total字段在远程请求模式下必填**。

默认开启 `data-responsive` 可以对 items 和 total 进行双向绑定，同时开启 `auto-remote` 自动发起请求以及开启 `first-remote` 首次自动请求，如果需要请手动设置关闭。

:::demo

<!--@include: ../demo/list/page-remote.md-->

:::

## RePageList属性

| 字段            | 说明                 |          类型           | 默认值 |
| :-------------- | :------------------- | :---------------------: | :----: |
| items           | 必填，列表项数据集   | Record\<string, any\>[] |   -    |
| metas           | 必填，列表项展示配置 |     ReListItemMetas     |   -    |
| title           | 列表标题             |         string          |   -    |
| checks(v-model) | 绑定勾选值           | Array<string ｜ number> |   -    |
| loading         | 加载状态             |         boolean         | false  |

_除了上述属性，支持ReList所有属性，默认会被ReList实例继承_

_同时RePageList属性也继承了[CustomPagination属性](/components/re-table.html#custompagination属性)_

## RePageList事件

| 事件名             | 说明                     | 格式                                                                          |
| :----------------- | :----------------------- | :---------------------------------------------------------------------------- |
| update:checks      | 已选中列表发生变化时触发 | `(checks: Array<string ｜ number>) => void`                                   |
| check              | 点击某个复选框时触发     | `(checked: boolean, id: string ｜ number, item: Record<string, any>) => void` |
| update:items       | 列表项集合更新时触发     | `(items: ReListProps["items"]) => void`                                       |
| update:currentPage | 页码改变时触发           | `(currentPage: number) => void`                                               |
| update:pageSize    | 页大小切换时触发         | `(pageSize: number) => void`                                                  |
| update:total       | 数据总数切换时触发       | `(total: number) => void`                                                     |

## RePageList插槽

| 插槽名  | 说明                                              |
| :------ | :------------------------------------------------ |
| default | 列表项作用域插槽，带有 item、metas 两个作用域变量 |
| title   | List页头标题插槽                                  |
| extra   | List页头额外信息插槽                              |
| footer  | PageList页脚插槽，在分页器之前                    |

## RePageList Expose

| 字段        | 说明                             | 类型                                |
| :---------- | :------------------------------- | :---------------------------------- |
| checks      | 已选中集合                       | Array\<string ｜ number\>           |
| toRemote    | 远程请求方法                     | `() => void`                        |
| loading     | 加载状态                         | Ref\<boolean\>                      |
| currentPage | 当前页码                         | Ref\<number\>                       |
| pageSize    | 页大小                           | Ref\<number\>                       |
| total       | 数据总数，remote时为 props.total | InstanceType\<typeof ElPagination\> |
| dataSource  | 分页列表项集合                   | Ref\<ReTableRow[]\>                 |
