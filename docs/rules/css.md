---
title: 样式规范
---

# 样式规范

## 目录

- 📂 style
  - 📂 components // 自定义组件样式，一些需要注入全局的样式
  - 📂 element-plus // 改写element-plus样式
  - 📂 mixins // 定义scss工具方法，已通过vite插件注入所有vue文件，可以直接通过 @include scsss关键字使用。
  - 📂 pages // 定义模块页面样式，一些需要注入全局的样式
  - 📂 theme // 定义主题样式，目前只有暗黑dark
  - 📂 transition // 定义一些过渡样式/动画样式
  - 📄 variable.scss // 声明css3变量或者全局的scss变量，已通过vite插件注入所有vue文件，可以在单文件中的scss样式声明直接使用scss变量。
  - 📄 index.scss // 全局样式文件入口，引用样式模块文件，定义一些 css3变量、基础样式

```js
{
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "@/style/variable.scss"; @import "@/style/mixins/mixins.scss";';
      }
    }
  }
}
```

## 样式命名规范

同element-plus一样采用 `bem` 样式命名规范：

> Bem 是块（block）、元素（element）、修饰符（modifier）的简写，由 Yandex 团队提出的一种前端 CSS 命名方法论。

BEM的核心概念包括：‌

- Block：‌页面上的独立块，‌具有明确的语义和功能。‌例如，‌header, container, menu 等。‌
- Element：依赖块的元素。‌例如，‌menuitem, listitem, checkboxcaption 等。‌
- Modifier：‌用于表示块或者元素的行为或状态。‌例如，‌disabled, highlighted, checked 等。‌

BEM的命名规则如下：‌

- `-` 中划线 ：作为连字符使用，表示某个块（Block）或者某个子元素（Element）的多单词之间的连接记号。
- `__` 双下划线：双下划线用来连接块（Block）和块的子元素（Element）。
- `--` 双中划线：双中划线用来描述一个块（Block）或者块的子元素（Element）的一种状态。
- `is-` 前缀：简单的状态样式命名

_可查看 `style/mixins/config.scss` 文件_

BEM 命名约定模式：

```css
.block {
}

.block__element {
}

.block--modifier {
}

.is-modifier {
}
```

同时，为了提供block的区分，增加了block的命名前缀：`ap-`

如果不需要这个前缀或者想修改前缀，可全局搜索替换，建议在项目启动前就替换，否则后期替换成本较高。

:::info 小TIP
虽然是命名规则，但未做强制的命名限制，只是作为一种命名约定。目前scss样式声明提供混入方法用于规则声明样式，但是在template未提供相应的样式声明工具方法，因为觉得会限制开发效率，所以建议在一个单文件组件中声明模版以及样式，方便维护查找。
:::

在 `style/mixins/mixins.scss` 文件中提供了bem命名方法，可以直接在声明scss样式的时候直接使用

:::code-group

```scss 混合方法
// 块样式声明
@mixin b($block) {
  /* ... */
}
//元素样式声明
@mixin e($element) {
  /* ... */
}
// 修饰符样式声明
@mixin m($modifier) {
  /* ... */
}
// 元素样式声明，支持传块样式名
@mixin be($element, $block: $B) {
  /* ... */
}
// 状态样式声明
@mixin when($state) {
  /* ... */
}
```

```vue scss声明使用示例
<style lang="scss" scope>
@include b(card) {
  // block 样式声明
  @include e(header) {
    // element 样式声明
    @include m(disabled) {
      // 修饰样式声明
    }
    @include when(error) {
      // 简单修饰样式声明
    }
  }
  @include m(border) {
    // 修饰样式声明
  }
  @include when(full) {
    // 简单修饰样式声明
  }
}

/**
* 等价于
.ap-card {
  &__header {
    &--disabled {}
    &.is-error {}
  }
  &--border {}
  &.is-full {}
}
*/

/**
* 编译后
.ap-card {}
.ap-card.ap-card--border {}
.ap-card.is-full {}
.ap-card__header {}
.ap-card__header.ap-card__header--disabled {}
.ap-card__header.is-error {}
*/
</style>
```

:::

## 样式声明规范

项目继承了 [`tailwindCsss`](https://www.tailwindcss.cn/)，一些基础简单的样式声明，可以直接使用 tailwindCsss 的样式类，以减少样式体积。

如果是比较长的 tailwindCsss 的样式声明，**建议**不要直接在template写，过长导致代码阅读性很差，可以搭配bem命名规范声明样式类，通过 `@apply` 引用 tailwindCsss 的样式声明，从而实现样式复用。

当然，你也可以用最原始的样式进行声明，但是，请配合bem命名规范。

::: details 示例

```vue
<template>
  <div class="ap-card">
    <div class="ap-card__header">
      <h2 class="ap-card__title">Title</h2>
    </div>
    <div class="ap-card__body">
      <section class="leading-4">Section one</section>
      <section class="leading-4">Section two</section>
      <div class="text-[12px] leading-3">Other</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@include b(card) {
  @apply relative overflow-hidden flex flex-col;
  @include e(header) {
    @apply relative flex-shrink-0 h-[40px] px-4 py-2 flex items-center;
  }
  @include e(title) {
    @apply flex-1 overflow-hidden text-ellipsis whitespace-nowrap text-[16px] text-black leading-6;
  }
  @include e(body) {
    @apply relative px-4 py-2;
  }
}
</style>
```

:::

:::danger 小TIP
过于简单的命名，虽然方便，但是容易产生样式污染，不方便排查。目前通过bem + scoped的样式声明方式，能极大的减少样式污染的问题。
:::

遇到一些颜色或者圆角等基础样式时，使用Element-PLUS已经声明的css3变量（声明在root的变量），若是不方便查找，可以拷贝至 `variables.scss` 文件中。可以查找node_modules找到源文件，也可以通过控制台面板的Element面板找到。

几点具体样式声明规范：

- 每个样式独立一行
- 省略 0 后面的单位
- 使用scss语法声明的样式不建议 @import css文件，可直接引用 .scss 源文件，记得带 .scss 后缀
- 样式书写顺序：布局相关 =》盒子相关 =》字体相关 =》其他

```css
div {
  display: block;
  position: relative;
  left: 0;
  top: 0;
  box-sizing: "border-box";
  padding: 0;
  margin: 0;
  height: 100px;
  width: 100px;
  background-color: red;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.85);
  line-height: 22;
}
```
