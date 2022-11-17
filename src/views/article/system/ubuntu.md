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

## 问题及解决

### vi 编辑问题
我是用习惯了 mac、centos 的终端的，在 ubuntu 中的 vi 编辑时的方向键是对于 A、B、C、D 的字母的，只有在非编辑状态才会作为方向选择使用。

在编辑中用于删除的 backSpace 也不起作用。

#### 解决
```sh
$ sudo /etc/vim/vimrc.tiny
# 编辑该文件，修改 set compatible 为 set nocompatible
# 新增 set backspace=2 然后保存即可
# 如果显示为只读文件，不可修改且保存失败时，先将文件夹权限降级
# sudo chmod 777 /etc/vim/vimrc.tiny 操作完成后再恢复文件的权限
```

### 修改镜像源
Ubuntu 的默认镜像源为国外地址，速度较慢。改为国内或者离你较近的镜像源，这是常规操作
```sh
# 1. 备份源文件  
$ sudo cp /etc/apt/sources.list /etc/apt/sources.list.backup

# 2. 编辑/etc/apt/sources.list文件
$ vi /etc/apt/sources.list
# 默认注释了源码镜像以提高 apt update 速度，如有需要可自行取消注释
deb http://mirrors.163.com/ubuntu/ focal main restricted universe multiverse
deb http://mirrors.163.com/ubuntu/ focal-security main restricted universe multiverse
deb http://mirrors.163.com/ubuntu/ focal-updates main restricted universe multiverse
deb http://mirrors.163.com/ubuntu/ focal-backports main restricted universe multiverse
# deb-src http://mirrors.163.com/ubuntu/ focal main restricted universe multiverse
# deb-src http://mirrors.163.com/ubuntu/ focal-security main restricted universe multiverse
# deb-src http://mirrors.163.com/ubuntu/ focal-updates main restricted universe multiverse
# deb-src http://mirrors.163.com/ubuntu/ focal-backports main restricted universe multiverse
# 预发布软件源，不建议启用
# deb http://mirrors.163.com/ubuntu/ focal-proposed main restricted universe multiverse
# deb-src http://mirrors.163.com/ubuntu/ focal-proposed main restricted universe multiverse

# 3. 执行更新命令
$ sudo apt-get update
```

