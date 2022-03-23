<template>
  <a-layout id="home">
    <Header />
    <a-layout-content :style="{ padding: '50px 100px', marginTop: '64px' }">
      <router-view />
    </a-layout-content>
    
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
  }
}
</style>
