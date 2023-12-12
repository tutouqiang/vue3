<template>
  <div class="layout">
    <header class="layout-header">
      <MenuLayout class="layout-header-menu" :menu="menu" />
      <!-- <SearchInput /> -->
    </header>
    <section class="layout-section"><slot /></section>
    <footer></footer>
  </div>
</template>

<script setup lang="ts">
import MenuLayout from "@/components/menu/index.vue";
import type { MenuType } from "@/components/menu/type.ts";

const menu: MenuType = [
  {
    index: "1",
    route: "/",
    label: "首页",
  },
  {
    index: "12",
    route: "/website",
    label: "导航",
  },
  // {
  //   route: "/blog",
  //   label: "博客",
  //   icon: "",
  //   title: "Wooc’s blog post",
  // },
];
</script>

<style>
.layout {
  display: flex;
  flex-direction: column;
  background-color: var(--g-bg-color-1);
}
.layout-header {
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100vw;
  height: 60px;
  padding: 10px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  box-sizing: border-box;
  transition: all 0.3s;
  z-index: 100;
}

.layout-section {
  /* margin-top: 70px; */
}
</style>
