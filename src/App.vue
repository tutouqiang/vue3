<template>
  <n-theme-editor>
     <n-layout style="height: 100vh">
      <n-layout-header>
        <Header />
      </n-layout-header>
      <n-layout>
      <Menu />
      </n-layout>
    </n-layout>
  </n-theme-editor>
</template>

<script>
import { defineComponent } from 'vue'
import { NThemeEditor } from 'naive-ui'
import Menu from '@/layout/menu.vue'
import Header from '@/layout/header.vue'


  export default defineComponent({
    components: {
      NThemeEditor,
      Menu,
      Header
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
