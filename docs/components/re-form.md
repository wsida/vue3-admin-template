---
title: ReForm
---

# 动态表单ReForm

> 基于ElForm封装的动态表单组件，可通过配置对象自动渲染表单内容，可配置表单内容、表单校验规则、表单联动、折叠表单、多列表单，满足大部分表单应用场景。

> 表单内容组件基于动态组件（component）渲染，因此，你可以随意配置想要的表单控件（全局注册），同时也支持通过插槽（slot）配置自定义表单控件。

:::info 小TIP
内置几个特殊表单控件，如多行文本框（textarea/el-textarea）、下拉列表（el-select）、单选组（el-radio-group）、多选组（el-checkbox-group），后面三个有固定关联子组件，相比其他组件有增加几个配置字段，需要特别留意，若是还有其他相似的组件，目前建议通过插槽slot走自定义渲染。
:::

## 基础应用

通过 `items` 字段配置表单，每个配置项表示一个表单字段，ReForm会基于表单配置自动初始化表单数据，可以通过 `v-model` 实现表单数据的双向绑定，不需要特殊处理表单数据的话可以完全忽略，直接在 `submit` 事件中通过第一个参数获取当前表单值进行接口提交处理。

:::demo

<!--@include: ../demo/form/basic.md-->

:::

## 只读展示

设置 `editable` 字段为 `false`，表单会按只读模式展示，可用于一些详情页展示，与 `disabled` 不同的是，`disabled` 只是禁用表单控件，不影响表单内容。

:::demo

<!--@include: ../demo/form/readonly.md-->

:::

## 响应网格布局

ReForm可以通过设置 `cols` 字段指定响应网格数量，默认为 `1`，每个表单配置项可以通过 `span` 设置网格大小，默认为 `1`。

:::demo

<!--@include: ../demo/form/grid.md-->

:::

## 分组表单项

表单配置项允许通过 `type=group` 指定当前配置项为分组配置项，需要指定 `children` 字段配置组内的表单配置项，同 `items` 配置项一致，正常分组不超过两级，也不建议超过两级。

:::demo

<!--@include: ../demo/form/group.md-->

:::

## 字段联动/隐藏

表单配置项允许通过 `visible` 字段控制表单项的隐藏，也支持配置联动规则由ReForm控制隐藏。

:::demo

<!--@include: ../demo/form/relation.md-->

:::

## 自定义表单控件

每个配置项默认支持两种种插槽 `labelSlot`、`slot`，`slot` 用于自定义控件，默认 `[field]-control`，`labelSlot` 用于自定义标签，默认 `[field]-label`。labelSlot指定插槽为命名插槽，slot指定插槽为作用域插槽，带有作用域字段`item`，为格式化后的表单配置项，可以用于绑定属性 `v-bind="item.props"` 以及绑定事件 `v-on=item.events`，props 内置 `modelValue` 属性关联字段值、events内置 `update:modelValue` 事件更新字段值。

如果是分组配置项，还支持 `groupSlot` 配置分组触发器，带 `collpased` 作用域插槽字段，用于判断分组折叠状态，配合 `handleSwitchCollapsed` 方法自定义控制分组折叠状态。

:::demo

<!--@include: ../demo/form/slots.md-->

:::

## 自定义表单按钮

ReForm组件默认展示 **提交** 、 **取消** 两个按钮，并提供 `btns` 插槽用于自定义按钮，需要重新这两个按钮，配合ReForm组件实例方法进行组件状态控制。

:::demo

<!--@include: ../demo/form/btn-slot.md-->

:::

## ReForm属性

| 字段                   | 说明                                                       |                          类型                           |  默认值   |
| :--------------------- | :--------------------------------------------------------- | :-----------------------------------------------------: | :-------: |
| formRef                | ref函数，获取 `ElForm` 实例                                | `(form: InstanceType\<typeof ElForm\> ｜ null) => void` |     -     |
| items                  | 必填，表单配置项集合                                       |                   Array\<ReFormItem\>                   |    []     |
| modelValue             | 表单数据                                                   |                    ReFormModelValue                     |     -     |
| cols                   | 表单网格布局列数                                           |               number ｜ ReGridResponsive                |     1     |
| colGap                 | 表单网格布局水平间距                                       |                         number                          |    16     |
| size                   | 表单尺寸                                                   |             "large" ｜ "default" ｜ "small"             | "default" |
| disabled               | 表单是否禁用                                               |                         boolean                         |   false   |
| editable               | 表单是否可编辑                                             |                         boolean                         |   true    |
| scrollToError          | 校验失败是否自动定位第一个校验失败字段                     |                         boolean                         |   true    |
| autoCollapseInValidate | 校验失败是否自动展开分组，并定位分组内的第一个校验失败字段 |                         boolean                         |   true    |
| ignoreBtnLabel         | 是否忽略表单按钮组标签宽度                                 |                         boolean                         |   true    |
| btnSpan                | 表单按钮组网格大小                                         |               number ｜ ReGridResponsive                |     1     |
| btnSpanStyle           | 表单按钮组内联样式                                         |                         string                          |     -     |
| submitBtnText          | 提交按钮文字内容                                           |                         string                          |  "确定"   |
| cancelBtnText          | 取消按钮文字内容                                           |                         string                          |  "取消"   |
| submitBtnProps         | 提交按钮自定义属性                                         |                 Partial\<ButtonProps\>                  |     -     |
| cancelBtnProps         | 取消按钮自定义属性                                         |                 Partial\<ButtonProps\>                  |     -     |
| tooltipProps           | 表单默认提示语自定义样式                                   |                 Partial\<TooltipProps\>                 |     -     |
| hideBtns               | 隐藏表单按钮组                                             |                         boolean                         |   false   |
| emptyText              | 只读情况下空内容展示占位符                                 |                         string                          |    "-"    |
| request                | 表单提交远程请求方法                                       |   `(model: Record\<string, any\>) => Promise\<any\>`    |     -     |

