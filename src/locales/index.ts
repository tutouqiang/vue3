// @ts-ignore
import { i18n } from '../until/new'
import en from './en';
import zh from './zh-Hans';

console.log(1111111);

i18n.init({
  locales: {
    'zh-Hans': zh,
    en
  }
})

console.log(i18n);

