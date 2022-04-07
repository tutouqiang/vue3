<template>
  <a-layout id="home">
    <Header />
    <transition
      mode="out-in"
      :duration="{ enter: 500, leave: 800 }"
    >
      <a-layout-content>
        <router-view />
      </a-layout-content>
    </transition>
    <Footer />
  </a-layout>
</template>
<script>
import Header from './header.vue'
import Footer from './footer.vue'

export default {
  components: {
    Header,
    Footer
  }
}
</script>
<style lang="less" scoped>
#home {
  margin: 0 auto;
  min-height: 100vh;
  .ant-layout-content {
    min-height: 50vh;
    margin: 64px 80px 0;
    padding: 20px 15px;
    transition: all 0.3s;
    @media screen and (max-width: 800px) {
      padding: 20px 15px;
      margin: 64px 0px 0;
    }
  }
}
</style>
