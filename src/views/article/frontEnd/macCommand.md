---
title: mac 终端常用命令集合
theme: condensed-night-purple
createTime: 2022 年 5 月 10 日
---
# 终端常用命令集合

## 清除端口占用
前端框架启动项目，在项目关闭之后再次以该端口启动项目后会报错或是默默的将端口号加1。

如果你使用 node 开启服务的 3000 端口，关闭服务并再次启用时会报错如下。提醒你 3000 端口被占用
```sh
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
```sh
$ sudo lsof -i:8000  // 查看端口是否被占用，被占用则会输出一下信息，反之则输出为空
COMMAND   PID USER   FD   TYPE             DEVICE SIZE/OFF NODE NAME
node    68078 wooc   36u  IPv4 0xc597afa935d930ff      0t0  TCP localhost:irdmi (LISTEN)
$ sudo kill -9 68078  // 占用端口的 PID
$ sudo lsof -i:8000   // 再次查询，输出为空，清除端口占用成功
```
