---
title: ReEditTable
---

# 可编辑表格ReEditTable

可编辑表格，在 `ReTable` 的基础上，结合`ReForm`一些相同的表单配置项，一同实现可编辑功能。支持多种编辑表格交互方式，如单个单元格编辑，整行编辑，或者全部行编辑；支持单元格校验，使用`ElForm`相同校验规则的配置项进行校验；同时，表格也支持滚动、分页功能。

## 基础

基于ReTableColumn扩展了ReEditTableColumn，补充了一些类似ReFormItem的字段，可以方便理解配置，开启 `editable` 直接按可编辑状态进行行渲染，trigger将会失效，同时内置的操作列只会存在一个删除操作。

:::demo

<!--@include: ../demo/table/edit-table-basic.md-->

:::

:::warning
少量数据型的可编辑表格可以开启 `editable` 使得所有行可编辑，否则建议走按钮切换或者双击开启编辑交互。
:::

## 整行编辑

设置 `edit-trigger="row"` 开启行编辑交互，需要通过鼠标左键双击行进入编辑，编辑完成后双击行空白地方进行行校验，校验成功自动关闭，否则给出校验提示。默认会渲染操作列，也支持开启行编辑，如果不想要的话可以通过 `render-action="false"` 属性关闭。

:::demo

<!--@include: ../demo/table/edit-table-row.md-->

:::

## 自定义整行编辑

设置 `edit-trigger="row"` 或 `edit-trigger="custom"` 开启行编辑交互，可以通过 `render-action="false"` 属性关闭默认的操作列渲染，通过类配置自己构建操作列进行自定义行编辑。

:::demo

<!--@include: ../demo/table/edit-table-custom-row.md-->

:::

## 单元格编辑

设置 `edit-trigger="cell"` 开启单元格编辑交互，需要通过鼠标左键双击单元格进入编辑，编辑完成后双击单元格空白地方进行单元格校验，校验成功后自动关闭，否则给出校验提示。

:::demo

<!--@include: ../demo/table/edit-table-cell.md-->

:::

## 自定义控件

同ReFormItem配置类似，需要指定slot插槽，在通过插槽进行自定义控件渲染。插槽增加 `editable` 区分单元格是否处于编辑状态，`cellValue` 表示单元格数据值，`handler` 表示单元格数据更新事件处理器

:::demo

<!--@include: ../demo/table/edit-table-slot.md-->

:::

## ReEditTable属性

| 字段                  | 说明                                                         |              类型               |  默认值   |
| :-------------------- | :----------------------------------------------------------- | :-----------------------------: | :-------: |
| size                  | 可编辑表格尺寸                                               | "large" ｜ "default" ｜ "small" | "default" |
| stripe                | 条纹表格                                                     |             boolean             |   false   |
| createNew             | 提供返回新的一行创建函数，默认自动收集列配置中的defaultValue |       `() => ReTableRow`        |     -     |
| showAddBtn            | 是否展示新增按钮                                             |             boolean             |   true    |
| addBtnPosition        | 新增按钮展示位置                                             |        "top" ｜ "bottom"        | "bottom"  |
| addBtnProps           | 新增按钮属性                                                 |     Partial\<ButtonProps\>      |     -     |
| addBtnDisabled        | 新增按钮是否禁用                                             |             boolean             |   false   |
| according             | 是否限制每次只有一行/或一个单元格可以编辑                    |             boolean             |   false   |
| pageSize              | 页大小                                                       |             number              |    10     |
| pagination            | 是否开启分页                                                 |             boolean             |   false   |
| disabled              | 可编辑表格是否禁用                                           |             boolean             |   false   |
| editable              | 可编辑表格是否所有单元格都直接进入编辑状态                   |             boolean             |   false   |
| confirmBeforeDelete   | 删除行是否进行二次确认                                       |             boolean             |   true    |
| confirmMessage        | 删除行进行二次确认提示文本                                   |             string              |     -     |
| editTrigger           | 触发编辑的交互方式                                           |   "cell" ｜ "row" ｜ "custom"   | "custom"  |
| renderAction          | 是否采用内置的操作列                                         |             boolean             |   true    |
| columns               | 必填，可编辑表格列配置                                       |       ReEditTableColumn[]       |     -     |
| rowKey                | 数据主键，如果有建议配置，提供性能                           |             string              |     -     |
| ignoreCellValid       | 是否忽略单元格编辑时触发校验，直接对整个编辑表格进行一次校验 |             boolean             |   false   |
| scrollToError         | 表格校验失败是否自动滚动到第一个校验错误行                   |             boolean             |   true    |
| scrollIntoViewOptions | 滚动行为配置                                                 |             boolean             |   false   |
| maxHeight             | 表格高度                                                     |             number              |     -     |

_除了上述属性之外，ReTable属性均支持，默认会被ReTable实例继承_

:::warning
建议设置rowKey，可以提供组件渲染性能。组件实现过程中需要基于rowKey进行搜索，如果未提供，将会通过DOM操作的方式进行查找，会降低性能。
:::

