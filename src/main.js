import { createApp } from "vue";
import { createPinia } from "pinia"
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import App from "./App.vue";
import router from "./router";

// import '@/style.css';
import "@/assets/css/bootstrap.min.css";
import "@/assets/css/theme-color/default-theme.css";
import "@/assets/css/style.css"


const app = createApp(App);
const pinia = createPinia();
// app.use(createPinia())
// .use(router).mount('#app');
// app.use(router);
// app.use(vuetify)


// app.mount("#app");
pinia.use(piniaPluginPersistedstate);

app.use(pinia);
// app.use(createPinia().use(piniaPluginPersistedstate));
app.use(router);

app.mount("#app");

