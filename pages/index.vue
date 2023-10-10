<template>
  <div class="home">
    <div class="home-blog">
      <BlogListComponent />
    </div>
    <div class="home-favorite">
      <FavoriteComponent />
    </div>
    
  </div>
</template>

<script setup lang="ts">
import FavoriteComponent from '@/components/favorite.vue'
import BlogListComponent from '@/components/blog.vue'
import { useHead } from "unhead";

useHead({
  title: "Home",
});

</script>

<style scoped lang="less">
.home {
  position: relative;
  margin: 60px 10px 10px;
  min-height: calc(100vh - 70px);
  display: flex;
  justify-content: space-between;
  // align-items: center;
  box-sizing: border-box;

  &-blog {
    flex: 1;
    margin-right: 10px;
    padding: 10px;
    // height: 290px;
    border: 1px solid var(--g-primary-color);
    border-radius: 5px;
    overflow-x: scroll;
  }

  &-favorite {
    padding: 10px;
    width: 270px;
    // height: 290px;
    border: 1px solid var(--g-primary-color);
    border-radius: 5px;
    overflow-x: scroll;
  }
}
</style>
