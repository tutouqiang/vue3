# 旧手机当做服务器，不用 root 

亲戚给了一个旧的华为手机，二手卖出是基本没人要的，好在处理器是高通骁龙 425 的，还可以当做本地服务器使用，比卖了更有用。

## 安装 Termux
Termux 是一款 Android 终端模拟器和 Linux 环境应用程序，无需 root 或设置即可直接运行。自动安装最小的基本系统 - 使用 APT 包管理器可以使用其他包。
官网: https://termux.dev/en/

### 下载

1. **通过 Github 下载**  
 https://github.com/termux/termux-app/releases/tag/v0.118.0

 2. **通过 F-droid 应用商店下载**  
 可以在此链接中下载 F-droid 应用到手机中，然后通过 F-droid 搜索并下载 Termux
  https://f-droid.org/en/packages/com.termux/

### 设置

**1、 更新包管理器**  
  ```
  $ pkg install update
  ```  
  
**2、 安装 openssh**
  ```
  $ pkg install open-ssh
  ```  

**3、 设置 ssh 密码**  

  执行以下命令， 根据提示设置 ssh 密码、确认密码，当显示 ```New password was successfully set.``` 时则为设置成功
  
  ```
  $ passwd
  New password:
  Retype new password:
  New password was successfully set.
  ```  

  通过以下命令查询当前用户名称  
  ```bash
  $ whoami
  u0_a125
  ```  

**4、 启动 ssh 服务**  

  ```bash
  $ sshd
  ```  

**5、 查看手机 ip**
  ```bash
  $ ifconfig
  ```

**6、 通过 ssh 连接手机服务**  

  Termux 手机端的 ssh 默认端口为 8022
   ```
   $ ssh u0_a125@192.168.10.111 -p 8022
   ```

  在输入密码后出现以下代码时，便说明连接成功。
   ```bash
   The authenticity of host '[192.168.10.111]:8022 ([192.168.10.111]:8022)' can't be established.
ED25519 key fingerprint is SHA256:rDxbspTfdTxovsJIciqNdbH0d5Qwh3eqqgHWjRgMLQc.
This key is not known by any other names
Are you sure you want to continue connecting (yes/no/[fingerprint])? yes
Warning: Permanently added '[192.168.10.111]:8022' (ED25519) to the list of known hosts.
u0_a125@192.168.10.111's password: 

Welcome to Termux!

Community forum: https://termux.com/community
Gitter chat:     https://gitter.im/termux/termux
IRC channel:     #termux on libera.chat

Working with packages:

 * Search packages:   pkg search <query>
 * Install a package: pkg install <package>
 * Upgrade packages:  pkg upgrade

Subscribing to additional repositories:

 * Root:     pkg install root-repo
 * X11:      pkg install x11-repo

Report issues at https://termux.com/issues
```

这里使用最尽量少的设置，实现了 ssh 登陆手机，如果没有其他需求，那么这个最小实现已经足够使用，如果有其他需求可以按照 Termux 官网的使用的方法继续拓展。

如果你发现很多命令都没有的时候，不要忘记开头 Termux 对自己的描述：“自动安装最小的基本系统”。

对其他命令有需要的话，按需下载即可。

## Termux 常用设置

### 切换镜像源
可能会出现部分包不存在或是下载慢的情况，可以使用命令
```sh
$ termux-change-repo
```

执行会会出现类似 bios 的选择界面，通过方向键和确认键选择镜像所在位置即可。
确认后，Termux 会校验并更新镜像源。

其他进阶配置可以看： https://www.sqlsec.com/2018/05/termux.html
