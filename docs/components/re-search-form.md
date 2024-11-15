---
title: ReSearchForm
---

# 搜索表单组件ReSearchForm

> 基于ReForm封装的搜索表单组件，隐藏内置的按钮组，二次实现表单的按钮组功能实现查询、重置、展开/收起等功能。

> 整体表单配置与ReForm相同，可以快速上手配置。搜索条件不支持表单组配置和纯文本字段配置，我想你应该也觉得这是合理的。

## 基础应用

通过配置 `items` 定义搜索条件表单，与 ReForm 配置一致，绑定 `search` 事件手动发起请求或者传入 `request` 接口请求方法自动请求。

:::demo

<!--@include: ../demo/search/basic.md-->

:::

## 显示标签

设置 `showLabel` 属性控制搜索条件表单是否展示表单标签，只有为 `true` 时，`labelPosition` 和 `labelWidth` 属性才会生效。

:::demo

<!--@include: ../demo/search/label.md-->

:::

## 显示折叠按钮

设置 `showCollapsedBtn` 属性展示折叠按钮，可通过`collapsedText`、`defaultCollapsed` 等属性控制折叠按钮的展示。

:::demo

<!--@include: ../demo/search/collapsed.md-->

:::

## 默认折叠显示行数

开启折叠按钮后，可以通过 `collapsedRows` 属性控制折叠后表单显示的行数，默认折叠后只展示1行。当不存在可以折叠的情况下，默认会禁用折叠按钮，如果想完全隐藏折叠按钮，可以通过 `hideCollapsedBtnWhenNone` 属性控制。

:::demo

<!--@include: ../demo/search/collapsed-rows.md-->

:::

## 按钮组对齐方式

默认情况下，按钮组采用左对齐，自动会跟随表单控件换行，如果不想按钮组单独一行时展示在左侧，可以通过 `btnAlign="right"` 属性控制按钮组的对齐方式。

:::demo

<!--@include: ../demo/search/btn-align.md-->

:::

:::warning

搜索条件表单可通过 `cols` 字段配置响应式网格列数，同时配合表单配置项 `span` 字段控制响应式网格大小。

:::

## ReSearchForm属性

| 字段                     | 说明                                                              |                        类型                        |       默认值       |
| :----------------------- | :---------------------------------------------------------------- | :------------------------------------------------: | :----------------: |
| items                    | 必填，表单配置项集合                                              |                Array\<ReFormItem\>                 |         []         |
| modelValue               | 表单数据                                                          |                  ReFormModelValue                  |         -          |
| cols                     | 表单网格布局列数                                                  |             number ｜ ReGridResponsive             |         3          |
| colGap                   | 表单网格布局水平间距                                              |                       number                       |         16         |
| size                     | 表单尺寸                                                          |          "large" ｜ "default" ｜ "small"           |     "default"      |
| disabled                 | 表单是否禁用                                                      |                      boolean                       |       false        |
| btnSpan                  | 搜索条件表单按钮组的网格大小                                      |               ReFormProps["btnSpan"]               |         1          |
| btnAlign                 | 搜索条件表单按钮组的对齐方式                                      |                 "left" ｜ "right"                  |       "left"       |
| searchBtnText            | 查询按钮文本                                                      |                       string                       |       "搜索"       |
| resetBtnText             | 重置按钮文本                                                      |                       string                       |       "重置"       |
| searchBtnProps           | 查询按钮自定义属性                                                |               Partial\<ButtonProps\>               |         -          |
| resetBtnProps            | 重置按钮自定义属性                                                |               Partial\<ButtonProps\>               |         -          |
| showCollapsedBtn         | 展示折叠/收起按钮                                                 |                      boolean                       |       false        |
| collapsedText            | 折叠/收起按钮文，索引0表示折叠时按钮文本，索引1表示展开时按钮文本 |                 string ｜ string[]                 | `["展开", "收起"]` |
| collapsedRows            | 折叠收起展示行数                                                  |                       number                       |         1          |
| defaultCollapsed         | 初始化默认折叠状态                                                |                      boolean                       |        true        |
| showLabel                | 是否显示表单字段标签                                              |                      boolean                       |       false        |
| showTips                 | 是否显示表单项tips字段                                            |                      boolean                       |       false        |
| autoSearchAfterEnter     | 按下回车键触发查询                                                |                      boolean                       |       false        |
| autoSearchAfterReset     | 点击重置触发查询                                                  |                      boolean                       |        true        |
| disabledFormWhenSearch   | 远程请求时是否禁用表单防止表单修改                                |                      boolean                       |        true        |
| autoSearchAfterMounted   | 初始化后自动发起查询，父组件不需要单独在执行一次接口请求          |                      boolean                       |       false        |
| hideCollapsedBtnWhenNone | 没有字段隐藏时不显示折叠按钮                                      |                      boolean                       |       false        |
| loading                  | 搜索条件请求状态                                                  |                      boolean                       |       false        |
| request                  | 搜索条件自动请求接口方法                                          | `(model: Record\<string, any\>) => Promise\<any\>` |         -          |

_除了上述属性，其他属性会自动被ReForm组件继承_

## ReSearchForm事件

| 事件名            | 说明                                             | 格式 ｜                                                                  |
| :---------------- | :----------------------------------------------- | :----------------------------------------------------------------------- |
| change            | 表单控件字段值发生变化时触发                     | `(field: string, value: any, model: MaybeRef\<FormModelValue\>) => void` |
| update:modelValue | 表单数据更新后触发                               | `(model: MaybeRef\<FormModelValue\>) => void`                            |
| search            | 点击查询按钮触发，只有未自定义 `btns` 插槽时有效 | `(formData: FormModelValue) => void`                                     |
| reset             | 点击重置按钮触发，只有未自定义 `btns` 插槽时有效 | `() => void`                                                             |
| collapsed         | 点击折叠按钮触发，只有未自定义 `btns` 插槽时有效 | `(collapsed: boolean) => void`                                           |

_type FormModelValue = Record\<string, any\>_

:::info 小TIP

除了上述事件之外，表单控件的具体事件可以通过表单配置项字段 `events` 进行绑定。

:::

## ReSearchForm插槽

除了 `[field]-group` 分组触发器插槽以外，与 ReForm 一致。

## ReSearchForm Expose

| 字段           | 说明                 | 类型                              |
| :------------- | :------------------- | :-------------------------------- |
| reFormRef      | ElForm组件示例       | InstanceType\<typeof ElForm\>     |
| innerFormRef   | ReForm组件示例       | InstanceType\<typeof ReForm\>     |
| localFormData  | 搜索条件表单数据对象 | MaybeRef\<Record\<string, any\>\> |
| localCollapsed | 搜索条件折叠状态     | Ref\<boolean\>                    |
| handleSearch   | 发起一次查询         | `() => void`                      |
| handleReset    | 重置搜索条件表单     | `() => void`                      |
