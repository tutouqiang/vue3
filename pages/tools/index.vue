<template>
  <div class="tools">
    <div
      class="tools-item"
      v-for="(item, index) in tools"
      :index="index"
      @click="jump(item)"
    >
      {{ item.label }}
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tools: [
        {
          label: "Wake App",
          route: "/tools/wake_up",
        },
      ],
    };
  },
  methods: {
    jump(item) {
      window.location.href = item.route;
    },
  },
};
</script>

<style lang="css" scoped>
.tools {
  padding: 10px;
  min-height: calc(100vh - 40px);
  height: calc(100vh - 40px);
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  box-sizing: border-box;
}

.tools-item {
  width: 90px;
  height: 60px;
  display: grid;
  place-items: center;
  color: var(--g-primary-text);
  font-size: var(--g-font-size);
  border-radius: var(--g-border-raduis);
  background-color: var(--g-border-color-1);
  border-bottom: 1px solid var(--g-border-color);
  cursor: pointer;
  transition: all 0.3s;
}

.tools-item:hover {
  border-top: 1px solid var(--g-border-color);
}
</style>
