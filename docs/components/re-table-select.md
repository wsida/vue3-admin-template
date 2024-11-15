---
title: ReTableSelect
---

# 下拉表格选择器ReTableSelect

基于ReTable和Popover组件实现的下拉表格选择组件，尽量保持了与ElSelect相同的交互方式和配置，降低学习成本。

## 基础用法

建议表格max-height，否则容易出现溢出效果，同时表格的内容建议不换行展示，设置单元格内容溢出省略展示。

:::demo

<!--@include: ../demo/table-select/basic.md-->

:::

:::warning

columns如果存在复用，建议使用shallowRef，避免深层响应导致无限渲染内存溢出。

:::

## 单选

设置 multiple=false 设置单选。直接通过点击行进行选中。

:::demo

<!--@include: ../demo/table-select/single.md-->

:::

## 带禁用状态

设置 disabled 整个选择器将不可用

:::demo

<!--@include: ../demo/table-select/disabled.md-->

:::

## 部分选项禁用

可以通过 selectable 属性控制选项是否被禁用

:::demo

<!--@include: ../demo/table-select/selectable.md-->

:::

## 带清空

设置 clearable 在有选中值的时候可以展示清空图标

:::demo

<!--@include: ../demo/table-select/clearable.md-->

:::

## 带过滤

除了列配置自带的表头过滤，还支持通过 filterable 控制关键字搜索输入框，配合 filterProps 自定义关键字匹配的字段或者匹配方式

:::demo

<!--@include: ../demo/table-select/filterable.md-->

:::

## 不分页

设置 pagination=false 表格不分页

:::demo

<!--@include: ../demo/table-select/pagination.md-->

:::

## 多选tags展示

多选模式下设置 show-tags=true ，将按tag方式展示已选选项，可以配合 `collapseTags` 和 `collapseTagsTooltip` 以及 `maxCollapseTags` 这三个字段控制折叠tags的展示。

:::demo

<!--@include: ../demo/table-select/show-tags.md-->

:::

## 远程请求

同ReTable远程请求一致，通过 `remote` 开启远程请求模式，提供 `remote-method` 请求方法或者监听 `query` 事件手动发起请求。

:::demo

<!--@include: ../demo/table-select/remote.md-->

:::

:::warning
组件不支持data-responsive/auto-remote，所以在remote-method或者query事件处理器函数内需要响应式更新data/total字段。
:::

## 内置工具栏

多选模式下设置 showToolbo=true ，会在表格前显示工具栏操作，方便选择操作

:::demo

<!--@include: ../demo/table-select/toolbox.md-->

:::

## 远程请求全选关键字

远程模式下，通过工具栏选择全选实际上是不能全选所有的数据（除非你自己触发接口获取），只能是当作一种全选状态，目前通过 `ALL` 关键字标识全选，处于全选状态会禁用一般的操作，只能手动取消全选才能恢复。如果在全选情况取消全选，可以通过 `reverseAllAfterSwitch` 控制是否保留全选前的状态，设置为false会在每次取消全选后直接重置为空，默认为true，保留全选前的一次状态。

:::demo

<!--@include: ../demo/table-select/toolbox-all.md-->

:::

:::warning
如果`ALL`关键字你需要修改，可以通过 `all-value` 指定。一定是非空 string 或者 number值。
:::

## 自定义Popper

提供 `header` 和 `footer` 两个插槽用于自定义下拉popper展示内容。

:::demo

<!--@include: ../demo/table-select/custom-popper.md-->

:::

## 自定义tag

提供 `tag` 插槽用于自定义tag展示，支持 tag、closable、handler 三个作用域字段，对于折叠的tag也受影响，同时多增加一个 `count` 作用域字段用于记录折叠的tags数量。tag插槽只在 show-tags=true 时有效。

折叠tag可以通过 collapseTagClosable 开启删除图标显示，用于直接批量删除所有折叠的tag。

:::demo

<!--@include: ../demo/table-select/custom-tag.md-->

:::

## 自定义表格渲染

同ReTable一致，通过columns配置列插槽或者formatter渲染函数，用于自定义单元格展示。

:::demo

<!--@include: ../demo/table-select/custom-cell.md-->

:::

## 自定义前缀

提供 prefix 插槽自定义下拉框前缀

:::demo

<!--@include: ../demo/table-select/custom-prefix.md-->

:::

## 默认选中

主要针对远程请求模式，同时使用tag模式展示已选中的情况下，保证tag的正常显示。主要原因是由于分页限制，导致无法直接获取所有已选中的完整信息，需要通过 remoteSelected 字段单独配置已选中数据的基本信息，至少需要 `{[labelKey]: any; [valueKey]: any}` 这两个数据项，才能正常的展示 tag。如果不是使用tag展示的话，可以忽略此配置。

