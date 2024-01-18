<template>
  <div class="layout">
    <header class="layout-header">
      <h1 class="logo"><RouterLink to="/">WOOC</RouterLink></h1>
      <MenuLayout class="layout-header-menu" :menu="menu" />
    </header>
    <!-- Simple Small Beautiful Fast -->
    <section class="layout-section"><slot /></section>
    <footer class="layout-footer">
      <ul class="layout-footer-link">
        <li><a href="/">wooc</a></li>
        |
        <li><a href="https://twitter.com/wooc_chao" target="_blank">X</a></li>
        |
        <li><a href="https://github.com/zhangchao-wooc" target="_blank">Github</a></li>
        |
        <li><a href="/about">About</a></li>
        |
        <li>
          <a href="mailto:wooc.zhang@gmail.com" target="_blank">wooc.zhang@gmail.com</a>
        </li>
        |
        <li><span @click="openHistoryPopup = true">Friends</span></li>
      </ul>
    </footer>

    <Drawer :open="openHistoryPopup" :title="'Friends'" @close="openHistoryPopup = false">
      <div class="friends">
        <div
          class="friends-item"
          v-for="(item, index) in friends"
          :key="index"
          @click="jumpToFriendWebsite(item)"
        >
          <div class="friends-item-avatar">
            <img :src="item.avatar" alt="" />
          </div>
          <div class="friends-item-name">{{ item.name }}</div>
          <div class="friends-item-title">
            {{ item.title }}
          </div>
          <div class="friends-item-desc">{{ item.desc }}</div>
        </div>
      </div>
    </Drawer>
  </div>
</template>

<script lang="ts">
// import { Router } from 'vue-router'
import MenuLayout from "../components/menu/index.vue";
import Drawer from "@/components/Drawer/index.vue";
import { friends } from "@/data";

export default {
  components: {
    MenuLayout,
    Drawer,
  },
  data() {
    return {
      friends: friends,
      menu: [
        {
          index: "1",
          route: "/",
          label: "Home",
        },
        {
          index: "2",
          route: "/website",
          label: "Website",
        },
        {
          index: "3",
          route: "/blog",
          label: "Blog",
        },
        {
          index: "4",
          route: "/tools",
          label: "Tools",
        },
      ],
      openHistoryPopup: false,
    };
  },
  methods: {
    jumpToFriendWebsite(item: any) {
      window.open(item.url, "_blank");
    },
  },
};
</script>

<style lang="scss">
.layout {
  display: flex;
  flex-direction: column;
  background-color: var(--g-bg-color);
  &-header {
    position: fixed;
    top: 0px;
    left: 0px;
    padding: 0 20px;
    width: 100vw;
    height: 40px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    background-color: var(--g-bg-color);
    box-sizing: border-box;
    transition: all 0.3s;
    z-index: 100;

    .logo {
      margin: 0;
      line-height: 40px;
      a {
        font-size: var(--g-font-size);
        color: var(--g-primary-text);
        text-decoration: none;
      }
    }
  }

  &-section {
    margin-top: 40px;
    min-height: calc(100vh - 40px - 20px);
    height: calc(100vh - 40px - 20px);
    overflow: auto;
  }

  &-footer {
    padding: 5px;
    width: 100vw;
    height: 20px;
    display: flex;
    justify-content: center;
    color: var(--g-primary-text-6);
    font-size: var(--g-font-size);
    box-sizing: border-box;
    &-link {
      display: flex;
      align-items: center;
      gap: 10px;

      a,
      span {
        cursor: pointer;
        color: var(--g-primary-text-6);
        &:hover {
          color: var(--g-primary-text);
        }
      }
    }
  }

  .friends {
    display: grid;
    gap: 20px;
    color: var(--g-primary-text-6);

    &-item {
      padding: 10px;
      display: grid;
      gap: 10px;
      border-radius: var(--g-border-radius);
      border-right: 1px solid var(--g-border-color);
      border-left: 1px solid var(--g-border-color);
      cursor: pointer;
      transition: all 0.3s;
      &:hover {
        box-shadow: var(--g-box-shadow-2);
      }
      &-avatar {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        overflow: hidden;
        img {
          width: 50px;
          height: 50px;
        }
      }
      &-name {
        font-size: 14px;
        color: var(--g-primary-text);
      }
      &-title {
        font-size: 12px;
      }
      &-desc {
        font-size: 12px;
      }
    }
  }
}
</style>
