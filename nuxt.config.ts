// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
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
    highlight: 'material-theme-darker'
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
