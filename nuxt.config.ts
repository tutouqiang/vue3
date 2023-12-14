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
        { name: 'keywords', content: 'wooc, Wooc, WOOC, zhangchao, zhangchao-wooc' },
      ],
      link: [
        { rel: 'rel', href: '/manifest.webmanifest' }
      ],
      script: [
        { src: 'https://www.googletagmanager.com/gtag/js?id=G-GM48ME9M7S', async: true },
        { src: "/js/analytics.js" },
      ]
    }
  },
  modules: [
    '@nuxt/content',
    '@vite-pwa/nuxt'
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
  pwa: {
    strategies: 'generateSW',
    registerType: 'autoUpdate',
    manifest: {
      name: 'wooc',
      short_name: 'wooc',
      theme_color: '#fff',
      description: 'A front-end developer who loves code。',
      display: 'fullscreen',
      icons: [
        {
          src: '/images/192x192.png',
          sizes: '192x192',
          type: 'image/png',
        },
        {
          src: '/images/512x512.png',
          sizes: '512x512',
          type: 'image/png',
        }
      ],
      start_url: "/",

    },
    workbox: {
      navigateFallback: null,
      globPatterns: ['*/**.{js,css,html,png,svg,ico}'],
      skipWaiting: true, // 是跳过版本更新的等待
      clientsClaim: true,
      runtimeCaching: [
        {
          urlPattern: /(.+)\.(png|jpe?g|svg|gif|bmp|psd|tiff|tga|eps|ico)/, // 图片缓存
          handler: 'CacheFirst',
          options: {
            cacheName: 'image-cache',
            cacheableResponse: {
              statuses: [200]
            },
          },
        },
        {
          urlPattern: /.*\.(css|less|scss)/, // css静态资源缓存
          handler: 'CacheFirst',
          options: {
            cacheName: 'css-cache',
            fetchOptions: { // 这个配置项可配置请求资源之前的一些负载，比如以下的请求头设置
              headers: [
                ['Content-Type', 'text/javascript']
              ]
            },
          },
        },
        {
          urlPattern: /.*\.(js|ts|vue|ts|mjs)/, // js /css /ts静态资源缓存
          handler: 'CacheFirst',
          options: {
            cacheName: 'js-cache',
          },
        },
        {
          urlPattern: /\/(detail|write-article|archive|label|friend-link|message-board|about-my|announcement|person|creator-center)?/, //  页面缓存
          handler: 'NetworkFirst',
          options: {
            cacheName: 'pages-cache',
            networkTimeoutSeconds: 10, // 十秒后未响应取缓存结果
          },
        },
      ]
    },
    selfDestroying: false,
    client: {
      installPrompt: true, // 安装提示
      periodicSyncForUpdates: 3600, // 定期同步更新资源
    },
    devOptions: {
      enabled: true,
      suppressWarnings: true,
      navigateFallbackAllowlist: [/^\/$/],
      type: 'module',
    },
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
