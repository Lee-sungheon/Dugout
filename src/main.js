import "./styles/index.css";
import "@vueup/vue-quill/dist/vue-quill.snow.css";

import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import { QuillEditor } from "@vueup/vue-quill";
import VCalendar from "v-calendar";
import "v-calendar/style.css";
import { setupCalendar, DatePicker } from "v-calendar";

const app = createApp(App);

app.component("QuillEditor", QuillEditor);
app.component("VDatePicker", DatePicker);
app.use(createPinia());
app.use(router);
app.use(VCalendar, {});
app.use(setupCalendar, {});

app.mount("#app");
