import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import api from './api'
import './locales'
import Antd from 'ant-design-vue/es';
import 'ant-design-vue/dist/antd.less';

// @ts-ignore
import { i18n, t } from './until/mini-i18n'
// console.log(Antd);


const app = createApp(App).use(store).use(router).use(Antd);
app.config.globalProperties.$api = api
app.config.globalProperties.$i18n = i18n
app.config.globalProperties.$t = t
app.mount('#app');

export default app