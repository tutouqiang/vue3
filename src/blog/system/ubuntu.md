---
title:  Ubuntu 安装及问题解决
meta:
  - name: description
    content: Ubuntu 安装及问题解决
  - name: keywords
    content: Ubuntu 安装、Ubuntu 修改镜像源、Ubuntu 安装 nodejs、Ubuntu 无线网卡启用失败问题
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

1、<a href="https://www.balena.io/etcher" target="_blank">BalenaEtcher</a>

官方推荐：因为它可以在 Linux、Windows 和 Mac OS 上运行。

2、<a href="https://rufus.ie/zh/" target="_blank">Rufus</a>

这个也是官方推荐的工具之一。开源、体积小、快速（我选择使用的）。只支持 widnows 7及以上的系统。

### 安装系统
如果你是老炮，有上面两个工具就会安装了。  

如果你从未安装过系统，可以参考 <a href="https://ubuntu.com/tutorials/install-ubuntu-desktop#1-overview" target="_blank">官方流程</a>
 
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
- <a href="https://mirrors.tuna.tsinghua.edu.cn/help/ubuntu/" target="_blank">清华镜像源</a>
- <a href="https://developer.aliyun.com/mirror/ubuntu?spm=a2c6h.13651102.0.0.3e221b112XzfpP" target="_blank">阿里镜像源</a>

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

如果出现以下问题
```
The following packages have unmet dependencies.
 curl : Depends: libcurl4 (= 7.58.0-2ubuntu3) but it is not going to be installed
E: Unable to correct problems, you have held broken packages.
```

执行 
```
sudo apt-get purge libcurl4
```

然后继续执行安装命令即可成功安装 curl

### 安装 nodejs
ubuntu 上 使用默认命令安装的 nodejs 的版本比较低，有很多方法去安装和控制 nodejs 的安装版本，这里使用 curl +  NodeSource   

**1、 查看 <a href="https://github.com/nodesource/distributions" target="_blank">NodeSource</a> 软件源提供了哪些 node 版本**

![node_source ](https://raw.githubusercontent.com/zhangchao-wooc/wooc/master/content/system/img/ubuntu/node_source.webp)

截止文档完成时 NodeSource 已支持 node v19.x 版本，这里使用当前 LTS 最高版本 18.x 

**2、更新 nodejs 安装源**
```sh
# 更新 nodejs 安装源为 18.x 版本
$ curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash
```

**3、安装 nodejs 并校验版本**
```sh
$ sudo apt-get install -y nodejs
$ node --version
```

### 安装输入法
https://zhuanlan.zhihu.com/p/58837239

### 安装 clash

https://www.cnblogs.com/Jiang13537/p/15571504.html


### 内网穿透
<a href="https://www.cpolar.com/" target="_blank">cpolar</a> 是一种安全的内网穿透云服务，它将内网下的本地服务器通过安全隧道暴露至公网。使得公网用户可以正常访问内网服务。



**选择它的原因**
- 4个隧道/cpolar进程
- 1 MBPS 的速率
- 提供免费的 https 域名
- 支持多平台使用

按照 <a href="https://www.cpolar.com/blog/ubuntu-users-install-cpolar" target="_blank">官方教程</a> 执行即可 
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

## 无线网卡启用失败问题

如果你找不到无线网卡连接选项，在软件和更新中找到附加驱动选项，选择使用 Broadcom 802.11 驱动项。

![node_source ](https://raw.githubusercontent.com/zhangchao-wooc/wooc/master/content/system/img/ubuntu/wifi.webp)

如出现依赖错误要求安装 libc6-dev，且安装 libc6-dev 及其依赖失败时。

![node_source ](https://raw.githubusercontent.com/zhangchao-wooc/wooc/master/content/system/img/ubuntu/libc6-dev.webp)

可尝试切换软件源，然后重新选择驱动。
目前该问题出在阿里源，切换为清华源后既可。

## 没有设置选项、打不开部分的设置页面

可能是你当前 ubuntu 系统中未安装设置的桌面程序，执行如下命令重新安装

```bash
$ sudo apt-get install gnome-control-center
```

安装成功后即可在应用程序列表中找到设置选项。
