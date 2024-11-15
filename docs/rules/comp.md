---
title: 组件规范
---

# 组件规范

> 项目使用 Vue3 + Ts开发，对于单文件组件不做格式限制，你可以使用tsx或者vue文件声明，组件内容也可以根据习惯使用组合式或者选项式开发。

全局组件加入 `src/components` 目录下，可以直接在使用的时候引用。如果组件有基于项目功能进行封装，想要全局注册的话可以在 `setup.ts` 文件引用（参考ReAuth组件），如果是完全独立的组件，可以在 `index.ts` 引用，会自动注入到全局。

如果是模块组件，请直接在对应的模块内声明 components 目录进行维护。

## 组件声明规范

### 选项式组件声明

可以参考[Vue2的分割指南](https://v2.cn.vuejs.org/v2/style-guide/)

几点必要规范：

- 组件名使用多单词，建议采用单词大写开头 (PascalCase)，如果是独立目录的组件声明，可以小写文件名，但是name字段一定要写，导出组件时也是大写开头的组件名。
- data 必须是函数
- props 声明尽量详细，或者通过备注描述清楚功能
- v-for 设置键值，如果有唯一id一定用唯一id，少用索引
- 避免 v-if 和 v-for 用在一起，及时vue3修改了优先级，还是建议分开，语法清晰
- 请保持组件的样式作用域 `scoped`
- 耦合组件请通过组件名体现
- template 绑定简单的表达式，避免复杂表达式，可以抽成computed或者methods函数
- computed 计算属性尽量细化，提高字段复用同时避免复杂计算，要保持纯函数
- 选型书写顺序：name，mixins，components，[私有字段]，props，data，setup，computed，watch，生命周期钩子，methods，render

### 组合式组件声明

- script 遵循 import在最顶层，同时组件引用优先（记得带.vue/.tsx后缀），其次是api/工具方法等，最后是类型引用
- 相同类型响应字段尽量放一起声明：defineProps，defineEmits，useAttars，useSlots，ref，shallowRef，reactive，computed，watch，watchEffect，生命周期钩子，methods，defineExpose
- methods尽量使用Function关键字声明，使用箭头函数虽然也可以，但是没有变量提升，需要注意声明顺序
- 如果有可复用的组合式api，请大胆尝试抽离使用，减少单文件组件的大小

:::warning
单文件的模版内容非常大时，请合理分离多个子组件，进行引用，可以优先分离代码，提高可读性，同时在template渲染也能有一定优化效果，避免过大的渲染。
:::

## 组件使用规范

- 属性声明使用横线连接 (kebab-case)的格式，属性过长单行书写（内置格式化工具会自动处理）
- 属性声明顺序 v-if/v-show 等指令，ref，v-model，静态属性，动态属性，事件
- 组件使用允许大写格式，也允许横线连接 (kebab-case)，推荐自闭合的方式用大写格式，带内容使用横线连接 (kebab-case)
