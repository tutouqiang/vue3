<template>
  <div class="home">
    <a-row :gutter="[30,16]">
      <a-col :span="24" :lg="18">
        <div class="article">
          <h3>所有文章</h3>
          <router-link
            class="routerLink"
            v-for="(item, index) in articleList" 
            :to="`${item.path}`" 
            :style="index % 2 === 0 ? '' : 'background-color: rgba(0,0,0,.01);' "
          >{{item.meta}}</router-link>
        </div>
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
import { deepRouter } from '../util/index'

export default {
  data () {
    return {
      articleList: [],
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
  },
  mounted() {
  },
  methods: {
  }
}
</script>
<style lang="less" scoped>
.home {
  /* background-color: #FFFFEE; */
  margin: 0 auto;
  .notesType, .article {
    display: flex;
    flex-direction: column;
    padding: 20px;
    border-radius: 10px;
// background: linear-gradient(145deg, #ffffff, #e6e5d6);
// box-shadow: inset 5px 5px 10px #e8e7d9,
//             inset -5px -5px 10px #ffffff;
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
