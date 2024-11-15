---
title: 权限说明
---

# 权限说明

## 涉及

- 路由权限
- 页面级权限

## 目录

- 📂 components
  - 📂 ReAuth // 提供re-auth组件，用于页面组件通过包裹元素来控制元素展示隐藏。
- 📂 directives
  - 📂 auth // 提供v-auth指令，用于页面组件通过指令声明控制元素展示隐藏。
- 📂 router
  - 📂 modules.ts // 页面路由配置，可在meta字段中声明 roles 或 auths 字段，用于控制路由权限。
  - 📄 index.ts // 声明了beforeEach路由守卫，在路由守卫中基于路由的 `meta.roles` 和 `meta.auths` 配置进行权限判断拦截。
  - 📄 utils.ts // 提供 hasAuth 方法，用于判断是否有权限。权限判断实现方式均基于此方法。还提供 getAuths 方法获取权限码，可用于自己做权限判断。

:::danger 注意
如果项目配置 `IgnorePermission` 会直接忽略所有权限码判断。
:::

## 约定

权限码格式为 `字段串`，使用字符串方便表示含义。

字符串格式无限制，可自行约定命名，这里的建议是 `\[模块名\]:\[操作\]`，_模块名=菜单名\[*子模块名\]\[*子模块名\]_

## 初始化

**需要先确定权限码何时返回已经返回的接口调用**

模版默认在登录成功之后调用 `initRouter` 执行路由、权限初始化，

`initRouter`方法内部根据项目配置`AsyncMenus` 字段判断是否基于动态路由菜单模式，分别采用 `getAsyncMenus` 或 `getUserPermissions` 两种途径获取权限码。

## 引用

如果项目开启权限码控制，项目配置 `IgnorePermission = false`

### router

查看 `router/index.ts` 文件中的 `beforeEach` 方法：

::: code-group

```ts [index.ts]
// ...
if (Cookies.get(multipleTabsKey) && userInfo) {
  // ...
  if (
    !getConfig()?.IgnorePermission &&
    (!isOneOfArray(to.meta?.roles, userInfo?.roles) ||
      !isOneOfArray(to.meta?.auths, getAuths()))
  ) {
    next({ path: "/error/403" });
  }
  // ...
}
```

:::

全局路由守卫需要判断用户是否已经登录：基于cookie字段 multipleTabsKey 以及 缓存的用户信息，如果不需要cookie字段，可以移除判断条件（为了做浏览器多标签页打开免重复登录）

路由的权限判断基于 角色、权限码

判断匹配：命中一个路由meta配置的一个角色或权限码即可

### v-auth指令

v-auth指令已经全局注册，可直接使用

::: details 示例

```vue
<template>
  <el-space wrap>
    <el-button v-auth="'permission:add'" plain type="warning">
      拥有code：permission:add 权限可见
    </el-button>
    <el-button v-auth="['permission:edit']" plain type="primary">
      拥有code permission:edit 权限可见
    </el-button>
    <el-button
      v-auth="['permission:add', 'permission:edit', 'permission:delete']"
      plain
      type="danger"
    >
      同时拥有code：permission:add, permission:edit, permission:delete 权限可见
    </el-button>
    <el-button
      v-aut.one="['permission:add', 'permission:edit', 'permission:delete']"
      plain
      type="danger"
    >
      拥有其中一个code：permission:add, permission:edit, permission:delete
      权限可见
    </el-button>
  </el-space>
</template>
```

:::

v-auth指令绑定值支持 字符串或字符串数组，需要注意如果是字符串需要加**引号**，否则会当成字段。

v-auth指令支持 `.one` 修饰符，只有绑定的权限码是数组时有效，表示命中数组中的一个权限码即表示有权限，默认需要命中数组所有权限码才表示有权限。

### re-auth组件

re-auth组件已全局注册，可直接使用

::: details 示例

```vue
<template>
  <el-space wrap>
    <ReAuth value="permission:add">
      <el-button plain type="warning">
        拥有code：permission:add 权限可见
      </el-button>
    </ReAuth>
    <ReAuth :value="['permission:edit']">
      <el-button plain type="primary">
        拥有code：permission:edit 权限可见
      </el-button>
    </ReAuth>
    <ReAuth :value="['permission:add', 'permission:edit', 'permission:delete']">
      <el-button plain type="danger">
        同时拥有code：permission:add, permission:edit, permission:delete
        权限可见
      </el-button>
    </ReAuth>
    <ReAuth
      one
      :value="['permission:add', 'permission:edit', 'permission:delete']"
    >
      <el-button plain type="danger">
        拥有其中一个code：permission:add, permission:edit, permission:delete
        权限可见
      </el-button>
    </ReAuth>
  </el-space>
</template>
```

:::

组件提供 `value` 属性绑定权限码，支持字符串或字符串数组

支持通过 `one` 属性（boolean）控制权限判断方式，同 `v-auth.one`

### hasAuth方法 / getAuths方法

除了上述两种方式，当然你也可以自定通过原始判断方法 `hasAuth` 自行控制，在一些js逻辑层面上进行控制

::: code-group

```ts [utils.ts]
import { hasAuth, getAuths } from "@/router/utils";
import { ref } from "vue";

const hasAddPermit = ref(hasAuth("permission:add"));
const permission = computed(() => getAuths());

function onAdd() {
  if (!hasAddPermit.value) return;
  // ...
}

function onDelete() {
  if (!permission.value.includes("permission:delete")) return;
  // ...
}
```

:::

::: details 示例

```vue
<template>
  <el-space wrap>
    <el-button v-if="hasAuth('permission:add')" plain type="warning">
      拥有code：'permission:add' 权限可见
    </el-button>
    <el-button v-if="hasAuth(['permission:edit'])" plain type="primary">
      拥有code：['permission:edit'] 权限可见
    </el-button>
    <el-button
      v-if="hasAuth(['permission:add', 'permission:edit', 'permission:delete'])"
      plain
      type="danger"
    >
      同时拥有code：permission:add, permission:edit, permission:delete 权限可见
    </el-button>
    <el-button
      v-if="
        hasAuth(
          ['permission:add', 'permission:edit', 'permission:delete'],
          true
        )
      "
      plain
      type="danger"
    >
      拥有其中一个code：permission:add, permission:edit, permission:delete
      权限可见
    </el-button>
  </el-space>
</template>
```

:::

hasAuth方法支持两个参数：

- 第一个参数：判断权限码，支持字符串或数组，必填
- 第二个参数：数组判断方式是否采用匹配一个即为true，默认false，表示数组所有都要匹配
