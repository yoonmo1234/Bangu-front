<script setup>

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
    <RouterLink :to="{name:'index'}" class="navbar-brand text-primary fw-bold" aria-current="page">WhereIsMyHome</RouterLink>
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
          <RouterLink :to="{name:'board'}" class="nav-link" aria-current="page" href="#">QnA</RouterLink>
          <!-- 게시판 -->
        </li>
      </ul>
      
  	<!-- <c:if test="${empty userinfo}"> -->
      <!-- 로그인 전 -->
      <ul class="navbar-nav mb-2 me-2 mb-lg-0">
        <li class="nav-item">
          <a class="nav-link" aria-current="page" href="#" id="btn-mv-join">
            회원가입</a
          >
        </li>
        <li class="nav-item">
          <div class="dropdown">
            <a
              class="nav-link dropdown-toggle"
              data-bs-toggle="dropdown"
              aria-current="page"
              href="#"
              >로그인</a
            >
            <ul class="dropdown-menu" id="loginDropdown">
              <form id="form-login" method="post" action="">
                <input type="hidden" name="action" value="login" />
                <div class="mb-3 mt-3">
                  <label for="email" class="form-label">아이디:</label>
                  <input
                    type="text"
                    class="form-control"
                    id="userid"
                    placeholder="아이디"
                    name="userid"
               		value="${saveid}" />
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value="ok"
                    id="saveid"
                    name="saveid"
                     />
                  <label class="form-check-label" for="saveid">
                    아이디저장
                  </label>
                </div>
                <div class="mb-3">
                  <label for="pwd" class="form-label">비밀번호:</label>
                  <input
                    type="password"
                    class="form-control"
                    id="userpwd"
                    placeholder="비밀번호"
                    name="userpwd" />
                </div>
                <button type="submit" id="btn-login" class="btn btn-primary">
                  로그인
                </button>
              </form>
            </ul>
          </div>
        </li>
      </ul>
  	<!-- </c:if> -->
  	
  	<!-- <c:if test="${not empty userinfo}">
      로그인 후
      <ul class="navbar-nav mb-2 me-2 mb-lg-0">
       <li class="nav-item">
       <a class="nav-link" aria-current="page" style="font-weight : bold;">
	        	<strong >${userinfo.userName}</strong> (${userinfo.userId})님 안녕하세요.</a
	      >      	
      	</li>
       <li class="nav-item">
	      <a class="nav-link" aria-current="page" href="${root}/article?action=list">
	        	공지사항</a
	      >
	    </li>
        <li class="nav-item">
          <a class="nav-link" aria-current="page" href="${root}/user?action=logout">로그아웃</a>
        </li>
        <li class="nav-item">
       	<c:if test="${userinfo.userId == 'admin'}">
          <a class="nav-link" aria-current="page" href="${root}/user?action=adminUserList"
            >회원 관리</a
          >
        </c:if>
        <c:if test="${userinfo.userId != 'admin'}">
          <a class="nav-link" aria-current="page" href="${root}/user?action=mvModifyUserInfo"
            >회원 정보 수정</a
          >
        </c:if>
        </li>
      </ul>
  	</c:if> -->
    </div>
  </div>
</nav>

</template>

<style scoped>
@import "@/assets/css/login.css";
</style>