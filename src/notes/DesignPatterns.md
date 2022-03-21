# 设计模式的种类

在众所周知的设计书《Domain-Driven Terms》中,它被描述为:

“设计模式是命名、抽象和识别对可重用的面向对象设计有用的的通用设计结构。设计模式确定类和他们的实体、他们的角色和协作、还有他们的责任分配.

每一个设计模式都聚焦于一个面向对象的设计难题或问题。它描述了在其它设计的约束下它能否使用，使用它后的后果和得失。因为我们必须最终实现我们的设计模式，所以每个设计模式都提供了例子..代码来对实现进行阐释.

虽然设计模式被描述为面向对象的设计，它们基于那些已经被主流面向对象语言实现过的解决方案...”

设计模式可以被分成几个不同的种类。在这个部分我们将复习三个分类，并且在我们进入特定的设计模式详情之前我们提到该分组下的模式的几个示例。

## 创建型设计模式

创建型设计模式关注于对象创建的机制方法，通过该方法,对象以适应工作环境的方式被创建。基本的对象创建方法可能会给项目增加额外的复杂性，而这些模式的目的就是为了通过控制创建过程解决这个问题。

属于这一类的一些模式是：构造器模式（Constructor）,工厂模式（Factory）,抽象工厂模式 （Abstract）,原型模式 （Prototype）,单例模式 （Singleton）以及 建造者模式（Builder）。

## 结构设计模式

结构模式关注于对象组成和通常识别的方式实现不同对象之间的关系。该模式有助于在系统的某一部分发生改变的时候，整个系统结构不需要改变。该模式同样有助于对系统中某部分没有达到某一目的的部分进行重组。

在该分类下的模式有：装饰模式，外观模式，享元模式，适配器模式和代理模式。

## 行为设计模式

行为模式关注改善或精简在系统中不同对象间通信。

行为模式包括：迭代模式，中介者模式，观察者模式和访问者模式。

# 设计模式的分类

在我早起学习设计模式的经验中，我个人发现，下面的表格是一个非常有用的提醒，大多数模式所提供-它覆盖了由 GOF 提出的 23 种模式。

| **Object**                                                                                                                                   |
| -------------------------------------------------------------------------------------------------------------------------------------------- |
| Abstract Factory(抽象工厂) 建立若干族类的一个实例，这个实例不需要具体类的细节信息。（抽象类）                                                |
| Builder (建造者) 将对象的构建方法和其表现形式分离开来，总是构建相同类型的对象。                                                              |
| Prototype(原型) 一个完全初始化的实例，用于拷贝或者克隆。                                                                                     |
| Singleton(单例) 一个类只有唯一的一个实例，这个实例在整个程序中有一个全局的访问点。                                                           |
|                                                                                                                                              |
| **Structural 根据构建对象块的方法分成下面几类。**                                                                                            |
| **Class**                                                                                                                                    |
| Adapter(适配器) 将不同类的接口进行匹配，调整，这样尽管内部接口不兼容但是不同的类还是可以协同工作的。                                         |
| Bridge(桥接模式) 将对象的接口从其实现中分离出来，这样对象的实现和接口可以独立的变化。                                                        |
| Composite(组合模式) 通过将简单可组合的对象组合起来，构成一个完整的对象，这个对象的能力将会超过这些组成部分的能力的总和，即会有新的能力产生。 |
| Decorator(装饰器) 动态给对象增加一些可替换的处理流程。                                                                                       |
| Facada(外观模式) 一个类隐藏了内部子系统的复杂度，只暴露出一些简单的接口。                                                                    |
| Flyweight(享元模式) 一个细粒度对象，用于将包含在其它地方的信息 在不同对象之间高效地共享。                                                    |
| Proxy(代理模式) 一个充当占位符的对象用来代表一个真实的对象。                                                                                 |
|                                                                                                                                              |
| **Behavioral 基于对象间作用方式来分类。**                                                                                                    |
| **Class**                                                                                                                                    |
| Interpreter(解释器) 将语言元素包含在一个应用中的一种方式，用于匹配目标语言的语法。                                                           |
| Template Method(模板方法) 在一个方法中为某个算法建立一层外壳，将算法的具体步骤交付给子类去做。                                               |
| **Object**                                                                                                                                   |
| Chain of Responsibility(响应链) 一种将请求在一串对象中传递的方式，寻找可以处理这个请求的对象。                                               |
| Command(命令) 封装命令请求为一个对象，从而使记录日志，队列缓存请求，未处理请求进行错误处理 这些功能称为可能。                                |
| Iterator(迭代器) 在不需要直到集合内部工作原理的情况下，顺序访问一个集合里面的元素。                                                          |
| Mediator(中介者模式) 在类之间定义简化的通信方式，用于避免类之间显式的持有彼此的引用。                                                        |
| Observer(观察者模式) 用于将变化通知给多个类的方式，可以保证类之间的一致性。                                                                  |
| State(状态) 当对象状态改变时，改变对象的行为。                                                                                               |
| Strategy(策略) 将算法封装到类中，将选择和实现分离开来。                                                                                      |
| Visitor(访问者) 为类增加新的操作而不改变类本身。                                                                                             |

