<template>
  <div class="home">
    <div class="home-search">
      <select name="home-search-select" id="home-search-select" v-model="currentBrowser">
        <option :value="item.key" v-for="item in browserList" :key="item.key">
          {{ item.value }}
        </option>
      </select>
      <input type="text" v-model="searchText" />
      <button @click="searchBtn">搜 索</button>
    </div>
    <div class="home-web">
      <a
        class="home-web-item"
        v-for="item in favoriteApps"
        :key="item.name"
        :href="item.url"
        target="_blank"
      >
        <div class="home-web-logo">
          <img :src="item.img" :style="item.style" />
          <div class="home-web-desc">{{ item.desc }}</div>
        </div>
        <span>{{ item.name }}</span>
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useHead } from "unhead";
import { browserList, favoriteApps } from "../mock/home";

const searchText = ref<string>("");
const currentBrowser = ref<string>("google");

useHead({
  title: "Home",
});

onBeforeMount(async () => {
    const data = await useFetch('/api/website')
    console.log(data)
  })

const searchBtn = () => {
  const url = browserList.filter((item) => item.key === currentBrowser.value)[0].search;
  window.open(url(currentBrowser.value), "_blank");
};
</script>

<style scoped lang="less">
.home {
  width: 100%;
  min-height: 100vh;
  padding: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: var(--g-bg-color-1);
  box-sizing: border-box;
  &-search {
    margin: 30px;
    display: flex;
    select {
      width: 60px;
      height: 40px;
      option {
        text-align: center;
      }
    }
    input {
      width: 200px;
      height: 40px;
      box-sizing: border-box;
    }
    button {
      width: 60px;
      height: 40px;
      color: var(--g-primary-text);
      background-color: var(--g-primary-color);
      border: none;
      font-size: var(--g-font-size);
      border-radius: 0 var(--g-border-raduis) var(--g-border-raduis) 0;
      cursor: pointer;
    }
  }

  &-web {
    max-width: 600px;
    min-width: 300px;
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
    }
    &-logo {
      position: relative;
      width: 100%;
      height: 70px;
      border-radius: 5px;
      overflow: hidden;
      transition: all 0.3s;
      &:hover {
        .home-web-desc {
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

    .home-web-desc {
      position: relative;
      padding: 5px;
      width: 100%;
      height: 100%;
      box-sizing: border-box;
      color: #000;
      background-color: #fff;
      opacity: .9;
      transition: all .3s;
    }
  }
}
</style>
