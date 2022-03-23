<template>
  <!--导航网站-->
  <div class="website">
    <template v-for="list in websiteList" :key="list.type">
      <div class="webSiteType">{{list.type}}</div>
      <div class="content">
        <div class="webSiteInfo" @click="jump(item.url)" v-for="item in list.list" :key="item.title">
          <img class="img" :src="item.img"  />
          <div class="title">{{item.title}}</div>
          <div class="desc">{{item.desc}}</div>
        </div>
      </div>
    </template>
      
  </div>
</template>
<script lang="ts">
import websiteList, { webList } from './webSite'
export default {
  
  data () {
    return {
      websiteList: websiteList
    }
  },
  methods: {
    jump (url: string) {
      window.open(url, '_blank')
    }
  }
}
</script>
<style lang="less" scoped>
.website {
  .webSiteType {
    padding: 30px 0 30px;
    font-size: 20px;
    font-weight: bold;  
  }
  .content {
    display: grid;
    grid-template-columns: repeat(auto-fill, 100px);
    grid-template-rows: repeat(auto-fill, 100px);
    grid-gap: 20px;
    .webSiteInfo {
      height: 100px;
      display: grid;
      place-items: center;
      background-color: #fff;
      border-radius: 10px;
      box-shadow: 0 0 10px rgba(0,0,0,.1);
      cursor: pointer;
      transition: all 0.3s;
      &:hover {
        transform: scale(1.1);
        box-shadow: -5px 15px 10px rgb(0 0 0 / 10%);
      }
      .img {
        width: 35px;
        height: 35px;
        object-fit: scale-down
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
