<template>
    <a-layout-header :style="{ position: 'fixed', zIndex: 1, width: '100%' }">
      <h1 class="logo" ><router-link to="/" >WOOC</router-link></h1>
        <a-menu
          v-model:selectedKeys="selectedKeys"
          mode="horizontal"
          :style="{ lineHeight: '64px' }"
          :class="{padding: isWideScreen ? '0': '0 20px'} "
          @click="selectMenu"
        >
          <template v-if="!isWideScreen" >
            <a-sub-menu key="sub1" :style="{padding: 0}">
              <template #icon>
                <menu-outlined :style="{fontSize: '24px', margin: 0}" />
              </template>
              <a-menu-item v-for="item in menuList" :key="item.key">{{item.name}}</a-menu-item>     
            </a-sub-menu>
          </template>
          <template v-else >
            <a-menu-item v-for="item in menuList" :key="item.key">{{item.name}}</a-menu-item>   
          </template>
               
        </a-menu>
        <a href="https://github.com/zhangchao-wooc" v-if="isWideScreen">
          <github-outlined class="icon-github"/>
        </a>
    </a-layout-header>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapState } from 'vuex'
import { GithubOutlined,MenuOutlined } from '@ant-design/icons-vue'


export default defineComponent({
  components: {
    GithubOutlined,
    MenuOutlined
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
          name: '关于',
          path: '/about',
          key: '3',
        },
      ] 
    }
  },
  created () {
    const storage = sessionStorage.getItem('menu-selectedKeys')
    if(storage !== null) {
      let selectedKeys = JSON.parse(storage)
      selectedKeys[0] !== this.selectedKeys[0] && this.jump(selectedKeys[0])
      this.selectedKeys = selectedKeys
    }
  },
  computed: mapState(['isWideScreen']),
  methods: {
    selectMenu (item: { keyPath: string[]; key: string; }) {
      this.selectedKeys = item.keyPath
      sessionStorage.setItem('menu-selectedKeys', JSON.stringify(item.keyPath))
      this.jump(item.key)
    },
    jump (key: string) {
      this.$router.push(this.menuList[parseInt(key) - 1].path)
    }
  }
});
</script>

<style lang="less" scoped>
.ant-layout-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #FFF;
  box-shadow: 0 0 5px rgba(0,0,0,.2);
  @media screen and (max-width: 800px) {
    padding: 0px 20px;
  }
    .logo a {
    color: #333;
  }
  .ant-menu {
    flex-grow: 1;
    padding: 0 20px;
    background-color: #FFF;
    transition: all 0.3s linear;
    @media screen and (max-width: 800px) {
      display: flex;
      justify-content: flex-end;
    }
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
