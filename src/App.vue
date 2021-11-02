<template>
  <div>{{home}}</div>
  <button @click="change">切换语言</button>
  <Home></Home>
</template>

<script>
import { defineComponent } from 'vue'
import Home from './views/Home.vue'
import {i18n} from './until/new'
  export default defineComponent({
    components: {
      Home: Home
     },
    data () {
      return {
        home: this.$t('ok')
      }
    },
    created() {
    },
    mounted() {
      console.log()
    },
    methods: {
      change () {
        i18n.setLocales(i18n.getLocales() === 'en-US' ? 'zh-CN' : 'en-US')
        console.log(i18n.getLocales());
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
