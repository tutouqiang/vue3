---
title:  被 npm 包依赖的基础 npm 包
theme: condensed-night-purple
meta:
  - name: description
    content: 基础 npm 包
  - name: keywords
    content: npm 仓库、javascript、wooc
createTime: 2022 年 6 月 18 日
---

# 被 npm 包依赖的基础 npm 包

js 生态是非常丰富的。但不管在 js 基础上衍生出什么框架，什么插件或是中间件的 npm 包，其底层实现逻辑都是一致的，那么支撑这些新生框架的底层 npm 包是哪些呢？我这里总结出了如下一些被反复使用的基础 npm 包

## jsonwebtoken
一个用于实现前端 token 的生成、校验、签名等一系列操作的工具包，通常以 jwt + redis 的组合出现。

### 衍生包
- eggjs
- fastify [@fastify/jwt](!https://github.com/nearform/fast-jwt/blob/master/package.json)

## ioredis
一个用于 node 连接 redis 的工具包

### 衍生包
- koa [koa-redis](!https://github.com/koajs/koa-redis)
- eggjs [egg-redis](!https://github.com/eggjs/egg-redis)
- fastify [@fastify/redis](!https://github.com/fastify/fastify-redis)

## i18next
I18next is an internationalizati

### 衍生包
- vue-i18next
- react-i18n
- angular-i18next
- node-i18n  
  
至于它到底支持多少种语言或框架使用，也许从官网的这张图上你可以看出来  

![123](https://1143667985-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2F-L9iS6Wm2hynS5H9Gj7j%2Fuploads%2FirOYLVMDW2PEQkhDdZ3N%2Fi18next_eco.jpg?alt=media&token=326ef734-6389-4950-a4d6-19f9e9daaba5)

## [xterm.js](https://github.com/xtermjs/xterm.js)
用于构建 webssh 的前端组件。让终端运行在 web 浏览器、pc 客户端上，有众多的工具基于此包开发，

### 衍生包
- vscode
- Atom
- ttyd
- Opshell 


## monaco-editor

Monaco Editor 是一款开源的在线代码编辑器。它是 VSCode 的浏览器版本

<a href="https://www.luochang.ink/gadget/monaco-speech-editor/" target="_blank">在线演示</a>
<a href="https://github.com/microsoft/monaco-editor" target="_blank">Github</a>
<a href="https://github.com/react-monaco-editor/react-monaco-editor" target="_blank">React 版本 react-monaco-editor</a>


## 
