<template>
  <div class="showTime">
    <div class="box">
      <div>{{ ymd }}</div>
      <div style="textAlign: center">{{ hms }}</div>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs, onMounted, onUnmounted } from 'vue'
import { DateFormat } from '@wooc/brokenwheel'
export default {
  setup () {
    const state = reactive({
      ymd: '',
      hms: '',
      timer: '',
    })

    function getTime (time) {
      let t = time
      state.timer = setInterval(() => {
        state.ymd = DateFormat(t, 'YY年MM月DD日')
        state.hms = DateFormat(t, 'H:M:S')
        t += 1000
      }, 1000);
      
    }

    onMounted(() => {
      const time = new Date().getTime()
      getTime(time)
    })

    onUnmounted(() => {
      clearInterval(state.timer)
    })
    
    return {getTime, onMounted, reactive, ...toRefs(state)}
  }
}
</script>

<style>
.showTime {
  display: grid;
  place-items: center;
  width: 100vw;
  height: 100vh;
  background-color: #000;
  font-size: 100px;
  color: #fff;
}
</style>