---
title: "Icon"
---

# 项目图标引用解决方案

- ElIcon 组件
- Svg 图标
- Image 图片资源
- IconifyIconOffline 离线Iconify图标引用
- IconifyIconOnline 在线Iconify图标引用
- FontIcon 字体图标引用

下文只针对后三种方式介绍

# IconifyIconOffline

前往 [Iconify](https://icon-sets.iconify.design/) 图标库中选择图标库，通过npm安装图标库到本地，目前已经内置 `iconify/ep`(Element Plus) 和 `iconify/ri`(Remix Icon)。

在使用前通过 import 引用到vue文件

```ts
import TimeLine from "@iconify-icons/ri/time-line";
```

在通过 IconifyIconOffline 组件渲染

```vue
<IconifyIconOffline :icon="TimeLine" class="mr-[6px]" />
```

## IconifyIconOffline属性

| 字段 | 说明                  |  类型  | 默认值 |
| :--- | :-------------------- | :----: | :----: |
| icon | 必填，iconify图标对象 | object |   -    |

# IconifyIconOnline

前往 [Iconify](https://icon-sets.iconify.design/) 图标库中选择图标库，拷贝图标的命名空间和图标名称。

直接通过 IconifyIconOnline 组件渲染

```vue
<IconifyIconOnline class="text-[16px]" icon="ri:expand-height-line" />
```

## IconifyIconOnline属性

| 字段 | 说明                                         |  类型  | 默认值 |
| :--- | :------------------------------------------- | :----: | :----: |
| icon | 必填，iconify图标名称。[命名空间]:[图标名称] | string |   -    |

# FontIcon

需要下载字体图标文件到 `src/assets/iconfont` 文件中，再根据下载的字体图标类型进行引用

```vue
<!--icon-class-->
<FontIcon class="text-[16px]" icon="pure-iconfont-tabs" />
```

## FontIcon属性

| 字段     | 说明                           |                类型                |    默认值    |
| :------- | :----------------------------- | :--------------------------------: | :----------: |
| icon     | 必填，font-icon名、unicode编码 |               string               |      -       |
| iconType | font-icon格式                  | "unicode" ｜ "svg" ｜ "icon-class" | "icon-class" |

_iconType可不配置，根据实际使用处理_
