import { createRouter, createWebHistory } from "vue-router";
import Kia from "../pages/Kia.vue";
import Samsung from "../pages/Samsung.vue";
import LG from "../pages/Lg.vue";
import Doosan from "../pages/Doosan.vue";
import KT from "../pages/Kt.vue";
import SSG from "../pages/Ssg.vue";
import Lotte from "../pages/Lotte.vue";
import Hanwha from "../pages/Hanhwa.vue";
import NC from "../pages/Nc.vue";
import Kiwoom from "../pages/Kiwoom.vue";
import News from "@/pages/News.vue";
import Game from "@/pages/Game.vue";
import Highlight from "@/pages/Highlight.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "RootLayout",
      component: () => import("@/layouts/RootLayout.vue"),
      children: [
        { path: "news", component: News },
        { path: "highlight", component: Highlight },
        { path: "game", component: Game },
      ],
    },
    {
      path: "/team",
      name: "BoardLayout",
      component: () => import("@/layouts/BoardLayout.vue"),
      children: [
        { path: "news", component: News },
        { path: "highlight", component: Highlight },
        { path: "game", component: Game },
      ],
    },

    { path: "/kia", component: Kia },
    { path: "/samsung", component: Samsung },
    { path: "/lg", component: LG },
    { path: "/doosan", component: Doosan },
    { path: "/kt", component: KT },
    { path: "/ssg", component: SSG },
    { path: "/lotte", component: Lotte },
    { path: "/hanhwa", component: Hanwha },
    { path: "/nc", component: NC },
    { path: "/kiwoom", component: Kiwoom },

    { path: "/news", component: News },
    { path: "/game", component: Game },
    { path: "/highlight", component: Highlight },
  ],
});

export default router;
