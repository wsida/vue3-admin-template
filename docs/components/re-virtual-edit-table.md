---
title: ReVirtualEditTable
---

# 虚拟滚动可编辑表格ReVirtualEditTable

在 `ReEditTable` 的基础上，增加虚拟滚动功能。

:::warning

虚拟滚动需要固定行高，表单控件避免使用高度会动态变化的组件。

:::

## 基础

:::demo

<!--@include: ../demo/table/virtual-edit-table.md-->

:::

## ReVirtualEditTable属性

| 字段             | 说明                            |                 类型                  | 默认值 |
| :--------------- | :------------------------------ | :-----------------------------------: | :----: |
| maxHeight        | 表格高度                        |                number                 |   -    |
| previewRows      | 前后预加载数量，默认同 pageSize |                number                 |   -    |
| skeleton         | 开启css骨架屏                   |                boolean                |  true  |
| rowHeight        | 行高                            | number ｜ ((index: number) => number) |   -    |
| pageSize         | 虚拟滚动显示页大小              |                number                 |   20   |
| defaultRowHeight | 默认行高                        |                number                 |   -    |

_除了上述属性之外，ReEditTable属性均支持，默认会被ReEditTable实例继承_

## ReVirtualEditTable事件

| 事件名      | 说明               | 格式                                    |
| :---------- | :----------------- | :-------------------------------------- |
| update:data | 绑定数据更新时触发 | `(data: Record<string, any>[]) => void` |

_除了上述事件之外，ReEditTable支持的事件也支持，默认会被ReEditTable实例继承_

## ReVirtualEditTable插槽

| 插槽名            | 说明                                                                                                |
| :---------------- | :-------------------------------------------------------------------------------------------------- |
| empty             | 空状态展示                                                                                          |
| toolbox-left      | 页头工具栏左侧内容插槽，可用于自定义新增按钮                                                        |
| toolbox-right     | 页头工具栏右侧内容插槽，可用于自定义附加按钮                                                        |
| add-bottom-button | 页脚新增按钮插槽，用于自定义页脚的新增按钮，只有在 `showAddBtn` 且 `addBtnPosition="bottom"` 时有效 |

_除了上述插槽之外，列配置项配置的插槽也支持。如果是自定义控件，列配置需要指定插槽_

## ReVirtualEditTable Expose

| 字段           | 说明                   | 类型                                                                         |
| :------------- | :--------------------- | :--------------------------------------------------------------------------- |
| editTableRef   | ReEditTable组件实例    | InstanceType\<typeof ReEditTable\>                                           |
| maxHeight      | 编辑表格高度           | number                                                                       |
| startIndex     | 虚拟滚动列表起始索引   | number                                                                       |
| endIndex       | 虚拟滚动列表结束索引   | number                                                                       |
| toAdd          | 增加一行               | `() => void`                                                                 |
| toDelete       | 删除指定行             | `($index: number) => void`                                                   |
| toEdit         | 编辑指定行             | `($index: number) => void`                                                   |
| toEditCell     | 编辑指定单元格         | `($index: number, prop: string) => void`                                     |
| cancelEditRow  | 取消指定行编辑状态     | `($index: number) => void`                                                   |
| cancelEditCell | 取消指定单元格编辑状态 | `($index: number, prop: string) => void`                                     |
| validate       | 整个编辑表格校验       | `(callback?: (valid: boolean) => void) => void`                              |
| validateRow    | 指定行校验             | `(index: number, callback?: (valid: boolean) => void) => void`               |
| validateCell   | 指定单元格校验         | `(index: number, prop: string, callback?: (valid: boolean) => void) => void` |
