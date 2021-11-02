<!-- 地理围栏 -->
<template>
  <div class="geofence">
    {{$t('title')}}
  </div>
</template>

<script lang="ts">
import { onMounted, toRefs, reactive } from 'vue'
export default {
  setup() {
    const state = reactive({
      // home: t('home.go')
    })
    onMounted(() => {
      
    })
    return { onMounted, ...toRefs(state) }
  }
}
</script>

<style scope lang="less">

</style>