---
title: 众多 node 框架都使用到的基础 npm 包
theme: condensed-night-purple
createTime: 2022 年 6 月 18 日
---
# 众多 node 框架离不开的基础 npm 包

node 的生态是非常丰富的。但不管在 node 基础上衍生出什么框架，什么插件或是中间件的 npm 包，其底层实现逻辑都是一致的，那么支撑这些新生框架的底层 npm 包是哪些呢？我这里从我接触的 node 框架中总结出了如下一些被反复使用的基础 npm 包

## jsonwebtoken
一个用于实现前端 token 的生成、校验、签名等一系列操作的工具包，通常以 jwt + redis 的组合出现。

### 基于 jsonwebtoken 构建的包
- eggjs
- fastify [@fastify/jwt](!https://github.com/nearform/fast-jwt/blob/master/package.json)

## ioredis
一个用于 node 连接 redis 的工具包
### 基于 ioredis 构建的包
- koa [koa-redis](!https://github.com/koajs/koa-redis)
- eggjs [egg-redis](!https://github.com/eggjs/egg-redis)
- fastify [@fastify/redis](!https://github.com/fastify/fastify-redis)

