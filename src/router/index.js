import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/pages/HomeView.vue";
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

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // {
    //   path: "/",
    //   name: "home",
    //   component: HomeView,
    // },
    {
      path: "/",
      name: "RootLayout",
      component: () => import("@/layouts/RootLayout.vue"),
      children: [
        {
          path: "/home",
          name: "home",
          component: HomeView,
        },
        {
          path: "/freeboard",
          name: "freeboard",
          component: () => import("@/pages/FreeBoard.vue"),
        },
      ],
    },
    {
      path: "/about",
      name: "about",

      component: () => import("../pages/AboutView.vue"),
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
  ],
});

export default router;
