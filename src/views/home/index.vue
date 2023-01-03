<template>
  <div class="home">
    <a-row>
      <a-col :span="5" :lg="4" :offset="0" :md="3" :sm="2" :xs="1" style="display: grid; justify-content: right">
      </a-col>
      <a-col :span="14" :lg="16" offset=”0“ :md="18" :sm="20" :xs="22" style="display: grid; align-items: center;">
        <a-input-group compact size="large" class="searchInput">
          <a-select v-model:value="currentBrowser" size="large" >
            <a-select-option :value="item.key" v-for="item in browserList" :key="item.value" style="height: 50px">
              <div style="display: flex; align-items: center; height: 50px">{{item.value}}
                <img :src="item.img" alt="" style="width: 15px; margin-left: 5px">
              </div>
            </a-select-option>
          </a-select>
          <a-input v-model:value="searchText" @pressEnter="searchBtn" placeholder="输入搜索内容" allowClear size="large" style="max-width:500px; height: 50px" />
          <a-button type="primary" size="large" @click="searchBtn" style="height: 50px">
            搜索
            <template #icon><SearchOutlined /></template>
          </a-button>
        </a-input-group>
      </a-col>
      <a-col :span="5" :lg="4" :md="3" :sm="2" :xs="1" style="display: grid; justify-content: right">
        <!-- <WeiboPage /> -->
      </a-col>
    </a-row>

    <a-row>
      <a-col :span="5" :lg="4" :offset="0" :md="3" :sm="2" :xs="1" style="display: grid; justify-content: right">
      </a-col>
      <a-col :span="14" :lg="16" offset=”0“ :md="18" :sm="20" :xs="22" style="display: flex; align-items: center; justify-content: center">
        <div class="app">
          <a :href="item.url" target="_blank" v-for="item in favoriteApps" :key="item.name" :style="item.style">
            <img :src="item.img" :alt="item.name" :class="item.imgSize ? 'img_one' : 'img_two'">
            <span>{{item.name}}</span>
          </a>
        </div>
      </a-col>
      <a-col :span="5" :lg="4" :md="3" :sm="2" :xs="1" style="display: grid; justify-content: right">
        <!-- <WeiboPage /> -->
      </a-col>
    </a-row>

    <a-row :gutter="16" style="padding-top: 60px;">
      <a-col :span="5" :lg="4" :md="3" :sm="2" :xs="1" style="display: grid; justify-content: right">
      </a-col>
      <a-col :span="14" :lg="16" :md="18" :sm="20" :xs="22" style="display: flex; justify-content: center">
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
      <!-- <a-col :span="5" :lg="5" style="display: grid; justify-content: right"> -->
        <!-- <WeiboPage /> -->
      <!-- </a-col> -->
    </a-row>
  </div>
</template>
<script>
import { ref } from "vue";
import { SearchOutlined } from '@ant-design/icons-vue'
import { deepRouter } from "@/utils/index";
import { WeiboPage } from '@/components'
import { favoriteApps, browserList, notesType } from './index'

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
      browserList,
      notesType,
      favoriteApps
    };
  },
  created() {
    this.articleList = deepRouter(this.$router.options.routes[1].children, "/article");
    let activeKey = sessionStorage.getItem("tabs-activeKey");
    if (activeKey !== null) {
      this.activeKey = activeKey;
    }
  },
  mounted() {
    this.loading = false;
  },
  beforeUnmount() {
    sessionStorage.setItem("tabs-activeKey", this.activeKey);
  },
  methods: {
    searchBtn(){
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
@import '@/assets/styles/theme.less';
.home {
  margin: 0 auto;
  padding: 15px;
  .searchInput {
    display: flex;
    padding: 100px 0 30px;
    justify-content: center;
    :deep(.ant-select-selector) {
      height: 50px;
    }
  }
  .app {
    width: 100%;
    display: grid;
    // grid-template: repeat(50px);
    grid-template-columns: repeat(auto-fill, 70px);
    grid-template-rows: repeat(auto-fill, 70px);
    justify-content: center;
    grid-gap: 30px;
    font-size: 12px;
    max-width: 700px;
    a {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 70px;
      height: 70px;
      color: @text-color;
      .img_two {
        width: 70px;
        min-height: 70px;
        margin-bottom: 5px;
        border-radius: 5px;
      }
      .img_one {
        padding: 5px;
        width: 70px;
        min-height: 70px;
        border-radius: 5px;
        margin-bottom: 5px;

      }
      span {
        white-space:nowrap;
      }
      cursor: pointer;
      transition: all 0.3s;
      border-radius: 5px;
      &:hover {
        transform: scale(1.1);
        box-shadow: 0px 0px 5px 5px rgba(255,255,255,.3);
      }
    }
  }
  .article {
    flex: 1;
    padding: 15px;
    border-radius: 10px;
    font-size: 12px;
    background-color: #FFF;
    max-width: 700px;
    
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
      color: @text-color;
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
