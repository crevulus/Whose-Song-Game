import Vue from "vue";
import App from "./App.vue";
import VueClipboard from "vue-clipboard2";
import VueTailwind from "vue-tailwind";
import VueGtm from "vue-gtm";
import Rollbar from "vue-rollbar";
import router from "@/router";
import store from "@/store";
import Atium from "@/themes/atium.js";

import Amplify, * as AmplifyModules from "aws-amplify";
import { AmplifyPlugin } from "aws-amplify-vue";
import awsconfig from "./aws-exports";
Amplify.configure(awsconfig);

Vue.use(AmplifyPlugin, AmplifyModules);

Vue.config.productionTip = process.env.NODE_ENV === "production";
Vue.use(VueClipboard);
Vue.use(VueTailwind, {
  theme: Atium
});
Vue.use(VueGtm, {
  id: process.env.VUE_APP_GTM_TRACKING_ID,
  enabled: process.env.NODE_ENV === "production",
  debug: process.env.NODE_ENV !== "production",
  loadScript: false,
  vueRouter: router
});

Vue.use(Rollbar, {
  accessToken: process.env.VUE_APP_ROLLBAR_TOKEN,
  captureUncaught: true,
  captureUnhandledRejections: true,
  enabled: process.env.NODE_ENV === "production",
  environment: process.env.NODE_ENV,
  payload: {
    client: {
      javascript: {
        code_version: "1.0",
        source_map_enabled: true,
        guess_uncaught_frames: true
      }
    }
  }
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
