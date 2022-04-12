# 浏览器渲染过程

首先了解浏览器的的内核，最主流的是谷歌的 V8 引擎 webkit 内核。

大致流程：

浏览器输入 url

## DNS解析

本地缓存 -> 查询根服务器（13台），按照区域层级向上一层一层查找

## 网络连接

http 建立连接的过程重定向到 https 协议

## 查看缓存

强缓存、协商缓存。请求头 cache-control：max-age：3000 Etag，命中缓存请求 304

## 下载资源
请求网站的代码、静态资源

## 页面渲染
解析 html 生成 DOM 树 > 解析 css 生成 css 树 > 合并成为 rander 树 > 渲染进程渲染

[谷歌文档](https://developers.google.com/web/fundamentals/performance/rendering)

- js 执行
- 样式计算   style
- 布局计算   layout
- 绘制页面   paint
- 合并页面层 composition
  
JS > 样式 styles > 布局 layout > 绘制 paint > 合成 composite

<br/>

# 浏览器渲染优化
总的来说，根据浏览器渲染流程避免和减少 Reflow、Repaint 的出现。

- 在框架层面的表现则是采用虚拟 DOM 合并多次 DOM 操作进行一次统一的渲染
- 尽量减少 DOM 操作
- 降低选择器的复杂性，减少计算选择器的使用，计算它的规则会浪费大量时间
- 使用 transform、opcitiy、分层（well-change）、requestAnimation 来减少过渡效果的消耗
- 使用合适的布局模型减少计算消耗，如 flexbox

<br/>

# 浏览器流程优化
减少、优化中间环节
- 采用 SSR 服务端渲染，减少本地浏览器的样式、布局计算环节
- 适当的使用缓存，减少接口请求
- 减少资源数量、体积、请求时间（图片、字体、媒体资源、CDN、懒加载）
- 减少 http 请求
- 在占用主线程的计算上使用 web worker 减少主线程的阻塞

