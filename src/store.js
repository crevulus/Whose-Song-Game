/* eslint-disable */
import Vue from "vue";
import Vuex from "vuex";
import VuexPersistence from "vuex-persist";

Vue.use(Vuex);

const localStorageKey = "atium";

const vuexLocal = new VuexPersistence({
  key: localStorageKey,
  storage: window.localStorage
});

const store = new Vuex.Store({
  plugins: [vuexLocal.plugin],
  state: {
    deviceId: null
  },
  getters: {
    deviceId(state) {
      return state.deviceId;
    }
  },
  mutations: {
    setDeviceId(state, value) {
      if (state.deviceId == null) {
        state.deviceId = value;
      }
    }
  }
});

export default store;
