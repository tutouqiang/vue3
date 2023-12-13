<template>
  <div class="blog">
    <BlogListComponent />
    <!-- <div class="blog-type">
        <div class="blog-type-card" v-for="item in blogList" :key="item.mdPath">
          <div class="blog-type-card-title">{{ item.type }}</div>
            <div class="blog-type-card-item" v-for="article in item.blogList" :key="article.path">
              <NuxtLink :to="`/blog${article.path}`">
                <h3>
                  {{ article.title }}
                </h3>
              </NuxtLink>
            </div>
        </div>
      </div> -->
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import BlogListComponent from "@/components/blog.vue";

const blogList = ref();

useHead({
  title: "Blog",
});

onBeforeMount(() => {
  getBlogData();
});

const getBlogData = async () => {
  const result = await $fetch("/api/blogData");
  blogList.value = result.blogData;
};
</script>

<style scoped lang="less">
.blog {
  width: 100%;
  height: 100%;
  padding: 10px;
  background-color: var(--g-bg-color);
  box-sizing: border-box;
}
</style>
