import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Markdown from 'vite-plugin-md'
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
      "@": path.resolve(__dirname, "src"),
    },
  },
  plugins: [
    MdRouterGenerate({
      filePath: path.resolve(__dirname, 'src/views/article'),
      outputPath: path.resolve(__dirname, 'src/router/article.ts')
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
     
  ],
  
})
