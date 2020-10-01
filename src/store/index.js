import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    playerId: 0
  },
  mutations: {
    setPlayerId (state, payload) {
      state.playerId = payload.playerId;
    }
  },
  actions: {
    setPlayerId (context) {
      return context.commit('setPlayerId');
    }
  },
  getters: {
    getPlayerId (state) {
      return state.playerId;
    }
  },
  modules: {}
});
