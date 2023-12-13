<template>
  <div class="wake_up">
    <!-- <div class="header">唤醒 app</div> -->
    <div class="section">
      <div class="section-title">Wake App</div>
      <div class="link g-flex-column-20">
        <div class="params">
          <input type="text" placeholder="App link" v-model="appLink" />
        </div>
        <div class="params" v-for="(item, index) in paramsList" :index="index">
          <input type="text" placeholder="key" v-model="item.key" />
          <input type="text" placeholder="value" v-model="item.value" />
        </div>
        <div class="link-button g-flex-column-20">
          <button @click="addParams">Add Row</button>
          <button @click="deleteParams">Delete Row</button>
        </div>
      </div>
      <div class="wake">
        <button @click="wakeApp">Open App</button>
      </div>
    </div>
  </div>
</template>

<script>
import * as qs from "qs";

export default {
  data() {
    return {
      appLink: "",
      paramsList: [
        {
          key: "",
          value: "",
        },
      ],
    };
  },
  methods: {
    addParams() {
      this.paramsList.push({ key: "", value: "" });
    },
    deleteParams() {
      this.paramsList.pop();
    },
    wakeApp() {
      let obj = {};
      this.paramsList.forEach((item) => {
        Reflect.set(obj, item.key, item.value);
      });

      const wake_up_link = `${this.appLink}?${qs.stringify(obj)}`;

      window.top.location.href = wake_up_link;
    },
  },
};
</script>

<style lang="css" scoped>
.wake_up {
  padding: 20px 0;
  width: 100%;
  min-height: calc(100vh - 40px);
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
}

.wake_up .section {
  padding: 20px;
  width: 330px;
  background-color: var(--g-border-color-1);
  border-radius: var(--g-border-raduis);
  border-top: 1px solid var(--g-border-color);
  border-bottom: 1px solid var(--g-border-color);
  transition: all 0.3s;
}

.wake_up .section .section-title {
  padding: 10px 15px 30px;
  width: 100%;
  text-align: center;
  color: var(--g-primary-text);
  /* border-bottom: 1px solid var(--g-border-color); */
  box-sizing: border-box;
}

.wake_up .section .link {
  padding: 10px 0;
}

.wake_up .section .link .link-button {
  padding-top: 20px;
  display: flex;
  justify-content: flex-end;
}

.wake_up .section .link .params {
  width: 100%;
  display: flex;
  gap: 10px;
}

.wake_up .section .wake {
  padding: 50px 0 20px;
  display: flex;
  justify-content: center;
}

.wake_up .section .wake button {
  width: 100%;
  height: 40px;
}
</style>
