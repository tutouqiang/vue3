<template>
  <div class="blog">
    <template v-for="item in blogList" :key="item">
      <NuxtLink :to="`/blog${item.path}`" class="link">
        <div class="blog-item">
          <div class="blog-item-name">
            {{ item.title }}
          </div>
          <div class="blog-item-type">
            {{ item.blogType }}
          </div>
          <div class="blog-item-date">
            {{ item.createTime }}
          </div>
        </div>
      </NuxtLink>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const blogList = ref();

onBeforeMount(async () => {
  getBlogData();
});

const getBlogData = async () => {
  const result = await $fetch("/api/blogData");
  let list: any[] = [];
  result.blogData.forEach((item) => {
    list = [...list, ...item.blogList];
  });
  blogList.value = list;
};
</script>

<style lang="less" scoped>
.blog {
  width: 100%;
  &-item {
    padding: 5px 10px;
    display: flex;
    justify-content: space-between;
    color: #fff;
    font-size: 12px;
    transition: all 0.5s;
    &:hover {
      padding-left: 15px;
      background-color: rgba(255, 255, 255, 0.2);
      border-radius: var(--g-border-raduis);
    }
    &-name {
      flex: 3;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    &-type {
      flex: 1;
      flex-shrink: 0;
      padding: 0 5px;
      width: 50px;
    }
    &-date {
      flex: 1.5;
      flex-shrink: 0;
      padding: 0 5px;
      width: 120px;
      text-align: right;
    }
  }

  .link {
    text-decoration: none;
  }
}
</style>
