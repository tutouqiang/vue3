import { createApp } from 'vue'
import { createHead } from '@vueuse/head'
import App from './App.vue'
import router from './router'
import store from './store'
import Antd from 'ant-design-vue'
import 'normalize.css/normalize.css'
import 'nprogress/nprogress.css'
import '@/assets/styles/iconfont/iconfont.css'
import '@/assets/styles/theme.less'

const app = createApp(App)
const head = createHead()

app.use(store)
app.use(head)
app.use(router).use(Antd)
app.mount('#app')
