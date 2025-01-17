import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/pages/HomeView.vue";

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
      ],
    },
    {
      path: "/about",
      name: "about",

      component: () => import("../pages/AboutView.vue"),
    },
  ],
});

export default router;
