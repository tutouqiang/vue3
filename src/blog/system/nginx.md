---
title:  Nginx 安装及常用配置
meta:
  - name: description
    content: Nginx 安装及常用配置
  - name: keywords
    content: Nginx 安装及常用配置、Nginx 配置多域名、Nginx 配置多证书
theme: condensed-night-purple
createTime: 2022 年 12 月 12 日
updateTime: 2022 年 12 月 12 日
---

# Nginx 安装及常用配置

## 前言
好记性不如烂笔头。一下操作均在 Centos 8 环境中。

## 安装
### yum 安装
自带包管理器下载的 nginx 版本比较低，如果需要可通过其他方式下载
```sh
$ yum install nginx
$ nginx -v 
nginx version: nginx/1.14.1
```

### 配置

#### 配置 https、wss
```sh
# 查看 nginx 配置文件
$ nginx -h
nginx version: nginx/1.14.1
Usage: nginx [-?hvVtTq] [-s signal] [-c filename] [-p prefix] [-g directives]

Options:
  -?,-h         : this help
  -v            : show version and exit
  -V            : show version and configure options then exit
  -t            : test configuration and exit
  -T            : test configuration, dump it and exit
  -q            : suppress non-error messages during configuration testing
  -s signal     : send signal to a master process: stop, quit, reopen, reload
  -p prefix     : set prefix path (default: /usr/share/nginx/)
  -c filename   : set configuration file (default: /etc/nginx/nginx.conf)
  -g directives : set global directives out of configuration file

# 可以看到默认配置文件为 /etc/nginx/nginx.conf
```


```sh
# 编辑配置文件，将以下配置按需要更改后粘贴至配置文件中
$ vi /etc/nginx/nginx.conf

# 配置内容并保存
# For more information on configuration, see:
#   * Official English Documentation: http://nginx.org/en/docs/
#   * Official Russian Documentation: http://nginx.org/ru/docs/

user nginx;
worker_processes 4; # 按服务器的 cpu 个数配置
error_log /var/log/nginx/error.log;
pid /run/nginx.pid;

# Load dynamic modules. See /usr/share/doc/nginx/README.dynamic.
include /usr/share/nginx/modules/*.conf;

events {
    worker_connections 1024;
}

http {
    log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
                      '$status $body_bytes_sent "$http_referer" '
                      '"$http_user_agent" "$http_x_forwarded_for"';

    access_log  /var/log/nginx/access.log  main; # nginx log 文件路径

    sendfile            on;
    tcp_nopush          on;
    tcp_nodelay         on;
    keepalive_timeout   65;
    types_hash_max_size 2048;

    gzip on; 
    gzip_min_length 10k;
    gzip_buffers 4 16k;
    gzip_http_version 1.1;
    gzip_comp_level 5;
    gzip_types  text/plain application/x-javascript text/css application/xml text/javascript application/x-httpd-php application/javascript application/json;
    gzip_disable "MSIE [1-6]\.";
    gzip_vary on;

    include             /etc/nginx/mime.types;
    default_type        application/octet-stream;

    # Load modular configuration files from the /etc/nginx/conf.d directory.
    # See http://nginx.org/en/docs/ngx_core_module.html#include
    # for more information.
    include /etc/nginx/conf.d/*.conf;

    # # 如需要配置 ws 则配置此处，如需 wss：配合 https 代理到指定的 ws 服务端口即可
    # # 如只需 ws, 则配合 http 配置并代理到指定的 ws 服务即可
    # map $http_upgrade $connection_upgrade { 
	  #  default upgrade; 
	  #  '' close; 
    # } 

   # 按需要配置负载均衡
   upstream load_balancing {  
     server 127.0.0.1:7001; 
   }

   server {
       listen 80;
       #填写绑定证书的域名, 如为通用域名证书可改为 *.wooc.com
       server_name gateway.wooc.com;
       #把http的域名请求转成https
       return 301 https://$host$request_uri;
   }

    server {
        listen       443 ssl http2 default_server;
        listen       [::]:443 ssl http2 default_server;
        server_name  gateway.wooc.com;
        root         /usr/share/nginx/html;

        # ssl 证书保存的目录
        ssl_certificate /etc/pki/nginx/wooc.com_bundle.crt;
        ssl_certificate_key /etc/pki/nginx/wooc.com.key;
        ssl_session_cache shared:SSL:1m;
        ssl_session_timeout  10m;
        #请按照以下协议配置
        ssl_protocols TLSv1.2 TLSv1.3; 
        #请按照以下套件配置，配置加密套件，写法遵循 openssl 标准。
        ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:HIGH:!aNULL:!MD5:!RC4:!DHE; 
        ssl_prefer_server_ciphers on;

        # Load configuration files for the default server block.
        include /etc/nginx/default.d/*.conf;

        location / {
          proxy_pass  http://localhost:3000; # 转发至本地服务端口
          proxy_set_header referer $http_referer;
          proxy_set_header Host $proxy_host; # 修改转发请求头，让3000端口的应用可以受到真实的请求
          proxy_set_header X-Real-IP $remote_addr;
          proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        }

        error_page 404 /404.html;
            location = /40x.html {
        }

        error_page 500 502 503 504 /50x.html;
            location = /50x.html {
        }
    }
}
```



