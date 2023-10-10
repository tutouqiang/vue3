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

</script>

<style scoped lang="css">
.w-menu {
  position: relative;
  padding: 0 10px;
  width: 100%;
  height: 40px;
  display: flex;
  border-radius: 3px;
  background-color: var(--g-primary-color);
  overflow: hidden;
  transition: all 0.3s;
  z-index: 100;
}

.w-menu-item {
  width: 40px;
  height: 40px;
  display: grid;
  place-items: center;
  background-color: var(--g-primary-color);
  cursor: pointer;
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
