---
theme: healer-readable
title: cli-spinners 做了什么？
createTime: 2022 年 1 月 20 日
updateTime: 2022 年 4 月 1 日
---

# cli-spinners 做了什么？
# [cli-spinners](https://github.com/sindresorhus/cli-spinners)

> 在 [ora 源码分析 ———— ora 怎么实现的？](https://juejin.cn/post/7055688184264556557) 这篇文章中有提到过 cli-spinners 这个库，它也是 ora 的核心物料库，提供着 '**定格动画中的每一帧画面**'。

## Github 是这样描述的


>The list of spinners is just a [JSON file](https://github.com/sindresorhus/cli-spinners/blob/main/spinners.json) and can be used wherever.
>
>You probably want to use one of these spinners through the [`ora`](https://github.com/sindresorhus/ora) module.
>
>作者将它描述为一个 JSON 形式的列表,并且推荐你可以通过 ora 来使用它

## 示例
作者给了一个综合性的示例。展示了大概一半的效果。

![screenshot.gif](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d96f43111def44deb303193e29804fa2~tplv-k3u1fbpfcp-watermark.image?)

我选择了其中几个有意思的物料库运行了一下

```js
import ora from 'ora'

const spinerList = [ // 挑了几个更加图形化的模式
  'timeTravel', 
  'speaker', 
  'soccerHeader', 
  'fistBump', 
  'weather', 
  'moon', 
  'earth', 
  'smiley']
let index = 0

const spinner = ora({
  prefixText: 'spinnerName：‘timeTravel’',
  spinner: 'timeTravel'
}).start()

setInterval(function(){
  spinner.prefixText = `spinnerName: timeTravel`
  spinner.spinner = spinerList[index]
  index = ++index % spinerList.length;
}, 1500)


```
效果如下

![屏幕录制2022-01-23 上午10.gif](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9d7e76a86d7f4f5aa26f4bcf3931aeaf~tplv-k3u1fbpfcp-watermark.image?)

#### [spinners.json](https://github.com/sindresorhus/cli-spinners/blob/main/spinners.json) 内容

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2de639af72e94edbba1eca0faf75618f~tplv-k3u1fbpfcp-watermark.image?)

文件结构为

```js
interval：刷新的速度，毫秒单位
frames：每一步的动作字符
```

看起来很简单是不是，接下来我们来试一下自己制作物料

# 自制物料
### 字符来源
有很多字符网站，例如：https://cn.piliapp.com/symbol/ ，也可以通过一些字符制作网站，制作自己的一套字符，用在自己的 npm 包的制作中，一个字，就是玩～

### 效果

![1.gif](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8a9af62e4d5c457d9a606be9c4fbde25~tplv-k3u1fbpfcp-watermark.image?)

[![2.gif](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6ace097d33984e4fa3519bc9f5b698d8~tplv-k3u1fbpfcp-watermark.image?)](url)
### 代码如下
友好提示：写动作字符会上瘾 🤪
```import ora from 'ora'

var kou = {
  interval: 200,
  frames: [
    '口',
    '回',
    '口',
    '回',
  ]
}
var circle = {
  interval: 80,
  frames: [
    '◐',
    '◓',
    '◑',
    '◒',
  ]
}

var kungfu = {
  interval: 200,
  frames: [
    'ጿ',
    'ኈ',
    'ቼ',
    'ዽ',
  ]
}

var composite = {
  interval: 300,
  frames: [
    '◖   ●    ◗',
    '◖   ◗◖   ◗',
    '◖  ◗  ◖  ◗',
    '◖ ◗    ◖ ◗',
    '◖◗      ◖◗',
    '●        ●',
    '◖◗      ◖◗',
    '◖ ◗    ◖ ◗',
    '◖   ◗◖   ◗',
  ]
}

var omit = {
  interval: 200,
  frames: [
    '.',
    ' .',
    '  .',
    '   .',
    '    .',
    '.   .',
    ' .  .',
    '  . .',
    '   ..',
    '.  ..',
    ' . ..',
    '  ...',
    '. ...',
    ' ....',
    '.....',
    '!....',
    '.!...',
    '..!..',
    '...!.',
    '....!',
    '!...!',
    '.!..!',
    '..!.!',
    '...!!',
    '!..!!',
    '.!.!!',
    '..!!!',
    '!.!!!',
    '.!!!!',
    '!!!!!',
    '.!!!!',
    '!.!!!',
    '!!.!!',
    '!!!.!',
    '!!!!.',
    '.!!!.',
    '!.!!.',
    '!!.!.',
    '!!!..',
    '.!!..',
    '!.!..',
    '!!...',
    '.!...',
    '!....',
    '.....',
    '. ...',
    '.. ..',
    '... .',
    '.... ',
    ' ... ',
    '. .. ',
    '.. . ',
    '...  ',
    ' ..  ',
    '. .  ',
    '..   ',
    ' .   ',
  ]
}

const spinerList = [
  kou, 
  circle, 
  kungfu,
  composite,
  omit
]
let index = 0

const spinner = ora({
  spinner: kou,
}).start()

setInterval(function(){
  spinner.spinner = spinerList[index]
  index = ++index % spinerList.length
}, 2000)



```
