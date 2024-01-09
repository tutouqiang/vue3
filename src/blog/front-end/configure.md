---
title: 一个前端项目需要哪些配置
meta:
  - name: description
    content: 前端项目配置项
  - name: keywords
    content: 前端项目配置项：husky、lint-staged、commitlint、eslint、prettier、stylelint、babel、webpack、rollup、vite、vue、react、typescript
createTime: 2021 年 10 月 11 日
updateTime: 2022 年 4 月 1 日
---
# 一个前端项目需要哪些配置
前端开发框架众多，作为一个标准的前端项目来说，不同框架的配置基本上是一致的，在不同的项目开发及学习中也在持续有新的配置项出现，那就持续记录。  

## 现状
前端项目随着发展时间越来越长，各种框架及工具也带来了越来越臃肿的项目配置，比如常用的三剑客：husky、lint-staged、commitlint 的配置也需要多个包的下载和配置。  
每个 npm 的功能单一、明确固然是好的，但随着项目配置的精细化所需要的工具也是越来越多的，一个正常情况下的项目配置至少都需要超过 10 个以上的 npm 包的配置文件，我来举个例子。  

- babel js语法装换必备
- vite 构建工具，算是比较简洁的打包工具了， webpack 一般都需要根据环境配置三个文件
- husky 根据 githook 方法执行各种检查
- lint-staged 做代码的 lint 并重新添加到 git 缓存中
- commitlint 对 git commit 的提交信息进行规范校验
- eslint 代码语法检查
- prettier 代码风格检查
- .npmrc 配置 npm 镜像库
- typeScript js的类型语法
- stylelint 样式的 lint
  
以上我只是列出了一些项目基本必备的需要额外配置文件的工具，还有一些常用的文件如下

- 编辑器文件  .vscode、.editorconfig
- git 文件 .gitignore
- 单元测试 jest.config.js
- 项目管理器 pnpm-lock.yaml or lerna.json
- SEO 文件 robots.txt、sitemap.xml

有一些工具是需要多个配置文件的，当然也可以将一些文件的配置集合到 package.json 中，但依然掩盖不了配置文件越来越多，越来越复杂的趋势和现状。  
一般 to B、to G 的开发者也许感觉不到，但对于 to C 或是参与开源项目的大多数开发者对这个现象是很容易产生共鸣的。  
ES 模块的推广是一个利好消息，已有的及正准备开发 npm 包的开发者都在顺应 ES 统一天下的趋势，当大部分 npm 包支持 ES 模块的时候就会出现一些集成的 npm 模块出现，尽量减少配置流程及泛滥的配置文件。  
这也得益于 terser 的打包策略支持 ES 模块，未被引用的功能会被构建工具过滤掉，无需担心最终构建包的冗余无用代码

## 项目配置
记录前端项目使用到的配置极其作用

## 编辑器
用来统一各浏览器下的行为一致，而且各编辑器也是以项目中的配置文件为第一顺位，防止因不同开发者的本地编辑器配置或使用不同的编辑器造成的格式错误。
vscode .vscode

**.editorconfig**  

配置一般为

```bash
# EditorConfig is awesome: https://EditorConfig.org

# top-most EditorConfig file
root = true

# Unix-style newlines with a newline ending every file
[*]
end_of_line = lf
insert_final_newline = true
charset = utf-8
indent_style = space
indent_size = 2

[{*.json,*.md,*.yml,*.*rc}]
indent_style = space
indent_size = 2

```
## 代码转换
**TypeScript**  
JS 的静态类型，需要将 TS 编译为 JS 后才可运行。

配置文件: tsconfig.json

**Babel**  
主要用来进行 JS 的语法转换，对新型的 JS 语法装换为 ES5 语法最为常用，用于兼容较老版本浏览器及方法过新而浏览器尚未支持的 JS 新特性。

也可以用来做 TS 到 JS 的编译

