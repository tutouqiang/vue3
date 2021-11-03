import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { filterRouterMeta } from '../until'
import store from '../store'


const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: {name: 'Home'},
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import(/* webpackChunkName: "about" */ '../views/home/index.vue'),
    meta: { name: 'home' },
    children: [
      // {
      //   path: 'fences',
      //   name: 'Fences',
      //   // route level code-splitting
      //   // this generates a separate chunk (about.[hash].js) for this route
      //   // which is lazy-loaded when the route is visited.
      //   component: () => import(/* webpackChunkName: "about" */ '../views/fence/index.vue'),
      //   meta: { name: 'fences' }
      // }
    ]
  },
  {
    path: '/fence',
    name: 'Fence',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/fence/index.vue'),
    meta: { name: 'fence' }
  }
  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  // if (to.name !== 'Login') next({ name: 'Login' })
  // else next()
  next()
})

router.afterEach((to, from, failure) => {
  store.dispatch('setBreadcrumbList', filterRouterMeta(to.matched))
})

export default router
