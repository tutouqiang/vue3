<template>
  <div class="layout">
    <slot />
    <MenuLayout class="layout-menu" :menu="menu" />
  </div>
</template>

<script setup lang="ts">
import MenuLayout from '@/components/menu.vue'

const menu: Record<string, string>[] = [
  {
    route: '/',
    label: '首页',
    icon: '',
    title: 'Wooc‘s blog home page.',
  },
  {
    route: '/website',
    label: '导航',
    icon: '',
    title: 'Website navigation',
  },
  {
    route: '/blog',
    label: '博客',
    icon: '',
    title: 'Wooc’s blog post',
  }
]
</script>

<style>
.layout-menu {
  position: fixed;
  bottom: 10px;
  right: 10px;
  transition: all .3s;
}
</style>
