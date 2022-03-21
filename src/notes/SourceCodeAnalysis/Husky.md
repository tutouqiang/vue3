# husky 源码分析

>Github：https://github.com/typicode/husky

<br>

该项目为 ts 项目，通过 tsconfig.json、package.json 可知，编译入口为 src 出口为 lib 项目执行主文件为 lib/index.js

主要文件为：src/index.ts、src/bin.ts、husky.sh

## src/index.ts 主文件
```javascript
import cp = require('child_process') // 子进程
import fs = require('fs') // 文件处理
import p = require('path') // 路径方法

// 日志输出
const l = (msg: string): void => console.log(`husky - ${msg}`)

// 通过 node 子进程拼接 git 参数并返回执行结果
const git = (args: string[]): cp.SpawnSyncReturns<Buffer> =>
  cp.spawnSync('git', args, { stdio: 'inherit' })

/**
 * install 方法可以看作初始化设置，在此方法中实现了以下功能
 * 1、辅助 Plumbing 底层命令，主要用于操作
 * 2、判断安装目录是否为项目根目录并创建 .husky 文件夹 
 * 3、判断项目中是否存在 .git 文件。如果不存在 则不存在 githook 文件，也就 不存在替换 githook 的文件路径的可能了
 * 4、
 *   [1] 在 .husky 文件下创建文件夹 '_'
 *   [2] 在 '_' 文件下写入文件 .gitignore, 文件内容为 ‘*’, 忽略所有文件的 git 提交
 *   [3] 复制 husky 项目根目录下的 husky.sh 文件 到 目标项目的 '_' 目录下，名称不变
 *   [4] 执行 git 操作，修改 githook 的执行路径为目标项目的 .husky 文件下
 *   [5] 执行成功 or 失败后的 log 提示
*/
export function install(dir = '.husky'): void {
  // Ensure that we're inside a git repository
  // If git command is not found, status is null and we should return.
  // That's why status value needs to be checked explicitly.
  // ----1----
  if (git(['rev-parse']).status !== 0) {
    return
  }

  // Custom dir help
  const url = 'https://git.io/Jc3F9'

  // ----2----
  // Ensure that we're not trying to install outside of cwd
  if (!p.resolve(process.cwd(), dir).startsWith(process.cwd())) {
    throw new Error(`.. not allowed (see ${url})`)
  }

  // ----3----
  // Ensure that cwd is git top level
  if (!fs.existsSync('.git')) {
    throw new Error(`.git can't be found (see ${url})`)
  }

  // ----4----
  try {
    // Create .husky/_   ----4.1----
    fs.mkdirSync(p.join(dir, '_'), { recursive: true })

    // Create .husky/_/.gitignore   ----4.2----
    fs.writeFileSync(p.join(dir, '_/.gitignore'), '*')

    // Copy husky.sh to .husky/_/husky.sh  ----4.3----
    fs.copyFileSync(p.join(__dirname, '../husky.sh'), p.join(dir, '_/husky.sh')) 

    // Configure repo    ----4.4----
    const { error } = git(['config', 'core.hooksPath', dir])
    if (error) {
      throw error
    }
    // ----4.5----
  } catch (e) {
    l('Git hooks failed to install') 
    throw e
  }

  l('Git hooks installed')
}

/**
 * set: 创建指定的 githook 文件，并写入文件内容
 * 1、如果文件目录不存在, 中断并提示执行 husky install 初始化配置
 * 2、写入文件, 指定解释器为 sh 执行 shell 脚本, cmd 动态参数，为开发者想要在这个 githook 阶段执行的操作，一般为脚本 
 *    例：npm run lint
 * 3、创建成功的 log
*/
export function set(file: string, cmd: string): void {
  const dir = p.dirname(file)
  // ----1----
  if (!fs.existsSync(dir)) {
    throw new Error(
      `can't create hook, ${dir} directory doesn't exist (try running husky install)`,
    )
  }

  // ----2----
  fs.writeFileSync(
    file,
    `#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

${cmd}
`,
    { mode: 0o0755 },
  )

  // ----3----
  l(`created ${file}`)
}

/**
 * add: 在已有的 githook 文件中追加命令
 * 1、githook 文件是否存在
 * 2、存在：在原有文件基础上追加新的内容
 * 3、不存在：执行 set 添加该 githook 文件
*/
export function add(file: string, cmd: string): void {
  // ----1----
  if (fs.existsSync(file)) {
    // ----2----
    fs.appendFileSync(file, `${cmd}\n`)
    l(`updated ${file}`)
  } else {
    // ----3----
    set(file, cmd)
  }
}