至于非远程请求模式本，会自动根据绑定值从数据中提取已选中信息进行初始化，不需要通过 remoteSelected 字段。

**如果不能正确映射选项，tag只会展示 valueKey 值。**

:::demo

<!--@include: ../demo/table-select/remote-selected.md-->

:::

## ReTableSelect属性

| 字段                  | 说明                                                                                |                                                                   类型                                                                   |      默认值      |
| :-------------------- | :---------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------: | :--------------: |
| size                  | 尺寸大小                                                                            |                                                     "default" ｜ "small" ｜ "large"                                                      |    "default"     |
| maxHeight             | 必填，指定表格高度，不设置容易溢出                                                  |                                                                  number                                                                  |        -         |
| columns               | 必填，表格列配置                                                                    |                                                             ReTableColumn[]                                                              |        -         |
| data                  | 必填，数据集                                                                        |                                                               ReTableRow[]                                                               |        -         |
| labelKey              | 显示名称字段名                                                                      |                                                                  string                                                                  |     "label"      |
| valueKey              | 绑定值字段名                                                                        |                                                                  string                                                                  |       "id"       |
| modelValue（v-model） | 绑定值，注意区分多选                                                                |                                                 string ｜ number ｜ string[] ｜ number[]                                                 |        -         |
| multiple              | 是否多选                                                                            |                                                                 boolean                                                                  |       true       |
| disabled              | 是否禁用                                                                            |                                                                 boolean                                                                  |      false       |
| clearable             | 是否带清空图标                                                                      |                                                                 boolean                                                                  |      false       |
| showTags              | 是否使Tags展示，只在multiple=true时有效                                             |                                                                 boolean                                                                  |      false       |
| collapseTags          | 是否折叠Tags，只在show-tags=true时有效                                              |                                                                 boolean                                                                  |      false       |
| collapseTagsTooltip   | 是否通过tooltip显示被折叠的Tags，只在collapse-tags=true 时才会生效                  |                                                                 boolean                                                                  |      false       |
| maxCollapseTags       | 需要显示的 Tag 的最大数量，超过则会被折叠，只在collapse-tags=true 时才会生效        |                                                                  number                                                                  |        1         |
| multipleLimit         | 多选限制选中数量，设置0表示不限制，不建议开启toolbox，控制不了                      |                                                                  number                                                                  |        0         |
| effect                | tooltip 主题                                                                        |                                                            "light" ｜ "dark"                                                             |     "light"      |
| placeholder           | 占位符                                                                              |                                                                  string                                                                  |     "请选择"     |
| selectable            | 控制选项可选                                                                        |                                              `(row: ReTableRow, $index: number) => boolean`                                              |        -         |
| filterPlaceholder     | 过滤文本输入占位符                                                                  |                                                                  string                                                                  | "输入关键字匹配" |
| filterable            | 是否带过滤器                                                                        |                                                                 boolean                                                                  |      false       |
| filterProps           | 过滤字段 ｜ string ｜ string[] ｜ Partial\<Omit\<ReTableCustomFilter, "value"\>\>[] |                                                                 "label"                                                                  |
| loading               | 是否正在从远程获取数据                                                              |                                                                 boolean                                                                  |      false       |
| loadingText           | 加载数据时显示的文本                                                                |                                                                  string                                                                  | "数据加载中..."  |
| noMatchText           | 搜索条件无匹配时显示的文字，也可以使用 empty 插槽设置                               |                                                                  string                                                                  |   "无匹配数据"   |
| noDataText            | 无选项时显示的文字，也可以使用 empty 插槽设置自定义内容                             |                                                                  string                                                                  |    "暂无数据"    |
| teleported            | 是否将下拉列表插入至 body 元素                                                      |                                                                 boolean                                                                  |       true       |
| clearIcon             | 清空图标                                                                            |                                                           string ｜ Component                                                            |   CircleClose    |
| suffixIcon            | 下拉图标                                                                            |                                                           string ｜ Component                                                            |    ArrowDown     |
| tagType               | 选中Tags的类型，只在showTag=true时有效"                                             |                                               info" ｜ "success" ｜ "warning" ｜ "danger"                                                |
| tagEffect             | 选中Tags的主题，只在showTag=true时有效                                              |                                                            "light" ｜ "dark"                                                             |     "light"      |
| popperOptions         | 下拉popper配置项                                                                    |                                                     ElTooltipProps["popperOptions"]                                                      |        -         |
| popperClass           | 下拉popper自定义样式类                                                              |                                                      ElTooltipProps["popperClass"]                                                       |        -         |
| placement             | 下拉框出现的位置                                                                    |                                                       ElTooltipProps["placement"]                                                        |     "bottom"     |
| transition            | 下拉popper过渡样式类                                                                |                                                       ElTooltipProps["transition"]                                                       |        -         |
| showToolbox           | 多选下展示工具栏                                                                    |                                                                 boolean                                                                  |      false       |
| popperStyle           | 自定义下拉popper的样式                                                              |                                                         string ｜ CSSProperties                                                          |        -         |
| ignoreClass           | clickoutsider需要忽略的样式类                                                       |                                                  (MaybeRef\<HTMLElement\> ｜ string)[]                                                   |        -         |
| resetParamsAfterHide  | 关闭下拉popper时是否重置内容（分页、过滤）                                          |                                                                 boolean                                                                  |       true       |
| remoteSelected        | 远程请求下用于回填已选展示，需要提供valueKey和labelKey才能用于展示Tags              |                                             Record\<string, any\> ｜ Record\<string, any\>[]                                             |
| reverseAllAfterSwitch | 选中全选后再取消，是否保留选中前的选择内容，只在remote=true、multiple=true时有效    |                                                                 boolean                                                                  |       true       |
| pageSize              | 页大小                                                                              |                                                                  number                                                                  |        10        |
| total                 | 数据总数，remote=true有效，且必须指定                                               |                                                                  number                                                                  |        -         |
| paginationProps       | ElPagination属性                                                                    |                                                        Partial\<PaginationProps\>                                                        |        -         |
| firstRemote           | 首次渲染触发请求，remote=true有效                                                   |                                                                 boolean                                                                  |      false       |
| remote                | 是否开启远程请求                                                                    |                                                                 boolean                                                                  |      false       |
| remoteMethod          | 远程请求方法                                                                        | `({currentPage: number; pageSize: number;}, keyword: string, filters: Record<string, any>, sorts?: Record<string, any>) => Promise<any>` |        -         |
| dataResponsive        | 是否开启数据响应，remote=true有效，total、data支持v-model双向绑定                   |                                                                 boolean                                                                  |      false       |
| pagination            | 是否开启分页                                                                        |                                                                 boolean                                                                  |       true       |
| noDataText            | 空状态文本说明                                                                      |                                                                  string                                                                  |    "暂无数据"    |
| stripe                | 条纹表格                                                                            |                                                                 boolean                                                                  |      false       |
| border                | 是否带边框                                                                          |                                                                 boolean                                                                  |      false       |
| hideHeaderCheckAll    | 隐藏表头多选框                                                                      |                                                                 boolean                                                                  |      false       |
| collapseTagClosable   | 折叠tag是否显示删除按钮，点击删除将会删除所有折叠的tag                              |                                                                 boolean                                                                  |      false       |

