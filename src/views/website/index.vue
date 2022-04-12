<template>
  <!--导航网站-->
  <div class="website" v-if="!loading">
    <template v-for="list in websiteList" :key="list.type">
      <div class="webSiteType">{{list.type}}</div>
      <div class="content">
        <div class="webSiteInfo" @click="jump(item.url)" v-for="item in list.list" :key="item.title">
          <img 
            class="img" 
            loading="lazy" 
            :src="item.img || 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'" 
            :onerror="onerror" alt="木有图片"
            :style="`background-color: ${item.bgc || '#fff'}`"/>
          <div class="title">{{item.title}}</div>
          <div class="desc">{{item.desc}}</div>
        </div>
      </div>
    </template>
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
  // padding: 0 20px;
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
