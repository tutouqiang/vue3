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
      },
      {
        path: 'navWebsite',
        name: 'NAVWEBSITE',
        meta: { name: '导航网站' },
        component: () => import(/* webpackChunkName: "home" */ '../views/website/index.vue')
      }
    ]
  },
  {
    path: '/article',
    name: 'ARTICLE',
    meta: { name: '文章'},
    component: () => import(/* webpackChunkName: "home" */ '../layout/article.vue'),
    children: article
  },
  {
    path: '/showTime',
    name: 'SHOWTIME',
    meta: { name: '时钟' },
    component: () => import(/* webpackChunkName: "home" */ '../views/showTime.vue')
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
