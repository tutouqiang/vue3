<template>
  <a-layout id="home">
    <!-- <Header /> -->
    <a-layout-sider theme="light" width="50" :style="{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0, top: 0, bottom: 0 }">
      <Menu />
    </a-layout-sider>
    
    <transition
      mode="out-in"
      :duration="{ enter: 500, leave: 800 }"
    >
      <a-layout-content>
        <template v-if="currentRoute.includes('/article/')">
          <Article />
        </template>
        <template v-else>
          <router-view />
        </template>
      </a-layout-content>
    </transition>
    <!-- <Footer /> -->
  </a-layout>
</template>

<script>
import Header from './header.vue'
import Footer from './footer.vue'
import Menu from './menu.vue'
import Article from './article.vue'


export default {
  components: {
    Header,
    Footer,
    Article,
    Menu
  },
  data(){
    return {
      currentRoute: ''
    }
  },  
  watch: {
    $route(to, from){
      if(to.path !== this.currentRoute) {
        this.currentRoute = to.path
      }
    }
  }
}
</script>
<style lang="less" scoped>
#home {
  margin: 0 0 0 50px;
  min-height: 100vh;
  .ant-layout-content {
    min-height: 50vh;
    padding: 15px;
    background: url(http://clubimg.club.vmall.com/data/attachment/forum/201805/31/131554ai1zcy9kr6sphgws.jpg) no-repeat;
    background-size: cover;
    transition: all 0.3s;
  }
}
</style>
