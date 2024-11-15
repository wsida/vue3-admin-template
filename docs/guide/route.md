---
title: 路由说明
---

# 路由说明

> 路由系统是个比较繁琐的约定，目前比较常见的处理方式有静态路由/动态路由两种方式。

## 简介

本项目为了兼容更多使用场景，同时支持了静态路由以及动态路由配置。

可以通过项目配置`AsyncMenus` 字段控制，如果为`true`，则需要后端提供菜单管理功能，项目代码通过后端接口返回菜单页配置，用于动态路由创建以及菜单展示，返回的动态配置内容可以只包含菜单页，也可以包含子页面，项目会自动根据约定格式构造菜单以及注入对应的路由配置，这些动态路由是可以直接跳过权限码校验，当然你想校验也是可以的，对了，菜单层级目前只支持两级菜单展示，层级太深处理不了哦。可阅读 `utils.ts` 相关代码。

如果为 `false`，需要在 `router/modules` 目录中配置所有的页面路由，至于菜单你也可以通过配置交给项目自行构造，所以你需要掌握好路由配置项。

**目前菜单支持两级菜单，因此路由的声明尽量不要超过两级，** 建议声明的路由都按同级处理，即使是子页面，这样你可以避免需要处理一层 router-view，假如你真的很需要使用嵌套路由的话，父路由模版也给你提供了一个简单的 `layout/router` 路由组件，方便你配置，如果你想要定制化这个父路由，那需要你自行处理。

:::warning 动态路由绑定组件问题
采用动态路由方式，需要指定路由关联的组件，目前主要采用组件路径命中匹配方式，这将会让动态路由配置与你的组件声明目录有耦合。你可以直接通过后台配置一个component字段，字段值为组件在前端的完整路径：`/src/views/**/*.{vue,tsx}`；若是未指定component字段，将会通过 path 配置项进行命中匹配，**所以**，请规范声明path以及组件目录。
:::

::: code-group

```ts [utils.ts]
const modulesRoutes = import.meta.glob("/src/views/**/*.{vue,tsx}");

// addAsyncRoutes 方法
```

:::

## 目录

- 📂 router
  - 📂 modules.ts // 页面路由配置，自动import该目录所有的声明文件，加入路由。
    - 📂 page // 声明一些菜单级别的路由，非必要
    - 📄 default.ts // 声明一些登录后全局共用的路由，非必要，但建议保留。若是不需要可以删除，记得删除一些index.ts\utils.ts中的依赖代码
    - 📄 error.ts // 一些全局共用的异常页面路由，不受权限控制
    - 📄 home.ts // 根路由声明，不建议修改。可以删除清空默认的子路由，如welcome。
    - 📄 remaining.ts // 一些未登录前的页面路由，不受权限控制，如果不需要可以删除，记得删除一些index.ts\utils.ts中的依赖代码
  - 📄 index.ts // 创建路由实例、声明了beforeEach路由守卫。
  - 📄 utils.ts // 提供一些路由构建方法、权限判断方法
- 📂 store
  - 📂 modules
    - 📄 permission.ts // 由路由自动构建的菜单数据

:::info 小TIP
若是完全采用动态路由方式（AsyncMenu = true），则你完全可以不需要 page 这个目录，只需要在default.ts中定义一些公共的路由，但是，如果你采用的动态路由只有菜单页面，则我想你需要page目录维护菜单的一些子页面路由（不需要在菜单上展示）。当然，你如果不采用动态路由方式，那page目录是你必须使用的，你若是想换目录名当然没问题。
:::

## 路由配置项

### 静态路由配置

