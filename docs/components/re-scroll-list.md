---
title: ReScrollList
---

# 滚动加载高级列表ReScrollList

> 在 `ReList` 的基础上，增加列表滚动加载功能，可以通过 `trigger` 改变加载方式，可选手动触发或者自动加载。

滚动容器默认使用List列表的父节点，需要配置 `height` 设置List的高度用于展示滚动条。

如果滚动容器不想使用List的父节点，可以通过 `scrollTarget` 指定，但是 `height` 需要设置为 `auto`，避免List内置滚动。

## 滚动加载

默认监听滚动容器，当滚动条到底底部时触发下一页请求，可以通过 `offsetBottom` 改变滚动条触发查询时滚动条距离底部的偏移距离，默认为 `0`。

:::demo

<!--@include: ../demo/list/scroll.md-->

:::

## 自定义触发加载

设置 `trigger="custom"` 取消滚动监听，会在List底部增加加载按钮，需要手动点击按钮加载下一页，提供相应的属性控制加载按钮展示。

:::demo

<!--@include: ../demo/list/scroll-custom.md-->

:::

## ReScrollList属性

| 字段            | 说明                                                              |          类型           |     默认值     |
| :-------------- | :---------------------------------------------------------------- | :---------------------: | :------------: |
| items           | 必填，列表项数据集                                                | Record\<string, any\>[] |       -        |
| metas           | 必填，列表项展示配置                                              |     ReListItemMetas     |       -        |
| title           | 列表标题                                                          |         string          |       -        |
| height          | 列表高度，不包括页头和页脚                                        |    string ｜ number     |      400       |
| loadingText     | loading时显示文本                                                 |         string          |  "加载中..."   |
| loadingPosition | loading显示位置，默认覆盖List，如果是手动触发加载默认在加载按钮上 |  "default" ｜ "footer"  |   "default"    |
| loadBtnText     | 触发加载按钮文字                                                  |         string          | "点击加载\>\>" |
| loadBtnProps    | 触发加载按钮属性                                                  | Partial\<ButtonProps\>  |       -        |

_除了上述属性，支持ReList所有属性，默认会被ReList实例继承_

_同时RePageList属性也继承了CustomScrollPaginationProps属性_

## CustomScrollPaginationProps

| 字段               | 说明                                                              |                                 类型                                 |  默认值  |
| :----------------- | :---------------------------------------------------------------- | :------------------------------------------------------------------: | :------: |
| trigger            | 滚动加载触发方式                                                  |                         "scroll" ｜ "custom"                         | "scroll" |
| scrolltTrget       | 滚动容器                                                          |                      Element ｜ (() => Element)                      |    -     |
| pageSize           | 滚动加载页大小                                                    |                           ReListItemMetas                            |    -     |
| total(v-model)     | 数据总数，remote=true有效，且必须指定                             |                                number                                |    -     |
| autoRemote         | 自动请求，remote=true有效                                         |                               boolean                                |   true   |
| firstRemote        | 首次渲染自动请求，remote=true有效                                 |                               boolean                                |   true   |
| remote             | 是否开启远程请求                                                  |                               boolean                                |   true   |
| remoteMethod       | 远程请求方法，remote为true时建议设置                              | `(params: {currentPage: number; pageSize: number;}) => Promise<any>` |    -     |
| offsetBottom       | 距离底部距离触发加载                                              |                                number                                |    0     |
| revertAfterRefresh | 刷新后滚动距离是否回滚到顶部                                      |                               boolean                                |   true   |
| dataResponsive     | 是否开启数据响应，remote=true有效，total、data支持v-model双向绑定 |                               boolean                                |   true   |
| debounce           | 滚动事件时延                                                      |                           ReListItemMetas                            |    -     |

## ReScrollList事件

| 事件名        | 说明                     | 格式                                                                          |
| :------------ | :----------------------- | :---------------------------------------------------------------------------- |
| update:checks | 已选中列表发生变化时触发 | `(checks: Array<string ｜ number>) => void`                                   |
| check         | 点击某个复选框时触发     | `(checked: boolean, id: string ｜ number, item: Record<string, any>) => void` |
| update:items  | 列表项集合更新时触发     | `(items: ReListProps["items"]) => void`                                       |
| scroll        | 容器滚动时触发           | `(scrollTop: number) => void`                                                 |
| scroll-bottom | 滚动到底时触发           | `() => void`                                                                  |
| update:total  | 数据总数切换时触发       | `(total: number) => void`                                                     |

## ReScrollList插槽

| 插槽名  | 说明                                              |
| :------ | :------------------------------------------------ |
| default | 列表项作用域插槽，带有 item、metas 两个作用域变量 |
| title   | List页头标题插槽                                  |
| extra   | List页头额外信息插槽                              |
| footer  | PageList页脚插槽，在分页器之前                    |

## ReScrollList Expose

| 字段         | 说明                                                       | 类型                                             |
| :----------- | :--------------------------------------------------------- | :----------------------------------------------- |
| disabledLoad | 是否加载完成                                               | Ref\<boolean\>                                   |
| checks       | 已选中集合                                                 | Array\<string ｜ number\>                        |
| loading      | 加载状态                                                   | Ref\<boolean\>                                   |
| currentPage  | 当前页码                                                   | Ref\<number\>                                    |
| pageSize     | 页大小                                                     | Ref\<number\>                                    |
| total        | 数据总数，remote时为 props.total                           | InstanceType\<typeof ElPagination\>              |
| dataSource   | 列表项集合                                                 | Ref\<ReTableRow[]\>                              |
| refresh      | 刷新，页码从1开始                                          | `() => void`                                     |
| nextPage     | 请求下一页数据                                             | `() => void`                                     |
| toRemote     | 发起数据请求，需要手动设置页码后在调用，否则数据更新会重复 | `(callback: (success: boolean) => void) => void` |
