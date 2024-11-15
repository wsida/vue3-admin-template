---
title: 布局规范
---

# 布局规范

> 目前项目采用两种布局结构，一种是左右布局（登录页），一种是基础的页面布局（登入后），主要介绍基础的页面布局。

## 目录

- 📂 layout 布局相关目录
  - 📄 index.vue 基础布局入口文件

## 基础布局

<style>
.layout-demo {
  margin-bottom: 16px;
  color: var(--el-text-color-regular);
}
.flex-item {
  display: flex;
  align-items: center;
}
.item--inner {
  margin: 0 16px;
  padding: 8px 16px;
  background: #f0f2f5;
}
.item1 { grid-area: header; height: 56px; }
.item2 { grid-area: menu; }
.item3 { grid-area: main; height: 200px; }
.item4 { grid-area: footer; }

.grid-container {
  display: grid;
  grid-gap: 10px;
  background-color: #f2f3f5;
  padding: 10px;
}

.grid-container.layout1 {
  grid-template-areas:
    'menu header header header header'
    'menu main main main main'
    'menu footer footer footer footer';
}

.grid-container > div {
  background-color: #fff;
  text-align: center;
  padding: 16px;
  font-size: 30px;
}

.grid-container.layout2 {
  grid-template-areas:
    'header header header header'
    'main main main main'
    'footer footer footer footer';
}

.grid-container.layout3 {
  grid-template-areas:
    'menu header header header header'
    'menu main main main main'
    'menu footer footer footer footer';
}
</style>

<div class="layout-demo">
  <h3>布局1</h3>
  <div class="grid-container layout1">
    <div class="item1">Header</div>
    <div class="item2">Menu</div>
    <div class="item3">Main</div>  
    <div class="item4">Footer</div>
  </div>
</div>

<div class="layout-demo">
  <h3>布局2</h3>
  <div class="grid-container layout2">
    <div class="item1 flex-item"><div>Header</div><div class="item--inner">Menu</div></div>
    <div class="item3">Main</div>  
    <div class="item4">Footer</div>
  </div>
</div>

<div class="layout-demo">
  <h3>布局3</h3>
  <div class="grid-container layout3">
    <div class="item1 flex-item"><div>Header</div><div class="item--inner">Fitst-Menu</div></div>
    <div class="item2">Second-Menu</div>
    <div class="item3">Main</div>  
    <div class="item4">Footer</div>
  </div>
</div>

基础模版主要采用上述三种布局，第三种布局有个限制，所有的菜单必须都是二级菜单，这样才能保证左侧菜单栏的内容是存在的，否则会有程序问题，当然你也可以优化。

对于布局的控制，提供丰富的项目配置字段进行控制：

- `Layout` 控制整体的布局
- `FixedHeader` 固定导航栏
- `HiddenSideBar` 隐藏侧边栏
- `HideTabs`: 隐藏顶部标签页
- `HideFooter`: 隐藏页脚
- `ShowFullscreen`: 导航栏展示全屏按钮
- `ShowSearch`: 导航栏展示搜索按钮
- `ShowSetting`: 导航栏展示项目设置按钮
- `ShowNotice`: 导航栏展示消息按钮
- `ShowLogo`: 导航栏展示logo

## 页面布局组件

> 项目开发主要内容视图在于 `Main` 模块：父节点采用flex布局，main模块占满剩余空间，并内置滚动，为了规范布局，项目模版提供了四种布局组件来满足日常开发需求，页面布局组件在`components/RePage`目录下。

### 基础页面RePage

使用`RePage`组件包裹页面内容，`RePage`组件只是作为页面基础容器，带有内间距，一般需要搭配页面卡片容器 `RePageCard` 一起使用，`RePageCard`放置真正的页面内容。一个 `RePage`组件组件可以包含多个 `RePageCard`组件。

:::demo

<!--@include: ../demo/layout/basic.md-->

:::

除了一般的卡片布局，RePage 组件还支持设置页面标题描述等说明信息

:::demo

<!--@include: ../demo/layout/header.md-->

:::

#### RePage 属性

| 字段             | 说明                                        |  类型   | 默认值 |
| :--------------- | :------------------------------------------ | :-----: | :----: |
| loading          | 显示页面加载                                | boolean | false  |
| showHeader       | 显示页头信息，需要配置title/description使用 | boolean | false  |
| title            | 页面标题，只有设置`show-header`才生效       | string  |   -    |
| description      | 页面描述信息，只有设置`show-header`才生效   | string  |   -    |
| headerBackground | 页头信息展示背景色                          | boolean | false  |
| hFull            | 宽度100%                                    | boolean |  true  |
| wFull            | 高度100%，在满屏展示下需要设置              | boolean | false  |

#### RePage 插槽

| 插槽名       | 说明                                          |
| :----------- | :-------------------------------------------- |
| default      | 页面内容，通常放置RePageCard                  |
| header-extra | 头部其他信息内容，只有设置`show-header`才生效 |

### 满屏页面RePage--Full

使用RePage组件包裹页面内容，RePage开启 `h-full` 配置即可满屏，如果只有一个页面卡片容器 `RePageCard`，也可以给 RePageCard 设置 `h-full`，RePageCard 会撑满整个RePage，以此达到满屏效果。

:::demo

<!--@include: ../demo/layout/full.md-->

:::

### 双列布局页面ReColPage

