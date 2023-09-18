<template>
  <div class="w-menu" @click="clickmenu()">
    <div class="w-menu-icon">三</div>
    <div class="w-menu-item" v-for="(item, index) in props.menu" :style="computeMenuItemStyle(index)" :key="item.route">
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
        marginTop: index === 0 ? '40px' : '0px',
        transition: 'all 0.3s',
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
  position: relative;
  width: 40px;
  min-height: 40px;
  border-radius: 3px;
  background-color: var(--g-primary-color);
  cursor: pointer;
  overflow: hidden;
  transition: all 0.3s;
  z-index: 100;
}

.w-menu-icon {
  position: absolute;
  top: 0;
  left: 0;
  width: 40px;
  height: 40px;
  display: grid;
  place-items: center;
  color: #fff;
  font-size: 18px;
}


.w-menu-item {
  width: 40px;
  height: 40px;
  display: grid;
  place-items: center;
  background-color: var(--g-primary-color);
  transition: all 0.3s;
  z-index: 100;
}

.w-menu-item:hover {
  background-color: rgba(0,0,0,.2);
}

.w-menu-item a {
  color: #fff;
  text-decoration: none;
  font-size: 12px;
}

.w-menu-rotate-1 {
  transform: rotate(360deg);
}

.w-menu-rotate-2 {
  transform: rotate(180deg);
}
</style>
