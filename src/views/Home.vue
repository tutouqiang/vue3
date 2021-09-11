<template>
  <div class="home">
    <n-button type="primary">naive-ui</n-button>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({
  components: {
  },
  data() {
    return {
      progress: 1,
      time: "",
      hd: true,
    };
  },
  created() {
    // this.setInt();
  },
  beforeDestroy() {
    clearInterval(this.time);
  },
  methods: {
    setInt() {
      const that = this;
      this.time = setInterval(function () {
        that.progress += 5;
      }, 300);
    },
  },
})
export default class Home extends Vue {}
</script>

<style scoped lang="less">
</style>
