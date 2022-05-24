# Mac 开发环境配置

## brew

Mac 的包管理器，必备但不自带，需要下载
官方文档命令下载较慢, 可使用国内源  

官方源

```javascript
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
````

国内源

```javascript
/bin/zsh -c "$(curl -fsSL https://gitee.com/cunkai/HomebrewCN/raw/masteHomebrew.sh)"
````
## Git
代码管理工具
```javascript
brew install git
````
### 基本配置
```javascript
git config --global user.name "你的名字或昵称"   // 初始化名称
git config --global user.email "你的邮箱"       // 初始化邮箱
git config --global -l                         // 查看刚刚设置 的名称、邮箱

// 多公钥配置，可忽略此处，直接看下一部分
ssh-keygen -t rsa -C "你提交代码的邮箱"           // 密钥生成
cat ~/.ssh/id_rsa.pub                          // 查看生成的公钥，复制到 Github 等代码库
````

### 多公钥配置
https://gitee.com/help/articles/4229#article-header0

## Node
javascript 运行环境
```javascript
brew search node                       // 搜索 node 版本
brew install node                      // 安装最新版本
brew install node@14                   // 安装指定版本
brew uninstall node@14                 // 卸载指定版本
brew link --overwrite --force node@14  // 切换到指定版本
````
## iTerm2
比 Mac 自带的终端更好用的终端
```javascript
brew install iTerm2
````

## curl
常用的命令行工具，用来请求 Web 服务器。如果熟练的话，完全可以取代 Postman 这一类的图形界面工具。
```javascript
brew install curl
````
使用文章： https://www.ruanyifeng.com/blog/2019/09/curl-reference.html

## zsh

前置安装：git、curl

强大的 shell 终端，简单、易用
```javascript
curl 方式下载
sh -c "$(curl -fsSL https://raw.github.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
chsh -s /bin/zsh   // 切换为zsh  重启终端即可使用 zsh
chsh -s /bin/bash  // 切换为bash 重启终端即可使用 bash
````
## oh-my-zsh
```javascript
sh -c "$(curl -fsSL https://raw.github.com/robbyrussell/oh-my-zsh/master/tools/install.sh)"
````
## Mysql
数据库：https://dev.mysql.com/downloads/file/?id=508094

打开 ‘系统偏好设置’ 最下方会出现 Mysql 的图标，可查看当前 Mysql 的状态以及各文件地址。

大部分都停留在 5.7 版本。 8.0 及以上版本的默认为强密码，在 Egg 等类似的框架上还未支持此方式连接，如果链接过程中出现未支持等情况，大多数为此类原因，可以通过‘系统偏好设置’中的操作面板，初始化 Mysql 为第二选项（非强密码选项）即可解决。
## VsCode
### 快捷打开编辑器
使用命令打开 
打开 VS Code，打开控制面板（⇧⌘P）,输入 ‘shell command’，在提示里看到 Shell Command: Install 'code' command in PATH，点击安装。
终端进入到指定文件，code . || code filename 便可以使用 vscode 打开文件

### 拓展插件
Markdown Preview Github Styling

本地 md 文档样式上传到 Github、npm 时，经常出现本地与线上表现不一致的问题，此插件可在编写时预览本地 md 文档在 Github 上展现的样式。

## JDK
安装zulu 8 jdk
参考文档 https://www.winsonlo.com/it/howto/zulu-jdk8-on-m1/

## mvn

### 1、下载解压
```sh
$ curl -O http://mirrors.hust.edu.cn/apache/maven/maven-3/3.5.4/binaries/apache-maven-3.5.4-bin.tar.gz
$ tar -xvf  apache-maven-3.3.9-bin.tar.gz
$ sudo mv -f apache-maven-3.3.9 /usr/local/
```

### 2、配置文件

编辑 /etc/profile 文件 sudo vim /etc/profile，在文件末尾添加如下代码：
```sh
export MAVEN_HOME=/usr/local/apache-maven-3.5.4
export PATH=${PATH}:${MAVEN_HOME}/bin
```

### 3、保存配置文件使配置环境生效
```sh
$ source /etc/profile
```

### 4、校验是否安装成功，控制台输出 Maven 相关版本信息，说明 Maven 安装成功
```sh
$ mvn -v
Apache Maven 3.5.4 (1edded0938998edf8bf061f1ceb3cfdeccf443fe; 2018-06-18T02:33:14+08:00)
Maven home: /usr/local/apache-maven-3.5.4
Java version: 1.8.0_332, vendor: Azul Systems, Inc., runtime: /Library/Java/JavaVirtualMachines/zulu-8.jdk/Contents/Home/jre
Default locale: zh_CN, platform encoding: UTF-8
OS name: "mac os x", version: "12.1", arch: "aarch64", family: "mac"
```
# 常见问题
## 443

#### 问题再现
```sh
Failed to connect to raw.githubusercontent.com port 443: Connection refused
```
#### 问题原因
软件包的地址访问不到或域名污染，可通过查找该域名真实 ip 的方式，选择一个最近的 ip 配置在域名文件中，使下载文件时的域名解析根据你配置的 ip 地址去访问。

#### 问题解决

1、查询真实 ip 
进入 [https://ipaddress.com](https://ipaddress.com/) 首页,输入 raw.githubusercontent.com 查询到真实 IP 地址为 185.199.108.133
```sh
$ sudo vi /etc/hosts  
##
# Host Database
#
# localhost is used to configure the loopback interface
# when the system is booting.  Do not change this entry.
##
127.0.0.1       localhost
255.255.255.255 broadcasthost
::1             localhost
185.199.108.133 raw.githubusercontent.com

# shell 操作
## 显示一下内容后按下 i 键进入编辑模式，通过方向键将光标移动道🈯️定位置输入内容
## 输入完成后按下 esc 按键退出编辑模式。
## 按下组合键 shift + : 按键进入命令模式
## 输入 wq 并回车，保存修改被容并退出编辑模式。
```
然后保存即可
