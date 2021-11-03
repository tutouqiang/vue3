import { createStore } from 'vuex'
import { breadcrumbType, menuType } from '@/@type'

export default createStore({
  state: {
    breadcrumbList: [],
    menuList: [{
      name: 'home',
      path: '/',
      icon: '',
      haveChild: true,
      children: [
        {
          name: 'fence',
          path: '/fence',
          icon: '',
          haveChild: false,
          children: []
        }
      ]
    }]
  },
  mutations: {
    setBreadcrumbList (state, l) {
      state.breadcrumbList = l
    },
    setMenuList (state, l: menuType) {

    }
  },
  actions: {
    setBreadcrumbList ({ commit }, l) {
      commit('setBreadcrumbList', l)
    }
  },
  modules: {
  }
})
