import App from "./App.vue";
import router from "./router";
import { createApp } from "vue";
import { createPinia } from "pinia";
import { useKakao } from "vue3-kakao-maps/@utils";
import { QuillEditor } from "@vueup/vue-quill";
import { DatePicker } from "v-calendar";
import VCalendar from "v-calendar";
import "v-calendar/style.css";
import "./styles/index.css";
import "@vueup/vue-quill/dist/vue-quill.snow.css";

useKakao("399b05e95de82f5d07a8fd56ca2ecba7", [
  "clusterer",
  "services",
  "drawing",
]);

const app = createApp(App);
app.component("QuillEditor", QuillEditor);
app.component("VDatePicker", DatePicker);
app.use(createPinia());
app.use(router);
app.use(VCalendar, {});

app.mount("#app");
