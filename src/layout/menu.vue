<template>
  <div id="Menu">
    <div class="menu-item">    
      <a-tooltip title="首页" color="purple" placement="right">
        <router-link to="/home">
           <bank-outlined/>
        </router-link>
       
      </a-tooltip>
      <a-tooltip title="导航" color="purple" placement="right">
        <router-link to="/navWebsite">
          <compass-outlined />
        </router-link>
      </a-tooltip>

      <a-tooltip title="关于" color="purple" placement="right">
        <schedule-outlined @click="handle('about')" />
      </a-tooltip>

      <a-tooltip title="Github" color="purple" placement="right">
        <a href="https://github.com/zhangchao-wooc" target="_blank"><github-outlined class="icon-github"/></a>
      </a-tooltip>

      <a-tooltip title="掘金主页" color="purple" placement="right">
        <a href="https://juejin.cn/user/2400989127643864" class="anticon" target="_blank">
          <a-image src="https://lf3-cdn-tos.bytescm.com/obj/static/xitu_juejin_web/6c61ae65d1c41ae8221a670fa32d05aa.svg" :preview="false" :width="16" alt="" />
        </a>
      </a-tooltip>
      
      <a-popover title="微信公众号" color="purple" placement="rightTop">
        <template #content>
          <img src="../assets/weixin.jpg" alt="" style="width: 100px" />
        </template>
        <wechat-outlined />
      </a-popover>
    </div>
    
  </div>
</template>

<script>
import { defineComponent, h } from 'vue'
import { BankOutlined, CompassOutlined, ScheduleOutlined, GithubOutlined, WechatOutlined } from '@ant-design/icons-vue'
import { Modal } from 'ant-design-vue';

export default defineComponent({
  components: {
    BankOutlined,
    CompassOutlined,
    ScheduleOutlined,
    GithubOutlined,
    WechatOutlined
  },
  methods: {
    handle (action) {
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
})


</script>

<style lang="less" scoped>
#Menu {
  position: relative;
  display: grid;
  grid-template-columns: repeat(50px);
  grid-template-rows: repeat(50px);
  flex-direction: column;
  place-items: center;
  height: 100vh;
  .anticon {
    width: 50px;
    height: 50px;
    display: grid;
    place-items: center;
    font-size: 16px;
    color: purple;
    &:hover {
      cursor: pointer;
      background-color: #eee;
    }
  }
}
</style>
