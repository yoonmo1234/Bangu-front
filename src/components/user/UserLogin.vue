<script setup>
import { onMounted } from "vue";
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import { useMemberStore } from "@/stores/member";

const router = useRouter();
const memberStore = useMemberStore();
const { isLogin } = storeToRefs(memberStore);
const { userLogin, getUserInfo, signUpUser } = memberStore;

const loginUser = ref({
  userId: "",
  userPwd: "",
});

const newUser = ref({
  userId: "",
  userPwd: "",
  userName: "",
  email: "",
  emailId: "",
  emailDomain: "",
  gender:"",
});

const login = async () => {
  console.log("sign in");
  await userLogin(loginUser.value);
  let token = sessionStorage.getItem("accessToken");
  if (isLogin.value) {
    getUserInfo(token);
    isLogin.value = true;
  }
  router.push({ name: "index" });
};

const signUp = async () => {
  console.log("sign up");
  let emailInfo = newUser.value.email.split("@");
  newUser.value.emailId = emailInfo[0];
  newUser.value.emailDomain = emailInfo[1];
  delete newUser.value.email;

  console.log(newUser);

  await signUpUser(newUser.value);
  router.push({ name: "index" });
};

onMounted(() => {
  const signUpButton = document.getElementById("signUp");
  const signInButton = document.getElementById("signIn");
  const container = document.getElementById("container");
  signUpButton.addEventListener("click", () => {
    container.classList.add("right-panel-active");
  });

  signInButton.addEventListener("click", () => {
    container.classList.remove("right-panel-active");
  });
});
</script>

<template>
  <!-- <h2>Weekly Coding Challenge #1: Sign in/up Form</h2> -->
  <div class="container" id="container">
    <div class="form-container sign-up-container">
      <div class="form">
        <h1 style="font-family: 'Noto Sans KR', sans-serif;">회원가입</h1>
        <div class="social-container">
          <a href="#" class="social"><i class="fab fa-facebook-f"></i></a>
          <a href="#" class="social"><i class="fab fa-google-plus-g"></i></a>
          <a href="#" class="social"><i class="fab fa-linkedin-in"></i></a>
        </div>
        <!-- <span>or use your email for registration</span> -->
        <input type="text" placeholder="아이디" v-model="newUser.userId" />
        <input type="text" placeholder="이름" v-model="newUser.userName" />
        <input type="email" placeholder="Email" v-model="newUser.email" />
        <input
          type="password"
          placeholder="비밀번호"
          v-model="newUser.userPwd" />
          <br>
          <div class="genderOption">
            <label for="male">남자
            <input type="radio" id="male" name="male" placeholder="남자" value="MALE" v-model="newUser.gender" />
            </label>
            <label for="female">여자
              <input type="radio" id="female" name="female" placeholder="여자" value="FEMALE" v-model="newUser.gender" />
            </label>
          </div>
        <button style="margin-top: 15px;" @click="signUp">가입하기</button>
      </div>
    </div>
    <div class="form-container sign-in-container">
      <div class="form">
        <h1>로그인</h1>
        <div class="social-container">
          <a href="#" class="social"><i class="fab fa-facebook-f"></i></a>
          <a href="#" class="social"><i class="fab fa-google-plus-g"></i></a>
          <a href="#" class="social"><i class="fab fa-linkedin-in"></i></a>
        </div>
        <span>or use your account</span>
        <input type="text" placeholder="아이디" v-model="loginUser.userId" />
        <input
          type="password"
          placeholder="비밀번호"
          v-model="loginUser.userPwd" />
        <a href="#">비밀번호를 잊으셨나요?</a>
        <button @click="login">Log In</button>
      </div>
    </div>
    <div class="overlay-container">
      <div class="overlay">
        <div class="overlay-panel overlay-left">
          <h1>환영합니다!</h1>
          <p>로그인을 하려면 밑의 LOG IN을 누르세요.</p>
          <button class="ghost" id="signIn">Log IN</button>
        </div>
        <div class="overlay-panel overlay-right">
          <h1>회원가입 하기</h1>
          <p>회원가입을 하려면 밑의 SIGN UP 버튼을 클릭하세요!</p>
          <button class="ghost" id="signUp">Sign Up</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Montserrat:400,800");
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@500&display=swap');