### 启动
建议使用系统命令开启 nginx
```sh
# 查看当前 nginx 状态, inactive (dead) 当前处于未开启状态
$ systemctl status nginx
● nginx.service - The nginx HTTP and reverse proxy server
   Loaded: loaded (/usr/lib/systemd/system/nginx.service; disabled; vendor preset: disabled)
   Active: inactive (dead)
```

```sh
# 启动 nginx
$ systemctl start nginx
```

```sh
# 再次查看 nginx 状态, active (running) 即为运行正常，确认启动成功
$ systemctl start nginx
● nginx.service - The nginx HTTP and reverse proxy server
   Loaded: loaded (/usr/lib/systemd/system/nginx.service; disabled; vendor preset: disabled)
   Active: active (running) since Sat 2022-12-10 17:13:48 CST; 1 day 21h ago
  Process: 6154 ExecStart=/usr/sbin/nginx (code=exited, status=0/SUCCESS)
  Process: 6099 ExecStartPre=/usr/sbin/nginx -t (code=exited, status=0/SUCCESS)
  Process: 6097 ExecStartPre=/usr/bin/rm -f /run/nginx.pid (code=exited, status=0/SUCCESS)
 Main PID: 6155 (nginx)
    Tasks: 5 (limit: 47477)
   Memory: 19.5M
   CGroup: /system.slice/nginx.service
           ├─6155 nginx: master process /usr/sbin/nginx
           ├─6156 nginx: worker process
           ├─6157 nginx: worker process
           ├─6158 nginx: worker process
           └─6159 nginx: worker process

Dec 10 17:13:48 VM-0-17-centos systemd[1]: Starting The nginx HTTP and reverse proxy server...
Dec 10 17:13:48 VM-0-17-centos nginx[6099]: nginx: the configuration file /etc/nginx/nginx.conf syntax is ok
Dec 10 17:13:48 VM-0-17-centos nginx[6099]: nginx: configuration file /etc/nginx/nginx.conf test is successful
Dec 10 17:13:48 VM-0-17-centos systemd[1]: Started The nginx HTTP and reverse proxy server.
```

### 配置多域名、多证书
主要改动 server 中 listen、ssl 证书部分即可，其余部分安照业务正常配置即可。
```sh
server {
  listen       443 ssl http2 default_server;
  listen       [::]:443 ssl http2 default_server;
  server_name  wooc.com;
  root         /usr/share/nginx/htm

  # ssl 证书保存的目录
  ssl_certificate /etc/pki/nginx/wooc.com_bundle.crt;
  ssl_certificate_key /etc/pki/nginx/wooc.com.key;
}

# 第二个域名、证书去掉 default_server 关键字；
# 配置多个证书，均为占用 443 端口，必须去掉 default_server，原因如下
server {  
  listen       443 ssl http2;
  listen       [::]:443 ssl http2;
  server_name  wooc.top;
  root         /usr/share/nginx/htm
  
  # ssl 证书保存的目录
  ssl_certificate /etc/pki/nginx/wooc.top_bundle.crt;
  ssl_certificate_key /etc/pki/nginx/wooc.top.key;
}

# 在 server 块中，当在listen 指令上添加default_server标志时，Nginx将声明该服务器为默认服务器。
# 之后，当 Nginx 的 HTTP 主机标头与任何其他服务器块不匹配时，Nginx 将使用默认服务器来处理请求。
# default_server 标志只能在 server 块中添加一次，并将任何 IP:port 组合指定为 listen 指令的参数。
# 但是，default_server 标志可以在 IP:port 的不同组合上使用多次。
```

default_server 具体信息可参考：https://docs.nginx.com/nginx/admin-guide/web-server/web-server/


### 常用命令

#### 查看 nginx log
```sh
# 这里使用的是默认的 log 文件，如为自定义，则替换为自定义路径即可
$ tail -f /var/log/nginx/access.log
```

#### 重新加载
```sh
# 修改 nginx 配置文件后重新加载，使配置生效
$ nginx -s reload
```
