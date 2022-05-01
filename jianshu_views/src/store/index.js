import Vue from 'vue'
import Vuex from 'vuex'
import api from '@/api'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo: {},
  },
  mutations: {
    GET_USER_INFO: (state) => {
      return localStorage.getItem('userInfo')
    },
    SET_USER_INFO: (state, userInfo) => {
      state.userInfo = userInfo
    },
  },
  actions: {
    getUserInfo({ commit }) {
      return new Promise((resolve,reject) => {
        let option = {
          ...api.GET_USER_INFO,
          params: {
            _id: JSON.parse(window.localStorage.getItem('userInfo')).userInfo
              ._id,
          },
        }
        this._vm.$http(option)
          .then((res) => {
            console.log('查询当前用户信息成功', res)
            commit('SET_USER_INFO', res.data)
            resolve()
          })
          .catch((err) => {
            console.error('查询当前用户信息失败', err)
            reject()
          })
      })
    },
  },
  modules: {},
  plugins: [
    createPersistedState({
      // 存储方式：localStorage、localStorage、cookies
      storage: window.localStorage,
      // 存储的 key 的key值
      key: 'userInfo',
      render(state) {
        // 要存储的数据：存储了state中所有的数据
        return { ...state }
      },
    }),
  ],
})
