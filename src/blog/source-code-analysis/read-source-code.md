---
title: 怎样阅读源码
meta:
  - name: description
    content: 怎样阅读源码
  - name: keywords
    content: 怎样阅读源码、
createTime: 2023 年 3 月 8 日
updateTime: 2023 年 3 月 8 日
theme: smartblue
highlight: androidstudio
---

# 怎样阅读源码
合适的前置准备及方法可以帮你更好的梳理阅读源码的入口、顺序、重点和高效。

## 阅读工具及快捷指令
使用自己较为熟悉的编辑器是阅读源码的第一步，可以通过编辑器特性及快捷指令帮助你从源码的结构中快速的定位某些代码片段。

这里以我熟悉的编辑器 <a href="https://code.visualstudio.com" target="_blank">VsCode</a> 为例。 

### 常用的快捷指令

#### 搜索定位
>**command + F**  

调出搜索工具，对当前页面中的字符进行搜索定位，确定代码位置，快速跳转至指定位置。  
当匹配位置过多时，可通过大小写等限制精准匹配搜索文本，缩小范围。  
通过方向键 ↓↑ 查看搜索结果中的某一条

#### 展开（折叠）所有区域
>**conmand + K、conmand + n**  

源码文件初次打开时均为完全展开，文件过长，容易导致可视范围内信息量少，不容易分辨和查找代码。可通过两次的组合快捷键，将代码按层级收起。  

> **conmand + K、conmand + 0**  
> 
折叠所有区域（n表示代码层级；0表示折叠所有区域，既第一层；1表示折叠第二层；以此类推）

> **conmand + K、conmand + J**  

展开所有区域  

>**conmand + K** 

按下后有大约 3 秒的时间，在此时间内按下第二组命令即可。

#### 拆分编辑器
> **conmand + \\**  

在同一页需要对比阅读的函数间隔过可视范围时，通过拆分编辑器为多栏窗口，方便对比  

更多快捷指令可见 <a href="https://code.visualstudio.com/docs/getstarted/keybindings#_default-keyboard-shortcuts" target="_blank">默认键盘快捷键</a>

### 翻译插件
<a href="https://marketplace.visualstudio.com/items?itemName=intellsmi.comment-translate&ssr=false#overview" target="_blank">**Comment Translate**</a>


中国的大部分开发者的英语阅读能力有限，即使通过英语四、六级考试，对于非母语的反应和理解也是比较慢的，而且部分单词术语过于专业，可以通过插件实现备注的快捷翻译，省去 复制 - 浏览器翻译 的步骤（不在乎速度，想练习英语能力的同学除外）。  

![Comment Translate 演示](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/11fe3d123b7d4d3b8d7f253cc7586927~tplv-k3u1fbpfcp-watermark.image?)


## 阅读顺序
一般以代码的执行顺序为主。通过寻找入口文件开始。  

**以 JS 项目 <a href="https://github.com/reduxjs/redux" target="_blank">redux</a>  为例**

通过 package.json 中的 main、unpkg、module 等字段来确定入口文件，但这往往是打包后的入口文件位置。  
![redux package.json ](https://raw.githubusercontent.com/zhangchao-wooc/wooc/master/content/source-code-analysis/img/read-source-code/package.json.webp)  

通过构建工具的入口配置文件 rollup.config.js 中的配置可确定入口文件为 src/index.ts。  
![redux rollup.config.js ](https://raw.githubusercontent.com/zhangchao-wooc/wooc/master/content/source-code-analysis/img/read-source-code/rollup.config.js.webp) 

构建工具有很多，如 vite、webpack 等，其入口文件的配置关键字不同，但理解上大致相同，根据需要到相应的官网查看入口配置项即可找到入口文件。

但也有一些比较简单的项目，即没有按照 package.json 的配置规范配置入口，也没有使用构建工具（有较小的项目，没必要使用项目工具），但其文件结构大部分是及其简单的，比较好分辨入口文件。  

**这里以 <a href="https://github.com/rstacruz/nprogress" target="_blank">nprogress</a>  项目为例**

可以看到，这里只有一个 JS 文件，基本确定就是唯一的文件，同时也是入口文件。  
![nprogress](https://raw.githubusercontent.com/zhangchao-wooc/wooc/master/content/source-code-analysis/img/read-source-code/nprogress.webp) 

## 阅读重点

### 忽略边缘函数
源码中有很多判断参数及错误捕获的函数，完善项目的稳定性及兼容，这一部分在初次阅读的时候可尽量避开。  
重点阅读源码的实现逻辑部分。

### 重视备注
源码中会对重要的函数做备注，描述函数作用、逻辑处理以及注意事项，这部分要细细阅读，对备注部分函数的理解帮助很大。

### 先阅读主要逻辑
带可配置项的项目，优先按照其默认配置的方向阅读，对于配置、插件等拓展项可放在后面阅读。理清主次。

### 笔记
在有理解或感悟的位置可直接备注，因为可能你明白了，看到后面再回来时又忘记了。（是我没错了🤣）  

如项目较大，建议将项目保存至自己的代码库，当备注脱离代码后，其描述是苍白的。同时方便后续跨时间、跨设备的阅读。
