import { createRouter, createWebHistory } from "vue-router";
// import { useUserStore } from "@/stores/user";
import { useMemberStore } from "@/stores/member";
import { storeToRefs } from "pinia";
// const onlyAuthUser = async (to, from) => {
//   // const { selectUserInfo } = useUserStore();
//   const memberStore = useMemberStore();
//   const { getUserInfo } = memberStore;
//   const { isLogin, } = storeToRefs(memberStore);
//   // const resp = await selectUserInfo();
//   // const resp = getUserInfo();
//   if (isLogin) {
//     next();
//   } else {
//     alert("로그인이 필요한 페이지 입니다!!");
//     router.push({ name: "UserLogin" });
//   }
// };
const onlyAuthUser = async (to, from,next) => {
  console.log(1234)
  const memberStore = useMemberStore();
  const { getUserInfo } = memberStore;
  const { isValidToken,userInfo } = storeToRefs(memberStore);
  let token = sessionStorage.getItem("accessToken");
  console.log("로그인 처리 전", userInfo.value, token);

  if (userInfo != null && token) {
    console.log("토큰 유효성 체크하러 가자!!!!");
    await getUserInfo(token);
  }
  if (!isValidToken || userInfo.value === null) {
    alert("로그인이 필요한 페이지입니다..");
    // next({ name: "login" });
    router.push({ name: "UserLogin" });
  } else {
    console.log("로그인 했다!!!!!!!!!!!!!.");
    next();
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
      ],
    },
    {
      path: "/apt-deal",
      name: "apt-deal",
      component: import("@/views/AptDealView.vue"),
    },
    {
      path: "/rent-room",
      name: "rent-room",
      component: import("@/views/RentView.vue"),
    },
    {
      path: "/room",
      name: "room",
      component: import("@/views/RoomView.vue"),
      beforeEnter: onlyAuthUser,
      children: [
        {
          path: "regist",
          name: "roomRegist",
          component: () => import("@/components/rent/RoomRegister.vue"),
        },
        {
          path: "detail/:roomId",
          name: "roomDetail",
          component: () => import("@/components/rent/RoomDetailModal.vue"),
        },
      ],
    },
    {
      path:"/chart",
      name:"chart",
      component:import("@/views/ChartView.vue"),
    },
  ],
});

export default router;
