---
title: VSCode 常用配置
createTime: 2022 年 3 月 10 日
updateTime: 2022 年 4 月 1 日
---
# 常用插件

## 1、Volar

开发 vue 的工具，代码高亮、提示。必备。Vetur 的 升级版，对 ts 的支持更加友好并兼容 Vetur 的功能。

<br>

## 2、[Bracket Pair Colorizer](https://github.com/CoenraadS/Bracket-Pair-Colorizer-2#readme)

括号彩色显示，方便一一对应.
TIP: 改项目已经停止维护，项目功能被 vscode 官方集中为原生功能。在 vscode > 设置 > setting.json 中加入以下代码即可开启此功能
```js
{
    "editor.bracketPairColorization.enabled": true,
    "editor.guides.bracketPairs":"active"
}
```

<br>

## 3、GitLens — Git supercharged

查看 git 提交历史

<br>

## 4、Auto Close Tag

tag 自动补全

<br>

## 5、Beautify

美化 javascript, JSON, CSS, Sass 和 HTML

<br>

## 6、Eslint

代码格式检查工具

<br>

## 7、LeetCode

可在 vscode 中登录、编写算法题

<br>

## 8、vscode-pdf

可在 vscode 中查看 pdf 书籍

<br>

## 9、Monokai Pro

主题美化

<br>

## 10、Markdown Preview Github Styling

本地 md 文档样式上传到 Github、npm 时，经常出现本地与线上表现不一致的问题，此插件可在编写时预览本地 md 文档在 Github 上展现的样式。

<br>

## 11、open in browser

鼠标邮件直接在浏览器中打开 html 等文件

<br>

# 常用配置

<br>

## 添加快捷操作

主要是用特定的缩写映射设置，快速实现某些功能或代码。如：不同的注释类型、html 的代码模板

### 快捷注释

1. 点击设置，选中 “用户代码片段”

2. 输入 snippets

3. 输入栏中填写新建的文件名：javascript.json

4. 会自动进入该文件，并显示一些初始化配置

5. ```js
   修改配置如下：
   {
   	// Place your global snippets here. Each snippet is defined under a snippet name and has a scope, prefix, body and
   	// description. Add comma separated ids of the languages where the snippet is applicable in the scope field. If scope
   	// is left empty or omitted, the snippet gets applied to all languages. The prefix is what is
   	// used to trigger the snippet and the body will be expanded and inserted. Possible variables are:
   	// $1, $2 for tab stops, $0 for the final cursor position, and ${1:label}, ${2:another} for placeholders.
   	// Placeholders with the same ids are connected.
   	// Example:
   	// "Print to console": {
   	// 	"scope": "javascript,typescript",
   	// 	"prefix": "log",
   	// 	"body": [
   	// 		"console.log('$1');",
   	// 		"$2"
   	// 	],
   	// 	"description": "Log output to console"
   	// }

   	// note
   	"Print to noteHeader": {
   		"prefix": "nh", // 自定义的快捷键名称
   		"body": [ // 生成的内容
   		  "/*",
   		  " *@desc:",
   		  "*/"
   		],
   		"description": "文件头部注释"
   	},
   	"Print to noteFn": {
   		"prefix": "nf",
   		"body": [
   			"/*",
   			" *@params1: ${1:参数1}",
   			" *@params2: ${2:参数2}",
   			" *@desc:",
   			"*/"
   		],
   		"description": "函数注释"
   	},

   	// React
   	"Print to rHooks": {
   		"prefix": "rh",
   		"body": [
   			"export default function $0 () {",
   			"",
   			"  return (",
   			"    <div></div>",
   			"  )",
   			"}"
   		],
   		"description": "Hooks组件模板"
   	},

   	// JS
   	"Print to jFunction": {
   		"prefix": "jf",
   		"body": [
   			"function $0 () {",
   			"",
   			"}"
   		],
   		"description": "js函数"
   	},

   	"Print to console": {
   		"prefix": "jl",
   		"body": [
   			"console.log($0)"
   		],
   		"description": "js打印日志"
   	},
   }
   ```

6.在代码任意一个地方输入，在代码提示框中选择你定义的名称。

例：输入 nh 选中 noteHeader，就会在当前位置输出你配置的注释

<br>

## 格式化

### .vscode

将 vscode 编辑器的配置也跟随文件设置,最大程度保证开发人员本地编辑器配置统一。

新建.vscode 文件夹，文件夹下新建 settings.json 文件,

settings.json 配置
{
"editor.codeActionsOnSave": {
"source.fixAll.eslint": true // 保存后检查 eslint 规则
},
"editor.formatOnSave": true // 保存后自动格式化
}

### .editorconfig

在项目中添加该文件并进行配置

跟随项目的格式化，使得格式化统一，不受编辑器影响。一般来说，首次推送到仓库后，将文件设置在.gitignore 中，避免其他人员修改，导致格式不一致。如需修改，由管理员统一修改，入口唯一即可

```js
# http://editorconfig.org
root = true

[*]
indent_style = space
indent_size = 2
end_of_line = lf
charset = utf-8
trim_trailing_whitespace = true
insert_final_newline = true

[*.md]
trim_trailing_whitespace = false

[Makefile]
indent_style = tab

```

<br>

### Prettier + eslint

[perttier+eslint](https://blog.csdn.net/zc135565/article/details/109812986?spm=1001.2014.3001.5501)

建议配置跟随项目，避免开发人员 vscode 中的配置不同，造成代码风格混杂，可读性、可维护性大大降低。文件的修改与配置，入口人员唯一
