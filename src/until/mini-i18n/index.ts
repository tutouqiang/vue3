
const region = require('./until/ua');
const {getLang} = require('./until/getLang')
// @ts-ignore
import EventEmitter from 'events'
interface configType {
  locales: object;
  defualtLang?: string;
  lang?: string;
}

/*
 * config {
   lang: string,
   directory: string
 }
 */
// 多语言
class I18n {
  allLangData: object;
  lang: string;
  defualtLang: string;
  langTag: string;
  constructor () {
    this.allLangData = Object.create(null)
    this.lang = 'en-US'
    this.defualtLang = 'en-US'
    this.langTag = 'en'
  }

  init (config: configType) {
    this.allLangData = config.locales ||  Object.create(null)
    this.defualtLang = config.defualtLang || 'en-US'
    const localLang = localStorage.getItem('tuya_locale')
    // params > localStorage > userAgent > defualt Lang
    this.lang = config.lang || localLang || getLang() || this.defualtLang
    this.langTag = this._formatLanguageTag(this.lang)
    // @ts-ignore
    if(!config.locales[this._formatLanguageTag(this.defualtLang)]) {
      throw `The default language pack ‘${this.defualtLang}’ does not exist, please check the local language pack`
    }
  }

  getLocales () {
    return this.lang
  }

  getLanguagePackList () {
    return Object.keys(this.allLangData) || 0
  }

  setLocales (lang: string) {
    localStorage.setItem('tuya_locale', lang)
    location.reload()
  }

  updateLocale (obj: object) { // 更新已有语言文件的数据
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
  _formatLanguageTag (s: string) {
    const lang = s.includes('_') ? s.replace('_', '-').toLowerCase() : s.toLowerCase()
    try {
      return region[lang]
    } catch {
      throw `Please check if the lang tag ${s} is correct`
    }
  }
}

export const i18n = new I18n()
export const t = (id:string) => {
  // @ts-ignore
  if(i18n.allLangData[i18n.langTag]) {
  // @ts-ignore
    return i18n.allLangData[i18n.langTag][id]
  }
  
}

