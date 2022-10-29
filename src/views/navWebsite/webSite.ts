/*
 * 常用工具
 */
interface webList {
  type: string,
  title?: string,
  list: {
    title: string,
    img: string,
    desc: string,
    url: string,
    bgc?: string,
  }[]
}
const list: webList[] = [
  {
    type: '前端框架',
    list: [
      {
        title: 'Vue',
        img: 'https://forum.vuejs.org/uploads/default/original/2X/5/555257b8c5e7ecf34ce4f9b952eeaf006adfa339.png',
        desc: '一个前端框架',
        url: 'https://v3.cn.vuejs.org/',
      },
      {
        title: 'React',
        img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgVF1dospej2VMDF0sb-TuNCYudETDT6UKVQ&usqp=CAU',
        desc: 'Facebook出的前端框架',
        url: 'https://zh-hans.reactjs.org/',
      },
      {
        title: 'UmiJS',
        img: 'data:image/png;base64,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',
        desc: '蚂蚁出品, react框架',
        url: 'https://umijs.org/zh-CN',
      },
      {
        title: 'qiankun',
        img: 'https://gw.alipayobjects.com/zos/bmw-prod/8a74c1d3-16f3-4719-be63-15e467a68a24/km0cv8vn_w500_h500.png',
        desc: '蚂蚁出品,qiankun 微前端',
        url: 'https://qiankun.umijs.org/zh',
      },
      {
        title: 'Electron',
        img: 'data:image/png;base64,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',
        desc: 'electronjs PC框架,可结合vue、react等开发pc应用',
        url: 'https://www.electronjs.org/',
      },
      {
        title: '北海',
        img: 'https://img.alicdn.com/imgextra/i1/O1CN01CUE2IL1FdAGnYPawX_!!6000000000509-2-tps-350-116.png',
        desc: '基于 Flutter 构建,支持pc、移动应用',
        url: 'https://openkraken.com/',
      },
      {
        title: 'Taro',
        img: 'https://docs.taro.zone/img/logo-taro.png',
        desc: '京东跨端框架,支持react、vue转换为任意小程序',
        url: 'https://docs.taro.zone/docs/README',
        bgc: '#0000c2'
      },
      {
        title: 'Docusaurus',
        img: '	https://docusaurus.io/zh-CN/img/docusaurus.svg',
        desc: '🧐 Docusaurus 是一款 React 静态站点生成器。 经常被用来搭建官方文档及个人博客等网站。',
        url: 'https://docusaurus.io/',
        bgc: '#0000c2'
      },
      {
        title: 'VuePress',
        img: 'https://vuepress.vuejs.org/hero.png',
        desc: '使用 Vue + webpack 的静态站点生成器。与 Docusaurus, 功能基本相同, 主要依赖 vue 生态。 可以在 Markdown 中使用 Vue 组件，又可以使用 Vue 来开发自定义主题。',
        url: 'https://vuepress.vuejs.org/',
        bgc: '#0000c2'
      },
    ],
  },
  {
    type: '状态管理器',
    list: [
      {
        title: 'redux',
        img: 'https://cn.redux.js.org/img/redux.svg',
        desc: 'JS 应用的状态容器，提供可预测的状态管理',
        url: 'https://cn.redux.js.org/',
      },
      {
        title: 'vuex',
        img: 'https://forum.vuejs.org/uploads/default/original/2X/5/555257b8c5e7ecf34ce4f9b952eeaf006adfa339.png',
        desc: 'Vuex 是一个专为 Vue.js 应用程序开发的状态管理模式 + 库。',
        url: 'https://vuex.vuejs.org/zh/',
      },
    ],
  },
  {
    type: '构建工具',
    list: [
      {
        title: 'webpack',
        img: 'https://webpack.docschina.org/site-logo.1fcab817090e78435061.svg',
        desc: 'webpack 是一个用于现代 JavaScript 应用程序的 静态模块打包工具。使用广泛、全能且臃肿、复杂',
        url: 'https://webpack.docschina.org/',
      },
      {
        title: 'esbuild',
        img: 'https://esbuild.github.io/favicon.svg',
        desc: '利用浏览器的特性进行快速构建，相关的衍生产品很多，例如 vite',
        url: 'https://esbuild.github.io/',
      },
    ],
  },
  {
    type: 'WEB 安全',
    list: [
      {
        title: 'Web安全学习笔记',
        img: '',
        desc: '中文版,非常全的 WEB 安全方面的文档',
        url: 'https://websec.readthedocs.io/zh/latest/index.html',
      },
    ],
  },
  {
    type: 'npm库',
    list: [
      {
        title: 'Awehunt',
        img: '',
        desc: 'npm 包相关数据比对，可以用来对比 npm 的使用量等数据，帮助分析 npm 的流行、使用程度。也可以用来查看各企业流行的开发框架',
        url: 'https://awehunt.com/npmdownloads?ids=',
      },
      {
        title: 'Js-sdsl',
        img: 'https://js-sdsl.github.io/assets/logo-small.png',
        desc: '一款参考 C++ STL 实现的 JavaScript 标准数据结构库, 用于弥补 JavaScript 中缺少一些数据结构的缺点',
        url: 'https://js-sdsl.github.io/#/zh-cn/README',
      },
      {
        title: 'lodash',
        img: 'https://lodash.com/assets/img/lodash.svg',
        desc: '一个流行的Js方法库',
        url: 'https://lodash.com/docs',
      },
      {
        title: 'axios',
        img: 'https://axios-http.com/assets/logo.svg',
        desc: '基于 promise 的网络请求库,可以用于浏览器和 node.js',
        url: 'https://axios-http.com/zh/',
      },
      {
        title: 'passport',
        img: 'http://www.passportjs.org/images/logo.svg',
        desc: 'Passport 是Node.js的身份验证中间件。Passport 极其灵活和模块化,可以不显眼地放入任何 基于Express的 Web 应用程序中。一套全面的策略支持使用用户名和密码、 Facebook、Twitter等进行身份验证。',
        url: 'http://www.passportjs.org/',
      },
    ],
  },
  {
    type: '工具',
    list: [
      {
        title: '免费邮箱',
        img: '',
        desc: '使用邮箱测试',
        url: 'https://yopmail.com/zh/',
      },
      {
        title: '免费手机',
        img: '',
        desc: '使用免费手机号收取短信',
        url: 'http://z-sms.com/',
      },
      {
        title: '二维码生成',
        img: 'https://static.clewm.net/cli/images/cli_logo_new.png',
        desc: '草料二维码',
        url: 'https://cli.im/',
      },
      {
        title: 'Event Loop',
        img: 'https://www.jsv9000.app/static/media/js-logo.0cded3a3.png',
        desc: 'Event Loop 可视化执行过程',
        url: 'https://www.jsv9000.app/',
      },
      {
        title: 'Syntax Tree',
        img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDk6lC0E8fO_1Rsjv0iDtCDYZUzMlfTFXb3w&usqp=CAU',
        desc: 'Esprima 抽象语法树解析的可视化',
        url: 'https://esprima.org/demo/parse.html',
      },
      {
        title: 'carbon',
        img: 'https://user-images.githubusercontent.com/10369094/31211729-591d059c-a950-11e7-86af-fa5ea3d7dbac.png',
        desc: '用来创建精美的代码图像,用于分享和展示',
        url: 'https://carbon.now.sh/',
        bgc: '#000'
      },
      {
        title: 'prismjs',
        img: 'https://prismjs.com/assets/logo.svg',
        desc: 'Markdown 中高亮代码的 css 样式文件下载站点,支持度及样式类型非常丰富',
        url: 'https://prismjs.com/index.html',
        bgc: '#000'
      },
      {
        title: 'neumorphism',
        img: '',
        desc: 'css 拟态风格效果在线调试',
        url: 'https://neumorphism.io/#e0e0e0',
      },
      {
        title: 'freefrontend',
        img: '',
        desc: '有很多免费的页面效果、模版以及使用前端实现的动态桌面。并且有 react、vue 可直接使用的代码,大部分都是原生前端代码,方便使用。',
        url: 'https://freefrontend.com/',
      },
      {
        title: 'Quick Reference',
        img: 'Quick Reference',
        desc: '编程语言速查表，已经支持了挺多的语言，很方便',
        url: 'https://wangchujiang.com/reference/index.html',
      },
    ],
  },
  {
    type: '博客',
    list: [
      {
        title: '阮一峰',
        img: '	https://www.ruanyifeng.com/blog/images/person2_s.jpg',
        desc: '阮一峰的博客',
        url: 'http://www.ruanyifeng.com/blog/',
      },
      {
        title: '廖雪峰',
        img: 'data:image/jpeg;base64,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',
        desc: '廖雪峰的博客',
        url: 'https://www.liaoxuefeng.com/',
      },
      {
        title: '全栈然叔',
        img: 'https://p3-passport.byteacctimg.com/img/user-avatar/406cea3f24e05b9522a65c9b9cf124c2~300x300.image',
        desc: '全栈然叔的掘金',
        url: 'https://juejin.cn/user/1978776660216136',
      },
      {
        title: '淘系前端团队（FED）',
        img: 'https://img.alicdn.com/tps/TB1Nv_wKXXXXXbmXVXXXXXXXXXX-295-195.png',
        desc: '淘系前端团队（FED）技术文章',
        url: 'https://fed.taobao.org/?spm=taofed.blogs.header.1.490a5ac8z7Any4',
      },
      {
        title: '腾讯 alloyteam',
        img: 'http://cdn.alloyteam.com/assets/img/alloyteam-w-34df9d.svg',
        desc: '腾讯 技术文章',
        url: 'http://www.alloyteam.com/',
      },
      {
        title: '京东技术团队',
        img: 'https://mmbiz.qpic.cn/mmbiz_png/VicflqIDTUVUCLfXzX…B27ick9C1icGBX0icw6xn5YmJicdBSJmDkMA/0?wx_fmt=png',
        desc: '京东凹凸实验室技术文章',
        url: 'https://aotu.io/',
      },
      {
        title: '京东设计中心',
        img: 'https://jelly.jd.com/3.0/fonts/2657ceafd877a9cbe0e7604b36c21906.svg',
        desc: '京东设计及工具，资源丰富',
        url: 'https://jelly.jd.com/',
      },
      {
        title: '美团技术团队',
        img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8X-WEQhqR1WSr2lm_jXytvRzwX9SFjWAl9A&usqp=CAU',
        desc: '美团技术文章',
        url: 'https://tech.meituan.com/',
      },
      {
        title: '百度技术团队',
        img: 'http://fex.baidu.com/public/images/logo.svg',
        desc: '百度 fex 技术文章',
        url: 'http://fex.baidu.com/',
      },
      {
        title: '有赞技术团队',
        img: 'https://tech.youzan.com/content/images/2017/10/logo.png',
        desc: '有赞技术文章',
        url: 'https://tech.youzan.com/',
      },
      {
        title: '360 奇舞团',
        img: 'https://p3.ssl.qhimg.com/t012d58bd54c2848357.png',
        desc: '360 技术文章',
        url: 'https://75.team/',
      },
      {
        title: '明远的自留地',
        img: '',
        desc: '97 年生人,江西老表,毕业于华中科技大学,目前就职于字节跳动',
        url: 'https://mayandev.top/',
      },
      {
        title: "springleo's blog",
        img: '',
        desc: '一个前端开发的博客,很多前端实用的工具及常见的问题解析',
        url: 'https://lq782655835.github.io/blogs/',
      },
    ],
  },
  {
    type: '资源',
    list: [
      {
        title: 'freeCodeCamp',
        img: 'https://avatars.githubusercontent.com/u/9892522?s=64&v=4',
        desc: '开发免费的程序员自学网站',
        url: 'https://chinese.freecodecamp.org/learn',
      },
      {
        title: '技术书籍',
        img: 'https://avatars.githubusercontent.com/u/359395?v=4',
        desc: 'github免费技术书籍大全',
        url: 'https://github.com/justjavac/free-programming-books-zh_CN',
      },
      {
        title: 'ECMA 2015 英文原版',
        img: 'https://262.ecma-international.org/6.0/Ecma_RVB-003.jpg',
        desc: 'TC 39 的最终定版,对于 ES 6 原理的理解一定要多看看这个',
        url: 'https://262.ecma-international.org/6.0/#sec-let-and-const-declarations',
      },
      {
        title: '超赞合集',
        img: '',
        desc: 'awesome 列表中文版,各编程资源的大合集 ',
        url: 'https://asmcn.icopy.site/',
      },
      {
        title: 'nodeJs 教程',
        img: 'http://nodejs.cn/website2/static/nodejs-logo-light-mode-e8344f71081da53be8ee1098584a0ab6.svg',
        desc: 'nodejs教程,细致',
        url: 'http://nodejs.cn/learn/the-package-lock-json-file',
      },
      {
        title: 'GitHub中文社区',
        img: 'https://play-lh.googleusercontent.com/PCpXdqvUWfCW1mXhH1Y_98yBpgsWxuTSTofy3NGMo9yBTATDyzVkqU580bfSln50bFU',
        desc: '查看开源项目排行榜和当前流行趋势',
        url: 'https://www.githubs.cn/',
      },
      {
        title: '年度 JavaScript 明星项目',
        img: 'https://bestofjs.org/svg/bestofjs.svg',
        desc: '查看每个年度对 JavaScript 领域的总结,涉及的前端面很广, 时刻关注前端生态的变化及优秀项目的发现',
        url: 'https://risingstars.js.org/2021/zh',
      },
      {
        title: 'github 有趣开源项目集合',
        img: 'https://bestofjs.org/svg/bestofjs.svg',
        desc: '很多有趣的项目，也有可以二开的项目',
        url: 'https://hellogithub.com/',
      },
    ],
  },
  {
    type: '其他框架',
    list: [
      {
        title: 'egg',
        img: 'https://zos.alipayobjects.com/rmsportal/JFKAMfmPehWfhBPdCjrw.svg',
        desc: '企业级Nodejs框架,基于 Koa 开发',
        url: 'https://eggjs.org/zh-cn/',
      },
    ],
  },
  {
    type: '服务端',
    list: [
      {
        title: 'Node 地下铁沙龙',
        img: '',
        desc: 'Node 地下铁沙龙,圈内大牛技术分享',
        url: 'https://subway.midwayjs.org/season-1.html',
      },
      {
        title: 'Rust 中文月刊',
        img: 'https://rustmagazine.github.io/rust_magazine_2021/image/rust_magazine3.png',
        desc: 'Rust 中文社区',
        url: 'https://rustmagazine.github.io/rust_magazine_2021/index.html',
      },
    ],
  },
  {
    type: '可以部署的二开框架',
    list: [
      {
        title: 'grafana',
        img: 'https://grafana.com/static/assets/internal/grafana_logo-web-white-text.svg',
        desc: '服务监控可视化',
        url: 'https://grafana.com/'
      },
      {
        title: 'SkyWalking',
        img: 'https://skywalking.apache.org/images/logo.svg',
        desc: '服务监控',
        url: 'https://skywalking.apache.org/'
      },
      {
        title: 'verdaccio',
        img: 'https://verdaccio.org/img/logo/uk/verdaccio-tiny-uk-no-bg.svg',
        desc: 'npm 私有仓库',
        url: 'https://verdaccio.org/'
      }
    ]
  },
  {
    type: '读过并且非常推荐的',
    title: '提取码可关注公众号并回复书名',
    list: [
      {
        title: 'Pro Git',
        img: 'http://iissnan.com/progit/assets/img/git-logo.png',
        desc: 'Git 的线上书籍,有中文版,必读',
        url: 'http://iissnan.com/progit/',
        bgc: '#101010'
      },
      {
        title: '我的第一本算法书',
        img: 'https://img11.360buyimg.com/n1/jfs/t1/26907/22/5787/185613/5c419b46E9cf10e55/e9229f7f0f0eadc7.jpg',
        desc: '算法入门友好,图形化的介绍一些常见的数据结构及算法,易于理解',
        url: 'https://www.aliyundrive.com/s/TowakrPYfiG',
        bgc: '#101010'
      },
      {
        title: '算法 （第四版）',
        img: 'https://images-cn.ssl-images-amazon.cn/images/I/41OhCo2B-VL.jpg',
        desc: '算法学习必读,配套的网站 https://algs4.cs.princeton.edu/home/',
        url: 'https://www.aliyundrive.com/s/xWn4ncKTFRV',
        bgc: '#101010'
      },
      {
        title: '现代 JavaScript 教程',
        img: 'https://zh.javascript.info/img/sitetoolbar__logo_en.svg',
        desc: 'js 教程',
        url: 'https://zh.javascript.info/',
        bgc: '#101010'
      },
    ],
  },
  {
    type: '开发规范',
    list: [
      {
        title: 'OAuth',
        img: 'https://grafana.com/static/assets/internal/grafana_logo-web-white-text.svg',
        desc: 'OAuth 2.0 是行业标准的授权协议。OAuth 2.0 专注于客户端开发人员的简单性,同时为 Web 应用程序、桌面应用程序、移动电话和客厅设备提供特定的授权流程。该规范及其扩展正在IETF OAuth 工作组内开发。',
        url: 'https://oauth.net/2/'
      },
      {
        title: 'Promise/A+',
        img: 'https://promisesaplus.com/assets/logo-small.png',
        desc: 'Promise 规范。所有实现的 Promise 必须遵循此规范',
        url: 'https://promisesaplus.com/'
      }
    ]
  },
  {
    type: 'AI',
    list: [
      {
        title: 'AI 图片生成',
        img: 'https://www.craiyon.com/_app/immutable/assets/craiyon_logo-9927047c.png',
        desc: '根据自然语言描述，AI 生成图片',
        url: 'https://www.craiyon.com/'
      }
    ]
  },
  {
    type: 'js 在线游戏',
    list: [
      {
        title: '俄罗斯方块',
        img: 'https://is2-ssl.mzstatic.com/image/thumb/PurpleSource126/v4/3a/d4/d2/3ad4d271-0b46-e7af-d2c1-47817113d80c/7205d857-ae49-4073-b049-73c2c636ac57_Simulator_Screen_Shot_-_iPhone_8_Plus_-_2022-03-13_at_13.10.42.png/750x750bb.jpeg',
        desc: 'React+Redux+Immutable 做的俄罗斯方块',
        url: 'https://chvin.github.io/react-tetris/?lan=zh'
      }
    ]
  },
  {
    type: '有意思的网站',
    list: [
      {
        title: '全球的风向',
        img: 'https://earth.nullschool.net/favicon.ico',
        desc: '3d 可以看到全球的风向',
        url: 'https://earth.nullschool.net/#current/wind/surface/level/orthographic=102.44,26.08,447'
      }
    ]
  }

];

export default list
