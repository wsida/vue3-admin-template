---
title: ReList
---

# 高级列表ReList

主要基于JSX风格实现高度动态的列表渲染组件，可以通过信息配置Meta配置控制信息项展示，同时支持render函数自定义渲染。

## 基础

通过 `metas` 字段配置列表项展示内容。支持配置列表项内容对于的数据字段，自定义渲染，绑定事件，自定义样式类。

:::demo

<!--@include: ../demo/list/basic.md-->

:::

## 可选择

设置 `checkable` 字段开启列表可选中，支持绑定 `checks` 获取当前的选中列表，**需要指定 `rowKey` 字段指定绑定值**

:::demo

<!--@include: ../demo/list/checkable.md-->

:::

## 可展开

设置 `expandable` 字段开启列表项展开控制，默认会隐藏 content/description 内容信息。_试着改变布局观察不同效果。_

:::demo

<!--@include: ../demo/list/expandable.md-->

:::

## 自定义操作列

通过 `metas` 字段配置 `actions` 可以自定义操作按钮组渲染。_actions的配置与其他几个内容字段配置有些差别，注意区分_

:::demo

<!--@include: ../demo/list/actions.md-->

:::

## 垂直布局

通过 `itemLayout` 字段指定列表项的布局展示，type=list 和 type=card 均支持。_试着改变布局观察不同效果。_

:::demo

<!--@include: ../demo/list/layout.md-->

:::

## 列表页头/页脚

通过 `title` 属性或者 `title` / `extra` 插槽控制列表页头展示，通过 `footer` 插槽自定义列表页脚展示。

:::demo

<!--@include: ../demo/list/header.md-->

:::

## 卡片列表

设置 `type=card` 切换列表展示风格。

:::demo

<!--@include: ../demo/list/card.md-->

:::

## 响应网格卡片列表

卡片列表支持多列展示，能够更好的满足卡片布局风格。可以通过 `grid` 指定网格列数，每个卡片列表项默认占1格（不可改）。

:::demo

<!--@include: ../demo/list/grid.md-->

:::

## 卡片操作列

卡片风格的列表，操作按钮组支持调整显示位置。可以设置 `action-position` 为 `card-footer` 将操作按钮组放置在卡片页脚位置，这是一种常见的布局展示方式。

:::demo

<!--@include: ../demo/list/card-footer.md-->

:::

## 自定义渲染

`metas` 字段配置展示内容，支持自定义render函数实现自定义渲染，但有时候我们需要整个列表项都自定义时，使用render函数渲染比较麻烦，可以通过default默认插槽实现自定义渲染。default插槽作为作用域插槽，支持item、metas两个作用域参数字段。

:::demo

<!--@include: ../demo/list/slot-scoped.md-->

:::

## ReList属性

| 字段                 | 说明                                  |                  类型                  |    默认值    |
| :------------------- | :------------------------------------ | :------------------------------------: | :----------: |
| items                | 必填，列表项数据集                    |        Record\<string, any\>[]         |      -       |
| metas                | 必填，列表项展示配置                  |            ReListItemMetas             |      -       |
| title                | 列表标题                              |                 string                 |      -       |
| checks(v-model)      | 绑定勾选值                            |        Array<string ｜ number>         |      -       |
| rowKey               | 列表项主键，作为modelValue绑定值      |                 string                 |     "id"     |
| split                | 是否显示分割线                        |                boolean                 |     true     |
| border               | 是否显示边框                          |                boolean                 |    false     |
| loading              | 加载状态                              |                boolean                 |    false     |
| rowClassName         | 自定义列表项样式类                    |                 string                 |      -       |
| customClass          | 自定义List容器样式类                  |                 string                 |      -       |
| hover                | 是否显示悬浮样式                      |                boolean                 |     true     |
| expandable           | 是否可展开，仅在type="list"下有效     |                boolean                 |    false     |
| checkable            | 是否可选，不同列表风格下交互不同      |                boolean                 |    false     |
| ghost                | 是否去掉内边距                        |                boolean                 |    false     |
| type                 | 列表类型                              |            "card" ｜ "list"            |    "list"    |
| grid                 | 响应网格，仅在type="card"下有效       |       number ｜ ReGridResponsive       |      1       |
| gutter               | 网格间距，仅在type="card"下有效       | number ｜ [number] ｜ [number, number] |      16      |
| action-position      | 附加操作栏位置，仅在type="card"下有效 |       "default" ｜ "card-footer"       |  "default"   |
| avatar-position      | 头像展示位置                          |           "left" ｜ "right"            |    "left"    |
| avatarHideInExpanded | 是否在折叠时隐藏头像                  |                boolean                 |     true     |
| itemLayout           | 列表项布局                            |       "vertical" ｜ "horizontal"       | "horizontal" |
| itemHeight           | 列表项高度，内容溢出被隐藏            |                 number                 |      -       |

## ReListItemMetas 展示配置

有指定字段则会展示对应信息项

| 字段        | 说明                       | 类型               |
| :---------- | :------------------------- | :----------------- |
| avatar      | 头像，未指定则不显示       | ReListItemMeta     |
| title       | 标题，未指定则不显示       | ReListItemMeta     |
| subTitle    | 副标题，未指定则不显示     | ReListItemMeta     |
| content     | 正文，未指定则不显示       | ReListItemMeta     |
| description | 描述文本，未指定则不显示   | ReListItemMeta     |
| actions     | 配置操作列，未指定则不显示 | ReListItemAction[] |

types 类型声明：

```ts
export interface ReListItemMetas {
  avatar?: ReListItemMeta; // 头像
  title?: ReListItemMeta; // 标题
  subTitle?: ReListItemMeta; // 副标题
  content?: ReListItemMeta; // 正文
  description?: ReListItemMeta; // 描述
  actions?: ReListItemAction[]; // 操作列配置
}

export interface ReListItemAction {
  text?: string; // 操作按钮显示文本
  props?: Partial<ButtonProps>; // 按钮属性
  render?: (item: ReListItemProps["item"], expanded?: boolean) => VNode; // 自定义渲染函数
  events?: ReListItemMeta["events"]; // 绑定事件
}

export interface ReListItemMeta {
  dataIndex?: string; // 数据索引字段，默认按照ReListItemMetas键名
  customClass?: string; // 自定义样式类
  style?: string; // 自定义样式
  render?: (item: ReListItemProps["item"], expanded?: boolean) => VNode; // 自定义渲染函数
  events?: Record<string, Function>; // 绑定事件
}
```

## ReList事件

| 事件名        | 说明                     | 格式 ｜                                                                       |
| :------------ | :----------------------- | :---------------------------------------------------------------------------- |
| update:checks | 已选中列表发生变化时触发 | `(checks: Array<string ｜ number>) => void`                                   |
| check         | 点击某个复选框时触发     | `(checked: boolean, id: string ｜ number, item: Record<string, any>) => void` |

## ReList插槽

| 插槽名  | 说明                                              |
| :------ | :------------------------------------------------ |
| default | 列表项作用域插槽，带有 item、metas 两个作用域变量 |
| title   | List页头标题插槽                                  |
| extra   | List页头额外信息插槽                              |
| footer  | List页脚插槽                                      |
