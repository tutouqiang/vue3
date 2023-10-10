<template>
  <div class="favorite">
    <a
      class="favorite-item"
      v-for="item in favoriteApps"
      :key="item.name"
      :href="item.url"
      target="_blank"
    >
      <div class="favorite-item-logo">
        <img :src="item.img" :style="item.style" />
        <div class="favorite-item-desc">{{ item.desc }}</div>
      </div>
      <span>{{ item.name }}</span>
    </a>
  </div>
</template>

<script setup lang="ts">
import { favoriteApps } from "../mock/home";

const blogList = ref();

onBeforeMount(async () => {
  getBlogData();
});

const getBlogData = async () => {
  const result = await $fetch("/api/blogData");
  blogList.value = result.blogData;
};
</script>

<style scoped lang="less">
.favorite {
  display: grid;
  grid-template-columns: repeat(auto-fill, 70px);
  grid-template-rows: repeat(auto-fill, 70px);
  gap: 30px;
  font-size: 12px;
  &-item {
    width: 70px;
    height: 70px;
    text-decoration: none;
    span {
      margin-top: 5px;
      display: block;
      width: 100%;
      text-align: center;
      color: #fff;
    }
    &-logo {
      position: relative;
      width: 100%;
      height: 70px;
      border-radius: 5px;
      overflow: hidden;
      transition: all 0.3s;
      &:hover {
        .favorite-item-desc {
          margin-top: -75px;
          background-color: #fff;
        }
      }
      img {
        width: 100%;
        height: 70px;
        box-sizing: border-box;
        transition: all 3s;
      }
    }

    &-desc {
      position: relative;
      padding: 5px;
      width: 100%;
      height: 75px;
      box-sizing: border-box;
      color: #000;
      background-color: #fff;
      opacity: 0.9;
      transition: all 0.3s;
    }
  }
}
</style>
