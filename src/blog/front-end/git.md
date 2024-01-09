---
title: GIT 原理及基本使用
theme: condensed-night-purple
meta:
  - name: description
    content: GIT 原理及基本使用
  - name: keywords
    content: git
createTime: 2022 年 7 月 27 日
---

# GIT 原理及基本使用
 Git 是一套内容寻址 (content-addressable) 文件系统
了解以下几个点可以帮助你更快的理解 git 原理及命令
- 链表：增删改查及指针的使用
- hash：生成的基本逻辑
- 快照

# 目录
每一个 git 存储库根目录都有一个 .git 文件，这个文件会具备几个基础文件，并且随着你使用范围的增减会相应的新增一些其他的文件用于记录你操作的内容。


## 初始文件
- FETCH_HEAD  本地分支的指针、名称、状态及远程地址的列表。默认为空
- HEAD        当前头部指针对应的分支在 refs 文件中的路径。默认为：ref: refs/heads/master
- config      配置信息。
- description 文件仅供 GitWeb 程序使用，所以不用关心这些内容。
- hooks       git 操作对应的回调钩子      
- info        目录保存了一份不希望在 .gitignore 文件中管理的忽略模式 (ignored patterns) 的全局可执行文件。
- objects     存储所有数据内容。文件内容、目录树及快照内容。  
- refs        refs/heads：分支名称,内容为名称的 hash 值。 refs/tags：tag 信息

### objects
默认文件 pack、info

文件、目录、快照则会以 hash 的形式保存，长度均为 40 位。文件夹名为 hash 的前两位，文件名为后面的 38 位，文件内容为则为真实的文件内容。
```bash
// 生成一个初始仓库并在仓库中新增内容为 ‘test’ 的 index.txt 文件
$ git init project && cd project
$ echo 'test' > index.txt
$ git hash-object -w index.txt
9daeafb9864cf43055ae93beb0afd6c7d144bfa4
```
#### 文件存储
此时 .git/objects 文件中新增文件夹 9d, 9d 文件夹中新增文件 aeafb9864cf43055ae93beb0afd6c7d144bfa4, 可以通过命令查看文件内容为 test
```bash
$ git cat-file -p 9daeafb9864cf43055ae93beb0afd6c7d144bfa4
test
```

#### 文件树存储
文件树（tree）下面包含生成的文件信息

将新增的文件添加到暂存区，使用 git write-tree 生成文件树，文件树生成逻辑与文件相同
```bash
$ git update-index --add --cacheinfo 100644 9daeafb9864cf43055ae93beb0afd6c7d144bfa4 index.txt
$ git write-tree
bf46be7f487eb5f42bfa6cbd10b9f7efdb3ed7ac
```
此时 .git/objects 新增文件夹和文件为 bf/46be7f487eb5f42bfa6cbd10b9f7efdb3ed7ac, 我们使用同样的命令查看文件树内容

```bash
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
一次 commit 提交也就意味着一次快照生成。commit 指向 tree 或文件

```bash
$ echo 'first commit' | git commit-tree bf46be7f487eb5f42bfa6cbd10b9f7efdb3ed7ac
$ git cat-file -p bf46be7f487eb5f42bfa6cbd10b9f7efdb3ed7ac
```
commit 下的信息
- tree 文件树的完整 hash
- author 作者名称、邮箱、时间戳
- committer 本次 commit 的提交者名称、邮箱、时间戳
- 'first commit' 提交说明

创建 commit 时同样会在 .git/objects 中新增文件，机制与上述几项均相同

## refs
默认包含两个空文件
### heads
记录分支信息，默认为空。
当产生第一次 commit 提交之后，该文件下方会出现提交到的分支名称，内容为 commit 的 hash
```bash
$ git update-ref refs/heads/master bf46be7f487eb5f42bfa6cbd10b9f7efdb3ed7ac
```

### tags
记录所有 tag，tag 指向一个 commit。 但这个指向与分支指向不同，它不会变化，可以看作一个不可以更改指向的分支。

tag 可以通过命令创建
```bash
$ git update-ref refs/tags/V1.0 bf46be7f487eb5f42bfa6cbd10b9f7efdb3ed7ac
$ cat .git/refs/tags/v1.0
bf46be7f487eb5f42bfa6cbd10b9f7efdb3ed7ac
```
### remotes
记录远程 push 的分支信息。

当前 git 仓库有过远程地址的 push 操作后会自动创建该文件夹。

内容为 origin 文件夹，该文件夹下记录被 push 过的分支名。例如：origin/master、origin/dev。
```bash
$ git init
$ find .git/refs // 查看默认文件
.git/refs
.git/refs/heads
.git/refs/tags
$ echo '1' > one.txt
$ git commit -a -m 'first commit' // 综合 git add 、git commit 操作命令
$ git remote add origin git@gitee.com:zhangchao-wooc/project.git // 添加远程分支地址
$ git push
$ find .git/refs // 可以看到已经创建 remotes/origin/master 文件
.git/refs
.git/refs/heads
.git/refs/heads/master
.git/refs/tags
.git/refs/remotes
.git/refs/remotes/origin
.git/refs/remotes/origin/master
$ cat .git/regs/remotes/master // 该文件内容为 commit 指针
adf7ca10f5d2f93c3680e94dd9b4905ab18fa511
```
Remote 引用和分支主要区别在于他们是不能被 check out 的。Git 把他们当作是标记了这些分支在服务器上最后状态的一种书签。


文件内容为 commit 指针

## 动态文件
- index 
- logs    本地及远程分支的状态

# 基本操作
分解常用的操作命令，清楚它每一步的作用，理解 git 的运作原理。

新建一个空文件夹作为项目文件夹

```bash
$ mkdir project
```
## git init
在项目根目录执行，初始化 git 仓库，生成 .git 的隐藏文件, 内容为初始文件，具体可见上述[目录部分](#目录)。
隐藏文件使用编辑器或 ls 命令是不可见的，使用 ls -all 查看全部文件时即可显示。
```bash
$ cd project
$ git init // 初始化 git 仓库
$ ls -all  // 此时 project 根目录中生成 .git 文件
$ cd .git  // 进入查看 .git 文件的初始内容
```
## git add
保存文件并加入暂存区
### git hash-object -w <指定文件> 
根据文件内容生成文件 hash 存储在 objects 中，以 hash 前两位作为文件夹名称, 后 38 位作为文件名称
```bash
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

