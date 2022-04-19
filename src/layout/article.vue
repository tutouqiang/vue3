<template>
  <!-- 文章布局 -->
  <a-layout id="article">
    <Header />
    <a-layout-content :style="{ padding: '0 1rem', marginTop: '64px', flexGrow: 1 }">
      <a-breadcrumb separator=">" :style="{ margin: '16px 0' }">
        <a-breadcrumb-item v-for="item in articleList" :href="item.path">
          <router-link :to="item.path">{{
            item.meta.title || item.meta.name
          }}</router-link>
        </a-breadcrumb-item>
      </a-breadcrumb>
      <a-row justify="center">
        <section class="content">
          <div class="head">
            <h2 style="text-align: center">{{ headInfo.title }}</h2>
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
        <a-col :span="0" :lg="5" :xl="4" :xxxl="3" style="margin-left: 50px">
          <a-anchor :offsetTop="64" @click="(e) => e.preventDefault()">
            <a-anchor-link
              v-for="item in anchorList"
              :key="item.href"
              :href="'#' + item.href"
              :title="item.title"
            />
          </a-anchor>
        </a-col>
      </a-row>
    </a-layout-content>
    <Footer />
  </a-layout>
  <a-back-top>
    <caret-up-outlined class="backup" />
  </a-back-top>
</template>
<script>
import Header from "./header.vue";
import Footer from "./footer.vue";
import { CaretUpOutlined } from "@ant-design/icons-vue";
import "../style/markdown/smartblue.less";
import "../style/hightlight/prism.css";

export default {
  components: {
    Header,
    Footer,
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
      for (let i = 0; i < mdc.length; i++) {
        if (reg.test(mdc[i].tagName)) {
          this.anchorList.push({
            title: decodeURI(mdc[i].id),
            href: mdc[i].id,
          });
        }
      }
    },
  },
};
</script>

<style lang="less" scoped>
#article {
  min-height: 100vh;
  background-color: #ffffee;
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
    }
    .articleInfo {
      display: flex;
      color: #999;
    }
    .articleInfo > div {
      padding: 0 10px;
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