## ReForm事件

| 事件名            | 说明                                             | 格式 ｜                                                                  |
| :---------------- | :----------------------------------------------- | :----------------------------------------------------------------------- |
| change            | 表单控件字段值发生变化时触发                     | (field: string, value: any, model: MaybeRef\<ReFormModelValue\>) => void |
| update:modelValue | 表单数据更新后触发                               | (model: MaybeRef\<ReFormModelValue\>) => void                            |
| submit            | 点击提交按钮触发，只有未自定义 `btns` 插槽时有效 | (formData: ReFormModelValue) => void                                     |
| cancel            | 点击取消按钮触发，只有未自定义 `btns` 插槽时有效 | () => void                                                               |
| success           | 表单提交成功后触发，只有指定 `request` 时有效    | (res: any) => void                                                       |
| error             | 表单提交失败后触发，只有指定 `request` 时有效    | (res: any) => void                                                       |

_type ReFormModelValue = Record\<string, any\>_

:::info 小TIP

除了上述事件之外，表单控件的具体事件可以通过表单配置项字段 `events` 进行绑定。

:::

## ReForm插槽

| 插槽名          | 说明                                                                                                   |
| :-------------- | :----------------------------------------------------------------------------------------------------- |
| btns            | 自定义表单按钮组，提交和取消需要自定义                                                                 |
| [field]-label   | 每个表单配置项都自带一个标签插槽，默认按 `[field]-label` 格式提供，可通过 `labelSlot` 自定义插槽名     |
| [field]-control | 每个表单配置项都自带一个控件插槽，默认按 `[field]-control` 格式提供，可通过 `slot` 自定义插槽名        |
| [field]-group   | 表单分组配置项自带一个分组触发器插槽，默认按 `[field]-group` 格式提供，可通过 `groupSlot` 自定义插槽名 |

## ReForm Expose

| 字段                  | 说明                                                                     | 类型                                                 |
| :-------------------- | :----------------------------------------------------------------------- | :--------------------------------------------------- |
| submiting             | 表单提交状态                                                             | boolean                                              |
| reFormRef             | ElForm组件示例                                                           | InstanceType\<typeof ElForm\>                        |
| formData              | 表单数据对象                                                             | ShallowRef\<Record\<string, any\>\>                  |
| formRules             | 表单校验规则集合                                                         | ShallowRef\<Partial\<ReFormRules\>\>                 |
| formItems             | 表单配置对象集合                                                         | ShallowRef\<ReFormItem[]\>                           |
| formVisible           | 表单字段显示状态集合                                                     | Ref\<Record\<string, boolean\>\>                     |
| formCollapsed         | 表单分组项展开/折叠状态集合                                              | Ref\<Record\<string, boolean\>\>                     |
| validate              | 同ElForm，校验整个表单                                                   | `(callback: FormValidateCallback) => void`           |
| clearValidate         | 同ElForm，清除表单校验状态                                               | `() => void`                                         |
| resetFields           | 同ElForm，重置表单字段和校验状态                                         | `(props?: Arrayable\<string\> ｜ undefined) => void` |
| handleSwitchCollapsed | 切换分组展开/折叠状态                                                    | `(field: string) => void`                            |
| autoCollapseByErrors  | 如果表单带有分组配置项，可基于校验失败项自动展开分组并定位到第一个错误项 | `(errors?: Record\<string, any\>) => void`           |

## ReFormItem配置项

