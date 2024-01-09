---
title: ora 源码分析
meta:
  - name: description
    content: ora 源码分析
  - name: keywords
    content: ora 源码分析、cliSpinners、logSymbols
createTime: 2022 年 1 月 18 日
updateTime: 2022 年 4 月 1 日
theme: smartblue
highlight: androidstudio
---




# ora 源码分析

ora（终端微调器） 这个库主要用来作为等待图标使用，在非常多的 npm 库中都有使用，今天通过源码解读下它到底是怎么实现的。

JavaScript 是单线程的，因此同步操作会阻塞线程，包括微调器动画，显示效果就像 60Hz 的显示器玩 FPS 游戏一样，一卡一卡的。所以尽可能选择异步操作。

源码解读在最后一部分！

<br>

## 核心逻辑
>使用一组字符，循环在终端擦除、写入，在一定的时间间隔中可得到类似动画片的效果，使字符动起来了。
>使用三方库的能力丰富的 ora 的表现力。
>
>【1】chalk 使输入的字符可以变换颜色
>
>【2】cliSpinners 提供可连成一套动作的字符库
>
>【3】node  判断行数，判断用户操作，擦除、写入终端指定的字符
>
>【4】logSymbols 输出各种日志级别的彩色符号
>
>【5】通过 wcwidth 计算需要清理的行数 linesToClear， 使用 for 循环挨行清理终端，清理完成后移动光标到初始位置
>
>【6】通过 indent 缩进的位置确定光标应该移动到哪里。
>
> 以上是代码的大概逻辑，还有使用到的一些三方库及其作用可以看下方的源码分析部分，都以注释的形式标注在源码中了

<br>

## 手写 ora

这里取了几段核心代码能力，实现了一个最基本功能的 ora。定时器 id 管理、停止啊什么的都没有加的，只是想看一个最简单的功能运行。

```javascript
const stream = process.stderr;
let frameIndex = 0;
const frames = [ // 字符组
  '⠋', '⠙', '⠹', '⠸',
  '⠼', '⠴', '⠦', '⠧',
  '⠇', '⠏',
];

// 取下一个状态的字符
function frame() {
  const frame = frames[frameIndex];
  frameIndex = ++frameIndex % frames.length;

  const fullPrefixText = '这是前缀 ';
  const fullText = ' 这是后缀（跑起来了）...';

  return fullPrefixText + frame + fullText;
}

// 清理上一个字符，写入新的字符
function rander() {
  stream.cursorTo(0);
  stream.clearLine(1);
  stream.write(frame());
}
// 循环读取每一个状态的字符，形成了一个完整的动作
// 就像动画片一样，每一个都是静止的，翻页速度快了，就像动起来一样
setInterval(rander.bind(this), 50);

```
### 运行效果


![屏幕录制2022-01-21-下午11.41.50.gif](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b9227cc8a604454994cfc574b682eac8~tplv-k3u1fbpfcp-watermark.image?)

