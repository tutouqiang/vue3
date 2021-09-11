import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import {
  create,
  NButton,
  NSpace,
  NSwitch,
  NLayout,
  NMenu,
  NLayoutHeader,
  NLayoutSider,
  NLayoutContent,
  NLayoutFooter
} from 'naive-ui'

const naive = create({
  components: [
    NButton, NSpace, NSwitch, NLayout, NMenu, NLayoutHeader, NLayoutSider,
    NLayoutContent, NLayoutFooter
  ]
})

const app = createApp(App).use(store).use(router).use(naive);
app.mount('#app');
