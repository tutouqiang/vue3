<template>
  <div class="home">Please click right-top menu.</div>
</template>

<script setup lang="ts">
import { useHead } from "unhead";

useHead({
  title: "Home",
});
</script>

<style scoped lang="less">
.home {
  position: relative;
  padding: 10px;
  height: calc(100vh - 40px);
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  color: var(--g-primary-text);
  box-sizing: border-box;
}

@media screen and (max-width: 800px) {
  .home {
    &-favorite {
      padding: 0px;
      width: 0px;
      display: none;
      border: none;
    }
  }
}
</style>
