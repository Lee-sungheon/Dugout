import { createRouter, createWebHistory } from "vue-router";
import Kia from "../pages/teamPages/Kia.vue";
import Samsung from "../pages/teamPages/Samsung.vue";
import LG from "../pages/teamPages/Lg.vue";
import Doosan from "../pages/teamPages/Doosan.vue";
import KT from "../pages/teamPages/Kt.vue";
import SSG from "../pages/teamPages/Ssg.vue";
import Lotte from "../pages/teamPages/Lotte.vue";
import Hanwha from "../pages/teamPages/Hanhwa.vue";
import NC from "../pages/teamPages/Nc.vue";
import Kiwoom from "../pages/teamPages/Kiwoom.vue";
import News from "@/pages/News.vue";
import Game from "@/pages/Game.vue";
import Highlight from "@/pages/Highlight.vue";
import SignIn from "@/pages/SignIn.vue";
import SignUp from "@/pages/SignUp.vue";
import MyPage from "@/pages/MyPage.vue";
import Main from "@/pages/Main.vue";
import { teamList } from "@/constants";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "RootLayout",
      component: () => import("@/layouts/RootLayout.vue"),
      children: [
        { path: "", name: "main", component: Main },
        { path: "news", name: "news", component: News },
        { path: "highlight", name: "highlight", component: Highlight },
        { path: "myPage", name: "myPage", component: MyPage },
      ],
    },
    {
      path: "/game",
      name: "GameLayout",
      component: () => import("@/layouts/GameLayout.vue"),
    },
    {
      path: "/:team",

      name: "BoardLayout",
      component: () => import("@/layouts/BoardLayout.vue"),
      beforeEnter: (to, from, next) => {
        const teamName = to.params.team;
        const isTeamValid = teamList.some((team) => team.name === teamName);

        if (isTeamValid) {
          next(); // 팀이 유효하면 페이지 렌더링
        } else {
          next({ name: "NotFound" }); // 유효하지 않으면 404 페이지로 이동
        }
      },
      children: [
        {
          path: "freeboard",
          name: "freeboard",
          component: () => import("@/pages/FreeBoard.vue"),
        },
        {
          path: "freeboard/:id",
          name: "freeboardDetail",
          component: () => import("@/pages/FreeBoardDetail.vue"),
        },
        {
          path: "freeboard/create",
          name: "freeboardCreate",
          component: () => import("@/pages/FreeBoardCreate.vue"),
        },
        {
          path: "crewboard",
          name: "crewboard",
          component: () => import("@/pages/CrewBoard.vue"),
        },
        {
          path: "crewboard/:id",
          name: "crewboardDetail",
          component: () => import("@/pages/CrewBoardDetail.vue"),
        },
        {
          path: "crewboard/create",
          name: "crewboardCreate",
          component: () => import("@/pages/CrewBoardCreate.vue"),
        },
        {
          path: "photoboard",
          name: "photoboard",
          component: () => import("@/pages/PhotoBoard.vue"),
        },
        {
          path: "photoboard/:id",
          name: "photoboardDetail",
          component: () => import("@/pages/PhotoBoardDetail.vue"),
        },
        {
          path: "photoboard/create",
          name: "photoboardCreate",
          component: () => import("@/pages/PhotoBoardCreate.vue"),
        },
        {
          path: "foodboard",
          name: "foodboard",
          component: () => import("@/pages/FoodBoard.vue"),
        },
        {
          path: "foodboard/:id",
          name: "foodboardDetail",
          component: () => import("@/pages/FoodBoardDetail.vue"),
        },
        {
          path: "foodboard/create",
          name: "foodboardCreate",
          component: () => import("@/pages/FoodBoardCreate.vue"),
        },
      ],
    },
    { path: "/signin", name: "SignIn", component: SignIn },
    { path: "/signup", name: "SignUp", component: SignUp },
    {
      path: "/:pathMatch(.*)*",
      name: "NotFound",
      component: () => import("@/pages/NotFound.vue"),
    },

    { path: "/kia", name: "kia", component: Kia },
    { path: "/samsung", name: "samsung", component: Samsung },
    { path: "/lg", name: "lg", component: LG },
    { path: "/doosan", name: "doosan", component: Doosan },
    { path: "/kt", name: "kt", component: KT },
    { path: "/ssg", name: "ssg", component: SSG },
    { path: "/lotte", name: "lotte", component: Lotte },
    { path: "/hanhwa", name: "hanhwa", component: Hanwha },
    { path: "/nc", name: "nc", component: NC },
    { path: "/kiwoom", name: "kiwoom", component: Kiwoom },
  ],
});

export default router;