babel 的配置也是比较复杂的，经常有一堆的配置插件需要下载。

配置文件为 .babelrc
## 代码检查

**Eslint**  
根据框架、js 语法版本、是否有协作的包决定决定配置

配置文件: .eslintrc、.eslintignore

**Prettier**  
代码风格检查，通常与 Eslint 搭配使用。
Prettier 的所有配置如下，根据需要的风格配置即可

配置文件： .prettierrc、.prettierignore

**Stypelint**  
样式检查。对代码中的 css 部分进行格式检查，这个的使用量是偏少的，但良好的 css 代码对于项目的优化来说是不可忽视的。比如 css 进行布局时的代码书写顺序、css 动画执行时调用 GPU 渲染、不同 css 布局对于页面渲染速度的优化。

## Git 操作
**Git**  
用于规定 git 提交的文件范围，如：node_module、dist 这些文件是没必要提交到代码仓库的，那就需要在提交的配置忽略这些文件的提交

配置文件: .gitignore

**Husky**  
主要是改写 githook。常用到的两个 githook 为 commit-msg、pre-commit 。  

pre-commit：即 commit 提交前触发的函数，通常在这个阶段进行代码检查、代码修复、单元测试，以保证提交代码的风格正确、功能正确  

commit-msg：即 commit 提交时触发，主要用来对 commit message 进行校验，以保证 message 信息的规范性，易于识别每个 commit 内代码的修改范围，必要时进行 commit 删除和代码回滚。

配置文件: .husky

**lint-staged**  
一般配合 Husky 中 pre-commit 阶段使用，功能上会借助 eslint、prettier 对代码进行风格检查和修复。

代码修复则必然产生新的代码修改，lint-staged 则在代码修复之后自动的将这部分代码添加在暂存区。底层也是操作 githook。

一般配置在 package.json 中

**commitlint**  
一般配合 Husky 中 commit-msg 阶段使用。

主要是 commit message 的校验规范，配置规则可通过新增拓展插件使用，也可以根据自身需要自己配置。如我在一个项目中使用插件 @commitlint/config-conventional。 

配置文件: .commitlintrc.js

配置如下
```js
// commit-msg 的检查工具。默认规则如下
// build
// chore
// ci
// docs
// feat
// fix
// perf
// refactor
// revert
// style
// test

module.exports = {
  extends: ['@commitlint/config-conventional']
  // 可自定义规则, 在 extends 下添加如下配置, 具体规则可见官方文档： https://commitlint.js.org/#/guides-local-setup
  // rules: {
  //   'feature': [0, 'always', 72],
  // }
}
```

## 包管理器
**npm**
配置 npm 镜像地址，因为 npm 镜像源在国外，下载速度有时候比较感人，所以国内使用淘宝源的比较多，但在本地配置并不是一个好主意，所以一般 npm 拉取的镜像源地址配置一般跟随项目，也更方便切换和管理。

配置文件: .npmrc

```bash
# 淘宝镜像源  https://npmmirror.com/
registry=https://registry.npmmirror.com

# 腾讯镜像源  https://mirrors.cloud.tencent.com
# registry=https://mirrors.cloud.tencent.com/npm/

# 华为镜像源  https://mirrors.huaweicloud.com
# registry=https://mirrors.huaweicloud.com/repository/npm/
```

## 构建工具

## SEO
**robots.txt**  
用来配置爬虫爬取的内容，以提升网站在各搜索引擎中的收录情况及排名情况，提升网站搜索展现的几率。同时也可以保护网站资源不被爬取。虽然现花钱是个提升网站排名更加容易的方法，但对于个人展示网站、博客网站来说还是很香的。

配置内容一般为
```text
```

**sitemap.xml**  
网站地图文件，用来向爬虫说明当前网站可爬取的页面数量，提升每一页的收录、排名，提升主站权重及展现几率
如果网站页面较多，手动配置还是比较繁琐的，一般都是通过网站生成即可。
