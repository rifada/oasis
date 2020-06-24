import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token : null,
    role : null
  },
  mutations: {
    setToken(state, payload){
        state.token = payload.token,
        state.role = payload.role
    }
  },
  actions: {
    getToken({state, commit}, payload){
        console.log("store.js::payload="+payload)
        console.log(state)
        commit('setToken', payload)
    }
  },
  modules: {
  }
})
