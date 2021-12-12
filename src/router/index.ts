import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: '/showTime'
  },
  {
    path: '/showTime',
    name: 'showTime',
    component: () => import(/* webpackChunkName: "home" */ '../views/showTime.vue')
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router