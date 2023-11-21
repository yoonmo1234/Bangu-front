<script setup>
import { storeToRefs } from "pinia";
import { useMemberStore } from "@/stores/member";
import { useRouter } from "vue-router";

const router = useRouter();
const memberStore = useMemberStore();
const { isLogin } = storeToRefs(memberStore);
const { userLogout } = memberStore;

const logout = async () => {
  let token = sessionStorage.getItem("accessToken");
  await userLogout(token);
  sessionStorage.removeItem("accessToken");
  sessionStorage.removeItem("refreshToken");
  router.push({ name: "index" });
};
</script>

<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light shadow">
    <!-- <c:if test="${cookie.ssafy_id.value ne null}">
		<c:set var="idck" value=" checked"/>
		<c:set var="saveid" value="${cookie.ssafy_id.value}"/>
	</c:if> -->
    <div class="container">
      <!-- <a class="navbar-brand text-primary fw-bold" href="#">
      WhereIsMyHome
    </a> -->
      <RouterLink
        :to="{ name: 'index' }"
        class="navbar-brand text-primary fw-bold"
        aria-current="page"
        >방구</RouterLink
      >
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-lg-0">
          <li class="nav-item">
            <RouterLink
              :to="{ name: 'board' }"
              class="nav-link"
              aria-current="page"
              href="#"
              >QnA</RouterLink
            >
            <!-- 게시판 -->
          </li>
        </ul>
      </div>
      <ul
        class="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll"
        style="--bs-scroll-height: 100px">
        <template v-if="isLogin">
          <li class="nav-item">
            <router-link
              :to="{ name: 'index' }"
              @click.prevent="logout"
              class="nav-link"
              >로그아웃</router-link
            >
          </li>
        </template>
        <template v-else>
          <li class="nav-item">
            <router-link :to="{ name: 'UserLoginNew' }" class="nav-link"
              >로그인</router-link
            >
          </li>
        </template>
      </ul>
    </div>
  </nav>
</template>

<style scoped>
@import "@/assets/css/login.css";
</style>
