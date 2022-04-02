<template>
<!-- 文章布局 -->
  <a-layout id="article">
    <Header />
    <a-layout-content :style="{ padding: '0 1rem', marginTop: '64px', flexGrow: 1 }">
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
import '../style/markdown/smartblue.less'
import '../style/hightlight/prism.css'

export default {
  components: {
    Header,
    Footer
  },
  data () {
    return {
      articleList: [],
    }
  },
  created () {
    this.articleList = this.$route.matched.map(item => {
      return {
        name: item.meta.name,
        path: item.path
      }
    })
  },
  mounted () {
    const element = document.getElementsByClassName('content')[0];
    console.log(element);
    window.requestAnimationFrame(() => {
      element.style.transform = 'translateX(0)';
      element.style.opacity = 1;
      console.log('beforeMount');
    });
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
    padding: 10px 0px;
    will-change: auto;
    transform: translateX(-300px);
    opacity: 0;
    transition: all 0.3s linear;
  }
}

</style>
