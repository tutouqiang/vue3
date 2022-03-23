<template>
<!-- 文章布局 -->
  <a-layout id="article">
    <Header />
    <a-layout-content :style="{ padding: '0 50px', marginTop: '64px', flexGrow: 1 }">
      <a-breadcrumb :style="{ margin: '16px 0' }">
        <a-breadcrumb-item v-for="item in articleList">{{item.name}}</a-breadcrumb-item>
      </a-breadcrumb>
      <section class="content">
        <router-view />
      </section>
    </a-layout-content>
    
    <Footer />
  </a-layout>
</template>
<script>
import Header from './header.vue'
import Footer from './footer.vue'
import { deepRouter } from '../util/index'

export default {
  components: {
    Header,
    Footer,
  },
  data () {
    return {
      articleList: []
    }
  },
  created () {
    this.articleList = this.$route.matched.map(item => {
      return {
        name: item.meta.name,
        path: item.path
      }
    })
    console.log(this.articleList);
  }
}
</script>

<style lang="less" scoped>
#article {
  min-height: 100vh;
  background-color: #FFFFEE;
  .content {
    max-width: 800px;
    margin: 0 auto; 
    padding: 10px 20px;
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
