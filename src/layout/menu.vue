<template>
  <a-layout-sider width="200" style="background: #fff" breakpoint="lg" collapsed-width="0">
    <a-menu
      v-model:selectedKeys="selectedKeys"
      v-model:openKeys="openKeys"
      mode="inline"
      :style="{ height: '100%', borderRight: 0 }"
    >
      <template v-for="item in menuList" :key="item.name" >
        <a-sub-menu :key="item.name" v-if="item.haveChild">
          <template #title>
            <span>
              {{$t(`${item.name}`)}}
            </span>
          </template>
          <a-menu-item v-for="it in item.children" :key="it.name">{{$t(`${it.name}`)}}</a-menu-item>
        </a-sub-menu>
        <a-menu-item v-else :key="item.name">{{item.name}}</a-menu-item>
      </template>
    </a-menu>
  </a-layout-sider>
</template>
<script>
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons-vue';
import { defineComponent, ref } from 'vue';
export default defineComponent({
  components: {
    UserOutlined,
    LaptopOutlined,
    NotificationOutlined,
  },
  setup() {
    return {
      selectedKeys: ['2'],
      collapsed: false,
      openKeys: ['home'],
    };
  },
  // data () {
  //   return {
  //     selectedKeys: 'home',
  //     collapsed: false,
  //     openKeys: ['home'],
  //   }
  // },
  computed: {
    menuList: function () {
      return this.$store.state.menuList
    }
  },
  methods: {}
});
</script>
<style>
.site-layout-background {
  background: #fff;
}
</style>