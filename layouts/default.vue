<template>
  <div class="layout">
    <header class="layout-header">
      <MenuLayout class="layout-header-menu" :menu="menu" />
    </header>
    <section class="layout-section"><slot /></section>
    <footer></footer>
  </div>
</template>

<script setup lang="ts">
import MenuLayout from "@/components/menu.vue";

const menu: Record<string, string>[] = [
  {
    route: "/",
    label: "首页",
    icon: "",
    title: "Wooc‘s blog home page.",
  },
  {
    route: "/website",
    label: "导航",
    icon: "",
    title: "Website navigation",
  },
  {
    route: "/blog",
    label: "博客",
    icon: "",
    title: "Wooc’s blog post",
  },
];
</script>

<style>
.layout {
  display: flex;
  flex-direction: column;
}
.layout-header {
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100vw;
  height: 60px;
  padding: 0 15px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  box-sizing: border-box;
  transition: all 0.3s;
}

.layout-header-menu {
  position: absolute!important;
  right: 20px;
  top: 10px;
}
</style>
