import { createRouter, createWebHistory } from "vue-router";
// import { useUserStore } from "@/stores/user";
import { useMemberStore } from "@/stores/member";
const onlyAuthUser = async (to, from) => {
  // const { selectUserInfo } = useUserStore();
  const { getUserInfo } = useMemberStore();
  // const resp = await selectUserInfo();
  const resp = getUserInfo();
  if (resp === "fail") {
    alert("로그인이 필요한 페이지 입니다!!");
    router.push({ name: "UserLogin" });
  }
};

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "index",
      component: import("@/views/MainView.vue"),
    },
    {
      path: "/user",
      name: "UserView",
      component: () => import("@/views/UserView.vue"),
      redirect: "/user/login",
      children: [
        {
          path: "login",
          name: "UserLogin",
          component: () => import("@/components/user/UserLogin.vue"),
        },
        {
          path: "mypage",
          name: "UserMyPage",
          component: () => import("@/components/user/UserMyPage.vue"),
        },
      ],
    },
    {
      path: "/board",
      name: "board",
      component: () => import("../views/TheBoardView.vue"),
      redirect: { name: "article-list" },
      children: [
        {
          path: "list",
          name: "article-list",
          component: () => import("@/components/board/BoardList.vue"),
        },
        {
          path: "view/:articleno",
          name: "article-view",
          component: () => import("@/components/board/BoardDetail.vue"),
        },
        {
          path: "write",
          name: "article-write",
          component: () => import("@/components/board/BoardWrite.vue"),
          beforeEnter: onlyAuthUser,
        },
        {
          path: "modify/:articleno",
          name: "article-modify",
          component: () => import("@/components/board/BoardModify.vue"),
          beforeEnter: onlyAuthUser,
        },
        {
          path: "/apt-deal",
          name: "apt-deal",
          component: import("@/views/AptDealView.vue"),
        },
      ],
    },
  ],
});

export default router;