基础的路由声明，请查阅[Vue-Router](https://router.vuejs.org/zh/)

```ts
// 按常用声明顺序排序
interface RouteRecordBase {
  name?: string;
  path: string;
  redirect?: string;
  component: string | Component;
  children?: RouteRecordBase[];
  meta?: CustomizeRouteMeta;
  beforeEnter?:
    | NavigationGuardWithThis<undefined>
    | NavigationGuardWithThis<undefined>[];
  props?: Record<string, any>;
  alias?: string;
  components?: Record<string, string | Component>;
  // ...
}
```

路由配置的主要功能有 meta 配置维护，因此重点需要了解meta配置，包含了一些菜单显示、控制页面布局内容、路由缓存等。

::: details Meta配置

```ts
interface CustomizeRouteMeta {
  /** 菜单名称（兼容国际化、非国际化，如何用国际化的写法就必须在根目录的`locales`文件夹下对应添加） `必填` */
  title: string;
  /** 菜单图标 `可选` */
  icon?: string | FunctionalComponent | IconifyIcon;
  /** 菜单名称右侧的额外图标 */
  extraIcon?: string | FunctionalComponent | IconifyIcon;
  /** 是否在菜单中显示（默认`true`）`可选` */
  showLink?: boolean;
  /** 是否显示父级菜单 `可选` */
  showParent?: boolean;
  /** 页面授权角色 `可选` */
  roles?: Array<string>;
  /** 页面依赖权限设置 - 子页面 `可选` */
  auths?: Array<string>;
  /** 路由组件缓存（开启 `true`、关闭 `false`）`可选` */
  keepAlive?: boolean;
  /** 内嵌的`iframe`链接 `可选` */
  frameSrc?: string;
  /** `iframe`页是否开启首次加载动画（默认`true`）`可选` */
  frameLoading?: boolean;
  /** 页面加载动画（两种模式，第二种权重更高，第一种直接采用`vue`内置的`transitions`动画，第二种是使用`animate.css`编写进、离场动画，平台更推荐使用第二种模式，已经内置了`animate.css`，直接写对应的动画名即可）`可选` */
  transition?: {
    /**
     * @description 当前路由动画效果
     * @see {@link https://next.router.vuejs.org/guide/advanced/transitions.html#transitions}
     * @see animate.css {@link https://animate.style}
     */
    name?: string;
    /** 进场动画 */
    enterTransition?: string;
    /** 离场动画 */
    leaveTransition?: string;
  };
  /** 当前菜单名称或自定义信息禁止添加到标签页（默认`false`） */
  hiddenTag?: boolean;
  /** 当前菜单名称是否固定显示在标签页且不可关闭（默认`false`） */
  fixedTag?: boolean;
  /** 动态路由可打开的最大数量 `可选` */
  dynamicLevel?: number;
  /** 将某个菜单激活
   * （主要用于通过`query`或`params`传参的路由，当它们通过配置`showLink: false`后不在菜单中显示，就不会有任何菜单高亮，
   * 而通过设置`activePath`指定激活菜单即可获得高亮，`activePath`为指定激活菜单的`path`）
   */
  activePath?: string;
  /**
   * 是否隐藏菜单
   */
  hiddenMenus?: boolean;
  /**
   * 是否隐藏历史访问标签页
   */
  hiddenTags?: boolean;
  /**
   * 路由排序，如果是静态路由是非常必要的，用于控制菜单的展示顺序
   */
  rank?: number;
}
```

:::

### 动态菜单（动态路由）配置

动态菜单配置基于上述的路由配置以及meta配置进行维护构造即可：

::: details 示例

```ts
const permissionMenus = [
  {
    path: "/permission",
    name: "Permission",
    meta: {
      title: "权限管理",
      icon: "ep:lollipop",
      rank: 100
    },
    children: [
      {
        path: "/permission/role",
        name: "Role",
        meta: {
          title: "角色管理",
          rank: 2
        }
      },
      {
        path: "/permission/button",
        name: "Button",
        meta: {
          title: "按钮权限管理",
          rank: 2
        }
      },
      {
        path: "/permission/authorize",
        name: "Authorize",
        meta: {
          title: "权限码管理",
          rank: 2
        }
      }
    ]
  },
  {
    path: "/role",
    name: "Role2",
    meta: {
      title: "角色管理",
      icon: "ep:user",
      rank: 2
    }
  }
];
```

:::

## 最终路由

不论是动态路由还是静态路由最终构造的路由格式是一致的：

```ts
[
  {
    path: "/",
    name: "Home",
    component: Layout,
    meta: {
      icon: "ep:home-filled",
      title: "首页",
      rank: 0
    },
    children: [
      // 动态路由/静态路由，都会被flat到这里，包括 default.ts / page目录下的所有路由
      // error.ts 声明的路由
    ]
  },
  // remaining.ts 声明的路由
  {
    path: "/:pathMatch(.*)",
    name: "pathMatch",
    redirect: "/error/404"
  }
];
```

remaring.ts 文件声明的路由不放在 根路由 `/` 下，所有的动态路由或声明的静态路由，包括error.ts文件，都会被拍平成二级放在根路由 `/` 下，最终给路由增加一个全局404为匹配的路由，作为保底的命中路由。