* {
  box-sizing: border-box;
}

body {
  background: #f6f5f7;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-family: "Montserrat", sans-serif;
  height: 100vh;
  margin: -20px 0 50px;
}

h1 {
  font-weight: bold;
  margin: 0;
}

h2 {
  text-align: center;
}

p {
  font-size: 14px;
  font-weight: 100;
  line-height: 20px;
  letter-spacing: 0.5px;
  margin: 20px 0 30px;
}

span {
  font-size: 12px;
}

a {
  color: #333;
  font-size: 14px;
  text-decoration: none;
  margin: 15px 0;
}

button {
  border-radius: 20px;
  border: 1px solid #744ebb;
  background-color: #5c546b;
  color: #ffffff;
  font-size: 12px;
  font-weight: bold;
  padding: 12px 45px;
  letter-spacing: 1px;
  text-transform: uppercase;
  transition: transform 80ms ease-in;
}

button:active {
  transform: scale(0.95);
}

button:focus {
  outline: none;
}

button.ghost {
  background-color: transparent;
  border-color: #ffffff;
}

.form {
  background-color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 50px;
  height: 100%;
  text-align: center;
}

input {
  background-color: #eee;
  border: none;
  padding: 12px 15px;
  margin: 8px 0;
  width: 100%;
}

.container {
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  position: relative;
  overflow: hidden;
  width: 768px;
  max-width: 100%;
  min-height: 600px;
  margin-top: 70px;
}

.form-container {
  position: absolute;
  top: 0;
  height: 100%;
  transition: all 0.6s ease-in-out;
}

.sign-in-container {
  left: 0;
  width: 50%;
  z-index: 2;
}

.container.right-panel-active .sign-in-container {
  transform: translateX(100%);
}

.sign-up-container {
  left: 0;
  width: 50%;
  opacity: 0;
  z-index: 1;
}

.container.right-panel-active .sign-up-container {
  transform: translateX(100%);
  opacity: 1;
  z-index: 5;
  animation: show 0.6s;
}

@keyframes show {
  0%,
  49.99% {
    opacity: 0;
    z-index: 1;
  }

  50%,
  100% {
    opacity: 1;
    z-index: 5;
  }
}

.overlay-container {
  position: absolute;
  top: 0;
  left: 50%;
  width: 50%;
  height: 100%;
  overflow: hidden;
  transition: transform 0.6s ease-in-out;
  z-index: 100;
}

.container.right-panel-active .overlay-container {
  transform: translateX(-100%);
}

.overlay {
  /* background: #5c546b; */
  background: linear-gradient(to right, #5c546b, #806ea3);
  background: linear-gradient(to left, #5c546b, #806ea3);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 0 0;
  color: #ffffff;
  position: relative;
  left: -100%;
  height: 100%;
  width: 200%;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
}

.container.right-panel-active .overlay {
  transform: translateX(50%);
}

.overlay-panel {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 40px;
  text-align: center;
  top: 0;
  height: 100%;
  width: 50%;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
}

.overlay-left {
  transform: translateX(-20%);
}

.container.right-panel-active .overlay-left {
  transform: translateX(0);
}

.overlay-right {
  right: 0;
  transform: translateX(0);
}

.container.right-panel-active .overlay-right {
  transform: translateX(20%);
}

.social-container {
  margin: 20px 0;
}

.social-container a {
  border: 1px solid #dddddd;
  border-radius: 50%;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  margin: 0 5px;
  height: 40px;
  width: 40px;
}

footer {
  background-color: #222;
  color: #fff;
  font-size: 14px;
  bottom: 0;
  position: fixed;
  left: 0;
  right: 0;
  text-align: center;
  z-index: 999;
}

footer p {
  margin: 10px 0;
}

footer i {
  color: red;
}

footer a {
  color: #3c97bf;
  text-decoration: none;
}
.genderOption {
  width: 100%;
  display: flex;
  justify-content: center;
  /* background-color: red; */
}
.genderOption > label {
  color: #686869;
  font-size: 15px;
  font-weight: bold;
}
</style>
