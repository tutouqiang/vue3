/*
 * article router
 *
 */

const routes ={
  path: '/article',
  component: () => import(/* webpackChunkName: "home" */ '../layout/article.vue'),
  children: [
    {
      path: 'VsCode',
      // @ts-ignore
      component: () => import(/* webpackChunkName: "home" */ '../notes/VsCode.md'),
    }
  ]
}

export default routes
