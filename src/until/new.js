
const path = require('path');
const region = require('./ua');
import EventEmitter from 'events'
console.log(EventEmitter);

/*
 * config {
   lang: string,
   directory: string
 }
 */
// 多语言
class I18n {
  constructor () {
    this.allLangData = Object.create(null)
    this.currentLangData = Object.create(null)
    this.lang = 'en-US'
    this.defualtLang = 'en-US'
    this.langTag = 'en'
    this.defualtLangTag = 'en'
  }

  init (config) {
    this.allLangData = config.locales ||  Object.create(null)
    this.defualtLang = config.defualtLang || 'en-US'
    const localLang = localStorage.getItem('tuya_locale')
    this.lang = config.lang || localLang || this.defualtLang
    this.defualtLangTag = this._formatLanguageTag(this.defualtLang) || 'en'
    this.langTag = this._formatLanguageTag(this.lang) || this.defualtLangTag
    this.currentLangData = this.allLangData && this.allLangData[this.langTag]
  }

  getLocales () {
    return this.lang
  }

  setLocales (lang) {
    localStorage.setItem('tuya_locale', lang)
    location.reload()
  }

  updateLocale (obj) { // 更新已有语言文件的数据
    // @ts-ignore
    if (!this.allLangData[this.langTag]) {
      // 本地语言不存在,调用接口后添加
    }
  
    for (var key in obj) {
      // @ts-ignore
      this.allLangData[this.langTag][key] = obj[key]
    }
    location.reload()
  }

  // 小程序语言标记：zh_CN  浏览器语言标记：zh-CN 不一致。统一转化为zh-cn 小写 + '-', return region中对应的语言标记
  _formatLanguageTag (s) {
    const lang = s.includes('_') ? s.replace('_', '-').toLowerCase() : s.toLowerCase()
    try {
      return region[lang]
    } catch {
      throw `Please check if the lang tag ${s} is correct`
    }
  }
}


export const i18n = new I18n()
export const t = (id) => {
  return i18n.currentLangData[id]
}

