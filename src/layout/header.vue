<template>
  <a-row justify="center">
    <a-col :xs="24" :sm="0">
      <a-layout-header :style="isScroll ? 'background-color: #fff;box-shadow: rgb(114 104 104 / 10%) 0px 2px 12px 0px;' : '' ">
        <a-dropdown>
          <a class="w-menu" @click.prevent>
            <MenuOutlined style="font-size: 20px"/>
          </a>
          <template #overlay>
            <a-menu>
              <a-menu-item>
                <router-link to="/home">
                  <bank-outlined/> 首页
                </router-link>
              </a-menu-item>
              <a-menu-item>
                <router-link to="/navWebsite">
                  <compass-outlined /> 导航
                </router-link>
              </a-menu-item>
              <a-menu-item>
                <a-tooltip title="关于" color="purple" placement="right">
                  <div @click="handle('about')">
                    <schedule-outlined  /> 关于
                  </div>
                </a-tooltip>
              </a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
      </a-layout-header>
    </a-col>
  </a-row>
</template>

<script lang="ts">

import { defineComponent, h } from 'vue'
import { mapState } from 'vuex'
import { Modal } from 'ant-design-vue';
import { GithubOutlined,MenuOutlined, BankOutlined, CompassOutlined, ScheduleOutlined, WechatOutlined } from '@ant-design/icons-vue'


export default defineComponent({
  components: {
    GithubOutlined,
    MenuOutlined,
    BankOutlined, 
    CompassOutlined, 
    ScheduleOutlined,
    WechatOutlined
  },
  data () {
    return {
      selectedKeys: ['1'],
      isScroll: false,
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
  },
  mounted () {
    const that = this
    window.addEventListener('scroll', function () {
      var scrollY = document.documentElement.scrollTop || document.body.scrollTop
      if(that.isScroll && scrollY === 0) {
        that.isScroll = false
      }
      if(!that.isScroll && scrollY > 0) {
        that.isScroll = true
      }
    })
  },
  computed: mapState(['isWideScreen']),
  methods: {
    handle (action: string) {
      switch(action){
        case 'about':
          Modal.info({
            title: '关于',
            width: '800px',
            content: h('div', {style: 'letter-spacing: 2px; text-indent: 32px'}, [
              h('p', '使用过很多笔记软件，最后因为种种原因而决定换掉，最后挑选 Github 作为笔记的载体。'),
              h('br'),
              h('p', '至于网站的形式我也尝试过很多，比如 Hexo 模版类型的博客创作，虽然真的很方便，但个人还是感觉满足不了我的需求，最终选择的实用 vue 框架自己搭建一套博客网站。所以我决定自己做动态路由之类的插件，然后按需使用三方库同时去了解和分析它，最后根据自己的需求进行改写或重构。'),
              h('br'),
              h('p', '就像以前有个面试官问我: "loadsh 里面有成熟的方法你为什么不用？"。而我的回答是: "如果不是业务、时间强需求，我选择自己写，因为折腾的过程是我想要的"。'),
              h('br'),
              h('p', '做的过程中也想要做到完美再上线，但随着时间的推移，先 run 起来才是王道，再使用过程中一步步完善它。'),
            ])
          })
        break;
        default:
      }
    }
  }
});
</script>

<style lang="less" scoped>
.ant-layout-header {
  position: fixed;
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  background-color: transparent;
  z-index: 10;
  @media screen and (max-width: 800px) {
    padding: 0px 20px;
  }
}
</style>
