# Vue Reactivity
响应式源码

directory: core/packages/reactivity

以下内容为该文件 src 目录下的子文件

<br/>

## reactive （Proxy 响应式）
该文件为 vue3 响应式的核心文件。主要功能为:
- 不同数据提供不同的响应式处理以及弱引用。主要为：reactive、shallowReactive、readonlyReactive、shallowReadonly(Reactive)
- 为进入处理的数据做 marker 标记，用于区分类型。主要为 targetTypeMap、ReactiveFlags
- 根据 marker 提供当前数据标记判断方法

vue3 对 Proxy 代理后的 handler 做了分离，根据实际情况添加不同的 handler 处理函数。这些处理函数位置为：baseHandlers、collectionHandlers

<br/>

## baseHandlers、collectionHandlers （Proxy handler）
区分以下两种 handler

path：core/packages/reactivity/src/reactive.ts 

枚举：TargetType

判断函数：targetTypeMap
### baseHandlers
时机：当数据类型为 Object、Array 时。

作用：主要为 reactive 中使用到的 handler 处理函数, 

- 根据 reactive 中的四种响应模式创建各响应模式下的 get、set 函数，以及 deleteProperty、has、ownKeys 基本操作函数
- 为数组的 get 操作重写了一套数据各方法的追踪函数。主要方法为：createArrayInstrumentations
- 将以上的各种 handler 按响应模式组合为：mutableHandlers、readonlyHandlers、shallowReactiveHandlers、shallowReadonlyHandlers，提供给 reactive 作为不同模式下的不同 handler 处理函数

为数组数据做追踪的方法来自 effect 文件
引用的一些数据判断和扩展来自 shared 文件

### collectionHandlers
时机：当数据类型为 Map、Set、WeakMap、WeakSet 时。

作用：重写这些结构的方法并在方法中操作数据的响应、删除、追踪、触发、循环等方法。

组合对应 reactive、shallowReactive、readonlyReactive、shallowReadonly 这几类方法的 Proxy handler 中的 get 方法

<br/>

## effect
时机：Proxy handler（baseHandlers、collectionHandlers） 操作时进行 effect 操作

作用：数据追踪、存储及触发。

## dep
时机：数据追踪

作用：创建深度的数据标记。提供数据创建、初始标记、追踪判断

createDep、initDepMarkers、finalizeDepMarkers、wasTracked、newTracked
## ref
对 ref 的值处理为深度响应式对象
提供 ref 的创建、判断、追踪、变更、自定义的执行函数

## computed

## operations
类型枚举
TrackOpTypes、TriggerOpTypes

## warning
Vue warn l                   
