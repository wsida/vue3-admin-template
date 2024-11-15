---
title: ReModalForm
---

# 模态框表单组件ReModalForm

> 基于ReForm封装的模态框表单组件，隐藏内置的按钮组，基于模态框页脚重新声明按钮组。

> 整体表单配置与ReForm相同，可以快速上手配置。

## 基础应用

通过配置 `items` 定义表单内容，与 ReForm 配置一致，绑定 `submit` 事件手动提交表单数据或者传入 `request` 接口请求方法自动请求接口提交。

:::demo

<!--@include: ../demo/form/modal.md-->

:::

## ReModalForm属性

| 字段             | 说明                       |            类型            | 默认值 |
| :--------------- | :------------------------- | :------------------------: | :----: |
| items            | 必填，表单配置项集合       |    Array\<ReFormItem\>     |   []   |
| formData         | 表单数据                   |      ReFormModelValue      |   -    |
| formProps        | ReForm属性配置             | Partial\<ExtendFormProps\> |   -    |
| modelValue       | 是否显示模态框             |          boolean           |   -    |
| disabled         | 是否禁用表单               |          boolean           | false  |
| resetAfterClosed | 是否在关闭模态框后重置表单 |          boolean           |  true  |
| request          | 表单提交接口请求方法       |   ReFormProps["request"]   |   -    |

## ReModalForm事件

| 事件名            | 说明                                                      | 格式                                                                     |
| :---------------- | :-------------------------------------------------------- | :----------------------------------------------------------------------- |
| open              | 模态框打开时触发                                          | `() => void`                                                             |
| opened            | 模态框打开后触发                                          | `() => void`                                                             |
| close             | 模态框关闭时触发                                          | `() => void`                                                             |
| close             | 模态框关闭后触发                                          | `() => void`                                                             |
| close-auto-focus  | 输入焦点聚焦在 Drawer 内容时的回调                        | `() => void`                                                             |
| open-auto-focus   | 输入焦点从 Drawer 内容失焦时的回调                        | `() => void`                                                             |
| update:modelValue | 模态框打开/关闭时触发                                     | `(visible: boolean) => void`                                             |
| change            | 表单控件字段值发生变化时触发                              | `(field: string, value: any, model: MaybeRef\<FormModelValue\>) => void` |
| update:formData   | 表单数据更新后触发                                        | `(model: MaybeRef\<FormModelValue\>) => void`                            |
| submit            | 点击确定按钮触发，只有未自定义 `footer` 插槽时有效        | `(formData: FormModelValue) => void`                                     |
| cancel            | 点击取消按钮触发，只有未自定义 `footer` 插槽时有效        | `() => void`                                                             |
| success           | 表单提交接口请求成功后触发，只有设置 `request` 属性时有效 | `(res: unknow) => void`                                                  |
| error             | 表单提交接口请求失败后触发，只有设置 `request` 属性时有效 | `(res: unknow) => void`                                                  |

_type FormModelValue = Record\<string, any\>_

:::info 小TIP

除了上述事件之外，表单控件的具体事件可以通过表单配置项字段 `events` 进行绑定。

:::

## ReModalForm插槽

| 插槽名          | 说明                                                                       |
| :-------------- | :------------------------------------------------------------------------- |
| header          | ElDialog模态框头部插槽                                                     |
| footer          | ElDialog模态框页脚插槽，会覆盖默认的页脚表单按钮，需要自行实现表单提交重置 |
| default-header  | 模态框主体内容头部，放置在表单之前                                         |
| default-content | 模态框主体内容部分，默认时ReForm，可自定义整个ReForm                       |
| default-footer  | 模态框主体内容页脚，放在表单之后                                           |

_除了上述插槽，ReForm支持的表单插槽也都支持_

## ReModalForm Expose

| 字段         | 说明           | 类型                              |
| :----------- | :------------- | :-------------------------------- |
| reFormRef    | ElForm组件示例 | InstanceType\<typeof ElForm\>     |
| innerFormRef | ReForm组件示例 | InstanceType\<typeof ReForm\>     |
| formData     | 表单数据       | MaybeRef\<Record\<string, any\>\> |
| resetForm    | 重置表单       | `() => void`                      |
