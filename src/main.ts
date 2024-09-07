import { createApp } from "vue";
import App from "./App.vue";
import vuetify from "./vuetify/vuetify";

const app = createApp(App);

// Gloabl error handler.
app.config.errorHandler = (err, vm, info) => {
  console.error("Error:", err);
  console.error("Vue component:", vm);
  console.error("Additional info:", info);
};

app.use(vuetify);
app.mount("#app");
