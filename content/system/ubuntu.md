---
title:  Ubuntu 安装及问题解决
theme: condensed-night-purple
createTime: 2022 年 11 月 17 日
updateTime: 2022 年 11 月 17 日
---

# Ubuntu 安装及问题解决


## 前言
以前在虚拟机中或是我的老电脑上安装 Ubuntu 时是没什么大问题的，但随着时间流逝，我的电脑更老了，最新的稳定版的 Ubuntu 的某些驱动已经不支持我的电脑硬件了。同时也避免每次安装都需要重新折腾一遍。

## 安装

### 下载镜像
网站地址: https://ubuntu.com/download/desktop

### U 盘启动盘制作工具

1、[balenaEtcher](https://www.balena.io/etcher/)   
官方推荐：因为它可以在 Linux、Windows 和 Mac OS 上运行。

2、[Rufus](https://rufus.ie/zh/)  
这个也是官方推荐的工具之一。开源、体积小、快速（我选择使用的）。只支持 widnows 7及以上的系统。

### 安装系统
如果你是老炮，有上面两个工具就会安装了。  
如果你从未安装过系统，可以参考[官方流程](https://ubuntu.com/tutorials/install-ubuntu-desktop#1-overview)。  
这里主要是记录安装后的问题解决，关于如何安装，网上教程很多，这里不多做赘述。

## 安装、配置

### 修改镜像源
Ubuntu 的默认镜像源为国外地址，速度较慢。改为国内或者离你较近的镜像源，这是常规操作

#### 1. 备份源文件  
```sh
$ sudo cp /etc/apt/sources.list /etc/apt/sources.list.backup
```   
#### 2. 编辑/etc/apt/sources.list文件
按照镜像源官方操作步骤即可
-  [清华镜像源](!https://mirrors.tuna.tsinghua.edu.cn/help/ubuntu/) 
- [阿里镜像源](!https://developer.aliyun.com/mirror/ubuntu?spm=a2c6h.13651102.0.0.3e221b112XzfpP)

#### 3. 执行更新命令
```sh
$ sudo apt-get update
```

### 安装 curl
在安装其他很多软件时，需要用到 curl
```sh
# 更新源信息
$ sudo apt update
# 安装 curl
$ sudo apt install curl
# 查看 curl 安装信息
$ curl 
```

### 安装 nodejs
ubuntu 上 使用默认命令安装的 nodejs 的版本比较低，有很多方法去安装和控制 nodejs 的安装版本，这里使用 curl +  NodeSource   

1、 查看 [NodeSource](!https://github.com/nodesource/distributions) 软件源提供了哪些 node 版本

![node_source ](https://raw.githubusercontent.com/zhangchao-wooc/wooc/master/content/front-end/img/ubuntu/node_source.webp)

截止文档完成时 NodeSource 已支持 node v19.x 版本，这里使用当前 LTS 最高版本 18.x 

2、更新 nodejs 安装源
```sh
# 更新 nodejs 安装源为 18.x 版本
$ curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash - &&\
```

3、安装 nodejs 并校验版本
```sh
$ sudo apt-get install -y nodejs
$ node --version
```

### 安装输入法
https://zhuanlan.zhihu.com/p/58837239

### 安装 clash 代理

https://www.cnblogs.com/Jiang13537/p/15571504.html

## 问题及解决
### vi 编辑问题
我是用习惯了 mac、centos 的终端的，在 ubuntu 中的 vi 编辑时的方向键是对于 A、B、C、D 的字母的，只有在非编辑状态才会作为方向选择使用。

在编辑中用于删除的 backSpace 也不起作用。

#### 解决
```sh
$ sudo vi /etc/vim/vimrc.tiny
# 编辑该文件，修改 set compatible 为 set nocompatible
# 新增 set backspace=2 然后保存即可
# 如果显示为只读文件，不可修改且保存失败时，先将文件夹权限降级
# sudo chmod 777 /etc/vim/vimrc.tiny 操作完成后再恢复文件的权限
```
