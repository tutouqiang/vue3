<template>
  <a-layout-footer class="footer">
    <div class="otherPlatform">
      <div class="email" @click="sendEmail">
        <a-tooltip title="点击发送邮件" color="purple">
          <mail-outlined class="icon-github"/>
        </a-tooltip>
      </div>

      <div class="juejin">
        <a-tooltip title="掘金主页" color="purple">
          <a href="https://juejin.cn/user/2400989127643864">
            <a-image src="https://lf3-cdn-tos.bytescm.com/obj/static/xitu_juejin_web/6c61ae65d1c41ae8221a670fa32d05aa.svg" :width="35" alt="" />
          </a>
        </a-tooltip>
      </div>

      <div class="github">
        <a-tooltip title="Github" color="purple">
          <a href="https://github.com/zhangchao-wooc"><github-outlined class="icon-github"/></a>
        </a-tooltip>
      </div>

      <div class="weixin platform-layout">
        <img src="../assets/weixin.jpg" alt="" style="width: 70px" />
      </div>
    </div>
  </a-layout-footer>
</template>
<script>
import { GithubOutlined, MailOutlined } from '@ant-design/icons-vue'

export default {
  components: {
    GithubOutlined,
    MailOutlined
  },
  methods: {
    sendEmail () {

    }
  }
}
</script>
<style lang="less" scoped>
@import '../style/theme.less';
.footer {
  padding: 5px 10px 0;
  display: flex;
  justify-content: end;
  color: #333;
  background-color: #FFF;
  box-shadow: 0 0 5px rgba(0,0,0,.2);
  @media screen and (max-width: 800px) {
    justify-content: center;
  }
  .otherPlatform {
    display: grid;
    grid-gap: 20px;
    justify-content: end;
    grid-auto-flow: column;
    align-items: center;
    font-size: 12px;
    .email {
      cursor: pointer;
    }
  }
  .beian {
    align-self: end;
    text-align: center;
  }
  .platform-layout {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .icon-github {
    display: flex;
    font-size: 30px;
    color: #000;
  }
}
</style>
