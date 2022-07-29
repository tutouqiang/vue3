<template>
  <a-layout id="home">
    <!-- <Header /> -->
    <a-layout-sider theme="light" :width="open ? 50 : 0" :style="{ height: '100vh', position: 'fixed', left: 0, top: 0, bottom: 0 }">
      <Menu />
      <div class="fold" @click="() => { open = !open }">
        <double-left-outlined  v-if="open" />
        <double-right-outlined v-else  />
      </div>
      <!-- <Button class="fold" @click="() => { open = !open }">
        <double-left-outlined  v-if="open" />
        <double-right-outlined v-else  />
      </Button> -->
      
    </a-layout-sider>
    
    <transition
      mode="out-in"
      :duration="{ enter: 500, leave: 800 }"
    >
      <a-layout-content :style="{ marginLeft: open ? '50px' : 0}">
        <template v-if="this.$route.path.includes('/article/')">
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
import { Button } from 'ant-design-vue';
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
    Button,
    DoubleLeftOutlined,
    DoubleRightOutlined
  },
  data(){
    return {
      currentRoute: '',
      open: true
    }
  },  
  watch: {
    $route(to, from){
      if(to.path !== this.currentRoute) {
        this.currentRoute = to.path
      }
    }
  },
  created() {
    console.log(this.$route.path)
  }
}
</script>
<style lang="less" scoped>
#home {
  min-height: 100vh;
  .ant-layout-content {
    min-height: 50vh;
    background: url(http://clubimg.club.vmall.com/data/attachment/forum/201805/31/131554ai1zcy9kr6sphgws.jpg) no-repeat;
    background-size: cover;
    transition: all 0.3s;
  }
  .fold {
    position: absolute;
    top: 50%;
    right: -20px;
    width: 20px;
    height: 20px;
    transform: translateY(-50%);
    background-color: #fff;
    border-radius: 0 20px 20px 0;
    cursor: pointer;
    transition: all 0.3s;
    &:hover {
      right: -40px;
      width: 40px;
    }
    // animation: openBtn 2s ease-in infinite;
  }

  // @keyframes openBtn {
  //   0% {
  //     top: 50%;
  //   }
  //   33% {
  //     top: 48%;
  //   }
  //   660% {
  //     top: 52%;
  //   }
  //   100% {
  //     top: 50%;
  //   }
  // }
}
</style>
