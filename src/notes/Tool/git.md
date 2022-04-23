# GIT 原理及基本使用
 Git 是一套内容寻址 (content-addressable) 文件系统
了解以下几个点可以帮助你更快的理解 git 原理及命令
- 链表：增删改查及指针的使用
- hash：生成的基本逻辑
- 快照

# 目录
每一个 git 存储库根目录都有一个 .git 文件，这个文件会具备几个基础文件，并且随着你使用范围的增减会相应的新增一些其他的文件用于记录你操作的内容。


## 初始文件
- FETCH_HEAD  本地分支的指针、名称、状态及远程地址的列表
- HEAD        当前头部指针对应的分支在 refs 文件中的路径
- config      远程地址及分支信息、核心配置
- description 
- hooks       git 操作对应的回调钩子      
- info        
- objects     文件内容、目录树及快照内容。  
- refs        heads：分支名称,内容为名称的 hash 值 tags：tag 信息

### objects
默认文件 head、info

文件、目录、快照则会以 hash 的形式保存，长度均为 40 位。文件夹名为 hash 的前两位，文件名为后面的 38 位，文件内容为则为真实的文件内容。
```sh
// 生成一个初始仓库并在仓库中新增内容为 ‘test’ 的 index.txt 文件
$ git init project && cd project
$ echo 'test' > index.txt
$ git hash-object -w index.txt
9daeafb9864cf43055ae93beb0afd6c7d144bfa4
```
#### 文件存储
此时 .git/objects 文件中新增文件夹 9d, 9d 文件夹中新增文件 aeafb9864cf43055ae93beb0afd6c7d144bfa4, 可以通过命令查看文件内容为 test
```sh
$ git cat-file -p 9daeafb9864cf43055ae93beb0afd6c7d144bfa4
test
```

#### 文件树存储
文件树（tree）下面包含生成的文件信息

将新增的文件添加到暂存区，使用 git write-tree 生成文件树，文件树生成逻辑与文件相同
```sh
$ git update-index --add --cacheinfo 100644 9daeafb9864cf43055ae93beb0afd6c7d144bfa4 index.txt
$ git write-tree
bf46be7f487eb5f42bfa6cbd10b9f7efdb3ed7ac
```
此时 .git/objects 新增文件夹和文件为 bf/46be7f487eb5f42bfa6cbd10b9f7efdb3ed7ac, 我们使用同样的命令查看文件树内容

```sh
$ git cat-file -p bf46be7f487eb5f42bfa6cbd10b9f7efdb3ed7ac
100644 blob 9daeafb9864cf43055ae93beb0afd6c7d144bfa4	index.txt
```
文件树内容为该目录下的文件信息
- 100644 文件权限标识: [100644 普通文件]、[100755 可执行文件]、[120000 符号链接]
- blob   文件类型
- 9daeafb9864cf43055ae93beb0afd6c7d144bfa4 文件树 hash
- index.txt 对应的文件名称

每一次的文件树的生成都会包含最新的文件 hash 或者嵌套的文件树, 其嵌套逻辑如下:

