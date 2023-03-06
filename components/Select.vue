<template>
  <select class="w-select" >
    <option :value="item.value" v-for="(item, index) in props.data" :key="index">{{item.label}}</option>
  </select>
</template>

<script setup lang="ts">
  interface SelectProps {
    data: {label: string, value: unknown}[]
  }
  const props = defineProps<SelectProps>()
  const isSlot = ref(false)
  onBeforeMount(() => {
    
  })
</script>

<style lang="less" scoped>
  
</style>
