<!-- 토큰 만료 테스트 페이지 -->
<script setup>
import { storeToRefs } from "pinia";
import { useUserStore } from "@/stores/user";

const storeUser = useUserStore();
const { userInfo } = storeToRefs(storeUser);
const { selectUserInfo } = storeUser;

// Created
// 8. 데이터 요청 (accessToken 이용)
await selectUserInfo();
</script>

<template>
  <b-container>
    <b-row>
      <b-col v-if="userInfo">
        <h1>아이디: {{ userInfo.id }}</h1>
        <h1>이름: {{ userInfo.name }}</h1>
      </b-col>
    </b-row>
  </b-container>
</template>

<style scoped></style>
