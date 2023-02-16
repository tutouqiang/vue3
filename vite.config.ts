import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Markdown from 'vite-plugin-md'
import Components from 'unplugin-vue-components/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'
import compression from 'vite-plugin-compression'
import prism from 'markdown-it-prism'
import path from "path";
import MdRouterGenerate from './src/plugin/router'

// https://vitejs.dev/config/
export default defineConfig({
  css: {
    preprocessorOptions: {
      less: {
        modifyVars: {
        },
        javascriptEnabled: true,
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src")
    },
  },
  plugins: [
    MdRouterGenerate({
      dirname: __dirname,
      filePath: 'src/views/article',
      outputPath: 'src/router/article.ts'
    }),
    vue({
     include: [/\.vue$/, /\.md$/],
    }),
    Markdown({
      headEnabled: true,
      markdownItOptions: {
        html: true,
        linkify: true,
        typographer: true
      },
      markdownItSetup(md) {
        // for example
        md.use(require('markdown-it-anchor'))
        md.use(prism)
      },
    }),
    Components({
      resolvers: [AntDesignVueResolver()]
    }),
    compression(),
  ],
  
})
