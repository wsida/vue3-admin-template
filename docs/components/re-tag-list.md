---
title: ReTagList
---

# ReTagList标签列表

基于ElTag实现的Tag列表，支持Tag列表多选，动态Tag列表。

## 基础

简单展示Tag列表，可通过size指定尺寸

:::demo

<!--@include: ../demo/tag-list/basic.md-->

:::

## Tag类型

通过 tagType 控制Tag类型

:::demo

<!--@include: ../demo/tag-list/type.md-->

:::

## 内容溢出Tooltip显示

设置 showOverflowTooltip 开启

:::demo

<!--@include: ../demo/tag-list/tooltip.md-->

:::

## 可编辑

设置 editable 开启编辑，输入框按下回车键或者失去焦点后自动保存，默认会忽略相同Tag输入。

:::info
可以通过 createNew 自定义创建新Tag数据类型，通过 beforeAdd 判断是否能加入Tag数据列表。
如果关闭 autoAdd，则需要自行监听 add 事件手动插入Tag数据列表。
:::

:::demo

<!--@include: ../demo/tag-list/editable.md-->

:::

## input输入框宽度响应

默认新增Tag输入框宽度为 100px，如果你想宽度随输入内容变化，可以开启 `input-responsive`

:::demo

<!--@include: ../demo/tag-list/responsive.md-->

:::

## 可选中

设置 checkable 开启可选，需要绑定modelValue字段，支持tagType/tagEffect得到多种展示效果

:::demo

<!--@include: ../demo/tag-list/checkable.md-->

:::

## ReTagList属性

| 字段                  | 说明                                                                   |                           类型                            |  默认值   |
| :-------------------- | :--------------------------------------------------------------------- | :-------------------------------------------------------: | :-------: |
| modelValue（v-model） | 可选，当前选中值，checkable下必填                                      |                   string[] ｜ number[]                    |     -     |
| tags                  | 必填，Tags绑定数据列表                                                 |            string[] ｜ Record\<string, any\>[]            |     -     |
| valueKey              | Tags绑定数据列表是Object时，指定键名。如果绑定的是字符串数组，可忽略   |                          string                           |  'value'  |
| labelKey              | Tags绑定数据列表是Object时，指定标签名。如果绑定的是字符串数组，可忽略 |                          string                           |  'label'  |
| size                  | Tag尺寸                                                                |              "default" ｜ "small" ｜ "large"              | "default" |
| tagType               | Tag类型                                                                | "primary" ｜ "info" ｜ "success" ｜ "warning" ｜ "danger" | "primary" |
| tagEffect             | Tag主题                                                                |               "light" ｜ "dark" ｜ "plain"                |  "light"  |
| checkable             | 是否可选                                                               |                          boolean                          |   false   |
| editable              | 是否可动态编辑                                                         |                          boolean                          |   false   |
| inputResponsive       | 输入框是否随内容自适应宽度，非必要时请关闭                             |                          boolean                          |   false   |
| autoAdd               | 是否自动添加新Tag                                                      |                          boolean                          |   true    |
| beforeAdd             | 自定义创建新Tag函数                                                    |    `(label: string) => string ｜ Record<string, any>`     |     -     |
| createNew             | 必填，滚动容器                                                         |            HTMLElement ｜ (() => HTMLElement)             |     -     |
| gap                   | Tag间距                                                                |                          number                           |     8     |
| buttonText            | 新增Tag按钮文本                                                        |                          string                           |     -     |
| buttonProps           | 新增Tag按钮属性                                                        |                  Partial\<ButtonProps\>                   |     -     |
| showOverflowTooltip   | Tag内容溢出时支持悬浮展示tooltip显示完整内容                           |                          boolean                          |   false   |
| tooltipEffect         | Tooltip主题                                                            |                     "light" ｜ "dark"                     |  "dark"   |
| teleported            | Tooltip是否添加到body                                                  |                          boolean                          |   true    |

## ReTagList事件

| 事件名            | 说明                      | 格式                                                                            |
| :---------------- | :------------------------ | :------------------------------------------------------------------------------ |
| update:tags       | 可选Tag列表发生变化时触发 | `(tags: string[] ｜ Record<string, any>[]) => void`                             |
| update:modelValue | 已选中Tag发生变化时触发   | `(value: string[] ｜ number[]) => void`                                         |
| check             | 点击某个Tag时触发         | `(checked: boolean, value: string ｜ number, tag: Record<string, any>) => void` |
| add               | 新增一个Tag时触发         | `(label: string) => void`                                                       |
| input             | 输入框输入时触发          | `(label: string) => void`                                                       |
| close             | 关闭一个tag时触发         | `(value: string ｜ number, tag: Record<string, any>) => void`                   |

## ReVirtualEditTable插槽

| 插槽名 | 说明                                                                                                                                                         | 类型                                                                                                                                                  |
| :----- | :----------------------------------------------------------------------------------------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------- |
| tag    | 自定义Tag展示，支持 tag（标签）/handler（close事件处理器） 两个作用域插槽，如果是checkable，还增加 checked（tag选中状态）/check-handler（tag选中事件处理器） | `(tag: string ｜ Record\<string, any\>, handler: (tag: any) => void, checked?: boolean, check-handler: (tag: any, checked?: boolean): void) => VNode` |
