<template>
  <a-layout id="home">
    <Header />
    <transition
      mode="out-in"
      :duration="{ enter: 500, leave: 800 }"
    >
      <a-layout-content :style="{ padding: '3rem 1rem', marginTop: '64px' }">
        <router-view />
      </a-layout-content>
    </transition>
    <!-- <Footer /> -->
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
    transition: all 0.3s;
  }
}
</style>
