import { createApp } from 'vue'
// @ts-expect-error
import { createRouter, createWebHistory } from 'vue-router/auto'
import { createHead } from '@unhead/vue'
import App from './App.vue'
import 'normalize.css/normalize.css'
import "@/styles/theme/base.css";
import "@/styles/theme/dark.css";
import "@/styles/element/index.css";
import "@/styles/layout/index.css";
import "@/styles/md/default.scss"

const router = createRouter({
  // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
  history: createWebHistory(),
  extendRoutes: (routes: any) => {
    console.log(routes)
    return routes
  }
})

const app = createApp(App)
const head = createHead()
app.use(router)
app.use(head)
app.mount('#app')