## ReTableSelect事件

| 事件名           | 说明                                                                 | 格式 ｜                                                                          |
| :--------------- | :------------------------------------------------------------------- | :------------------------------------------------------------------------------- |
| update:modeValue | 数据变化时触发                                                       | `(selected: string ｜ number ｜ string[] ｜ number[]) => void`                   |
| change           | 数据变化时触发                                                       | `(selected: ReTableSelectProps["modelValue"], selections: ReTableRow[]) => void` |
| focus            | 聚焦后触发                                                           | `() => void`                                                                     |
| blur             | 失焦后触发                                                           | `() => void`                                                                     |
| clear            | 点击清空图标时触发                                                   | `() => void`                                                                     |
| visible-change   | popper状态变化后触发                                                 | `(visible: boolean) => void`                                                     |
| query            | 未配置remote-method时，触发query事件用于手动请求更新 data/total 字段 | `(params: any, keyword: string, filters?: any, sorts?: any) => void`             |

## ReTableSelect插槽

| 插槽名 | 说明                                                                                              |
| :----- | :------------------------------------------------------------------------------------------------ |
| empty  | 自定义表格空状态展示，提供 match 作用域参数判断是否是过滤状态                                     |
| header | 自定义popper页头内容                                                                              |
| footer | 自定义popper页脚内容                                                                              |
| prefix | Select 组件头部内容                                                                               |
| label  | Select 自定义标签内容                                                                             |
| tag    | 多选模式下，可以自定义ElTag，支持 tag / closable / handler 作用域参数，折叠tag还多支持 count 字段 |

_除了上述插槽之外，列配置项配置的插槽也支持_

## ReTableSelect Expose

| 字段       | 说明           | 类型                                     |
| :--------- | :------------- | :--------------------------------------- |
| selected   | 当前选中值     | string ｜ number ｜ string[] ｜ number[] |
| selections | 当前选中行数据 | ReTableRow[]                             |
| focus      | 手动聚焦       | `() => void`                             |
| blur       | 手动失焦       | `() => void`                             |
