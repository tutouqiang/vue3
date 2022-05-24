---
title: 飞书授权登录
theme: condensed-night-purple
createTime: 2022 年 5 月 10 日
---
# 飞书授权登录

新公司内部基建从零开始，第一项则是实现飞书登陆的接入。

## 官方接入流程
[官方文档](https://open.feishu.cn/document/common-capabilities/sso/web-application-sso/web-app-overview)

![飞书登录流程图](https://sf3-cn.feishucdn.com/obj/open-platform-opendoc/98aa43798f7168f54c91924f90e7e567_olUcc25AH5.png?lazyload=true&width=962&height=964)

### 二维码设置

#### 跳转至飞书
跳转至 *飞书登录页面*，扫码授权后重定向至应用页面

#### 嵌入至应用内
获取飞书登录二维码，嵌入至 *自定义页面中实现登录*

## 前端登录设计

一般情况下应用的登录与应用本身是强耦合的，包括 token 获取及刷新的接口都需要写在应用里，当多个应用共用一套用户系统时，这样的强耦合带来的弊端就显而易见。
- 不同框架的登录逻辑相同但需要重构，耗费时间
- 相同架构即使可以复制代码，当功能变更时需要逐个更改，不好维护
- 随着应用的增加耗费的时间也就成倍的增加

所以一个主流的登录必须满足以下几点
- 登录与应用解偶
- token 逻辑与应用解偶

总的来说就是非入侵式的服务聚合，像微服务一样，优点如下
- 不限应用的技术框架及开发语言
- 逻辑独立且易于维护、重构、新增
- 不用重复开发
