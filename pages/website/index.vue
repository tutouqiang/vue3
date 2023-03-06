<template>
    <div class="website">
      <div class="website-box" v-for="item in config" :key="item.type">
        <h2>{{item.type}}</h2>
        <div class="website-box-item">
          <a :href="child.url" v-for="child in item.list" :key="child.title" target="_blank">
            <img :src="child.img" loading="lazy">
            <h4>{{ child.title }}</h4>
          </a>
        </div>
      </div>
    </div>
</template>

<script setup lang="ts">
import config from './config'

useHead({
  title: 'Website navigation'
})
</script>

<style lang="less" scoped>
.website {
  padding: 15px;
  color: var(--g-primary-text);
  background-color: var(--g-bg-color-1);
  &-box {
    margin: 50px 0;
    h2 {
      padding-bottom: 10px;
    }

    &-item {
      display: grid;
      grid-template-columns: repeat(auto-fill, 100px);
      grid-template-rows: repeat(auto-fill, 100px);
      gap: 20px;
      a {
        position: relative;
        padding: 5px;
        width: 100px;
        height: 100px;
        display: grid;
        place-items: center;
        color: var(--g-primary-text);
        text-decoration: none;
        font-size: var(--g-font-size);
        border: 1px solid var(--g-primary-text);
        border-radius: var(--g-border-raduis);
        img {
          position: absolute;
          top: 10px;
          width: 30px;
        }
        h4 {
          margin: 0;
          position: absolute;
          bottom: 0;
          width: 100%;
          height: 30px;
          padding: 0 5px;
          text-align: center;
          overflow:hidden;
          text-overflow:ellipsis;
          white-space:nowrap;
          box-sizing: border-box;
        }
      }
      
    }
  }
}
</style>
