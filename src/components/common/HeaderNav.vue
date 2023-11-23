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
<header id="mu-header" class="" role="banner">
		<div class="container">
			<nav class="navbar navbar-default mu-navbar">
		  <div class="container-fluid">
		    <!-- Brand and toggle get grouped for better mobile display -->
		    <div class="navbar-header">
		      <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
		        <span class="sr-only">Toggle navigation</span>
		        <span class="icon-bar"></span>
		        <span class="icon-bar"></span>
		        <span class="icon-bar"></span>
		      </button>

		      <!-- Text Logo -->
		      <RouterLink :to="{name:'index'}" class="navbar-brand" href="#">Bangu</RouterLink>

		      <!-- Image Logo -->
		      <!-- <a class="navbar-brand" href="#"><img src="@/assets/images/logo.png"></a> -->


		    </div>

		    <!-- Collect the nav links, forms, and other content for toggling -->
		    <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1 custom-navbar">
		      	<ul class="nav navbar-nav mu-menu navbar-right custom-navbar">
					<template v-if="!isLogin">
						<li><RouterLink :to="{name:'UserLogin'}" href="#">로그인</RouterLink></li>
					</template>
					<template v-else>
						<li><a href="#mu-portfolio">원룸 양도</a></li>
						<li><a class="logout-custom" @click="logout">로그아웃</a></li>
					</template>
			        <li><a href="#mu-service">공지사항</a></li>
			        <li><RouterLink :to="{name:'rent-room'}">양도방보기</RouterLink></li>

					<!-- 로그인시 보일 거 -->
		      	</ul>
		    </div><!-- /.navbar-collapse -->
		  </div><!-- /.container-fluid -->
		</nav>
		</div>
	</header>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@500&display=swap');
.custom-navbar {
  font-family: 'Noto Sans KR', sans-serif;
}
.logout-custom:hover {
	cursor: pointer;
}

</style>
