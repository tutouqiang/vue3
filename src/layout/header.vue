<template>
    <a-layout-header :style="{ position: 'fixed', zIndex: 1, width: '100%' }">
      <h1 class="logo" ><router-link to="/" >WOOC</router-link></h1>
      <a-menu
        v-model:selectedKeys="selectedKeys"
        mode="horizontal"
        :style="{ lineHeight: '64px' }"
        @click="selectMenu"
      >
        <a-menu-item v-for="item in menuList" :key="item.key">{{item.name}}</a-menu-item>        
      </a-menu>
      <a href="https://github.com/zhangchao-wooc"><github-outlined class="icon-github"/></a>
    </a-layout-header>
</template>

<script>
import { GithubOutlined } from '@ant-design/icons-vue'

export default {
  components: {
    GithubOutlined
  },
  data () {
    return {
      selectedKeys: ['1'],
      menuList: [
        {
          name: '首页',
          path: '/home',
          key: '1',
        },
        {
          name: '导航网站',
          path: '/navWebsite',
          key: '2',
        },
        {
          name: '时间',
          path: '/showTime',
          key: '3',
        },
      ] 
    }
  },
  created () {
    const selectedKeys = sessionStorage.getItem('menu-selectedKeys')
    JSON.stringify(this.selectedKeys) === selectedKeys && this.jump(this.selectedKeys[0])
    this.selectedKeys = selectedKeys ? JSON.parse(selectedKeys) : this.selectedKeys
    
  },
  methods: {
    selectMenu (item) {
      this.selectedKeys = item.keyPath
      sessionStorage.setItem('menu-selectedKeys', JSON.stringify(item.keyPath))
      this.jump(item.key)
    },
    jump (key) {
      this.$router.push(this.menuList[parseInt(key) - 1].path)
    }
  }
}
</script>
<style lang="less" scoped>
.ant-layout-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #FFF;
    .logo a {
    color: #333;
  }
  .ant-menu {
    flex-grow: 1;
    padding: 0 20px;
    background-color: #FFF;
    .ant-menu-title-content {
      color: #333!important;
    }
  }
  .icon-github {
    display: flex;
    font-size: 30px;
    color: #000;
  }
}
</style>
