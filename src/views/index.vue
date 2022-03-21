]<template>
  <div class="home">
    <a-row :gutter="[30,16]">
      <a-col :span="18" :lg="18">
        <div class="article">
          <h3>所有文章</h3>
          <router-link v-for="item in articleList" :to="`/article/${item.path}`">{{item.path}}</router-link>
        </div>
      </a-col>
      <a-col :span="0" :lg="4" > 
        <div class="notesType">
          <h3>文章分类</h3>
          <router-link v-for="item in notesType" :key="item.name" :to="item.route">{{item.name}}</router-link>
        </div>
      </a-col>
    </a-row>
    
  </div>
</template>
<script>
import Vscode from '../notes/VsCode.md'
import hljs from 'highlight.js'
import 'highlight.js/styles/a11y-dark.css'

export default {
  components: {
    Vscode,
  },
  data () {
    return {
      articleList: this.$router.options.routes[1].children,
      notesType: [
        {
          name: '前端',
          route: ''
        },
        {
          name: '后端',
          route: ''
        },
        {
          name: 'Linux',
          route: ''
        }
      ]
    }
  },
  mounted() {
    // this.articleList = this.$router.options.routes[1].children
    console.log(this.articleList);
  },
  methods: {
    highlightCode () {
    const preEl = document.querySelectorAll('pre')
    preEl.forEach((el) => {
      console.log(el);
      hljs.highlightBlock(el)
    })
  }
  }
}
</script>
<style lang="less" scoped>
.home {
  /* background-color: #FFFFEE; */
  margin: 0 auto;
  .notesType, .article {
    display: flex;
    flex-direction: column;
    background-color: #fff;
    padding: 20px;
    border-radius: 10px;
    h3 {
      margin-bottom: 10px;
    }
  }
  
}

pre.hljs {
  padding: 12px 2px 12px 40px !important;
  border-radius: 5px !important;
  position: relative;
  font-size: 14px !important;
  line-height: 22px !important;
  overflow: hidden !important;
  
  
  
}
pre.hljs code {
  display: block !important;
  margin: 0 10px !important;
  overflow-x: auto !important;
}

pre.hljs .line-numbers-rows {
    position: absolute;
    pointer-events: none;
    top: 12px;
    bottom: 12px;
    left: 0;
    font-size: 100%;
    width: 40px;
    text-align: center;
    letter-spacing: -1px;
    border-right: 1px solid rgba(0, 0, 0, .66);
    user-select: none;
    counter-reset: linenumber;
  }
pre.hljs b.name {
    position: absolute;
    top: 2px;
    right: 50px;
    z-index: 10;
    color: #999;
    pointer-events: none;
  }
pre.hljs .copy-btn {
    position: absolute;
    top: 2px;
    right: 4px;
    z-index: 10;
    color: #333;
    cursor: pointer;
    background-color: #fff;
    border: 0;
    border-radius: 2px;
  }
pre.hljs .line-numbers-rows span {
      pointer-events: none;
      display: block;
      counter-increment: linenumber;
      
    }
pre.hljs .line-numbers-rows span::before {
        content: counter(linenumber);
        color: #999;
        display: block;
        text-align: center;
      }
</style>
