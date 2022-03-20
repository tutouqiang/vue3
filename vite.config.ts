import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'
import Markdown from 'vite-plugin-md'
import path from "path";
import MdRouterGenerate from './src/plugin/router'
// import commonjsExternals from 'vite-plugin-commonjs-externals'
import hljs from 'highlight.js'
// import ClipboardJS from 'clipboard';

const preClass = 'position: relative; padding: 20px 15px; margin: 10px 0; border-radius: 5px'
const copyBtn = 'position: absolute; right: 15px; top: 5px; cursor: pointer'

const copy = function (element) {
  console.log(element);
  
  // new ClipboardJS(element)
}
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
    vue({
     include: [/\.vue$/, /\.md$/], // <--
    }),
    // MdRouterGenerate(),
    Markdown({
      markdownItOptions: {
        html: true,
        linkify: true,
        typographer: true,
        highlight: function (str, lang) {
          // 当前时间加随机数生成唯一的id标识
          const codeIndex = parseInt(Date.now() + '') + Math.floor(Math.random() * 10000000)
          // 复制功能主要使用的是 clipboard.js
          // let html = `<button style="${copyBtn}" type="button" data-clipboard-action="${copy(`#copy${codeIndex}`)}" data-clipboard-target="#copy${codeIndex}">复制</button>`
          let html = ''
          // const linesLength = str.split(/\n/).length - 1
          // // 生成行号
          // let linesNum = '<span aria-hidden="true" class="line-numbers-rows">'
          // for (let index = 0; index < linesLength; index++) {
          //   linesNum = linesNum + '<span>' + (index + 1) + '</span>'
          // }
          // linesNum += '</span>'
          if (lang && hljs.getLanguage(lang)) {
            try {
              // highlight.js 高亮代码
              const preCode = hljs.highlight(lang, str, true).value
              html = html + preCode
              // if (linesLength) {
              //   html = '<b class="name">' + lang + '</b>' + html
              // }
              // 将代码包裹在 textarea 中
              return `<pre class="hljs" style="${preClass}"><code>${html}</code></pre><textarea style="position: absolute;top: -9999px;left: -9999px;z-index: -9999;" id="copy${codeIndex}">${str.replace(/<\/textarea>/g, '&lt;/textarea>')}</textarea>`
            } catch (error) {
              console.log(error)
            }
          }
          return ''
          // 未添加代码语言，此处与上面同理

         },
      }
    }),
     
  ],
  
})
