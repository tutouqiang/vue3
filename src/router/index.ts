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
        path: '/navWebsite',
        name: 'NAVWEBSITE',
        meta: { name: '导航网站' },
        component: () => import(/* webpackChunkName: "navWebsite" */ '../views/website/index.vue')
      },
      {
        path: '/about',
        name: 'ABOUT',
        meta: { name: '关于' },
        component: () => import(/* webpackChunkName: "about" */ '../views/about/index.vue')
      },
    ]
  },
  {
    path: '/article',
    name: 'ARTICLE',
    meta: { name: '文章'},
    component: () => import(/* webpackChunkName: "home" */ '../layout/article.vue'),
    children: article
  },
  
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