如果页面采用双列布局方式，可以使用 ReColPage 组件包裹内容，支持 `left`、`right` 两个插槽用于放置内容，内置多个属性可以调整布局，支持响应式。

:::demo

<!--@include: ../demo/layout/col.md-->

:::

#### ReColPage 属性

| 字段     | 说明           |       类型       | 默认值 |
| :------- | :------------- | :--------------: | :----: |
| l-span   | 左侧栏宽度占比 |      number      |   1    |
| r-span   | 右侧栏宽度占比 |      number      |   1    |
| l-width  | 左侧栏具体宽度 | number ｜ string |   -    |
| r-width  | 右侧栏具体宽度 | number ｜ string |   -    |
| gutter   | 左右栏间距     |      number      |   20   |
| l-h-full | 左侧栏高度100% |     boolean      |  true  |
| r-h-full | 右侧栏高度100% |     boolean      | false  |

:::info 小TIP
默认下，左右栏宽度等分。若指定一栏宽度固定值，另一栏则自动占满即可，不建议两栏都固定宽度。
:::

#### ReColPage 插槽

| 插槽名 | 说明                           |
| :----- | :----------------------------- |
| left   | 左侧栏内容，通常放置RePageCard |
| right  | 右侧栏内容，通常放置RePageCard |

### 网格布局ReGridPage

如果页面需要使用网格布局，如将页面分割多个卡片块时，可以使用 ReGridPage 组件创建网格布局，网格布局需要配合 ReGridPageItem 组件一起使用，每个 ReGridPageItem 组件创建一个网格，可以将内容放置在 ReGridPageItem 组件内，可以通过属性配置定义网格的占比，支持响应式。

:::demo

<!--@include: ../demo/layout/grid.md-->

:::

#### ReGridPage 属性

| 字段          | 说明                                 |        类型        |    默认值    |
| :------------ | :----------------------------------- | :----------------: | :----------: |
| columns       | 网格列数                             |       number       |      3       |
| gap           | 网格行列间距                         | number ｜ number[] |      20      |
| min-width     | 网格元素的最小宽度，用于网格自动补充 |       number       |      -       |
| max-width     | 网格元素的最大宽度，用于网格自动补充 |       number       |      -       |
| justify-items | 每一行网格元素的内容水平对齐方式     |       string       |  'stretch'   |
| align-items   | 每一行网格元素的内容垂直对齐方式     |       string       | 'flex-start' |
| height        | 网格容器具体高度                     |       number       |      -       |
| h-full        | 网格容器高度100%                     |      boolean       |    false     |
| dense         | 开启按row的网格平铺算法              |      boolean       |    false     |

ReGridPage 子节点为 ReGridPageItem 组件

#### ReGridPageItem 属性

| 字段   | 说明         |  类型  | 默认值 |
| :----- | :----------- | :----: | :----: |
| c-span | 网格列格子数 | number |   1    |
| r-span | 网格行格子数 | number |   1    |
| height | 网格具体宽度 | number |   -    |

:::info 小TIP
列格子数会根据ReGridPage指定的`columns`做自动限制，但是行格子数不限，请合理配置，默认占1行。一个格子指定具体height时，同行的其他格子会自动撑开。
:::

#### ReGridPageItem 插槽

| 插槽名  | 说明                         |
| :------ | :--------------------------- |
| default | 网格内容，通常放置RePageCard |

### 卡片容器组件

目前页面的布局基本采用卡片式布局，基于ElCard封装了一个 RePageCard 组件作为每个页面的内容容器。

:::demo

<!--@include: ../demo/layout/page-card.md-->

:::

#### RePageCard 属性

| 字段                | 说明                                        |     类型     | 默认值 |
| :------------------ | :------------------------------------------ | :----------: | :----: |
| title               | 卡片标题                                    |    string    |   -    |
| shadow              | 是否显示阴影                                |   boolean    |  true  |
| border              | 是否显示边框                                |   boolean    | false  |
| radius              | 卡片圆角大小                                |    number    |   8    |
| v-model:tab         | 当前选中的tab，只在tabs有值时生效           |    string    |   -    |
| tabs                | 设置标签页                                  | Array\<Tab\> |   -    |
| defaultTab          | 默认选中的tab，只在tabs有值时生效           |    string    |   -    |
| tabsInner           | 标签页显示位置，true-卡片内，false-卡片顶部 |   boolean    |  true  |
| cardStyle           | 自定义卡片容器样式                          |    string    |   -    |
| hFull               | 卡片容器占满父节点                          |   boolean    | false  |
| bodyBg              | 卡片容器内容带背景色                        |   boolean    | false  |
| ignorePaddingTop    | 忽略卡片内容上边距                          |   boolean    | false  |
| ignorePaddingBottom | 忽略卡片内容下边距                          |   boolean    | false  |
| ignorePaddingLeft   | 忽略卡片内容左边距                          |   boolean    | false  |
| ignorePaddingRight  | 忽略卡片内容右边距                          |   boolean    | false  |
| ignorePaddingX      | 忽略卡片内容水平边距                        |   boolean    | false  |
| ignorePaddingY      | 忽略卡片内容垂直边距                        |   boolean    | false  |

#### RePageCard 插槽

| 插槽名  | 说明                         |
| :------ | :--------------------------- |
| default | 卡片主体内容，通常是页面内容 |
| header  | 卡片头部内容                 |
| footer  | 卡片页脚内容                 |