| 字段          | 说明                                                                      |                                类型                                |                默认值                |
| :------------ | :------------------------------------------------------------------------ | :----------------------------------------------------------------: | :----------------------------------: |
| type          | 表单项类型，text表示纯文本，comp表示组件控件，group表示分组               |                    "text" ｜ "comp" ｜ "group"                     |                "comp"                |
| label         | type不为"group"下必填，表单项标签名，type="group" 无效                    |                               string                               |                  -                   |
| field         | 必填，表单项绑定字段名，type="group" 也指定一个唯一值，不会作为表单数据项 |                               string                               |                  -                   |
| labelWidth    | 表单项标签名宽度大小，默认取 ReForm 配置的labelWidth                      |                               number                               |                  -                   |
| labelPosition | 表单项标签名位置，默认取 ReForm 配置的labelPosition                       |                               string                               |                  -                   |
| customClass   | 表单项容器自定义样式名                                                    |                               string                               |                  -                   |
| controlClass  | 表单控件自定义样式名                                                      |                               string                               |                  -                   |
| span          | 表单项网格大小                                                            |                     number ｜ ReGridResponsive                     |                  1                   |
| defaultValue  | 表单控件默认值，用于 ReForm 初始化表单                                    |                                any                                 |                  -                   |
| tooltip       | 表单控件问好提示语，受 `labelSlot` 插槽影响                               |                               string                               |                  -                   |
| tips          | 表单控件下方提示文字内容                                                  |                               string                               |                  -                   |
| tipsClass     | 表单控件下方提示文字样式                                                  |                               string                               |                  -                   |
| comp          | type="comp"下必填，表单控件组件名，支持全局注册组件                       |                               string                               |                  -                   |
| childComp     | 表单控件嵌套子组件名                                                      |                               string                               | el-option ｜ el-radio ｜ el-checkbox |
| options       | 表单控件需要的数据集，如 el-select、el-radio-group、el-checkbox-group     |          Array<{\[labelKey\]: string, \[valueKey\]: any}>          |                  -                   |
| labelKey      | options中数据键名名称                                                     |                               string                               |               'label'                |
| valueKey      | options中数据键值名称                                                     |                               string                               |               'value'                |
| modelProp     | 表单控件数据绑定属性名                                                    |                               string                               |             'modelValue'             |
| modelEvent    | 表单控件数据绑定事件名                                                    |                               string                               |         'update:modelValue'          |
| events        | 表单项自定义绑定事件，不需要带 `on`                                       |                     Record\<string, Function\>                     |                  -                   |
| slot          | 表单控件插槽                                                              |                               string                               |          `[field]-control`           |
| labelSlot     | 字段名插槽                                                                |                               string                               |           `[field]-label`            |
| visible       | 表单项是否显示或是字段联动展示配置                                        | boolean ｜ ReFormItemVisibleRule ｜ ReFormItemVisibleRuleCondition |                  -                   |

以下是仅在 `type="group"` 下有效：

| 字段                  | 说明                                                                              |          类型          |       默认值       |
| :-------------------- | :-------------------------------------------------------------------------------- | :--------------------: | :----------------: |
| children              | 分组表单配置项，只在 `type="group"` 时有效                                        |  Array\<ReFormItem\>   |         -          |
| groupSlot             | 分组触发器的自定义插槽名                                                          |         string         |  `[field]-group`   |
| defaultCollapsed      | 分组触发器默认展开/收起状态                                                       |        boolean         |      `false`       |
| collapsedText         | 分组触发器默认展开/收起的文本                                                     |        boolean         | `["展开", "收起"]` |
| collapsedTriggerProps | 分组触发器按钮属性                                                                | Partial\<ButtonProps\> |         -          |
| collapsedTriggerIndex | 分组触发器是否跟随 `labelWidth` 缩进，只在 `labelPosition` 为 `left`/`right` 有效 |        boolean         |      `false`       |

## ReForm Types

```ts
export type ReFormModelValue = Record<string, any>;

// 响应式网格配置对象
export interface ReGridResponsive {
  [key: string]: number | undefined; // 自定义尺寸
  xs?: number;
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number;
}

// 字段联动配置对象 - 多个匹配
export interface ReFormItemVisibleRule {
  type: "&" | "|"; // 多个匹配条件逻辑关系
  conditions: ReFormItemVisibleRuleCondition[]; // 多个匹配条件
}

// 字段联动配置对象 - 单个匹配
export interface ReFormItemVisibleRuleCondition {
  field: string; // 关联字段名
  value: any; // 关联字段值 formData[field] 与 value的比较 formData[field].includes(value)
  ignoreCase?: boolean;
  type?: // 关联字段判断方式 =(等于)，!(非)，.(包含)，^(开头)，$(结尾)，&(全部匹配)，｜(部分匹配)
  "=" | "!=" | "." | "!." | "^=" | "=$" | "!^=" | "!=$" | "&." | "!&." | "|.";
}
```
