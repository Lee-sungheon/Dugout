import "./styles/index.css";
import "@vueup/vue-quill/dist/vue-quill.snow.css";

import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import { QuillEditor } from "@vueup/vue-quill";

const app = createApp(App);

app.component("QuillEditor", QuillEditor);
app.use(createPinia());
app.use(router);

app.mount("#app");
