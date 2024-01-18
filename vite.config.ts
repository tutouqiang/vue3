import { fileURLToPath, URL } from 'node:url'
import * as fs from 'node:fs'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import AutoImport from 'unplugin-auto-import/vite'
import VueRouter from 'unplugin-vue-router/vite'
import { VueRouterAutoImports } from 'unplugin-vue-router'
import Markdown from 'unplugin-vue-markdown/vite'
import MarkdownItPrism from 'markdown-it-prism'
import Prism from 'prismjs'
import loadLanguages from 'prismjs/components/index'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
dayjs.extend(customParseFormat)

let blog: Record<string, any> = {
  types: [{
    title: '前端',
    route: '/blog/font-end'
  }, {
    title: '源码分析',
    route: '/blog/source-code-analysis'
  }, {
    title: '系统',
    route: '/blog/system'
  }],
  data: []
}

const BlogType: Record<string, string> = {
  'front-end': '前端',
  'source-code-analysis': '源码分析',
  'system': '系统'
}

// https://vitejs.dev/config/
export default defineConfig(() => {
  return {
    plugins: [
      AutoImport({
        imports: [VueRouterAutoImports]
      }),
      Markdown({
        headEnabled: true,
        frontmatterPreprocess: (frontmatter: Record<string, any>, options, id, defaultHeadProcess) => {
          // deal blog data
          const filePath = id.split('/src/blog/')[1].split('.md')[0]
          const params = {
            title: frontmatter.title || filePath.split('/')[1] || '',
            type: BlogType[filePath.split('/')[0]] || '',
            author: 'wooc / 张超',
            createTime: frontmatter.createTime,
            createTimeStamp: frontmatter.createTime ? dayjs(frontmatter.createTime, 'YYYY 年 MM 月 DD 日').format('SSS') : frontmatter.createTime,
            updateTime: frontmatter.updateTime || frontmatter.createTime || '',
            parentRoute: filePath.split('/')[0],
            route: `/blog/${filePath}`
          }
          blog.data.push(params)
          fs.writeFileSync('./src/blog/data.json', JSON.stringify(blog, null, 2))
          return {
            head: {
              ...frontmatter,
              title: `${frontmatter.title} - wooc.top`
            },
            frontmatter
          }
        },
        markdownItSetup: (md) => {
          md.use(MarkdownItPrism, {
            defaultLanguage: 'js', // 设置默认语言
            plugins: ['line-numbers'], // 添加其他插件
            init() {
              // 初始化 Prism.js，例如添加自定义语言等
            }
          })
        }
      }),
      VueRouter({
        routesFolder: ['src/views', { src: 'src/blog', path: 'blog/' }],
        extensions: ['.vue', '.md'],
        extendRoute: (route: any) => {
          return route
        }
      }),
      vue({
        include: [/\.vue$/, /\.md$/],
      }),
      vueJsx(),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    }
  }
})
