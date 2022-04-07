/*
 * 全局状态
 *
 */
import { createStore } from 'vuex'

// 创建一个新的 store 实例
const store = createStore({
  state () {
    return {
      isWideScreen: true
    }
  },
  mutations: {
    increment (state, payload) {
      console.log('mustations-increment', payload);
      Object.assign(state, payload)
    }
  }
})

export default store
