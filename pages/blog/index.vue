<template>
  <div class="blog">
    <div class="blog-type">
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
      </div>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  const blogList = ref()

  useHead({
    title: 'Blog'
  })

  onBeforeMount(() => {
    getBlogData()
  })

  const getBlogData = async () => {
    const result = await $fetch('/api/blogData')
    console.log('getBlogData', result)
    blogList.value = result.blogData
  }

  
</script>

<style scoped lang="less">
.blog {
  width: 100%;
  min-height: 100vh;
  padding: 30px;
  display: grid;
  place-items: center;
  background-color: var(--g-bg-color-1);
  box-sizing: border-box;
  &-type {
    // width: 1000px;
    display: grid;
    grid-template-columns: repeat(auto-fill, 300px);
    grid-gap: 20px;
    grid-auto-flow: row dense;

    &-card {
      padding: 0 15px 15px;
      border-radius: var(--g-border-raduis);
      box-shadow: var(--g-box-shadow-2);
      overflow-y: auto;
      border: 1px solid var(--g-primary-text);
      box-sizing: border-box;

      a {
        color: var(--g-primary-text);
        text-decoration: none;
        h3 {
          margin: 0;
          padding: 5px 0;
          font-size: 14px;
          font-weight: 300;
          transition: all .5s;
        }
      }

      &-title {
        position: sticky;
        top: 0;
        padding: 15px;
        color: var(--g-primary-text);
        background-color: var(--g-bg-color-1);
      }

      &-item {
        transition: all .5s;
        &:hover {
          padding-left: 15px;
          background-color: rgba(255,255,255,.2); 
          border-radius: var(--g-border-raduis);
        }
      }
    }
  }
}


</style>
