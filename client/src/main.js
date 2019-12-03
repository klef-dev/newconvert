import Vue from "vue";
import App from "./App.vue";
import Panel from "./components/Panel.vue";
import router from "./router";
import instance from "./http";
import store from "./store";

import { sync } from "vuex-router-sync";

Vue.config.productionTip = false;

sync(store, router);

Vue.component("Panel", Panel);

Vue.prototype.$instance = instance;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
