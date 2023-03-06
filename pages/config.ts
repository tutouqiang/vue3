import { ChromeImg, BingImg, BaiduImg, WebDevImg, QuickReferenceImg } from '../assets/img'

export const  favoriteApps = [
  {
    img: 'https://hoppscotch.io/logo.svg',
    url: 'https://hoppscotch.io/cn',
    name: 'hoppscotch',
    desc: '网页版 postman'
  },
  {
    img: 'https://cdn.docschina.org/static/media/docschina-logo.4c5554f1.svg',
    url: 'https://docschina.org/',
    name: '印记中文',
    desc: '知名前端信息网站',
    style: 'background-color: #fff',
    imgSize: true
  },
  {
    img: WebDevImg,
    url: 'https://web.dev/learn/',
    name: '谷歌课程',
    desc: 'Chrome 团队成员、行业专家编写了每门课程',
    style: 'background-color: #fff'

  },
  {
    img: 'https://developer.mozilla.org/static/media/twitter.cc5b37feab537ddbf701.svg',
    url: 'https://developer.mozilla.org/zh-CN/',
    name: 'MDN',
    desc: 'web docs',
    style: 'background-color: #fff'

  },
  {
    img: 'https://avatars.githubusercontent.com/u/9919?s=280&v=4',
    url: 'https://www.githubs.cn/',
    name: '中文社区',
    desc: 'github 中文社区'
  },
  {
    img: 'https://avatars.githubusercontent.com/u/9919?s=280&v=4',
    url: 'https://www.github.com/',
    name: 'Github',
    desc: 'Github'
  },
  {
    img: 'https://nodejs.org/static/images/favicons/favicon.ico',
    url: 'https://nodejs.org/zh-cn/',
    name: 'Node',
    desc: 'Node',
    style: 'background-color: #fff',
    imgSize: true
  },
  {
    img: 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg',
    url: 'https://antdv.com/components/overview',
    name: 'Ant Vue',
    desc: 'Ant Vue',
    style: 'background-color: #fff',
    imgSize: true

  },
  {
    img: 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg',
    url: 'https://ant.design/docs/react/introduce-cn',
    name: 'Ant React',
    desc: 'Ant React',
    style: 'background-color: #fff',
    imgSize: true


  },
  {
    name: '阮一峰',
    img: 'https://www.ruanyifeng.com/blog/images/person2_s.jpg',
    desc: '阮一峰的博客',
    url: 'http://www.ruanyifeng.com/blog/',
  },
  {
    name: 'JS教程',
    img: 'https://zh.javascript.info/img/sitetoolbar__logo_en.svg',
    desc: 'js 教程',
    url: 'https://zh.javascript.info/',
    style: 'background-color: #fff',
    imgSize: true


  },
  {
    name: 'Web安全',
    img: 'data:image/jpeg;base64,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',
    desc: '中文版,非常全的 WEB 安全方面的文档',
    url: 'https://websec.readthedocs.io/zh/latest/index.html',
  },
  {
    name: 'freeCodeCamp',
    img: 'https://avatars.githubusercontent.com/u/9892522?s=64&v=4',
    desc: '开发免费的程序员自学网站',
    url: 'https://chinese.freecodecamp.org/learn',
  },
  {
    name: 'Quick Reference',
    img: QuickReferenceImg,
    desc: '编程语言速查表，已经支持了挺多的语言，很方便',
    url: 'https://wangchujiang.com/reference/index.html',
    style: 'background-color: #fff'

  },
]

export const browserList = [
  {
    value: '谷歌',
    key: 'google',
    icon: 'icon-chrome',
    img: ChromeImg,
    search: (q: string) => `https://www.google.com/search?q=${q}`
  },
  {
    value: '必应',
    key: 'bing',
    icon: 'icon-Bing',
    img: BingImg,
    search: (q: string) => `https://www.bing.com/search?q=${q}`
  },
  {
    value: '百度',
    key: 'baidu',
    icon: 'icon-icon_baidulogo',
    img: BaiduImg,
    search: (q: string) => `https://www.baidu.com/s?wd=${q}`
  }
]

export const notesType = [
  {
    name: "前端",
    route: "",
  },
  {
    name: "后端",
    route: "",
  },
  {
    name: "Linux",
    route: "",
  },
]
