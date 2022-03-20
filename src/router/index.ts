import { createRouter, createWebHashHistory } from 'vue-router'
import article from './article'

const routes = [
  {
    path: '/',
    component: () => import(/* webpackChunkName: "home" */ '../layout/home.vue'),
    redirect: '/home',
    children: [
      {
        path: '/home',
        name: 'Home',
        component: () => import(/* webpackChunkName: "home" */ '../views/index.vue')
      }
    ]
  },
  {...article},
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