# 源码解读
```javascript
import process from 'node:process'; // 获取进程
import readline from 'node:readline'; // 获取逐行读取文件流方法
import chalk from 'chalk'; // ‘粉笔’ 用于设置终端字体颜色的库
import cliCursor from 'cli-cursor'; // 退出时恢复 CLI 光标
import cliSpinners from 'cli-spinners'; // 终端的微调器
import logSymbols from 'log-symbols'; // 各种日志级别的彩色符号。示例：`✔︎成功`
import stripAnsi from 'strip-ansi'; // 从字符串中去除 ANSI 转义码
import wcwidth from 'wcwidth'; // 判断字符串在当前端口需要几行
import isInteractive from 'is-interactive'; // 检查 stdout 或 stderr 是否是交互式的
import isUnicodeSupported from 'is-unicode-supported'; // 检测终端是否支持Unicode
import { BufferListStream } from 'bl'; // 一个 Node.js 缓冲区列表收集器、阅读器和流媒体。

const TEXT = Symbol('text');
const PREFIX_TEXT = Symbol('prefixText');
const ASCII_ETX_CODE = 0x03; // Ctrl+C emits this code

// TODO: Use class fields when ESLint 8 is out.

class StdinDiscarder {
  constructor() {
    this.requests = 0;

    this.mutedStream = new BufferListStream(); // 初始化Buffer列表。
    this.mutedStream.pipe(process.stdout); // 流入可写流
    // stdin 可读流，读取当前操作是否为 keypress 事件
    // 是否为 ‘data' 事件 并且是 Ctrl+C 操作，是则触发事件，杀死进程 pid 退出交互
    const self = this; // eslint-disable-line unicorn/no-this-assignment
    this.ourEmit = function (event, data, ...args) {
      const { stdin } = process;
      if (self.requests > 0 || stdin.emit === self.ourEmit) {
        if (event === 'keypress') { // Fixes readline behavior
          return;
        }

        if (event === 'data' && data.includes(ASCII_ETX_CODE)) {
          process.emit('SIGINT');
        }

        Reflect.apply(self.oldEmit, this, [event, data, ...args]);
      } else {
        Reflect.apply(process.stdin.emit, this, [event, data, ...args]);
      }
    };
  }

  start() { // 开始监听交互
    this.requests++;

    if (this.requests === 1) {
      this.realStart();
    }
  }

  stop() { // 停止交互
    if (this.requests <= 0) {
      throw new Error('`stop` called more times than `start`');
    }

    this.requests--;

    if (this.requests === 0) {
      this.realStop();
    }
  }

  /**
   * 1、判断平台是否为 windows
   * 2、创建命令行交互
   * 3、监听事件
  */
  realStart() {
    // No known way to make it work reliably on Windows
    if (process.platform === 'win32') {
      return;
    }

    // 创建可读流监听器
    this.rl = readline.createInterface({
      input: process.stdin,
      output: this.mutedStream,
    });
    // 监听 Ctrl+C 操作，是的话就会关闭监听，杀死进程
    this.rl.on('SIGINT', () => {
      if (process.listenerCount('SIGINT') === 0) {
        process.emit('SIGINT');
      } else {
        this.rl.close();
        process.kill(process.pid, 'SIGINT');
      }
    });
  }

  // 关闭交互操作
  realStop() {
    if (process.platform === 'win32') {
      return;
    }

    this.rl.close();
    this.rl = undefined;
  }
}

let stdinDiscarder;

class Ora {
  constructor(options) {
    if (!stdinDiscarder) {
      // 初次运行，实例化 stdinDiscarder
      stdinDiscarder = new StdinDiscarder();
    }

    if (typeof options === 'string') {
      // 为 string 时，认为该参数为 后缀文字
      options = {
        text: options,
      };
    }
    // 对所有参数处理为默认值或传入的值
    this.options = {
      text: '',
      color: 'cyan',
      stream: process.stderr,
      discardStdin: true,
      ...options,
    };

    this.spinner = this.options.spinner; // 展示动效的字符组

    this.color = this.options.color; // 字符颜色
    this.hideCursor = this.options.hideCursor !== false; // 是否隐藏光标
    // 动效的刷新速度，时间间隔
    this.interval = this.options.interval || this.spinner.interval || 100;
    this.stream = this.options.stream; // 可读、写流
    this.id = undefined; // 动效的定时器 id
    // 强制启用/禁用微调器。
    this.isEnabled = typeof this.options.isEnabled === 'boolean' ? this.options.isEnabled : isInteractive({ stream: this.stream });
    // 禁用微调器和所有日志文本
    this.isSilent = typeof this.options.isSilent === 'boolean' ? this.options.isSilent : false;

    // Set *after* `this.stream`
    this.text = this.options.text; // 后缀文本
    this.prefixText = this.options.prefixText; // 前缀文本
    this.linesToClear = 0; // 当前行数，用于清理终端时使用
    this.indent = this.options.indent; // 缩进，主要用于当前光标定位
    // 丢弃标准输入，用与处理异常情况，防止动效抖动
    this.discardStdin = this.options.discardStdin;
    this.isDiscardingStdin = false; // 丢弃标准输入
  }

  get indent() {
    return this._indent;
  }

  // 设置缩进
  set indent(indent = 0) {
    if (!(indent >= 0 && Number.isInteger(indent))) {
      throw new Error('The `indent` option must be an integer from 0 and up');
    }

    this._indent = indent;
    this.updateLineCount();
  }

  // 更新动效的时间间隔
  _updateInterval(interval) {
    if (interval !== undefined) {
      this.interval = interval;
    }
  }

  get spinner() {
    return this._spinner;
  }

  /**
   * 设置当前图标的字符组
   * 1、重制取字符的索引
   * 2、校验传入参数的正确性
   * 3、更新字符刷新的速度，单位：毫秒
  */
  set spinner(spinner) {
    // ----1----
    this.frameIndex = 0;

    // ----2----
    if (typeof spinner === 'object') {
      if (spinner.frames === undefined) {
        throw new Error('The given spinner must have a `frames` property');
      }

      this._spinner = spinner;
    } else if (!isUnicodeSupported()) {
      this._spinner = cliSpinners.line;
    } else if (spinner === undefined) {
      // Set default spinner
      this._spinner = cliSpinners.dots;
    } else if (spinner !== 'default' && cliSpinners[spinner]) {
      this._spinner = cliSpinners[spinner];
    } else {
      throw new Error(`There is no built-in spinner named '${spinner}'. See https://github.com/sindresorhus/cli-spinners/blob/main/spinners.json for a full list.`);
    }
    // ----3----
    this._updateInterval(this._spinner.interval);
  }

  get text() {
    return this[TEXT];
  }

  // 设置后缀文本，
  set text(value) {
    this[TEXT] = value;
    this.updateLineCount();
  }

  get prefixText() {
    return this[PREFIX_TEXT];
  }

  // 设置前缀文本
  set prefixText(value) {
    this[PREFIX_TEXT] = value;
    this.updateLineCount();
  }

  // 当前是否正在运行
  get isSpinning() {
    return this.id !== undefined;
  }

  // 获取填充的前缀文本
  getFullPrefixText(prefixText = this[PREFIX_TEXT], postfix = ' ') {
    if (typeof prefixText === 'string') {
      return prefixText + postfix;
    }

    if (typeof prefixText === 'function') {
      return prefixText() + postfix;
    }

    return '';
  }

  updateLineCount() {
    const columns = this.stream.columns || 80;
    const fullPrefixText = this.getFullPrefixText(this.prefixText, '-');
    this.lineCount = 0;
    for (const line of stripAnsi(`${' '.repeat(this.indent) + fullPrefixText}--${this[TEXT]}`).split('\n')) {
      this.lineCount += Math.max(1, Math.ceil(wcwidth(line) / columns));
    }
  }

  get isEnabled() {
    return this._isEnabled && !this.isSilent;
  }

  set isEnabled(value) {
    if (typeof value !== 'boolean') {
      throw new TypeError('The `isEnabled` option must be a boolean');
    }

    this._isEnabled = value;
  }

  get isSilent() {
    return this._isSilent;
  }

  set isSilent(value) {
    if (typeof value !== 'boolean') {
      throw new TypeError('The `isSilent` option must be a boolean');
    }

    this._isSilent = value;
  }

  /**
   * 1、取出默认或自定义的当前索引的字符
   * 2、确认字符渲染的颜色
   * 3、自增1 与当前图标长度取余，用于下次的取出操作，方便循环取值 ♻️
   * 4、填充 动态图标 前面和后面的字符，并返回该字符
   *
  */
  frame() {
    // ----1----
    const { frames } = this.spinner;
    let frame = frames[this.frameIndex];
    // ----2----
    if (this.color) {
      frame = chalk[this.color](frame);
    }
    // ----3----
    this.frameIndex = ++this.frameIndex % frames.length;
    // ----4----
    const fullPrefixText = (typeof this.prefixText === 'string' && this.prefixText !== '') ? `${this.prefixText} ` : '';
    const fullText = typeof this.text === 'string' ? ` ${this.text}` : '';

    return fullPrefixText + frame + fullText;
  }

  // 清理终端，重置光标位置、参数
  clear() {
    if (!this.isEnabled || !this.stream.isTTY) {
      return this;
    }

    this.stream.cursorTo(0);

    for (let index = 0; index < this.linesToClear; index++) {
      if (index > 0) {
        this.stream.moveCursor(0, -1);
      }

      this.stream.clearLine(1);
    }

    if (this.indent || this.lastIndent !== this.indent) {
      this.stream.cursorTo(this.indent);
    }

    this.lastIndent = this.indent;
    this.linesToClear = 0;

    return this;
  }

  // 清理字符、写入字符，循环往复，形成类似动态的效果
  render() {
    if (this.isSilent) {
      return this;
    }

    this.clear();
    this.stream.write(this.frame());
    this.linesToClear = this.lineCount;

    return this;
  }

  // 判断参数，开始在终端渲染
  start(text) {
    if (text) {
      this.text = text;
    }

    if (this.isSilent) {
      return this;
    }

    if (!this.isEnabled) {
      if (this.text) {
        this.stream.write(`- ${this.text}\n`);
      }

      return this;
    }

    if (this.isSpinning) {
      return this;
    }

    if (this.hideCursor) {
      cliCursor.hide(this.stream);
    }

    if (this.discardStdin && process.stdin.isTTY) {
      this.isDiscardingStdin = true;
      stdinDiscarder.start();
    }

    this.render();
    // 保留定时器，用于获取当前状态和清除当前动作
    this.id = setInterval(this.render.bind(this), this.interval);

    return this;
  }

  // 停止运行：清除定时器，重置参数，清理终端
  stop() {
    if (!this.isEnabled) {
      return this;
    }

    clearInterval(this.id);
    this.id = undefined;
    this.frameIndex = 0;
    this.clear();
    if (this.hideCursor) {
      cliCursor.show(this.stream);
    }

    if (this.discardStdin && process.stdin.isTTY && this.isDiscardingStdin) {
      stdinDiscarder.stop();
      this.isDiscardingStdin = false;
    }

    return this;
  }

  // 成功
  succeed(text) {
    return this.stopAndPersist({ symbol: logSymbols.success, text });
  }

  // 失败
  fail(text) {
    return this.stopAndPersist({ symbol: logSymbols.error, text });
  }

  // 警告
  warn(text) {
    return this.stopAndPersist({ symbol: logSymbols.warning, text });
  }

  // 打印信息
  info(text) {
    return this.stopAndPersist({ symbol: logSymbols.info, text });
  }

  // 拼接前缀、信息、后缀。
  // 停止函数运行并输出信息到终端
  stopAndPersist(options = {}) {
    if (this.isSilent) {
      return this;
    }

    const prefixText = options.prefixText || this.prefixText;
    const text = options.text || this.text;
    const fullText = (typeof text === 'string') ? ` ${text}` : '';

    this.stop();
    this.stream.write(`${this.getFullPrefixText(prefixText, ' ')}${options.symbol || ' '}${fullText}\n`);

    return this;
  }
}
// 导出 ora
export default function ora(options) {
  return new Ora(options);
}
// 导出 promise 版
export async function oraPromise(action, options) {
  const actionIsFunction = typeof action === 'function';
  // eslint-disable-next-line promise/prefer-await-to-then
  const actionIsPromise = typeof action.then === 'function';

  if (!actionIsFunction && !actionIsPromise) {
    throw new TypeError('Parameter `action` must be a Function or a Promise');
  }

  const { successText, failText } = typeof options === 'object'
    ? options
    : { successText: undefined, failText: undefined };

  const spinner = ora(options).start();

  try {
    const promise = actionIsFunction ? action(spinner) : action;
    const result = await promise;

    spinner.succeed(
      successText === undefined
        ? undefined
        : (typeof successText === 'string' ? successText : successText(result)),
    );

    return result;
  } catch (error) {
    spinner.fail(
      failText === undefined
        ? undefined
        : (typeof failText === 'string' ? failText : failText(error)),
    );

    throw error;
  }
}

```

