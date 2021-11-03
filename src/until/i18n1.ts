#!/usr/bin/env node
// 根据浏览器语言，请求线上语言包并过滤返回对于id的code
import api from '../api'
import region from './ua'
// 本地语言包
let data = window.localStorage.getItem('lang');
let langObj = data && JSON.parse(data);
let v = langObj && langObj._version;
const l = langObj && langObj._lang;

/**
 * 根据id取code
 * @param id             code
 * @param defaultValue   默认值
 * @returns
 */
const fnc = (id: string) => {
  console.log(id, langObj);
  
  if(langObj) return langObj[id]
  return '123'
};

// 处理语言数据
const dealLang = (list: any, lang: string, v: string) => {
  let obj: any = {};
  for (const i of list) {
    obj[i.code] = filterValue(i.displays, lang);
  }
  obj['_version'] = v;
  obj['_lang'] = lang;
  return JSON.stringify(obj);
};

// 获取code指定的值
const filterValue = (displays: any, lang: string) => {
  for (const i of displays) {
    if (i.localeId === lang) {
      return i.value;
    }
  }
};

// 公共接口获取语言包,ios的返回语言标记是小写的，统一转为小写
const getLang = (options= {
  lang: window.navigator.language,
}) => {
    const lang = region[options.lang.toLowerCase()];
    console.log(lang, options.lang, options.lang.toLowerCase());
    if (lang !== l) {
      v = '';
    }
    api.getLang.then((res: any) => {
      const data = res.data.result
      // 本地不存在语言数据 || 语言数据版本不一致 更新本地语言数据
      console.log(v !== data.version || l !== lang || !langObj);
      if (v !== data.version || l !== lang || !langObj) {
        // 当前版本与线上版本一致时，items不存在
        console.log(data);
        if (data.items) {
          
          
          const list = dealLang(data.items, lang, data.version);
          window.localStorage.setItem('lang', list);
          langObj = list;
          window.location.reload()
        }
      }
  });
};

export { getLang, fnc };