# JavaScript 设计模式

- [构造器模式](http://www.oschina.net/translate/learning-javascript-design-patterns#constructorpatternjavascript)
- [模块化模式](http://www.oschina.net/translate/learning-javascript-design-patterns#modulepatternjavascript)
- [暴露模块模式](http://www.oschina.net/translate/learning-javascript-design-patterns#revealingmodulepatternjavascript)
- [单例模式](http://www.oschina.net/translate/learning-javascript-design-patterns#singletonpatternjavascript)
- [观察者模式](http://www.oschina.net/translate/learning-javascript-design-patterns#observerpatternjavascript)
- [中介者模式](http://www.oschina.net/translate/learning-javascript-design-patterns#mediatorpatternjavascript)
- [原型模式](http://www.oschina.net/translate/learning-javascript-design-patterns#prototypepatternjavascript)
- [命令模式](http://www.oschina.net/translate/learning-javascript-design-patterns#commandpatternjavascript)
- [外观模式](http://www.oschina.net/translate/learning-javascript-design-patterns#facadepatternjavascript)
- [工厂模式](http://www.oschina.net/translate/learning-javascript-design-patterns#factorypatternjavascript)
- [混合模式](http://www.oschina.net/translate/learning-javascript-design-patterns#mixinpatternjavascript)
- [装饰模式](http://www.oschina.net/translate/learning-javascript-design-patterns#decoratorpatternjavascript)
- [轻量级模式](http://www.oschina.net/translate/learning-javascript-design-patterns#)

## 构造器模式

在面向对象编程中，构造器是一个当新建对象的内存被分配后，用来初始化该对象的一个特殊函数。在 Javascript 中几乎所有的东西都是对象，我们经常会对对象的构造器十分感兴趣。

对象构造器是被用来创建特殊类型的对象的，首先它要准备使用的对象，其次在对象初次被创建时，通过接收参数，构造器要用来对成员的属性和方法进行赋值。

## 模块化模式

## 模块

模块是任何健壮的应用程序体系结构不可或缺的一部分，特点是有助于保持应用项目的代码单元既能清晰地分离又有组织。

在 JavaScript 中，实现模块有几个选项，他们包括：

- 模块化模式
- 对象表示法
- AMD 模块
- CommonJS 模块
- ECMAScript Harmony 模块

### 模块化模式

模块化模式最初被定义为一种对传统软件工程中的类提供私有和公共封装的方法。

在 JavaScript 中，模块化模式用来进一步*模拟*类的概念，通过这样一种方式：我们可以在一个单一的对象中包含公共/私有的方法和变量，从而从全局范围中屏蔽特定的部分。这个结果是可以减少我们的函数名称与在页面中其他脚本区域定义的函数名称冲突的可能性。

**私有信息**

模块模式使用闭包的方式来将"私有信息",状态和组织结构封装起来。提供了一种将公有和私有方法，变量封装混合在一起的方式，这种方式防止内部信息泄露到全局中，从而避免了和其它开发者接口发生冲图的可能性。在这种模式下只有公有的 API 会返回，其它将全部保留在闭包的私有空间中。

这种方法提供了一个比较清晰的解决方案，在只暴露一个接口供其它部分使用的情况下，将执行繁重任务的逻辑保护起来。这个模式非常类似于立即调用函数式表达式([IIFE](http://benalman.com/news/2010/11/immediately-invoked-function-expression/)-查看命名空间相关章节获取更多信息)，但是这种模式返回的是对象，而立即调用函数表达式返回的是一个函数。

需要注意的是，在 javascript 事实上没有一个显式的真正意义上的"私有性"概念，因为与传统语言不同，javascript 没有访问修饰符。从技术上讲，变量不能被声明为公有的或者私有的，因此我们使用函数域的方式去模拟这个概念。在模块模式中，因为闭包的缘故，声明的变量或者方法只在模块内部有效。在返回对象中定义的变量或者方法可以供任何人使用。

### 观察者模式和发布/订阅模式的不同

观察者模式确实很有用，但是在 javascript 时间里面，通常我们使用一种叫做发布/订阅模式的变体来实现观察者模式。这两种模式很相似，但是也有一些值得注意的不同。

观察者模式要求想要接受相关通知的观察者必须到发起这个事件的被观察者上注册这个事件。

发布/订阅模式使用一个主题/事件频道，这个频道处于想要获取通知的订阅者和发起事件的发布者之间。这个事件系统允许代码定义应用相关的事件，这个事件可以传递特殊的参数，参数中包含有订阅者所需要的值。这种想法是为了避免订阅者和发布者之间的依赖性。
