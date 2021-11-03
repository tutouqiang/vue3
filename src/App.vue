<template>
  <a-layout style="height: 100vh">
    <Menu />
    <a-layout>
      <Header />
      <Content />
    </a-layout>
  </a-layout>
</template>

<script>
import { defineComponent } from 'vue'
import Header from './layout/header.vue'
import Menu from './layout/menu.vue'
import Content from './layout/content.vue'

import {i18n} from './until/mini-i18n'
  export default defineComponent({
    components: {
      Header,
      Menu,
      Content
     },
    data () {
      return {
      }
    },
    created() {
      // console.log(this.$router);
    },
    mounted() {
      console.log()
    },
    methods: {
      change () {
        i18n.setLocales(i18n.getLocales() === 'en-US' ? 'zh-CN' : 'en-US')
      }
    }
  })
</script>

<style lang="less">
#app {
  width: 100vw;
  height: 100vh;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
