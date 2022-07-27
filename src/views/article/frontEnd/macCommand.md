---
title: mac 终端常用命令集合
theme: condensed-night-purple
createTime: 2022 年 5 月 10 日
---
# 终端常用命令集合

## 清除端口占用
前端框架启动项目，在项目关闭之后再次以该端口启动项目后会报错或是默默的将端口号加1。

如果你使用 node 开启服务的 3000 端口，关闭服务并再次启用时会报错如下。提醒你 3000 端口被占用
```bash
$ node index.js
node:events:505
      throw er; // Unhandled 'error' event
      ^

Error: listen EADDRINUSE: address already in use :::3000
    at Server.setupListenHandle [as _listen2] (node:net:1380:16)
    at listenInCluster (node:net:1428:12)
    at Server.listen (node:net:1516:7)
    at Function.listen (/Users/wooc/Desktop/my/node/node_modules/express/lib/application.js:618:24)
    at Object.<anonymous> (/Users/wooc/Desktop/my/node/index.js:33:5)
    at Module._compile (node:internal/modules/cjs/loader:1105:14)
    at Module._extensions..js (node:internal/modules/cjs/loader:1159:10)
    at Module.load (node:internal/modules/cjs/loader:981:32)
    at Module._load (node:internal/modules/cjs/loader:827:12)
    at Function.executeUserEntryPoint [as runMain] (node:internal/modules/run_main:77:12)
Emitted 'error' event on Server instance at:
    at emitErrorNT (node:net:1407:8)
    at process.processTicksAndRejections (node:internal/process/task_queues:82:21) {
  code: 'EADDRINUSE',
  errno: -48,
  syscall: 'listen',
  address: '::',
  port: 3000
}

Node.js v18.0.0
```

服务的关闭之后端口占用仍然存在，这会导致端口占用增多，如果你项目中涉及固定的端口配置，那么端口每变一次你都要手动改一次耗费很多时间。

那么我们可以通过以下命令查看并清除被占用的端口
```bash
$ sudo lsof -i:8000  // 查看端口是否被占用，被占用则会输出一下信息，反之则输出为空
COMMAND   PID USER   FD   TYPE             DEVICE SIZE/OFF NODE NAME
node    68078 wooc   36u  IPv4 0xc597afa935d930ff      0t0  TCP localhost:irdmi (LISTEN)
$ sudo kill -9 68078  // 占用端口的 PID
$ sudo lsof -i:8000   // 再次查询，输出为空，清除端口占用成功
```

## 配置本地域名
开发过程中经常遇到两种问题
- 本地 ip 不方便记忆和传播
- 开发环境需要手动复制线上 cookies

而配置本地域名可以很好的解决这两种问题。

在文件  /etc/hosts 中添加响应配置即可

### 方式一

稍显繁琐，但方便管理。

基本操作:  
'i'： 进入编辑状态  
’esc‘：退出编辑状态  
’wq‘：保存并退出  
```bash
$ vi /etc/hosts
##
# Host Database
#
# localhost is used to configure the loopback interface
# when the system is booting.  Do not change this entry.
##
127.0.0.1       localhostn
255.255.255.255 broadcasthost
::1             localhost

# 添加此行
127.0.0.1       wooc.com
# Added by Docker Desktop
# To allow the same kube context to work on the host and the container:
127.0.0.1 kubernetes.docker.internal
# End of section
```

### 方式二

方便一些。但管理上不如【方式一】

```bash
$ echo '127.0.0.1     wooc.com' >> /etc/hosts
```
该命令会将文本添加到 /etc/hosts 文件最后一行

```bash
$ echo '127.0.0.1     wooc.com' >> /etc/hosts
// 查看文件内容，检查是否添加成功
$ cat /etc/hosts 
```
