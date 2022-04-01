import { createApp } from 'vue'
import { createHead } from '@vueuse/head'
import App from './App.vue'
import router from '../src/router'
import Antd from 'ant-design-vue'
import './style/theme.less'
import './style/reset.less'

const app = createApp(App)
const head = createHead()

app.use(head)
app.use(router).use(Antd)
app.mount('#app')
