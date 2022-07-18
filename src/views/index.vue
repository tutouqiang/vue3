<template>
  <div class="home">
    <a-row>
      <a-col :span="7" :lg="7" :offset="0" style="display: grid; justify-content: right">
      </a-col>
      <a-col :span="10" :lg="10" offset=”0“ style="display: grid; align-items: center;">
        <a-input-group compact size="large" class="searchInput">
          <a-select v-model:value="currentBrowser" size="large" >
            <a-select-option :value="item.key" v-for="item in browserList" :key="item.value" style="height: 50px">
              <div style="display: flex; align-items: center; height: 50px">{{item.value}}
                <img :src="item.img" alt="" style="width: 15px; margin-left: 5px">
              </div>
            </a-select-option>
          </a-select>
          <a-input v-model:value="searchText" placeholder="输入搜索内容" allowClear size="large" style="width: calc(100% - 200px); height: 50px" />
          <a-button type="primary" size="large" @click="searchBtn" style="height: 50px">
            搜索
            <template #icon><SearchOutlined /></template>
          </a-button>
        </a-input-group>
        <div class="app">
          <a href="" v-for="item in favoriteApps" :key="item.name">
            <img :src="item.img" :alt="item.name">
            <span>{{item.name}}</span>
          </a>
        </div>
      </a-col>
      <a-col :span="7" :lg="7" style="display: grid; justify-content: right">
        <!-- <WeiboPage /> -->
      </a-col>
    </a-row>

    <a-row :gutter="16" style="padding-top: 60px;">
      <a-col :span="8" :lg="8">
        <a-skeleton :loading="loading" active>
          <div class="article">
            <a-tabs v-model:activeKey="activeKey">
              <a-tab-pane
                v-for="item in articleList"
                :key="item.type"
                :tab="item.type"
                @tabClick="tabClick(item)"
                style="height: 215px"
              >
                <div
                  class="a-info"
                  v-for="(it, id) in item.children"
                  :style="id % 2 === 0 ? '' : 'background-color: rgba(0,0,0,.01);'"
                >
                  <router-link class="routerLink" :to="`${it.path}`">
                    {{ it.meta.title || it.meta.name }}
                  </router-link>
                  <div class="a-info_time">
                    {{ it.meta.createTime }}
                  </div>
                </div>
              </a-tab-pane>
            </a-tabs>
          </div>
        </a-skeleton>
      </a-col>
      <a-col :span="5" :lg="5" style="display: grid; justify-content: right">
        <WeiboPage />
      </a-col>
    </a-row>
  </div>
</template>
<script>
import { ref } from "vue";
import { SearchOutlined } from '@ant-design/icons-vue'
import { Chrome, Bing, Baidu } from '@assets'
import { deepRouter } from "../util/index";
import { WeiboPage } from '@components'

