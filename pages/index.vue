<template>
    <div class="home">
      <div class="home-search">
        <select name="home-search-select" id="home-search-select" v-model="currentBrowser" >
          <option :value="item.key" v-for="item in browserList" :key="item.key">{{item.value}}</option>
        </select>
        <input type="text" v-model="searchText">
        <button @click="searchBtn">搜 索</button>
      </div>
    </div>
</template>

<script setup lang="ts">
  import { useHead } from 'unhead'
  import { browserList } from '../mock/home'

  const searchText = ref<string>('')
  const currentBrowser = ref<string>('google')

  useHead({
    title: 'Home'
  })

  const searchBtn = () => {
      const url = browserList.filter(item => item.key === currentBrowser.value)[0].search
      window.open(url(currentBrowser.value), '_blank')
    }
</script>

<style scoped lang="less">
.home {
  width: 100%;
  min-height: 100vh;
  padding: 30px;
  display: grid;
  place-items: center;
  background-color: var(--g-bg-color-1);
  box-sizing: border-box;
  &-search {
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
      box-sizing: border-box
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
}

</style>
