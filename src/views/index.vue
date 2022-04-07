<template>
  <div class="home">
    <a-row>
      <a-col :span="24" :lg="24">
        <a-skeleton :loading="loading" active>
          <div class="article">
            <a-tabs v-model:activeKey="activeKey" >
              <a-tab-pane v-for="item in articleList" :key="item.type" :tab="item.type" @tabClick="tabClick(item)">
                <router-link
                  class="routerLink"
                  v-for="(it, id) in item.children" 
                  :to="`${it.path}`" 
                  :style="id % 2 === 0 ? '' : 'background-color: rgba(0,0,0,.01);' "
                >{{it.meta}}</router-link>
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
import { ref } from 'vue'
import { deepRouter } from '../util/index'

export default {
  data () {
    return {
      articleList: [],
      loading: true,
      activeKey: ref('前端'),
      notesType: [
        {
          name: '前端',
          route: ''
        },
        {
          name: '后端',
          route: ''
        },
        {
          name: 'Linux',
          route: ''
        }
      ]
    }
  },
  created() {
    this.articleList = deepRouter(this.$router.options.routes[1].children, '/article')
    console.log(deepRouter(this.$router.options.routes[1].children, '/article'))
  },
  mounted() {
    this.loading = false
  },
  methods: {
    tabClick (item) {
      this.activeKey = item.type
    }
  }
}
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
    .routerLink {
      font-size: 16px;
      font-weight: bold;
      padding: 5px;
      transition: all 0.3s ease-in-out .1s;
      &:hover {
        padding-left: 20px;
      }
    }
  }
}

</style>
