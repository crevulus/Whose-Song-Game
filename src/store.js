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
    deviceId: null,
    accessToken: null,
  },
  getters: {
    deviceId(state) {
      return state.deviceId;
    },
    accessToken(state) {
      return state.accessToken;
    }
  },
  mutations: {
    setDeviceId(state, value) {
      if (state.deviceId == null) {
        state.deviceId = value;
      }
    },
    setAccessToken(state, value) {
      if (state.accessToken == null) {
        state.accessToken = value;
      }
    }
  }
});

export default store;
