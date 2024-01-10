<template>
  <div class="not_found">
    <div class="not_found-box">
      <div class="desc">The page does not exist.</div>
      <div class="action">
        <button @click="jump('Home')">Home Page</button>
        <button @click="jump('Pre')">Previous page</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();

const jump = (type: string) => {
  if (type === "Home") {
    router.push("/");
  } else if (type === "Pre") {
    router.go(-1);
  }
};
</script>

<style lang="scss" scoped>
.not_found {
  width: 100%;
  height: 100%;
  display: grid;
  place-items: center;
  color: var(--g-primary-text);
  &-box {
    display: grid;
    gap: 20px;
    .desc {
      text-align: center;
    }
    .action {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 10px;
      button {
        width: 110px;
      }
    }
  }
}
</style>
