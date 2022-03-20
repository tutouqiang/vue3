import { createApp } from 'vue'
import App from './App.vue'
import router from '../src/router'
import Antd from 'ant-design-vue'
import './style/theme.less'
import './style/reset.less'

const app = createApp(App)

app.use(router).use(Antd)
app.mount('#app')
