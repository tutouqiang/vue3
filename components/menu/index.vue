<template>
  <div class="w-menu" @click="clickmenu()">
    <!-- <div class="w-menu-icon">三</div> -->
    <div class="w-menu-item" v-for="(item, index) in props.menu" :key="item.route">
      <NuxtLink :to="item.route">
        {{ item?.label }}
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
// import { MenuType } from '#build/components';
import type { MenuType } from "./type";

const props = defineProps<{
  menu: MenuType;
}>();

let open = ref(true);

onMounted(() => {
  console.log(props.menu);
});

const clickmenu = () => {
  open.value = !open.value;
  console.log(open.value);
};
</script>

<style scoped lang="css">
.w-menu {
  position: relative;
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: flex-end;
  overflow: hidden;
  transition: all 0.3s;
  z-index: 100;
}

.w-menu-item {
  padding: 0 10px;
  height: 40px;
  display: grid;
  place-items: center;
  cursor: pointer;
  border-radius: var(--g-border-raduis);
  transition: all 0.3s;
  box-sizing: border-box;
}

.w-menu-item:hover {
  background-color: var(--g-border-color-1);
  border-bottom: 1px solid var(--g-border-color);
}

.w-menu-item a {
  color: var(--g-primary-text);
  text-decoration: none;
  font-size: var(--g-font-size);
}

.w-menu-rotate-1 {
  transform: rotate(360deg);
}

.w-menu-rotate-2 {
  transform: rotate(180deg);
}
</style>
