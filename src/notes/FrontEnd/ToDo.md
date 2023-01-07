# 浏览器
## SEO
网站内容
网站导向、被导向
网站的导向网站的权重，被其他网站导向的次数多也会增加本网站的权重
网站的权重越高，排名越前。
1. 对网站的标题、关键字、描述精心设置，反映网站的定位，让搜索引擎明白网站是做什么的；
2. 突出重要内容---合理的设计 title、description 和 keywords
3. 在网站上合理设置 Robots.txt文件；
4. 生成针对搜索引擎友好的网站地图，合理使用 html 标签，导航层级切勿嵌套太深；
5. 增加外部链接，并在属性上添加 el="nofollow" 属性，避免爬虫爬取外链而跳出。
6. 网页 ssr 渲染，利于爬虫爬取信息。维护首屏加载速度，过长爬虫会离开
 

## 渲染流程

## 性能优化
1. 减少 HTTP 请求，升级 HTTP 2
2. 降低静态资源大小，采用雪碧图、iconfont、懒加载方式提高渲染速度和资源下载速度
3. 减少无用代码，tree sharking
4. 减少 reflow、repaint
5. 避免使用 css 计算等复杂属性，动画使用 css3 transform 调用 Gpu 加速，requestAnimation API 逐帧渲染
6. 使用 ssr 渲染，减少本地渲染流程

## BOM、DOM
## 跨域
同源策略：协议、域名、端口相同
跨域：不满足同源策略的请求，都会被浏览器拦截，这涉及到能不能请求本地缓存数据。
https://juejin.cn/post/6844903767226351623

jsonp
1. 动态创建 script 标签，给 src 塞入 链接，url 中设定回调函数，接收服务端的响应报文
只支持get请求，容易受到xss、csrf 攻击，不安全
postMessage
h5 的新api

cors  
服务端设置 Access-Control-Allow-Origin 为指定域名或者通配符，表示哪些网站可以访问。
复杂请求时会比 http 流程多一个预检请求，用来请求服务器是否支持跨域请求
ngxin
反向代理
### iframe
不安全
### 代理转发
## webWork
处理 js 逻辑但不能处理 DOM，使用 postMassage 与主线程通信降低主线程的消耗，提升整体加载速度。
## 信息收集
### 性能信息
使用 BOM API performance 去分析页面各个环节的耗时。
### 请求信息
使用 axios 等请求库，对页面的 request、reponse 进行拦截、分析、收集
### 页面信息
通过路由栈获取，或者框架中的方法，如 vue-router 中的路由守卫
### 用户操作信息
通过埋点。理由 vue 中的 全局指令、mixin 等方法
### 错误信息
#### 请求错误
#### 代码执行错误
上传 source map ，方便定位具体位置。
### 信息分类、过滤、展示
# HTML
## 标签
## H5
# css
## 布局模型
### Float
### Flex
### Grid
# Javascript
## 事件循环
## 闭包
## 继承
## 请求方法
## es6
# 框架
## Vue
## React
## Taro
# node
## express
## koa
## egg.js

# 测试框架
jest

# 请求方法
## XHRRequest
## Fetch
## HTTP 状态码

## HTTP 1.1 -> HTTP 2 
多路复用
头部压缩
二进制分帧
服务器推送
# 构建工具
## webpack
## vite

# 安全防御
## xss
跨站脚本攻击，因为与 css 名称冲突，改为 xss。

[MDN](https://developer.mozilla.org/zh-CN/docs/Glossary/Cross-site_scripting)

主要通过恶意脚本注入，执行脚本获取网站的 token、cookie 等用户信息冒充用户，利用信息进行恶意破坏、窃取信息、金钱。

发生情况
- img src 标签
- 表单提交
- 钓鱼网站
- iframe
- 攻击者可以使用 XSS 来破坏应用程序可能采用的任何自动跨站点请求伪造 csrf

主要防范
- 过滤输入的文本
- 不使用 eval 函数
- 
## csrf
跨站请求伪造，冒充用户伪造请求
用户登陆网站未退出 -> 浏览其他网站 -> 恶意网站伪造请求 -> 请求会自动携带 cookie -> 被服务认为是本人请求 -> 攻击成功。
# CI/CD

代码风格 -> 单元测试 -> GitHooks -> WebHooks -> 构建部署
## 代码风格
- Eslint + Prettier + VsCode 文件

统一开发成员代码风格，易于代码维护、开发协作

## 单元测试
Jest

基本的代码质量保证，项目功能重构的基本标准和依据

## GitHooks
Husky + commitlint 触发 Git 指定流程时进行代码风格检查、单元测试执行、commit 信息格式 校验。

## WebHooks
触发 GitHub、GitLab 上指定分支、指定操作的 Hooks 进行项目构建、部署