/**
 * uninstall: 卸载 install 中指定的 hooksPath 的路径，恢复为 git 默认的 githook 路径
*/
export function uninstall(): void {
  git(['config', '--unset', 'core.hooksPath'])
}

```

## src/bin.ts 入口文件
用于接受命令行参数，触发 src/index.ts 中的执行文件
````javascript
#!/usr/bin/env node        // 指定使用 node 解析运行文件
import p = require('path') // 路径方法
import h = require('./')   // src/index.ts 主文件方法

// 打印帮助命令，这里没有使用 command 包，而是使用进程方法获取参数，所以自己打印了帮助 log
// Show usage and exit with code
function help(code: number) {
  console.log(`Usage:
  husky install [dir] (default: .husky)
  husky uninstall
  husky set|add <file> [cmd]`)
  process.exit(code)
}

// Get CLI arguments     作者说了：获取命令行参数
const [, , cmd, ...args] = process.argv
const ln = args.length
const [x, y] = args

// Set or add command in hook
// 处理需要参数的主文件的函数并执行, 对错误的参数进行了长度判断
const hook = (fn: (a1: string, a2: string) => void) => (): void =>
  // Show usage if no arguments are provided or more than 2
  !ln || ln > 2 ? help(2) : fn(x, y)

// CLI commands
// 执行命令相对应的 src/index.ts 文件中的函数, 没有参数的直接调用，需要参数的，套了一层 hook 函数，用于参数处理
const cmds: { [key: string]: () => void } = {
  install: (): void => (ln > 1 ? help(2) : h.install(x)),
  uninstall: h.uninstall, // 没有参数直接调用
  set: hook(h.set),
  add: hook(h.add),
  ['-v']: () =>
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-var-requires
    console.log(require(p.join(__dirname, '../package.json')).version),
}

// Run CLI
try {
  // Run command or show usage for unknown command
  // 作者说了：命令存在则运行指定函数，不存在则打印帮助 log
  cmds[cmd] ? cmds[cmd]() : help(0)
} catch (e) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  console.error(e.message) // 打印 error 信息
  process.exit(1) // 报错退出
}
````
<br>

## husky.sh

在主文件的 set 方法中，写入自定义 githook 方法时会默认写入的两行执行命令嘛？
```javascript
#!/bin/sh   // 指定该文件使用 shell 解析执行

// 执行当前当前目录下指定的文件，并执行该路径下的 _/husky.sh 文件，也就是 主文件中 install 方法中复制到项目里的脚本文件
// $0 为 当前脚本名称 调用 husky.sh 脚本
. "$(dirname "$0")/_/husky.sh" 
```
```javascript
#!/bin/sh
// 判断变量 husky_skip_init 的长度是否为 0
if [ -z "$husky_skip_init" ]; then
// 为 0 时， 创建 debug 函数, 用来打印报错日志
  debug () {
    // HUSKY_DEBUG 为 “1” 时打印
    if [ "$HUSKY_DEBUG" = "1" ]; then
      // $1 表示参数
      echo "husky (debug) - $1"
    fi
  }

  // 声明一个只读参数, 内容为 basename + 文件名称
  readonly hook_name="$(basename "$0")"
  debug "starting $hook_name..."

  // 判断变量 HUSKY 是否 = “0”
  if [ "$HUSKY" = "0" ]; then
    debug "HUSKY env variable is set to 0, skipping hook"
    exit 0
  fi

  // 判断 ~/.huskyrc 是否为普通文件
  if [ -f ~/.huskyrc ]; then
    debug "sourcing ~/.huskyrc"
    . ~/.huskyrc
  fi

  // 声明只读变量 
  export readonly husky_skip_init=1
  // 当前文件名 是否在 传进来的参数中 存在则执行
  sh -e "$0" "$@"
  exitCode="$?"

  // 当 exitCode 不等于 0 时，打印当前执行的 hook 名称 以及 退出码
  if [ $exitCode != 0 ]; then
    echo "husky - $hook_name hook exited with code $exitCode (error)"
  fi

  exit $exitCode
fi

```

## 总结
该工具的最核心的代码为
> git config core.hooksPath 路径   // 指定 githook触发的路径
> git config --unset core.hooksPath // 卸载指定的路径，恢复默认路径
> 
> 更改了 hook 执行的路径，在该路径下新建对应的 hook 的钩子文件，该文件就会在指定的阶段被触发执行。 

例：src/pre-commit 会在 git commit 时执行该文件的代码
```javascript
 #!/bin/sh

 npm run lint
```

该库主要是将 git 命令进行了命令的封装、完善异常报错机制，方便开发者使用。
