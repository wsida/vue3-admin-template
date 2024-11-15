---
title: ReTable
---

# 分页表格ReTable

> 基于ElTable和ElPagination组件封装的分页表格，支持本地分页以及远程请求两种方式。本地数据分页自带全量数据的过滤和排序，如果是远程请求则都交给接口返回。

## 基础

通过 `columns` 传入列配置，支持 ElTableColumn 所有属性，同时扩展了 `options`、`labelKey`、`valueKey` 用于自动解构枚举值，默认情况下 columnKey会自动赋值为prop，同时 `options` 也会构造成 `filters` 生成过滤器选型，如果不想生成过滤器，可以通过指定 `filterable=false` 取消。

:::demo

<!--@include: ../demo/table/basic.md-->

:::

## 本地过滤

默认情况下如果列配置项带有枚举值数据项 `options` 会自动根据 `labelKey`、`valueKey` 构造成 `filters` 字段，当然你也可以手动设置 `filters` 字段。其他过滤相关可参考 ElTableColumn API说明。

- filterPlacement 过滤器面板弹出位置
- filterClassName 过滤器自定义样式类
- filterMultiple 是否多选过滤，默认true
- filterMethod 自定义过滤匹配方法，返回true则展示
- filteredValue 设置过滤器默认选择

:::demo

<!--@include: ../demo/table/filter.md-->

:::

## 本地排序

列配置配置 `sortable` 字段开启过滤功能，具体可参考 ElTableColumn API说明。

:::demo

<!--@include: ../demo/table/sort.md-->

:::

## 额外参数

除了基于列配置进行过滤，ReTable还支持 `customFilters`传入自定义过滤配置。

:::demo

<!--@include: ../demo/table/custom-filter.md-->

:::

## 远程请求

通过 `remote` 属性开启远程请求，默认需要自行监听事件手动调用接口。建议同时配置远程请求方法 `remote-method` 属性以开启 `auto-remote` 就可以自动请求。`remote-method` 可以接收三个参数，参数依次为分页信息`{currentPage, pageSize}`、过滤器状态、排序状态，过滤器状态、排序状态需要自行解析。

当然你也可以自行监听 `sort-change` 和 `filter-change` 获取当前排序状态和过滤状态。

:::demo

<!--@include: ../demo/table/remote.md-->

:::

## ReTable属性

| 字段                 | 说明                     |               类型               |   默认值   |
| :------------------- | :----------------------- | :------------------------------: | :--------: |
| pagination           | 是否开启分页             |             boolean              |    true    |
| rowKey               | 数据项主键名称           |              string              |    "id"    |
| emptyText            | 空状态文本说明           |              string              | "暂无数据" |
| columns              | 必填，表格列配置         |         ReTableColumn[]          |     -      |
| data                 | 必填，数据集             |           ReTableRow[]           |     -      |
| stripe               | 条纹表格                 |             boolean              |   false    |
| border               | 是否带边框               |             boolean              |   false    |
| reversePageAfterSort | 是否在排序变更后重置页码 |             boolean              |   false    |
| gutter               | 表格间距                 | "default" ｜ "small" ｜ "medium" | "default"  |
| customFilters        | 自定义过滤条件           |      ReTableCustomFilter[]       |     -      |

_除了上述属性，ElTable属性也都支持，默认会被ElTable实例继承_

_ReTable继承CustomPagination属性，其他一些分页请求相关属性参考下面_

## CustomPagination属性

| 字段                   | 说明                                                              |                                                          类型                                                           | 默认值 |
| :--------------------- | :---------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------: | :----: |
| pageSize（v-model）    | 页大小                                                            |                                                         number                                                          |   10   |
| currentPage（v-model） | 当前页码                                                          |                                                         number                                                          |   1    |
| total（v-model）       | 数据总数，remote=true有效，且必须指定                             |                                                         number                                                          |   -    |
| paginationProps        | ElPagination属性                                                  |                                               Partial\<PaginationProps\>                                                |   -    |
| autoRemote             | 自动请求，remote=true有效                                         |                                                         boolean                                                         | false  |
| firstRemote            | 首次渲染自动请求，remote=true有效                                 |                                                         boolean                                                         | false  |
| remote                 | 是否开启远程请求                                                  |                                                         boolean                                                         | false  |
| remoteMethod           | 远程请求方法                                                      | `({currentPage: number; pageSize: number;}, filters: Record<string, any>, sorts?: Record<string, any>) => Promise<any>` |   -    |
| dataResponsive         | 是否开启数据响应，remote=true有效，total、data支持v-model双向绑定 |                                                         boolean                                                         | false  |
| resetCurrentPage       | 数据变更是否重置页码                                              |                                                         boolean                                                         |  true  |