export default {
  components: {
    WeiboPage,
    SearchOutlined
  },
  data() {
    return {
      articleList: [],
      loading: true,
      activeKey: ref("前端"),
      currentBrowser: 'google',
      searchText: '',
      browserList: [
        {
          value: '谷歌',
          key: 'google',
          icon: 'icon-chrome',
          img: Chrome,
          search: (q) => `https://www.google.com/search?q=${q}`
        },
        {
          value: '必应',
          key: 'bing',
          icon: 'icon-Bing',
          img: Bing,
          search: (q) => `https://www.bing.com/search?q=${q}`
        },
        {
          value: '百度',
          key: 'baidu',
          icon: 'icon-icon_baidulogo',
          img: Baidu,
          search: (q) => `https://www.baidu.com/s?wd=${q}`
        }
      ],
      notesType: [
        {
          name: "前端",
          route: "",
        },
        {
          name: "后端",
          route: "",
        },
        {
          name: "Linux",
          route: "",
        },
      ],
      favoriteApps: [
        {
          img: 'https://hoppscotch.io/_nuxt/icons/icon_144x144.062430.png',
          url: 'https://hoppscotch.io/cn',
          name: 'hoppscotch',
          desc: '网页版 postman'
        },
        {
          img: 'https://cdn.docschina.org/static/media/docschina-logo.4c5554f1.svg',
          url: 'https://docschina.org/',
          name: '印记中文',
          desc: '知名前端信息网站'
        },
        {
          img: 'https://gw.alipayobjects.com/zos/bmw-prod/735cefc9-f976-4c87-8b48-85f713f5b713.svg',
          url: 'https://www.yuque.com/zaotalk/worm/bird397',
          name: '早早聊',
          desc: '前端早早鸟日刊'
        },
        {
          img: 'https://developer.mozilla.org/static/media/twitter.cc5b37feab537ddbf701.svg',
          url: 'https://developer.mozilla.org/zh-CN/',
          name: 'MDN',
          desc: 'web docs'
        },
        {
          img: 'https://avatars.githubusercontent.com/u/9919?s=280&v=4',
          url: 'https://www.githubs.cn/',
          name: '中文社区',
          desc: 'github 中文社区'
        },
        {
          img: 'https://avatars.githubusercontent.com/u/9919?s=280&v=4',
          url: 'https://www.github.com/',
          name: 'Github',
          desc: 'Github'
        }
      ]
    };
  },
  created() {
    this.articleList = deepRouter(this.$router.options.routes[1].children, "/article");
    let activeKey = sessionStorage.getItem("tabs-activeKey");
    if (activeKey !== null) {
      this.activeKey = activeKey;
    }
    console.log(
      "deepRouter",
      deepRouter(this.$router.options.routes[1].children, "/article")
    );
  },
  mounted() {
    this.loading = false;
  },
  beforeUnmount() {
    sessionStorage.setItem("tabs-activeKey", this.activeKey);
  },
  methods: {
    searchBtn(){
      // console.log('searchBtn', , this.currentBrowser)
      const url = this.browserList.filter(item => item.key === this.currentBrowser)[0].search
      window.open(url(this.searchText), '_blank')
    },
    tabClick(item) {
      this.activeKey = item.type;
    },
  },
};
</script>
<style lang="less" scoped>
.home {
  margin: 0 auto;
  .searchInput {
     padding: 100px 0 30px;
    :deep(.ant-select-selector) {
      height: 50px;
    }
  }
  .app {
    width: 100%;
    display: grid;
    // grid-template: repeat(50px);
    grid-template-columns: repeat(auto-fill, 60px);
    grid-template-rows: repeat(auto-fill, 60px);
    grid-gap: 30px;
    font-size: 12px;
    a {
      display: flex;
      flex-direction: column;
      align-items: center;
      img {
        width: 60px;
        height: 60px;
        margin-bottom: 5px;
        border-radius: 5px;
      }
      cursor: pointer;
      transition: all 0.3s;
      background-color: #FFF;
      border-radius: 5px;
      &:hover {
        transform: scale(1.1);
        box-shadow: 0px 0px 5px 5px rgba(255,255,255,.3);
      }
    }
  }
  .article {
    padding: 15px;
    border-radius: 10px;
    font-size: 12px;
    background-color: #FFF;
    
  }
  .article :deep(.ant-tabs-tab) {
    font-size: 12px;
  }
  .article .ant-tabs-tabpane {
    display: flex;
    flex-direction: column;
    border-radius: 10px;
    overflow-y: scroll;
    h3 {
      margin-bottom: 10px;
    }
    .a-info {
      display: flex;
      align-items: center;
      font-size: 12px;
      .a-info_time {
        padding: 0 5px;
        color: #999;
      }
    }
    .routerLink {
      font-weight: bold;
      padding: 5px;
      transition: all 0.3s ease-in-out 0.1s;
      &:hover {
        padding-left: 20px;
      }
    }
  }
}
</style>
