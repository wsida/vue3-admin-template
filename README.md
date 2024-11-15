<h1>vue-pure-admin精简版（非国际化版本）</h1>

[![license](https://img.shields.io/github/license/pure-admin/vue-pure-admin.svg)](LICENSE)

**中文** | [English](./README.en-US.md)

## 安装

1、安装依赖，需要先下载 `pnpm`

```sh
pnpm install
```

2、运行

```sh
npm run serve
```

3、打包

```sh
npm run build
```

4、预览

```sh
npm run preview
```

5、文档预览

```sh
npm run docs:dev
```

## 介绍

本项目基于 [vue-pure-admin](https://github.com/pure-admin/vue-pure-admin) 提炼出的架子，包含主体功能，更适合实际项目开发，打包后的大小在全局引入 [element-plus](https://element-plus.org) 的情况下仍然低于 `2.3MB`，并且会永久同步完整版的代码。开启 `brotli` 压缩和 `cdn` 替换本地库模式后，打包大小低于 `350kb`

## 许可证

[MIT © 2020-present, pure-admin](./LICENSE)
