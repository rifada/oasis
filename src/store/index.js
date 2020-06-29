import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    access_token : null,
    scope : null
  },
  mutations: {
    setToken(state, payload){
        state.access_token = payload.access_token,
        state.scope = payload.scope
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