## ReTableColumn字段

| 字段           | 说明                                                                |                             类型                             | 默认值 |
| :------------- | :------------------------------------------------------------------ | :----------------------------------------------------------: | :----: |
| options        | 字段关联枚举值数据，默认会构造filters字段，以及自动转成labelKey展示 |        Array\<{[labelKey]: string, [valueKey]: any}\>        |   -    |
| labelKey       | 枚举值标签名字段                                                    |                            string                            |   -    |
| valueKey       | 枚举值键值字段                                                      |                            string                            |   -    |
| slot           | 列内容作用域插槽名                                                  |                            string                            |   -    |
| headerSlot     | 列表头作用域插槽名                                                  |                            string                            |   -    |
| filterIconSlot | 列表头自定义过滤器图标插槽名                                        |                            string                            |   -    |
| filterable     | 是否开启过滤，设置false会取消options转filters的默认行为             |                           boolean                            |  true  |
| renderCell     | 自定义单元格渲染                                                    | `(data: { row: any; column: any; $index: number }) => VNode` |   -    |

_支持所有ElTableColumn属性，具体查看Element Plus ElTableColumn API_

## ReTable事件

| 事件名             | 说明                                                     | 格式                                        |
| :----------------- | :------------------------------------------------------- | :------------------------------------------ |
| sort-change        | 表单控件字段值发生变化时触发                             | `(data: ReTableSortColumn) => void`         |
| filter-change      | 表单数据更新后触发                                       | `(newFilters: ReTableFilterColumn) => void` |
| update:pageSize    | 页大小改变时触发                                         | `(pageSize: number) => void`                |
| update:currentPage | 页码改变时触发                                           | `(currentPage: number) => void`             |
| update:total       | 数据总数更新时触发，只有定义 `dataResponsive` 属性时有效 | `(total: number) => void`                   |
| update:modelValue  | 数据集更新时触发，只有定义 `dataResponsive` 属性时有效   | `(value: Record<string, any>[]) => void`    |

_除了上述事件，ElTable事件也都支持，默认会被ElTable实例继承_

## ReTable插槽

| 插槽名           | 说明                                                           |
| :--------------- | :------------------------------------------------------------- |
| empty            | 空状态展示                                                     |
| append           | ElTable append插槽                                             |
| [headerSlot]     | 每个表单配置项都支持表头插槽，通过headerSlot指定               |
| [filterIconSlot] | 每个表单配置项都支持表头过滤器图标插槽，通过filterIconSlot指定 |
| [slot]           | 每个表单配置项都支持内容作用域插槽，通过slot指定               |

_[headerSlot]、[filterIconSlot]、[slot]插槽名有列配置决定_

## ReTable Expose

| 字段        | 说明                                                        | 类型                                |
| :---------- | :---------------------------------------------------------- | :---------------------------------- |
| tableRef    | ElTable组件实例                                             | InstanceType\<typeof ElTable\>      |
| pagerRef    | ElPagination组件示例                                        | InstanceType\<typeof ElPagination\> |
| toRemote    | 远程请求方法                                                | `() => void`                        |
| loading     | 加载状态                                                    | Ref\<boolean\>                      |
| currentPage | 当前页码                                                    | Ref\<number\>                       |
| pageSize    | 页大小                                                      | Ref\<number\>                       |
| total       | 数据总数，remote时为 props.total                            | InstanceType\<typeof ElPagination\> |
| tableData   | 挂在ElTable数据集，分页时为 dataSource，不分页为 props.data | Ref\<ReTableRow[]\>                 |
| dataSource  | 当前分页的表格数据                                          | Ref\<ReTableRow[]\>                 |
| sortData    | 全量排序后表格数据                                          | Ref\<ReTableRow[]\>                 |
| filterData  | 全量过滤后表格数据                                          | Ref\<ReTableRow[]\>                 |

## Types

```ts
export type ReTableRow = Record<string, any>;

export interface ReTableCustomFilter {
  prop: string;
  value: string;
  ignoreCase?: boolean;
  type?: // 关联字段判断方式 =(等于)，!(非)，.(包含)，^(开头)，$(结尾)，&(全部匹配)，｜(部分匹配)
  "=" | "!=" | "." | "!." | "^=" | "=$" | "!^=" | "!=$" | "&." | "!&." | "|.";
}
```
