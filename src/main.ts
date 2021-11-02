import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import api from './api'
import './locales'

// @ts-ignore
import { t } from './until/new'



const app = createApp(App).use(store).use(router);
app.config.globalProperties.$api = api
app.config.globalProperties.$t = t
app.mount('#app');
