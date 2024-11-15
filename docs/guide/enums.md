---
title: 字典值说明
---

# 字典值说明

## 目录

- 📂 config
  - 📄 enums.ts // 维护静态枚举值
- 📂 store
  - 📂 modules
    - 📄 enums.ts // 维护全局枚举值 = 静态枚举值 + 动态枚举值

在 `store/modules/enums.ts` 文件中引用来自 `config/enums.ts` 声明的所有静态枚举值，可直接通过 `useEnumsStore` hook方法获取。

`useEnumsStore` 由 pinia 的 `defineStore` 构造方法调用返回，具体用法查看[pinia](https://pinia.vuejs.org/core-concepts/)。

## 枚举值类型

```ts
interface EnumType {
  label: string;
  value: any;
  [key: string]: any;
}
```

:::info 小TIP
枚举类型只是建议但不作为限制，通过 `useEnumsStore` hook方法可以获取完整枚举数据，想怎么用是由你决定。
:::

## 声明

### 静态枚举值

在 `config/enums.ts` 文件中定义并export枚举数据：

```ts
// 数据字典
export const BASE_STATUS = [
  { label: "启用", value: 1 },
  { label: "禁用", value: 0 }
];
```

_枚举数据格式不限，自动在`store/modules/enums.ts` import到 `state` 字段_

目前声明了一个全局的正则表达式校验枚举字段 `PATTERNS`，后续有新的正则字段可以一起声明，提高正则的复用。

### 动态枚举值

在 `store/modules/enums.ts` 文件中，在 `state` 字段声明动态枚举名称，并实现接口调用逻辑。

接口调用逻辑参考[接口调用指南](/guide/api.html)，通过pinia维护请求和更新。

```ts
import { getEnums } from "@/api/common";
// ...
actions: {
  async getEnum(code: string, defaultValue?: any) {
    const res = await getEnums(code);
    this.setEnum(code, res.data || defaultValue);
  }
}
// ...
```

_动态枚举值名称/数据格式不限_

## 引用

### 简单引用

`store/modules/enums.ts` 文件中export一个 `useEnumsStore` hook方法，在需要枚举值的地方可以手动import，通过这个hook方法获取枚举相关的store实例，通过实例获取全部枚举值（state）。

```ts
// setup
import { useEnumsStore } from "@/store/modules/enums";

const enumsStore = useEnumsStore();

console.log(enumsStore.BASE_STATUS); // 响应式
```

_基于[pinia](https://pinia.vuejs.org/core-concepts/)使用，不熟悉可以自行阅读pinia使用教程_

### 内置hook引用

`store/modules/enums.ts` 文件中export几个常用枚举值使用场景的hook方法，可以直接import这些hook进行枚举值使用，部分支持响应式。

- useEnumsStoreHook() 获取enums store实例，同 `useEnumsStore` 一致
- useEnumHook(key: string) 获取单个枚举字段【支持响应】，如果赋值给一个变量，会失去响应，需要自行嵌套一层ref。
- useEnumMapHook(key: string, valueKey: string) 获取单个枚举字段，基于valueKey指定字段进行枚举值映射。【不支持响应】_枚举值必须是对象数组格式_
- useEnumItemHook(key: string, valueKey: string, keyValue: string) 获取单个枚举字段，并根据valueKey与keyValue获取单个枚举类型。
- useEnumRefHook(key: string)：同 useEnumHook ，但是多加了一层 ref 【支持响应】
- useEnumMapRefHook(key: string, valueKey: string)：同 useEnumMapHook ，但是多加了一层 ref 【支持响应】
- useEnumPatternItemHook(valueKey: string)：获取正则枚举的单个枚举类型【不支持响应】

```ts
import {
  useEnumHook, // 响应
  useEnumRefHook //
} from "@/store/modules/enums";

const userStatus = useEnumHook("USER_STATUS"); // userStatus不响应
const userStatus = useEnumRefHook("USER_STATUS"); // userStatus响应
const userStatus = computed(() => useEnumHook("USER_STATUS")); // userStatus响应
```

```ts 获取正则枚举
import { useEnumPatternItemHook } from "@/store/modules/enums";

const rules = {
  password: [
    {
      validator: (rule, value, callback) => {
        const patternItem = useEnumPatternItemHook("PSW");
        if (value === "") {
          callback(new Error("请输入密码"));
        } else if (patternItem && !patternItem.value.test(value)) {
          callback(new Error(patternItem.message));
        } else {
          callback();
        }
      },
      trigger: "blur"
    }
  ]
};
```
