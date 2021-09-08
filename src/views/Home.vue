<template>
  <div class="home">
    <div class="demo">
      <progress v-if="hd" name="pg" :value="progress" max="100">
        {{ progress }}
      </progress>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
// import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src

@Options({
  components: {
    // HelloWorld,
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
.demo {
  position: fixed;
  top: 0px;
  left: 0px;
  border: 1px solid red;
  // transform: translate(-300px, 0);
  // animation: time 5s;
}

@keyframes time {
  // 10% {
  //   left: -10px;
  // }
  // 50% {
  //   left: -300px;
  // }
  // 100% {
  //   left: 0;
  // }
}
</style>
