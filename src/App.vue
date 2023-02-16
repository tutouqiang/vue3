<template>
    <Header />
    <router-view></router-view>
</template>

<script lang="ts">
import Header from './layout/header.vue';
import { defineComponent } from 'vue'
import { mapState, mapMutations } from 'vuex'
let timer = false;

export default defineComponent({
  components: {
    Header
  },
  created() {
    console.log(window.innerWidth)
    this.updateScreenWidth(window.innerWidth)
  },
  data() {
    return {
      screenWidth: window.innerWidth,
    };
  },
  mounted() {
    const that = this;
    window.onresize = () => {
      that.updateScreenWidth(window.innerWidth)
    };
  },
  computed: mapState(['isWideScreen']),
  methods: {
    ...mapMutations(['increment']),
    updateScreenWidth (width: number) {
      this.screenWidth = width
      if (!timer) {
        // 一旦监听到的screenWidth值改变，就将其重新赋给data里的screenWidth
        timer = true;
        let that = this
        setTimeout(function () {
          // 打印screenWidth变化的值
          console.log(that.screenWidth);
          let flag = false
          if (that.screenWidth > 800) {
            flag = true
          }
          flag !== that.isWideScreen && that.increment({ isWideScreen: flag });
          timer = false;
        }, 400);
      }
    }
  }
});
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
</style>
