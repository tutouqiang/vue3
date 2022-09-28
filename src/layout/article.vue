<template>
  <!-- 文章布局 -->
  <a-layout id="article">
    <!-- <Header /> -->
    <a-layout-content :style="{ padding: '0 1rem', flexGrow: 1 }">
      <a-row justify="center">
        <section class="content">
          <div class="head">
            <h1>{{ headInfo.title }}</h1>
            <br />
            <div class="articleInfo">
              <div v-if="headInfo.title">作者: &nbsp;&nbsp;张超</div>
              <div v-if="headInfo.createTime">
                时间: &nbsp;&nbsp;{{ headInfo.createTime }}
              </div>
              <div v-if="headInfo.type">分类: &nbsp;&nbsp;{{ headInfo.type }}</div>
            </div>
          </div>
          <router-view />
        </section>
        <a-col :span="0" :lg="6" :xl="5" :xxxl="4" style="margin-left: 50px;">
          <a-affix :offsetTop="100">
            <div class="anchor" style="padding: 10px 0; height: 500px; background-color: #fff; overflow: auto; border-radius: 10px">
              <a-anchor :affix="false" @click="(e) => e.preventDefault()">
              <a-anchor-link
                v-for="{ href, title, level } in anchorList"
                :key="href"
                :href="'#' + href"
                :title="title"
                :style="{ paddingLeft: level > 1 ? (level - 1) * 15 + 11 + 'px' : '11px' }"
              />
            </a-anchor>
            </div>
          </a-affix>
        </a-col>
      </a-row>
    </a-layout-content>
    <!-- <Footer /> -->
  </a-layout>
  <a-back-top>
    <caret-up-outlined class="backup" />
  </a-back-top>
</template>
<script>
import Header from "./header.vue";
import Footer from "./footer.vue";
import Menu from './menu.vue'
import { CaretUpOutlined } from "@ant-design/icons-vue";
import "@/assets/styles/markdown/smartblue.less";
import "@/assets/styles/hightlight/prism.css";

export default {
  components: {
    Header,
    Footer,
    Menu,
    CaretUpOutlined,
  },
  data() {
    return {
      articleList: [{ path: "/", meta: { title: "首页" } }],
      anchorList: [],
      headInfo: {
        title: "",
        date: "",
        type: "",
        theme: "",
      },
    };
  },
  created() {
    const list = this.$route.matched.map((item) => {
      return {
        path: item.path,
        meta: item.meta,
      };
    });
    this.articleList = [...this.articleList, ...list];
    this.headInfo = this.articleList[this.articleList.length - 1].meta;
    console.log("articleList", this.articleList, this.headInfo);
  },
  mounted() {
    const element = document.getElementsByClassName("content")[0];
    window.requestAnimationFrame(() => {
      element.style.transform = "translateX(0)";
      element.style.opacity = 1;
    });
    this.filterdAnchor();
  },
  methods: {
    filterdAnchor() {
      const mdc = document.getElementsByClassName("markdown-body")[0].children;
      const reg = /H|h\d/;
      const filterReg = /\d/;
      for (let i = 0; i < mdc.length; i++) {
        if (reg.test(mdc[i].tagName)) {
          const l = Number(mdc[i].tagName.match(filterReg)[0])
          l < 4 && this.anchorList.push({
            title: decodeURI(mdc[i].id),
            href: mdc[i].id,
            level: l || 0,
          });
        }
      }
    },
  },
};
</script>

<style lang="less" scoped>
@import '@/assets/styles/theme.less';
#article {
  min-height: 100vh;
  // background-color: #fff;
  .ant-anchor-wrapper {
    min-height: 100%!important;
  }
  
  .content {
    max-width: 800px;
    // margin: 0 auto;
    padding: 10px 0px;
    will-change: auto;
    transform: translateX(-300px);
    opacity: 0;
    transition: all 0.3s linear;
    .head {
      margin: 30px 0;
      h1 {
        padding: 0 10px;
        font-size: 22px;
      }
    }
    .articleInfo {
      display: flex;
      color: #999;
    }
    .articleInfo > div {
      padding: 0 10px;
    }
  }

  /deep/ .ant-anchor-ink::before {
    width: 0px;
  }
  .ant-anchor-link-active {
    background-color: @primary-color;
    /deep/ .ant-anchor-link-title-active {
      color: #fff;
    }
  }
}

.backup {
  height: 40px;
  width: 40px;
  line-height: 40px;
  border-radius: 4px;
  background-color: #1088e9;
  color: #fff;
  text-align: center;
  font-size: 20px;
  transition: all 0.2s linear;
  &:hover {
    transform: scale(1.1);
  }
}
</style>
