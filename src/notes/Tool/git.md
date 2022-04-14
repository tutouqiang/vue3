# GIT 原理及基本使用
了解以下几个点可以帮助你更快的理解 git 原理及命令
- 链表：增删改查及指针的使用
- hash：生成的基本逻辑
- 快照

# 目录
每一个 git 存储库根目录都有一个 .git 文件，这个文件会具备几个基础文件，并且随着你使用范围的增减会相应的新增一些其他的文件用于记录你操作的内容

初始文件
- FETCH_HEAD  本地分支的指针、名称、状态及远程地址的列表
- HEAD        当前头部指针对应的分支在 refs 文件中的路径
- config      远程地址及分支信息、核心配置
- description 
- hooks       git 操作对应的回调钩子
- index       
- info        
- objects 文件内容、目录树及快照内容。文件名为 hash 的前两位     
- refs    heads：分支名称,内容为名称的 hash 值 tags：tag 信息
- logs    本地及远程分支的状态

动态文件
- 

# 基本操作
分解常用的操作命令，清楚它每一步的作用，理解 git 的运作原理。
## git add
保存文件并加入暂存区
```javascript
git hash-object -w <指定文件> 
```
根据文件内容生成文件 hash 存储在 objects 中，以 hash 前两位作为文件夹名称, 后 38 位作为文件名称
```javascript
git update-index 
```
设置文件的权限、加入模式、指定路径加入暂存区

## git commit 
提交目录结构和说明，生成快照
```javascript
git write-tree 
```
将当前目录结构生成一个 git 对象，文件以 hash 规则生成，具体步骤同上
通过 git cat-file -p <文件hash> 命令 查看对应文件
```javascript
git commit-tree <git write-tree 命令生成的 hash>
```
将目录树写入版本历史

当前分支的指针内容会自动指向生成的快照。

如果是新建的仓库，此时 .git/refs/heads 中为空，可执行
```sh
echo 785f188674ef3c6ddc5b516307884e1d551f53ca > .git/refs/heads/master
```
此时 .git/refs/heads 目录会生成 master 文件并且内容为 785f188674ef3c6ddc5b516307884e1d551f53ca，也就是说此时指针指向刚刚生成的快照，git log 即可查看当前分支的最新 log
log 的查找方式为

按照分支指针指向的逻辑来看，下面几个命令的逻辑也就更好理解了

## git reset <commit hash || HEAD> 
重置当前分支的指针为指定的快照

HEAD 是一个特殊的指针，代表当前分支的指针，可以以它为基线，按照写法的方式代表指定位置的指针。
- HEAD^ 上一个指针 同等写法 HEAD~1
- HEAD~n 即当前指针之前的第 n 个指针




