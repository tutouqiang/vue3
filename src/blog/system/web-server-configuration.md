---
title:  基础 web 服务器搭建
meta:
  - name: description
    content: 基础 web 服务器搭建
  - name: keywords
    content: 基础 web 服务器搭建、前端服务器搭建、前端服务器配置
theme: condensed-night-purple
createTime: 2023 年 10 月 18 日
updateTime: 2023 年 10 月 18 日
---

# 基础 web 服务器搭建

搭建满足前端运行环境的服务器。包括必备基础配置已及进阶配置，满足前端服务的**稳定运行、性能监控、事件通知、日志收集**等基础需求。 以 **centos 8.0** 为例。

## 必备基础配置

centos 默认的包管理器为 yum。 

``yum -y update`` 升级所有包同时也升级软件和系统内核。或者执行 ``yum -y upgrade``只升级所有包，不升级软件和系统内核。

### curl
这里主要用来安装其他安装包，比较方便，也是比较常用的。
 ``yum install curl -y``

### [nvm]('https://github.com/nvm-sh/nvm')
管理 node 版本, 可以到 [Github]('https://github.com/nvm-sh/nvm') 获取最新版本进行安装。

``curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.5/install.sh | bash``

### 

## 进阶配置

