---
title: "内置组件"
---

# 组件

> 模版中内置了一些常见的PC端中后台组件，包括分页表格、分页列表、可编辑表格、动态表单等。

> 需要仔细阅读组件的API，掌握这些组件的使用以及可应用场景，能够在日常开发中提高极大的效率，请积极使用，欢迎多提建议，方便组件扩展新的功能，满足更广泛的应用场景。

## 组件明细

### 表格组件

| 组件         | 功能说明                                                                                                                                                       |
| :----------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ReForm       | 动态表单，通过对象配置实现表单功能，支持表单数据绑定，表单校验，分组表单字段，表单字段联动，网格布局表单                                                       |
| ReDrawerForm | 抽屉表单，基于`ReForm`组件实现的抽屉表单，可以利用相同的配置对象快速获得一个自带抽屉的表单功能                                                                 |
| ReModalForm  | 模态框表单，基于`ReForm`组件实现的抽屉表单，可以利用相同的配置对象快速获得一个自带模态框的表单功能                                                             |
| ReSearchForm | 搜索条件表单，基于`ReForm`组件实现，可用于大部分表格页面定义搜索条件，支持大部分搜索条件布局展示，支持响应式网格，同时可以配合展开收起功能实现搜索条件展示控制 |

### 表单组件

| 组件               | 功能说明                                                                                                                                                                                                                                                          |
| :----------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ReTable            | 分页表格，内置分页功能，可以基于前端自行完成数据的分页，过滤，以及排序；同时，支持远程请求分页，支持的功能同`el-table`一致                                                                                                                                        |
| RePageTable        | 页面级分页表格，在 `ReTable` 的基础上，增加了一些自定义功能，如间距、条纹、边框、全屏、列显隐、列排序等                                                                                                                                                           |
| ReEditTable        | 可编辑表格，在 `ReTable` 的基础上，结合`ReForm`一些相同的表单配置项，一同实现可编辑功能。支持多种编辑表格交互方式，如单个单元格编辑，整行编辑，或者全部行编辑；支持单元格校验，使用`ElForm`相同校验规则的配置项进行校验；同时，表格也支持滚动、分页、虚拟列表功能 |
| ReVirtualEditTable | 在 `ReEditTable` 的基础上，增加虚拟滚动功能                                                                                                                                                                                                                       |

### 列表组件

| 组件                | 功能说明                                                                                                                                         |
| :------------------ | :----------------------------------------------------------------------------------------------------------------------------------------------- |
| ReList              | 高级列表，支持高度动态的内容展示，分为list风格和card风格。内容可根据配置进行动态控制展示，提供多个插槽进行自定义。支持响应式网格布局实现多列展示 |
| RePageList          | 分页列表，在 `ReList` 的基础上，增加分页功能                                                                                                     |
| ReScrollList        | 滚动加载列表，在 `ReList` 的基础上，增加列表滚动加载功能，可以通过 `trigger` 改变加载方式，手动触发或者自动加载                                  |
| ReVirtualList       | 虚拟长列表，在 `ReList` 的基础上，增加虚拟列表功能，在固定高度的基础上，可以优化大数据列表展示                                                   |
| ReVirtualScrollList | 虚拟滚动加载列表，结合 `ReScrollList` 和 `ReVirtualList` 的功能，优化大数据列表展示，具体使用可以按照实际应用选择                                |

### 输入组件【待开发】

| 组件            | 功能说明       |
| :-------------- | :------------- |
| ReTableSelect   | 下拉表格选择器 |
| ReTagList       | 标签列表       |
| ReMultipleInput | 多关键字输入   |
| ReTableTransfer | 表格选择穿梭框 |

### 其他组件

| 组件               | 功能说明                                                                                                                                                                                                 |
| :----------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ReCollapsedBtn     | 展开/收起按钮组件，支持文字配置                                                                                                                                                                          |
| ReExpandedBtn      | 展开/收起按钮组件，纯图标按钮                                                                                                                                                                            |
| ReEllipsis         | 文本省略组件，支持多种省略方式，如多行、高度、字符数，支持展开/收起或者tooltip显示完整内容。但是由于是基于dom操作实现，比较费性能，在大批量数据展示的时候，建议使用css实现单行省略，**不建议**使用此组件 |
| ReTabs             | 标签页组件，基于 `ElTabs` 实现的标签页，与原组件不同的是，标签页内容不直接放置在 `ElTabPane` 内，方便实现逻辑复用和展示控制。                                                                            |
| IconifyIconOffline | iconify 图标引用组件，基于离线方式（需要npm 图标库到本地）                                                                                                                                               |
| IconifyIconOnline  | iconify 图标引用组件，基于在线方式（不需要npm 图标库到本地，会在编译/打包时自动download图标到本地，按需下载）                                                                                            |
| FontIcon           | font-icon 图标引用组件，基于离线方式（需要下载字体图标到本地）                                                                                                                                           |

:::warning 小TIP
目前实现的虚拟列表，都有严格的高度限制，使用时需要注意。可编辑表格需要避免一些可以动态调整高度的组件，ReList需要根据展示内容进行高度定义，会自动让list或card使用指定高度，溢出内容会被隐藏。
:::

:::warning 小TIP
虚拟滚动不是最完美的性能解决方案，还是需要从实际出发，**分页**才是最好的解决方案。
:::

## 工具方法

> 除了提供上述组件之外，在实现组件功能的同时，也抽离了一些可能会用的hook方法或者是工具方法。

### hook方法

| hook方法              | 功能说明                                                                                                                                                                                                                  |
| :-------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| useGridResponsive     | 响应hook，主要用于响应栅格/网格配置，内置 xs、sm、md、lg、xl 响应尺寸，同时也支持自定义宽度，会根据屏幕宽度计算响应值。目前响应值只支持数字，如果一些配置项想要增加响应，可以自行构建一些映射，通过数字转换成对应的配置项 |
| usePagination         | 分页hook，可快速实现分页功能                                                                                                                                                                                              |
| useScrollPagination   | 滚动加载hook，可快速实现滚动加载功能                                                                                                                                                                                      |
| useVirtualScroll      | 虚拟滚动hook，可快速实现虚拟滚动功能                                                                                                                                                                                      |
| useDrawerScrollShadow | 抽屉body滚动hook，可实现抽屉body内容滚动时，出现阴影增强滚动效果                                                                                                                                                          |

### 工具方法（utils）

| utils方法      | 功能说明                                                                  |
| :------------- | :------------------------------------------------------------------------ |
| async-validate | 自定义校验方法，能够满足日常定义的 `rules` 配置，更高级的配置需要自行实现 |
| vnode          | 一些vnode相关的方法，如绑定事件名转换                                     |
| dom            | 一些dom相关的方法，如样式获取、合并、样式类添加/移除                      |
| storage        | 一些storage缓存相关的方法                                                 |
| message        | 基于 `ElMessage` api实现的消息提示方法                                    |
