<template>
  <div class="website">
    <div class="website-box" v-for="item in config" :key="item.type">
      <h2>{{ item.type }}</h2>
      <div class="website-box-item">
        <a
          :href="child.url"
          v-for="child in item.list"
          :key="child.title"
          target="_blank"
        >
          <img :src="child.img" loading="lazy" />
          <h4>{{ child.title }}</h4>
        </a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import config from "../../mock/website.ts";
// const config = ref([])

useHead({
  title: "Website navigation",
});

onBeforeMount(async () => {
  const result = await $fetch("/api/website");
  console.log(result);
});
</script>

<style lang="less" scoped>
.website {
  padding: 15px;
  color: var(--g-primary-text);
  background-color: var(--g-bg-color);
  &-box {
    margin: 50px 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    h2 {
      padding-bottom: 10px;
    }

    &-item {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
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

        background-color: var(--g-border-color-1);
        border-radius: var(--g-border-raduis);
        box-sizing: border-box;
        transition: all 0.3s;
        &:hover {
          border-top: 1px solid var(--g-border-color);
          border-bottom: 1px solid var(--g-border-color);
        }
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
          font-size: var(--g-font-size);
          font-weight: 300;
          text-align: center;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          box-sizing: border-box;
        }
      }
    }
  }
}
</style>
