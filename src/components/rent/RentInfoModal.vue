<script setup>
import { ref, watch, computed, defineProps, defineEmits } from "vue";
import RoomDetailModal from "./RoomDetailModal.vue";
import { useRentStore } from "@/stores/rentStore";
import { storeToRefs } from "pinia";
import { useRoomStore } from "@/stores/roomStore";
const props = defineProps({ toggle: Boolean });
const emit = defineEmits(["toggleToFalse"]);

//Store
const rentStore = useRentStore();
const { rentRoomList } = storeToRefs(rentStore);
const roomStore = useRoomStore();
const { getRoomInfo } = roomStore;
const a = computed(() => apartDealList.value);
watch(
  () => props.toggle,
  () => {
    console.log("rentInfoModal watch 실행됨");
    if (props.toggle) {
      document.getElementById("mySidenav").style.width = "500px";
    } else {
      document.getElementById("mySidenav").style.width = "0";
    }
  },
  {
    deep: true,
  }
);

function closeNav() {
  emit("toggleToFalse", false);
}

const viewDetail = async (roomId) => {
  await getRoomInfo(roomId);
};
</script>

<template>
  <div id="mySidenav" class="sidenav">
    <button class="closebtn" @click="closeNav">&times;</button>
    <div class="notifications-container">
      <div
        v-for="(item, index) in rentRoomList"
        :key="index"
        class="error-alert">
        <div class="flex">
          <div class="flex-shrink-0">
            <svg
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
              class="error-svg">
              <path
                clip-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                fill-rule="evenodd"></path>
            </svg>
          </div>
          <div class="error-prompt-container">
            <div style="display: flex">
              <p class="error-prompt-heading">{{ item["subject"] }}</p>
              <!-- <button class="detail-btn" @click="viewDetail(item['id'])">
                
              </button> -->
              <!-- <span class="detail-btn"> -->
              <RouterLink class="detail-btn" @click="viewDetail" :to="{name: 'roomDetail', params:{roomId: item['id']}}">상세보기</RouterLink>
            <!-- </span> -->
            </div>
            <div class="error-prompt-wrap">
              <ul class="error-prompt-list" role="list">
                <li>보증금 : : {{ item["deposit"] }}</li>
                <li>월세: {{ item["monthly"] }}</li>
                <!-- <li>메모: {{ item['comment'] }}</li> -->
                <li>유저: {{ item["userId"] }}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.detail-btn {
  display: inline-block;
  margin-left: 100px;
  background-color: #991b1b;
  color: #fff;
  padding: 3px 8px;
  border-radius: 5px;
}
.sidenav {
  border-radius: 5px;
  height: 680px;
  width: 0;
  /* width:400px; */
  position: fixed;
  z-index: 5;
  top: 140px;
  right: 0;
  background-color: #5c546b;
  overflow-x: hidden;
  transition: 0.5s;
  overflow-y: scroll;
  padding-top: 40px;
  display: flex;
  justify-content: center;
}

.sidenav a {
  display: inline-block;
  margin-left: 100px;
  background-color: #991b1b;
  color: #fff;
  padding: 3px 8px;
  border-radius: 5px;
}

.sidenav a:hover {
  color: #f1f1f1;
}

.sidenav .closebtn {
  color: white;
  position: absolute;
  top: 0;
  right: 430px;
  font-size: 30px;
  margin-left: 50px;
}

.card {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  width: 300px;
  background-color: white;
  padding: 20px;
  margin: 30px;
  margin-left: 42px;
}

.card:hover {
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
}

.container {
  padding: 2px 16px;
}

/*  */

.notifications-container {
  width: 400px;
  height: auto;
  font-size: 0.875rem;
  line-height: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.flex {
  display: flex;
}

.flex-shrink-0 {
  flex-shrink: 0;
}

.error-alert {
  border-radius: 0.375rem;
  /* padding: 1rem; */
  padding: 20px 0;
  background-color: rgb(254 242 242);
  margin: 10px 0;
  margin-left: 10px;
  width: 380px;
  padding-left: 20px;
}

.error-svg {
  color: #f87171;
  width: 1.25rem;
  height: 1.25rem;
}

.error-prompt-heading {
  color: #991b1b;
  font-size: 0.875rem;
  line-height: 1.25rem;
  font-weight: bold;
}

.error-prompt-container {
  display: flex;
  flex-direction: column;
  margin-left: 1.25rem;
}

.error-prompt-wrap {
  margin-top: 0.5rem;
  color: #b91c1c;
  font-size: 0.875rem;
  line-height: 1.25rem;
}

.error-prompt-list {
  padding-left: 1.25rem;
  margin-top: 0.25rem;
  list-style-type: disc;
}
</style>
