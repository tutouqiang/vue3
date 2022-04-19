<template>
  <!--导航网站-->
  <div class="website" v-if="!loading">
    <a-row>
    <a-col :span="24" :lg="21" :xl="22">
    <template v-for="list in websiteList" :key="list.type">
      <div class="webSiteType" :id="list.type">{{list.type}}</div>
      <div class="content">
        <div class="webSiteInfo" @click="jump(item.url)" v-for="item in list.list" :key="item.title">
          <a-popover>
            <div style="text-align: center">
              <img 
                class="img" 
                loading="lazy" 
                :src="item.img || 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'" 
                :onerror="onerror" alt="木有图片"
                :style="`background-color: ${item.bgc || '#fff'}`"
              />
              <div class="title">{{item.title}}</div>
              <div class="desc">{{item.desc}}</div>
            </div>
            <template #title>{{item.title}}</template>
            <template #content>{{item.desc}}</template>
          </a-popover>
        </div>
      </div>
    </template>
    </a-col>
    <a-col :lg="3" :xl="2" :span="0">
      <a-anchor :offsetTop="64" @click="(e) => e.preventDefault()">
        <a-anchor-link
          v-for="list in websiteList" :key="list.type"
          :href="'#' + list.type"
          :title="list.type"
        />
      </a-anchor>
    </a-col>
    </a-row>
  </div>
</template>
<script>
import websiteList from './webSite'
export default {
  
  data () {
    return {
      websiteList: websiteList
    }
  },
  mounted() {
  },
  methods: {
    jump (url) {
      window.open(url, '_blank')
    },
    onerror (e) {
      console.log(e.target.src);
      
    }
  }
}
</script>
<style lang="less" scoped>
.website {
  margin-bottom: 50px;
  .webSiteType {
    padding: 30px 0 30px;
    font-size: 20px;
    font-weight: bold;  
  }
  .content {
    display: grid;
    grid-template-columns: repeat(auto-fill, 150px);
    grid-template-rows: repeat(auto-fill, 100px);
    grid-gap: 20px;
    justify-content: center;
    .webSiteInfo {
      width: 150px;
      height: 100px;
      display: grid;
      place-items: center;
      background-color: #fff;
      border-radius: 5px;
      box-shadow:  
             0px 0px 10px rgba(0,0,0,.1);
      cursor: pointer;
      transition: all 0.3s;
      &:hover {
        border-radius: 15px;
        transform: translateY(-15px) scale(1.05);
      }
      .popover {
        text-align: center!important;
      }
      .img {
        width: 35px;
        height: 35px;
        object-fit: scale-down;
      }
      .desc {
        width: 90px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }
  }
}
</style>