```bash
$ git status // 执行前状态

位于分支 master

尚无提交

未跟踪的文件:
  （使用 "git add <文件>..." 以包含要提交的内容）
        test.txt

提交为空，但是存在尚未跟踪的文件（使用 "git add" 建立跟踪）
```

```bash
// 设置文件的权限、加入模式、指定路径加入暂存区
$ git update-index --add --cacheinfo 100644 \ e69de29bb2d1d6434b8b29ae775ad8c2e48c5391 test.txt
```

```bash
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
```bash
$ git write-tree
5efb9bc29c482e023e40e0a2b3b7e49cec842034
```
通过 git cat-file -p <文件hash> 命令 查看对应文件
```bash
$ git cat-file -p 5efb9bc29c482e023e40e0a2b3b7e49cec842034
100644 blob e69de29bb2d1d6434b8b29ae775ad8c2e48c5391    test.txt
```
这里可以看到，我们的文件目录中包括 
- 文件类型：blob
- 文件内容：e69de29bb2d1d6434b8b29ae775ad8c2e48c5391
- 文件名称：test.txt

我们再添加第二个文件，查看多文件下的目录状态
```bash
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

```bash
$ echo 'first commit' | git commit-tree 2c5f1a0106801d13f8631e99aa020f55b7663a48
7c842470b33f51605708734aa4372ef4d9370c97
```

查看快照内容
```bash
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
```bash
$ echo 7c842470b33f51605708734aa4372ef4d9370c97 > .git/refs/heads/master
```
此时 .git/refs/heads 目录会生成 master 文件并且内容为 7c842470b33f51605708734aa4372ef4d9370c97, 也就是说此时指针指向刚刚生成的快照, git log 即可查看当前分支的的快照（commit）。如果 master 已存在，则直接替换指针内容。

直接操作文件内容的方式替换当前分支指向可行，但官方不建议。Git 命令 git update-ref 可以安全的执行此操作
```bash
$ git update-ref refs/heads/dev 7c842470b33f51605708734aa4372ef4d9370c97
```
此时会新建或更新 dev 分支的指向为 7c842470b33f51605708734aa4372ef4d9370c97

git commit 执行完之后其他文件相应的更新


log 的查找方式为

# 按照分支指针指向的逻辑来看，下面几个命令的逻辑也就更好理解了

## git reset
重置当前分支的指针为指定的快照, 完成快照的切换
```bash
$ git reset <快照指针>
$ git reset HEAD^ 当前指针的前一个指针
```

HEAD 是一个特殊的指针，代表当前分支的指针，可以以它为基线，按照写法的方式代表指定位置的指针。
- HEAD^ 上一个指针 同等写法 HEAD~1
- HEAD~n 即当前指针之前的第 n 个指针
  
## git checkout
切换到指定分支，将当前指针指向要切换的分支的指针，本质上是切换指针的引用的路径操作。
```bash
$ git checkout master // 切换到 master 分支
$ cat .git/HEAD
ref: refs/heads/master // 此时指针指向 master 中最新的 commit
$ git checkout dev // 切换到 dev 分支
$ cat .git/HEAD
ref: refs/heads/dev // 此时指针指向 dev 中最新的 commit
$ git checkout 785f188674ef3c6ddc5b516307884e1d551f53ca // 切换到指定的快照
$ cat .git/HEAD
785f188674ef3c6ddc5b516307884e1d551f53ca
```
此时的 HEAD 文件指针指向 785f188674ef3c6ddc5b516307884e1d551f53ca 而不是分支头部中的文件。当前处于分离头指针状态, 这里就不展开讲了。

也可以通过 git symbolic-ref HEAD 查看或者更改当前分支
```bash
$ git symbolic-ref HEAD
refs/heads/dev
$ git symbolic-ref HEAD refs/heads/master
$ git symbolic-ref HEAD
refs/heads/master
```

## git update-ref
更新指定分支的指针。

相关的命令有 
- git branch <分支名称> 将要创建的分支中的指针更新为当前分支的指针
```bash
git update-ref refs/heads/dev 7c842470b33f51605708734aa4372ef4d9370c97
```

## git branch
查看所有分支，创建分支。

TIP：新 git 仓库使用该命令创建分支时会报错，当 git 存储库有了第一次的 commit 提交到指定分支后，此命令创建分支才可正常使用
```bash
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




