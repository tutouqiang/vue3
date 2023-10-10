// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      charset: 'utf-16',
      viewport: 'width=device-width, initial-scale=1',
      title: 'Home',
      meta: [
        // <meta name="description" content="My amazing site">
        { name: 'description', content: 'A front-end developer who loves code。' },
        { name: 'keywords', content: 'wooc, Wooc, WOOC, zhangchao, zhangchao-wooc' }
      ],
    }
  },
  modules: [
    '@nuxt/content'
  ],
  content: {
    // markdown: {
    //   prism: {
    //     theme: 'prismjs/themes/prism.css'
    //   }
    // },
    ignores: [
      'img'
    ],
    // highlight: 'material-theme-darker'
  },
  css: [
    'normalize.css/normalize.css'
  ],
  nitro: {
    prerender: {
      routes: ['/sitemap.xml']
    }
  }
})
