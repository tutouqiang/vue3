<template>
    <a-layout-header :style="{ position: 'fixed', zIndex: 1, width: '100%' }">
      <div class="logo" />
      <a-menu
        v-model:selectedKeys="selectedKeys"
        mode="horizontal"
        theme="dark"
        :style="{ lineHeight: '64px' }"
      >
        <a-menu-item key="1">导航</a-menu-item>        
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
      selectedKeys: ['1']
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
    width: 120px;
    height: 31px;
    background: rgba(255, 255, 255, 0.2);
    margin: 16px 24px 16px 0;
    float: left;
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
