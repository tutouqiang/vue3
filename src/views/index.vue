<template>
  <div class="home">
    <a-row>
      <a-col :span="24" :lg="24">
        <a-skeleton :loading="loading" active>
          <div class="article">
            <a-tabs v-model:activeKey="activeKey">
              <a-tab-pane
                v-for="item in articleList"
                :key="item.type"
                :tab="item.type"
                @tabClick="tabClick(item)"
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
      <!-- <a-col :span="0" :lg="6"> 
        <div class="notesType">
          <h3>文章分类</h3>
          <router-link 
            class="routerLink"
            v-for="item in notesType" 
            :key="item.name" 
            :to="item.route"
          >{{item.name}}</router-link>
        </div>
      </a-col> -->
    </a-row>
  </div>
</template>
<script>
import { ref } from "vue";
import { deepRouter } from "../util/index";

export default {
  data() {
    return {
      articleList: [],
      loading: true,
      activeKey: ref("前端"),
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
    tabClick(item) {
      this.activeKey = item.type;
    },
  },
};
</script>
<style lang="less" scoped>
.home {
  margin: 0 auto;
  .article .ant-tabs-tabpane {
    display: flex;
    flex-direction: column;
    border-radius: 10px;
    h3 {
      margin-bottom: 10px;
    }
    .a-info {
      display: flex;
      align-items: center;
      .a-info_time {
        padding: 0 5px;
        color: #999;
      }
    }
    .routerLink {
      font-size: 16px;
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