## ReEditTableColumn字段

| 字段         | 说明                        |            类型            |       默认值        |
| :----------- | :-------------------------- | :------------------------: | :-----------------: |
| required     | 字段是否必填                |          boolean           |        false        |
| editable     | 字段是否可编辑              |          boolean           |        false        |
| defaultValue | 表单字段默认值              |           string           |          -          |
| defaultText  | 表单字段默认展示占位符      |           string           |         "-"         |
| comp         | 表单控件                    |           string           |          -          |
| childComp    | 子组件所使用组件            |           string           |          -          |
| props        | 表单控件属性配置            |   Record\<string, any\>    |          -          |
| events       | 表单控件事件监听            | Record\<string, Function\> |          -          |
| rules        | 表单字段校验规则            | Arrayable\<FormItemRule\>  |          -          |
| modelProp    | 表单字段控件v-model关联属性 |           string           |    "modelValue"     |
| modelEvent   | 表单字段控件v-model关联事件 |           string           | "update:modelValue" |

_除了上述字段之外，ReTableColumn字段均支持_

## ReEditTable事件

| 事件名           | 说明                                           | 格式                                                                        |
| :--------------- | :--------------------------------------------- | :-------------------------------------------------------------------------- |
| cell-dblclick    | 鼠标左键双击某个单元格时触发                   | `(row: any, column: any, cell: HTMLTableCellElement, event: Event) => void` |
| cell-contextmenu | 鼠标右键点击某个单元格时触发                   | `(row: any, column: any, cell: HTMLTableCellElement, event: Event) => void` |
| row-dblclick     | 鼠标左键双击某行时触发                         | `(row: any, column: any, event: Event) => void`                             |
| row-contextmenu  | 鼠标右键点击某行时触发                         | `(row: any, column: any, event: Event) => void`                             |
| cell-change      | 可编辑的单元格数据更新时触发                   | `(row: any, column: any, value: any, index: number) => void`                |
| scroll-to        | 表格校验失败自动滚动到第一个校验失败的行时触发 | `(index: number, callback?: Function) => void`                              |
| update:data      | 绑定数据更新时触发                             | `(data: Record<string, any>[]) => void`                                     |

_除了上述事件之外，ReTable支持的事件也支持，默认会被ReTable实例继承_

## ReEditTable插槽

| 插槽名            | 说明                                                                                                |
| :---------------- | :-------------------------------------------------------------------------------------------------- |
| empty             | 空状态展示                                                                                          |
| toolbox-left      | 页头工具栏左侧内容插槽，可用于自定义新增按钮                                                        |
| toolbox-right     | 页头工具栏右侧内容插槽，可用于自定义附加按钮                                                        |
| add-bottom-button | 页脚新增按钮插槽，用于自定义页脚的新增按钮，只有在 `showAddBtn` 且 `addBtnPosition="bottom"` 时有效 |

_除了上述插槽之外，列配置项配置的插槽也支持。如果是自定义控件，列配置需要指定插槽_

## ReEditTable Expose

| 字段                | 说明                                     | 类型                                                                         |
| :------------------ | :--------------------------------------- | :--------------------------------------------------------------------------- |
| reTableRef          | ReTable组件实例                          | InstanceType\<typeof ReTable\>                                               |
| editData            | 编辑表格数据                             | Record\<string, any\>[]                                                      |
| normalizeIndex      | 获取数据集索引，自定义操作列需要         | `($index: number) => number`                                                 |
| removeEditRows      | 移除指定行编辑状态，自定义操作列需要     | `($index: number) => void`                                                   |
| removeRowCache      | 移除指定行编辑缓存，自定义操作列需要     | `($index: number) => void`                                                   |
| existIndexEditCells | 判断数据行是否处在某个单元格处在编辑状态 | `($index: number) => boolean`                                                |
| existIndexEditRows  | 判断数据行是否处在编辑状态               | `($index: number) => boolean`                                                |
| reset               | 重置所有编辑状态                         | `() => void`                                                                 |
| toAdd               | 增加一行                                 | `() => void`                                                                 |
| toDelete            | 删除指定行                               | `($index: number) => void`                                                   |
| toEdit              | 编辑指定行                               | `($index: number) => void`                                                   |
| toEditCell          | 编辑指定单元格                           | `($index: number, prop: string) => void`                                     |
| cancelEditRow       | 取消指定行编辑状态                       | `($index: number) => void`                                                   |
| cancelEditCell      | 取消指定单元格编辑状态                   | `($index: number, prop: string) => void`                                     |
| validate            | 整个编辑表格校验                         | `(callback?: (valid: boolean) => void) => void`                              |
| validateRow         | 指定行校验                               | `(index: number, callback?: (valid: boolean) => void) => void`               |
| validateCell        | 指定单元格校验                           | `(index: number, prop: string, callback?: (valid: boolean) => void) => void` |

:::warning
$index：表示当前行在展示的数据的索引，如果是分页，即为当前页的索引；index：表示当前行在整个数据中的索引，如果是分页需要自行从数据中获得索引
:::
