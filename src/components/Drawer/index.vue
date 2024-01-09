<template>
  <div v-if="params.open" class="drawer">
    <div v-if="params.mask" class="drawer-mask" @click.stop="closeDrawer"></div>
    <div class="drawer-content">
      <div v-if="!$slots.header" class="drawer-content-header">
        <div></div>
        <div class="drawer-content-header_title">{{ params.title }}</div>
        <div @click="closeDrawer">❎</div>
      </div>
      <div v-else class="drawer-content-header">
        <slot name="header"></slot>
      </div>
      <div class="drawer-content-section"><slot></slot></div>
      <div class="drawer-content-footer"><slot name="footer"></slot></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Drawer",
  props: {
    open: {
      type: Boolean,
      default: false,
      required: false,
    },
    mask: {
      type: Boolean,
      default: true,
      required: false,
    },
    direction: {
      type: String,
      default: "bottom",
      required: false,
    },
    title: {
      type: String,
      default: "123",
      required: false,
    },
  },
  data() {
    return {
      params: {
        open: false,
        mask: true,
        direction: "bottom",
      },
    };
  },
  mounted() {
    this.params = Object.assign(this.params, this.$props);
  },
  watch: {
    open(newData, oldData) {
      this.params.open = newData;
    },
  },
  computed: {
    // // 抽屉宽度
    // drawerContentStyle() {
    //   return {
    //     width: this.params.open ? this.params.width : "0px",
    //   };
    // },
  },
  methods: {
    // 关闭抽屉
    closeDrawer() {
      this.params.open = false;
      this.$emit("close");
    },
    // 打开抽屉
    openDrawer() {
      this.params.open = true;
      this.$emit("open");
    },
  },
};
</script>

<style>
.drawer {
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100vw;
  height: 100vh;
  z-index: 1000;
}

.drawer-mask {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.3);
}

.drawer-content {
  position: absolute;
  bottom: 0;
  right: 50%;
  transform: translateX(50%);
  max-width: 800px;
  width: 100vw;
  height: 80%;
  background-color: #fff;
  border-radius: var(--g-border-raduis) var(--g-border-raduis) 0 0;
  transition: all 0.3s;
}

.drawer-content-header,
.drawer-content-section,
.drawer-content-footer {
  padding: 10px;
}

.drawer-content-header {
  display: flex;
  justify-content: space-between;
}

.drawer-content-header_title {
  font-size: var(--g-font-size-1);
}

.drawer-content-header div:last-child {
  cursor: pointer;
}
</style>
