---
title: "Git提交规范"
---

# Git提交规范

> 推荐使用目前流行的规范，比如 [**Angular Git Commit Guidelines**](https://zj-git-guide.readthedocs.io/zh-cn/latest/message/Angular%E6%8F%90%E4%BA%A4%E4%BF%A1%E6%81%AF%E8%A7%84%E8%8C%83/)，同时内置 commitlint 和 git pre-commit hook，在 git 提交说明之前进行提交信息校验，以及本地代码格式校验，请严格按照规范提交。

> Git pre-commit hook 钩子基于 husky 设置，同时 git 提交规范可以查看 `commitlint.config.js` 查看 `type`，如果想新增新的 `type` 类型，可以在此文件增加。

## 提交格式

符合规范的Commit Message的提交格式如下，包含了页眉（header）、正文（body）和页脚（footer）三部分。其中，header是必须的，body和footer可以忽略。（一般也都忽略）

```
<type>(<scope>): <subject>
// 空一行
<body>
// 空一行
<footer>
```

## 页眉（header）

页眉（header）通常只有一行，包括了提交类型（type）、作用域（scope）和主题（subject）。其中，type和subject是必须的，scope是可选的。采用英文冒号(:)，冒号后接一个空格

### 提交类型（type）

提交类型（type）用于说明此次提交的类型，需要指定为下面其中一个：

| type     | 说明                                |
| :------- | :---------------------------------- |
| feat     | 新功能、新特性                      |
| fix      | 历史bug修复                         |
| perf     | 优化相关：提升性能、用户体验        |
| style    | 代码格式相关：去空格、去console.log |
| docs     | 文档补充相关、readme修改            |
| test     | 测试用例相关                        |
| refactor | 代码重构                            |
| build    | 构建编译相关修改：修改版本、依赖    |
| ci       | 集成修改【少用】                    |
| chore    | 构建流程修改，依赖修改              |
| revert   | 代码回退                            |
| types    | 类型声明修改                        |

### 作用域（scope）

作用域（scope）表示此次提交影响的范围。通常是需求单单号，或者是一些范围说明，如 api（接口）、component（组件）、style（样式）、hook、util（工具方法）、view（视图）等。如果上述都不满足则可以忽略。

### 主题（subject）

主题（subject）描述是简短的一句话，简单说明此次提交的内容。**主题内容前有个空格别忘记了**