![tree](https://iissnan.com/progit/book_src/figures/18333fig0902-tn.png)

#### commit
一次 commit 提交也就意味着一次快照生成

```sh
$ git commit -m 'First commit'
$ git cat-file -p 
```
commit 下的信息
- tree 文件树的完整 hash
- author 作者名称、邮箱、时间戳
- committer 本次 commit 的提交者名称、邮箱、时间戳
- 'First commit' 提交说明

创建 commit 时同样会在 .git/objects 中新增文件，机制与上述几项均相同



## 动态文件
- index 
- logs    本地及远程分支的状态

# 基本操作
分解常用的操作命令，清楚它每一步的作用，理解 git 的运作原理。

新建一个空文件夹作为项目文件夹

```sh
$ mkdir project
```
## git init
在项目根目录执行，初始化 git 仓库，生成 .git 的隐藏文件, 内容为初始文件，具体可见上述[目录部分](#目录)。
隐藏文件使用编辑器或 ls 命令是不可见的，使用 ls -all 查看全部文件时即可显示。
```sh
$ cd project
$ git init // 初始化 git 仓库
$ ls -all  // 此时 project 根目录中生成 .git 文件
$ cd .git  // 进入查看 .git 文件的初始内容
```
## git add
保存文件并加入暂存区
### git hash-object -w <指定文件> 
根据文件内容生成文件 hash 存储在 objects 中，以 hash 前两位作为文件夹名称, 后 38 位作为文件名称
```sh
$ touch test.txt                // 创建一个文件
$ git hash-object -w test.txt   // 将该文件生成 hash 并存放在 .git/objects 中


// 生成的 hash 为： e69de29bb2d1d6434b8b29ae775ad8c2e48c5391
// .git/objects 中 新增文件夹 e6
// e6 文件夹中新增文件 9de29bb2d1d6434b8b29ae775ad8c2e48c5391

// 根据 hash 查看文件的内容，这里我们的文件为空，所以输出内容为空
$ git cat-file -p e69de29bb2d1d6434b8b29ae775ad8c2e48c5391
```

### git update-index
将新增文件加入暂存区并保持跟踪

```sh
$ git status // 执行前状态

位于分支 master

尚无提交

未跟踪的文件:
  （使用 "git add <文件>..." 以包含要提交的内容）
        test.txt

提交为空，但是存在尚未跟踪的文件（使用 "git add" 建立跟踪）
```

```sh
// 设置文件的权限、加入模式、指定路径加入暂存区
$ git update-index --add --cacheinfo 100644 \ e69de29bb2d1d6434b8b29ae775ad8c2e48c5391 test.txt
```

```sh
$ git status // 执行后状态
位于分支 master

尚无提交

要提交的变更：
  （使用 "git rm --cached <文件>..." 以取消暂存）
        新文件：   test.txt
```

我们可以看到，test.txt 已经添加到缓存区

## git commit 
提交目录结构和说明，生成快照
### git write-tree 

将当前目录结构生成一个 git 对象，文件以 hash 规则生成，具体步骤同上
```sh
$ git write-tree
5efb9bc29c482e023e40e0a2b3b7e49cec842034
```
通过 git cat-file -p <文件hash> 命令 查看对应文件
```sh
$ git cat-file -p 5efb9bc29c482e023e40e0a2b3b7e49cec842034
100644 blob e69de29bb2d1d6434b8b29ae775ad8c2e48c5391    test.txt
```
这里可以看到，我们的文件目录中包括 
- 文件类型：blob
- 文件内容：e69de29bb2d1d6434b8b29ae775ad8c2e48c5391
- 文件名称：test.txt

我们再添加第二个文件，查看多文件下的目录状态
```sh
$ touch one.txt
$ echo 'This is one.txt' > one.txt
& git hash-object -w one.txt
$ git update-index one.txt
$ git write-tree
2c5f1a0106801d13f8631e99aa020f55b7663a48
$ git cat-file -p 2c5f1a0106801d13f8631e99aa020f55b7663a48
100644 blob 48053c4a6646ad6b767bd33af60b0448ba779c06    one.txt
100644 blob e69de29bb2d1d6434b8b29ae775ad8c2e48c5391    test.txt
$ git cat-file -p 48053c4a6646ad6b767bd33af60b0448ba779c06
This is one.text
```
可以看到, 新的文件也已经添加到暂存区。
### git commit-tree

将暂存区内容生成快照 hash

```sh
$ git commit-tree 2c5f1a0106801d13f8631e99aa020f55b7663a48
7c842470b33f51605708734aa4372ef4d9370c97
```

查看快照内容
```sh
$ git cat-file -p 7c842470b33f51605708734aa4372ef4d9370c97
tree 2c5f1a0106801d13f8631e99aa020f55b7663a48
author wooc <wooc.zhang@email.com> 1650006041 +0800
committer wooc <wooc.zhang@email.com> 1650006041 +0800

first commit
```

- tree：目录树 hash：2c5f1a0106801d13f8631e99aa020f55b7663a48
- author：作者信息 wooc <wooc.zhang@email.com> 1650006041 +0800
- committer：提交者信息 wooc <wooc.zhang@email.com> 1650006041 +0800

将最新的快照指向分支头部
```sh
$ echo 7c842470b33f51605708734aa4372ef4d9370c97 > .git/refs/heads/master
```
此时 .git/refs/heads 目录会生成 master 文件并且内容为 7c842470b33f51605708734aa4372ef4d9370c97, 也就是说此时指针指向刚刚生成的快照, git log 即可查看当前分支的的快照（commit）。如果 master 已存在，则直接替换指针内容。

该命令会自动替换当前分支的指针
log 的查找方式为

按照分支指针指向的逻辑来看，下面几个命令的逻辑也就更好理解了

## git reset
重置当前分支的指针为指定的快照, 完成快照的切换
```sh
$ git reset <快照指针>
$ git reset HEAD^ 当前指针的前一个指针
```

HEAD 是一个特殊的指针，代表当前分支的指针，可以以它为基线，按照写法的方式代表指定位置的指针。
- HEAD^ 上一个指针 同等写法 HEAD~1
- HEAD~n 即当前指针之前的第 n 个指针
  
## git checkout
切换到指定分支，将当前指针指向要切换的分支的指针
```sh
$ git checkout master // 切换到 master 分支
$ cat .git/HEAD
ref: refs/heads/master
$ git checkout 785f188674ef3c6ddc5b516307884e1d551f53ca // 切换到指定的快照
$ cat .git/HEAD
785f188674ef3c6ddc5b516307884e1d551f53ca
```
此时的 HEAD 文件指针指向 785f188674ef3c6ddc5b516307884e1d551f53ca 而不是分支头部中的文件。当前处于分离头指针状态, 这里就不展开讲了。

## git branch
查看所有分支，创建分支
```shell
$ git branch // 查看本地所有分支
* master
$ cat .git/refs/heads/master // 查看所在分支 master 的指针
16f819d056b4e68d329a6ea39d86e1716c89a0b6
$ git branch dev // 新建 dev 分支, 会在 .git/refs/heads 中新增一个 dev 文件
$ cat .git/refs/heads/dev    // 查看新建分支 dev 的指针
16f819d056b4e68d329a6ea39d86e1716c89a0b6 // dev 指针为创建之前所在分支的指针
$ git branch
  dev
* master
```




