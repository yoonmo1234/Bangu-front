import { createApp } from "vue";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
// import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App.vue";
import router from "./router";

// Vuetify
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
const vuetify = createVuetify({
  components,
  directives,
});

const app = createApp(App);

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);
app.use(pinia);

// app.use(createPinia())
app.use(router);
app.use(vuetify);

app.mount("#app");
