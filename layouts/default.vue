<template>
  <div class="layout">
    <header class="layout-header">
      <h1 class="logo"><NuxtLink to="/">WOOC</NuxtLink></h1>
      <MenuLayout class="layout-header-menu" :menu="menu" />
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
    label: "Home",
  },
  {
    index: "2",
    route: "/website",
    label: "Website",
  },
  {
    index: "3",
    route: "/blog",
    label: "Blog",
  },
  {
    index: "4",
    route: "/tools",
    label: "Tools",
  },
];
</script>

<style>
.layout {
  display: flex;
  flex-direction: column;
  background-color: var(--g-bg-color);
}

.layout-header {
  position: fixed;
  top: 0px;
  left: 0px;
  padding: 0 20px;
  width: 100vw;
  height: 40px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  background-color: var(--g-bg-color);
  box-sizing: border-box;
  transition: all 0.3s;
  z-index: 100;
}

.logo {
  margin: 0;
  line-height: 40px;
}
.logo a {
  font-size: var(--g-font-size);
  color: var(--g-primary-text);
  text-decoration: none;
}

.layout-section {
  margin-top: 40px;
  min-height: calc(100vh - 40px);
  height: auto;
}
</style>
