---
title: 搭建 npm 私有仓库
theme: condensed-night-purple
createTime: 2022 年 7 月 21 日
---


# 前言
公司需要发布内部 npm 包，需要搭建一个 npm 私有仓库

## 需求
没有明确的需求，现有 npm 私有仓库方案也都满足基本需要

## 调研
搜索一波，大部分的文章都列出以下几种方案
> 1、cnpm          国内使用较多，流传最广的。有 ts 的重构版本  github start 3.6k + 204(ts 版本)  
> 2、sinopia       已停止维护  
> 3、verdaccio     verdaccio fork 于 sinopia             github start 13.6k

[verdaccio](https://verdaccio.org/zh-CN/) 兼容度很高。
- npm、yarn、pnpm
- doker、nginx、Kubernetes
- 静态网页及权限配置
- 有中文文档
- 有知名项目使用：如 pnpm、

需要的基本一应俱全，具体直接访问官网即可 

大概看了下项目流行程度、维护速度、适配广度、配置难度。 最终选用 **verdaccio**

# 开始部署

## 环境准备

1、node（>v16）  不同 verdaccio 版本，要求不同，这里安装 verdaccio5  
2、nginx

## 安装

**Node**  
如需要安装特定版本 node，将以下命令中的 v16.15.1 替换为指定版本即可，详细版本可查看  [node 官网](https://nodejs.org/en/)
```sh
$ cd /usr/local/src
$ wget https://nodejs.org/dist/v16.15.1/node-v16.15.1-linux-x64.tar.xz
$ tar xf node-v16.15.1-linux-x64.tar.xz
$ sed -i '$aexport PATH=$PATH:/usr/local/src/node-v16.15.1-linux-x64/bin' $ ~/.bash_profile
$ source ~/.bash_profile
$ node -v
v16.15.1
```

**Verdaccio**
```sh
$ npm install -g verdaccio
$ verdaccio -v 
v5.13.3
```

**Nginx**  
使用 yum 安装的版本会比较低，如需高版本 nginx 可搜索相应博客。如你的服务器没有 yum 包管理器，可根据服务器系统搜索该系统的包管理器并安装即可
```sh
$ yum install nginx -y
$ nginx -v
nginx version: nginx/1.14.1
```

## 配置 Nginx

此处我配置为 https 域名，前提条件是你有 https 证书，也可在网上搜索免费证书。  
http 中添加相应配置即可。所有 npm.wooc.top 的地方替换为你的域名  

如只配置 http 时，将 location 复制到 80 端口中, 将 80 端口的 return 这一行删除即可

```sh

  upstream verdaccio_v4 {
    server **:4873;
    keepalive 8;
  }

  server {
      listen 80;
      #填写绑定证书的域名
      server_name npm.wooc.top;
      #把http的域名请求转成https
      return 301 https://$host$request_uri;
  }

# Settings for a TLS enabled server.
    server {
        listen       443 ssl http2 default_server;
        server_name  **.com;

        ssl_certificate /etc/pki/nginx/npm.wooc.top_bundle.crt;
        ssl_certificate_key /etc/pki/nginx/npm.wooc.top.key;
        ssl on;
        ssl_session_cache  builtin:1000  shared:SSL:10m;
        ssl_session_timeout 5m;
        ssl_protocols TLSv1.2 TLSv1.3;
        ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:ECDHE:ECDH:AES:HIGH:!NULL:!aNULL:!MD5:!ADH:!RC4;
        ssl_prefer_server_ciphers on;

        # Load configuration files for the default server block.
        include /etc/nginx/default.d/*.conf;

        location / {
          proxy_pass http://127.0.0.1:4873/;
          proxy_set_header Host            $host:$server_port;
          proxy_set_header X-Forwarded-For $remote_addr;
          proxy_set_header X-Forwarded-Proto $scheme;
        }

        error_page 404 /404.html;
            location = /40x.html {
        }

        error_page 500 502 503 504 /50x.html;
            location = /50x.html {
        }
    }
```

## 配置文件

我这里只做一些基本配置，需要详细配置的可直接阅读官网文档

```sh
$ vi ~/.config/verdaccio/config.yaml
```

**web页面配置**
```sh
web:
  title: npm-cz
```

**权限配置**  
这里设置禁止用户自己注册，为了更好的进行用户管理，不滥用 npm 账户。
如何添加用户可看下方 [配置用户](#配置用户)
```sh
auth:
  htpasswd:
    file: ./htpasswd
    # -1 为禁止注册
    max_users: -1
```

**上游链路**  
默认为 npm 源, 这里新增了一个淘宝源, 同时更改 packages 中相关联的配置
```sh
uplinks:
  npmjs:
    url: https://registry.npmjs.org/
  taobao:
    url: https://registry.npmmirror.com

packages:
  '@wooc/*':
    # scoped packages
    access: $all
    publish: $authenticated
    unpublish: $authenticated
    # 该处为你定义的私有库，只查找私有库注册表，所以不必设置上游链路，否则私有包的操作也回查找公共注册库

  '@*/*':
    # scoped packages
    access: $all
    publish: $authenticated
    unpublish: $authenticated
    proxy: 
      - npmjs
      - taobao

  '**':
    proxy: 
      - npmjs
      - taobao
```

**通知**  
消息通知的模板可以在官网看详细的规则
```sh
notify:
    method: POST
    headers: [{ "Content-Type": "application/json" }]
    endpoint: '这里替换为你想触发的服务的链接，可以是服务器接口、群机器人或者邮箱'
    content: '{"body": {"version": 1,"type": "doc","content": [{"type": "paragraph","content": [{"type": "text","text": "New package published: * {{ name }}* Publisher name: * {{ publisher.name }}"}]}]}}'

```

**web 页面语言**  
支持很多语言，也可以在 web 页面的设置中手动设置，这里设置默认语言为中文
```sh
i18n:
  web: zh-CN
```

到这里基本配置已经配置完成。你需要记住以下几个默认文件的路径，当然你也可以自定义
```sh
- storage:  ./storage     缓存的 npm 包和私有 npm 包发布后的存储位置
- plugins:  ./plugins     使用的插件存储的位置
- htpasswd: ./htpasswd    用户密码存储的文件

这些文件都在路径 ~/.config/verdaccio 下，并且默认只有 
storage、config.yaml两个文件，其他文件在使用到的时候自己创建或自动创建
```

<!-- <h2 id="配置用户">配置用户</h2> -->
## 配置用户

**安装**
```sh
$ npm install htpasswd-for-sinopia -g
```

**添加用户**  

1、命令行添加
sinopia-adduser 命令的执行有两个条件
- 密码文件 htpasswd 默认在 ~/.config/verdaccio 目录下，并且**需要手动创建**
- 需要**与 htpasswd 文件在同级目录下**

> tip：htpasswd 可以自定义路径，并同步修改 verdaccio 配置文件即可

```sh
$ cd ~/.config/verdaccio
$ touch htpasswd
$ sinopia-adduser
username：wooc
password：123456
$ cat htpasswd
wooc:{SHA}fEqNCco3Yq9h5ZUglD3CZJT4lBs=:autocreated 2022-07-22T06:55:48.194Z
```

2、在线创建  
htpasswd-for-sinopia 提供了一个 [在线网站](https://hostingcanada.org/htpasswd-generator/)，可通过手动输入的方式生成，然后手动复制到 htpasswd 文件中即可  

![创建用户 ](./img/npm_warehouse/createUser.jpg)

此时即可使用 web 页面或命令行进行登陆测试。



## 启动
**一、以默认配置启动**
```sh
$ verdaccio
```

访问域名后出现该页面即为成功。默认为英文页面，可点击设置选择中文简体语言

![verdaccio页面 ](./img/npm_warehouse/1.png)

**二、持久化运行**

官方推荐使用 forever, forever 目前靠社区维护更新，所以 forever 文档推荐 pm2

```sh
$ npm install pm2 -g
$ pm2 start `which verdaccio`
```

# 使用 npm 私有库

## 设置镜像源
```sh
$ npm set registry https://npm.wooc.top/
```

## 发布 npm 项目  

**1、初始化项目并新建 index.js 文件**
```sh
$ mkdir wooc
$ cd wooc && npm init -y
$ echo 'console.log("hellow world!")' > index.js
```

**2、package.json**

```sh
{
  "name": "wooc",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "wooc", # 这一项补全参数为作者名称
  "license": "ISC"
}
```

**3、登陆**

```sh
# 如果已经设置镜像源为私有库地址，执行  npm adduser 即可
$ npm adduser --registry https://npm.wooc.top/
npm notice Log in on https://npm.wooc.top/
Username: wooc
Password: 123456
Email: (this IS public) 13170027668@163.com
Logged in as wooc on https://npm.wooc.top/.
```

**4、发布 npm 包**  
确认在项目根目录
```sh 
# 如果已经设置镜像源为私有库地址，执行  npm publish 即可
$ npm publish --registry https://npm.cz-robots.com/
npm notice 
npm notice 📦  wooc@1.0.0
npm notice === Tarball Contents === 
npm notice 29B  index.js    
npm notice 218B package.json
npm notice === Tarball Details === 
npm notice name:          wooc                                    
npm notice version:       1.0.0                                   
npm notice filename:      wooc-1.0.0.tgz                          
npm notice package size:  295 B                                   
npm notice unpacked size: 247 B                                   
npm notice shasum:        8cee1ea2f05aea82d71766a5c1695752a36d8f48
npm notice integrity:     sha512-FSUdOcXnSyZBm[...]spBJSIOzdtRCw==
npm notice total files:   2                                       
npm notice 
npm notice Publishing to https://npm.wooc.top/
+ wooc@1.0.0
```

控制台出现上述信息，说明发布成功

**5、查看 web 页面**

![npm web页面](./img/npm_warehouse/npm_publish_web.jpg)

出现上述信息说明发布成功

**6、下载私有包**
前置准备
- 项目中配置 .npmrc , 内容为 registry=https://npm.wooc.com @wooc:registry=https://npm.wooc.com (建议)
- 设置本地 npm 源, 执行命令  npm config set registry https://npm.wooc.com
- 临时使用, npm --registry https://npm.wooc.com

以上三种方式任选其一, 测试私有包的下载是否正常



## 注意事项
> 1、私有仓库缓存上游 npm 包并保存私有 npm 包，注意服务器空间预留充足  
> 2、私有仓库可以缓存并加速公司项目 npm 的下载速度，但服务器的带宽消耗也是很大的  
> 3、当公司内部系统并行构建时，npm 服务器会承受较大负载（看服务规模），注意配置充足  
