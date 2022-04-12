# 项目配置
前端项目在本地开发环境中的基本项目配置

## 工具简述

### 编辑器配置

#### 简述
编辑器的不同和使用的人不同，会导致编辑器默认的风格不统一，可通过配置文件消除可能出现的问题。
编辑器可以统一强制使用 VScode，至于本地的配置文件可以通过配置文件跟随项目的方式解决。编辑器会优先读取项目中的配置文件。

#### 工具
- .vscode > settings.json VScode 的配置文件
- .editorconfig 大部分编辑通用的配置文件
  
### 代码语法检查

#### 简述
1、用于代码语法检查、代码美化、自动修复。

2、规避不规范的语法，统一团队编码风格，提升项目代码的可读性、可维护性

TIP：配置跟随项目，消除因个人开发工具的配置不同导致的代码风格混乱的问题

#### 具体工具
- ESlint 用于代码语法、风格检测，可以按照配置修复当前代码问题。
- Prettier 代码美化工具，经常和 ESlit 结合使用，替代 ESlint 的风格检测和格式化结果。
  
### 单元测试

#### 简述
一个项目的单元测试在大多数情况下都是很有必要的，它保证了代码开发、交付、运行过程中最基本的稳定性，保证了代码质量和较少的返工几率。虽然多数的单元测试的编写可能会多于代码本身的编写，但能做的还是尽量做。

#### 具体工具
单元测试工具有很多，需要根据项目特性进行选择、配置。
- jest 
  
### 构建工具

#### 简述
对项目进行打包编译，解决浏览器兼容、代码优化以及代码包大小等问题。也是需要根据项目特性针对选择，如果没有很多接触，那就无脑选择 Webpack 吧，它包治百病，但很多时候使用不当会产生很多冗余。

打包工具很多，目前也是属于百花齐放的状态，绚烂过后会出现几个同一方向的打包巨星和一地鸡毛。
根据自身需要选择，网上随处都可以查到打包工具对比的文章。这里举几个常见的。

#### 具体工具
- Webpack 包治百病，别人有的它都有。大而全的弊病一定是配置复杂，容易产生冗余和不必要的消耗。
- Gulp 基于流的自动化构建工具
- Rollup 适合打包 js， 亮点 Tree-shaking 分析排除未使用代码
- esBuild 利用浏览器 ESM 的优势，简单处理交给浏览器解析，开发体验特好，目前趋势
- Vite Vue 作者根据其他 ESM 打包工具开发的，目前仅建议在开发环境使用，目前比较火
- snowPack 与 esBuild相似
- parcel 主打零配置，支持范围有限。概念很好。
  
### CI 工具

#### 简述
在代码最终提交到远程 Git 仓库之前自动化执行代码检查、代码风格修复、代码测试、检查 commit 规范。
作为 CI 流程的第一步，这对仓库中的代码质量管理和后续的持续集成、持续交付至关重要。

#### 具体工具
- husky 在使用 git 命令提交代码时触发自定义 githook 执行文件，使得 git 操作触发开发者定义的执行脚本，前置处理待提交的代码
- lint-staged 对暂存的 git 文件进行代码检查、单元测试、代码修复并存储到暂存区
- commitlint 定义并校验 git commit 提交时的格式，规范每一次提交的类型、范围、内容，
  
# 基础配置

## 编辑器配置

## 代码语法检查

#### [Eslint](https://cn.eslint.org/docs/user-guide/command-line-interface)

>代码格式化检查
>
> 规范代码格式, 使得团队代码风格一致，开发体验一致。提高代码的可维护性

基本安装

```javascript
// 安装在开发环境非全局, 保持团队使用 eslint 版本、配置一致，不受个人环境影响
yarn add eslint --dev 

// 初始化 eslint 配置，根据需要选择相应的选项，完成后会在项目根目录生成一份 eslint 配置文件
./node_modules/.bin/eslint --init

// package.json 添加运行脚本, 用于执行 eslint 检查
"scripts": {
    "lint": "eslint --fix src/*"
  },

// 生成的文件 .eslintrc.js 的内容
module.exports = {
  env: { // 开发环境
    browser: true, // 浏览器环境
    es2021: true,
  },
  extends: [
    'airbnb-base', // 格式标准库--rules的集合
  ],
  parserOptions: { // 解析器，根据你的开发环境选择
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: { // 自定义格式，可覆盖标准库中的规则
  // 规则名称   错误级别   展现形式
    "quotes": ["error", "double"], // 引号：['不一致就报 error'， ‘双引号’]
  },
};

```

