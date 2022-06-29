import Vue from "vue";
import vuetify from "./plugins/vuetify";

import App from "./App.vue";
import "vuetify/dist/vuetify.min.css";

import router from "./router";

new Vue({
  vuetify,
  router,
  render: (h) => h(App),
}).$mount("#app");
