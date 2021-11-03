<template>
  <a-layout-header class="header">
    <a-breadcrumb style="margin: 16px 0; textAlign: left">
      <a-breadcrumb-item v-for="item in breadcrumbList" :key="item.name">
        {{$t(item.name)}}
      </a-breadcrumb-item>
    </a-breadcrumb>
    <div class="header-right">
      <a-select
        ref="select"
        :value="selected"
        style="width: 80px"
        @change="handleChange"
      >
        <a-select-option value="zh-CN">中文</a-select-option>
        <a-select-option value="en-US">English</a-select-option>
      </a-select>
      <SettingOutlined class="header-right_set"/>
    </div>
  </a-layout-header>
</template>

<script>
import { onMounted, toRefs, reactive, toRaw } from 'vue'
import { SettingOutlined } from '@ant-design/icons-vue';
export default {
  components: {
    SettingOutlined
  },
  setup(props) {
    const state = reactive({
      // home: t('home.go')
    })
    onMounted( () => {
    })
    return {onMounted, ...toRefs(state) }
  },
  data() {
    return {
      selected: this.$i18n.getLocales()
    }
  },
  mounted() {
    console.log('header',this.$store.state.breadcrumbList );
  },
  computed: {
    breadcrumbList: function () {
      return this.$store.state.breadcrumbList
    }
  },
  methods: {
    handleChange (v) {
      this.selected = v
      this.$i18n.setLocales(v)
    }
  }
}
</script>

<style scoped lang="less">
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  .header-right {
    .header-right_set {
      margin-left: 10px;
      font-size: 18px;
      cursor: pointer;
      &:hover {
        color: @primary-color
      }
    }
  }
}
.ant-layout-header{
  background: none!important;
}
</style>