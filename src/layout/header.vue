<template>
    <a-layout-header :style="{ position: 'fixed', zIndex: 1, width: '100%' }">
      <h1 class="logo" >WOOC</h1>>
      <a-menu
        v-model:selectedKeys="selectedKeys"
        mode="horizontal"
        theme="dark"
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
      ]
    }
  },
  methods: {
    selectMenu (item, key, selectedKeys) {
      console.log('selectMenu', item, key, selectedKeys);
      this.selectedKeys = item.keyPath
      this.$router.push(this.menuList[parseInt(item.key) - 1].path)
    }
  }
}
</script>
<style lang="less" scoped>
.ant-layout-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
    .logo {
    color: #fff;
  }
  .ant-menu {
    flex-grow: 1;
    padding: 0 20px;
  }
  .icon-github {
    display: flex;
    font-size: 30px;
    color: #fff;
  }
}
</style>
