<template>
  <div :class="{'w-menu': true, 'w-menu-rotate-1': open, 'w-menu-rotate-2': !open}" @click="clickmenu()">
    <div class="w-menu-item" v-for="(item, index) in props.menu" :style="computeMenuItemStyle(index)">
      <NuxtLink :to="item.route">
        {{ item?.label }}
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
  const props = defineProps({
    menu: { type: Array, required: true }
  })

  let open = ref(true)

  onMounted(() => {
    console.log(props.menu)
  })

  const clickmenu = () => {
    open.value = !open.value
    console.log(open.value)
  }

  const computeMenuItemStyle = (index: number) => {
    if(open.value) {
      return {
        top: `${-50 * (index + 1)}px`,
        transition: 'all 3s',
        display: 'grid'
      }
    } else {
      return {
        display: 'none'
      }
    }
  }
</script>

<style scoped lang="css">
.w-menu {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: var(--g-primary-color);
  cursor: pointer;
  transition: all 0.3s;
  z-index: 10;
}

.w-menu::before {
  width: 100%;
  height: 100%;
  display: grid;
  content: '+';
  place-items: center;
  color: #fff;
  font-size: 25px;
}

.w-menu:hover {
  box-shadow: 0 0 5px var(--g-primary-color);
}

.w-menu:hover .w-menu::before {
  font-size: 30px;
}

.w-menu-item {
  position: absolute;
  width: 50px;
  height: 50px;
  display: grid;
  place-items: center;
  transition: all 3s;
  z-index: 1;
}

.w-menu-item a {
  color: var(--g-primary-color);
  text-decoration: none;
}

.w-menu-rotate-1 {
  transform: rotate(360deg);
}

.w-menu-rotate-2 {
  transform: rotate(180deg);
}
</style>