#### Prettier
>代码美化，修复为定义的样式


## CI 工具

#### [husky](https://typicode.github.io/husky/#/) 

>自定义 githook 执行文件，使得 git 操作触发开发者定义的执行脚本，前置处理待提交的代码
>
>替换 githook 触发的执行文件路径，由开发者定义执行脚本, 并使该文件依附项目。
>
>一般用于 git 提交前的代码检查、测试、合并、提交信息的规范化。

<br>

基本配置

```javascript
// 安装
yarn add husky --dev / npm install husky --save --dev

// 执行 husky 初始化, 完成后会在项目根目录生成 ./husky 文件
yarn husky install / npx husky install

// 生成指定 githook 'pre-commit' 阶段的脚本文件
//  命令  配置  文件地址/githook名  要执行的内容
npx husky add .husky/pre-commit 'npm run lint'

// 生成的文件内容
/**
 * #!/bin/sh
 * . "$(dirname "$0")/_/husky.sh" // 上面两行为模版生成，指定使用shell解释器执行该文件
 * 
 * npm run lint // 你要载该阶段执行的逻辑，这里之行的检查代码格式检查的脚本
 * 
*/

// 常用的几种 githook
'pre-commit': 大致对应 git commit 提交之前的阶段。
// 我在该阶段进行代码格式检查，如果格式检查不通过，则会提示在控制台并终止此次 commit 操作

'commit-msg': 通常在该阶段进行 commit msg 的格式进行校验。
// 该阶段的校验通常使用另一个 npm 库 commitlint 来实现, 详情见下方 commitlint 的描述
```

#### lint-staged
>对暂存的 git 文件运行 linter

#### [commitlint](https://commitlint.js.org/#/guides-local-setup)

>定义并校验 Git commit 提交时的格式

安装步骤，点击标题参考官网即可，官网文档非常详细

```javascript
// 每次提交 commit 时 最好注明提交类型、范围、描述，便于团队协作、管理
// 主流类型为 git commit -m '<type>(scope): "subject"'
// 例如：    git commit -m 'feat(登陆模块): "完成登陆功能"'

// 这条命令在 husky 文件中添加了 hooks 事件 ‘commit-msg’, 事件触发时 执行 commitlint 脚本
yarn husky add .husky/commit-msg 'yarn commitlint --edit $1'

// 根据安装命令生成的 配置文件
echo "module.exports = {extends: ['@commitlint/config-conventional']}" > commitlint.config.js

// 也可以手动创建 commitlint.config.js, 文件结构和配置方式与 eslint 非常相像
module.exports = { 
  extends: ['@commitlint/config-conventional'] // 当前 commit 校验使用的标准库（可插拔），内容可见下方
  rules: { // 这里自定义的配置会覆盖 @commitlint/config-conventional 中的规则
    'scope-enum': [ // 自定义 范围规则
      2,
      'always',
      ['server', 'client']
    ],
    'type-enum': [ // 自定义 类型规则
      2,
      'always',
      ['feature']
    ]
  }
};
```
基本配置完成，开始验证
> 
> 现在执行 git commit -m 'feat(ser): "init"'    

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4f8e474d71674cdca1d22c4598060a53~tplv-k3u1fbpfcp-watermark.image?)

> 提交不规范，并且提示相对应的错误信息，基本配置已经生效 
> 
<br>

根据 [commitlint-config-conventional](https://github.com/conventional-changelog/commitlint/blob/master/%40commitlint/config-angular/index.js)（基于 Angular 约定）常见的类型是：
>- build
>- chore
>- ci
>- docs
>- feat
>- fix
>- perf
>- refactor
>- revert
>- style
>- test
>
> 也可以根据配置自己拓展，官网中有很多共享的标准包，或者你可以按照官网的描述，自己配置一个特有的类型包，并可以共享给他人使用。项目结构依照 commitlint-config-conventional 的结构即可
> 
<br>

[rule配置](https://commitlint.js.org/#/reference-rules)

所有的配置可以有更细颗粒度的要求，比如type、scope、subject 的长度、大小写等。
