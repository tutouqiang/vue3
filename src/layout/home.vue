<template>
  <a-layout id="home">
    <!-- <Header /> -->
    <a-layout-sider theme="light" :width="this.open ? 50 : 0" :style="{ height: '100vh', position: 'fixed', left: 0, top: 0, bottom: 0 }">
      <Menu />
      <div class="fold" @click="() => { this.open = !this.open }">
        
        
        <double-left-outlined  v-if="open" />
        <double-right-outlined v-else  />
      </div>
    </a-layout-sider>
    
    <transition
      mode="out-in"
      :duration="{ enter: 500, leave: 800 }"
    >
      <a-layout-content :style="{ marginLeft: this.open ? '50px' : 0}">
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
import { DoubleLeftOutlined, DoubleRightOutlined } from '@ant-design/icons-vue'
import Header from './header.vue'
import Footer from './footer.vue'
import Menu from './menu.vue'
import Article from './article.vue'


export default {
  components: {
    Header,
    Footer,
    Article,
    Menu,
    DoubleLeftOutlined,
    DoubleRightOutlined
  },
  data(){
    return {
      currentRoute: '',
      open: false
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
  min-height: 100vh;
  .ant-layout-content {
    min-height: 50vh;
    padding: 15px;
    background: url(http://clubimg.club.vmall.com/data/attachment/forum/201805/31/131554ai1zcy9kr6sphgws.jpg) no-repeat;
    background-size: cover;
    transition: all 0.3s;
  }
  .fold {
    position: absolute;
    top: 50%;
    right: -13px;
    padding: 3px 0;
    transform: translateY(-50%);
    background-color: #fff;
    border-radius: 0 50% 50% 0;
    cursor: pointer;
    animation: openBtn 2s ease-in infinite;
  }

  @keyframes openBtn {
    0% {
      top: 50%;
    }
    33% {
      top: 48%;
    }
    660% {
      top: 52%;
    }
    100% {
      top: 50%;
    }
  }
}
</style>
