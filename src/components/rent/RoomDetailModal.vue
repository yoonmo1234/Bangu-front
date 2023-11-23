<script setup>
import { ref, onMounted, defineProps, defineEmits } from "vue";
import { useRoomStore } from "@/stores/roomStore";
import { storeToRefs } from "pinia";

const props = defineProps({ roomId: Number });
const roomStore = useRoomStore();
const { getRoomInfo } = roomStore;
const { roomInfo } = storeToRefs(roomStore);

onMounted(() => {
  if (window.kakao && window.kakao.maps) {
    initMap();
  } else {
    const script = document.createElement("script");
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=${
      import.meta.env.VITE_KAKAO_MAP_SERVICE_KEY
    }&libraries=services,clusterer`;
    /* global kakao */
    script.onload = () => kakao.maps.load(() => initMap());
    document.head.appendChild(script);
  }
});

var map;
const initMap = () => {
  const container = document.getElementById("map");
  const options = {
    center: new kakao.maps.LatLng(33.450701, 126.570667),
    level: 3,
  };
  map = new kakao.maps.Map(container, options);
};
</script>

<template>
  <div class="detail-container" v-if="roomInfo != null">
    <div class="container">
      <div class="property-details">
        <div id="map" style="width: 300px"></div>
        <div class="title">
          <h2>{{ roomInfo.subject }}</h2>
          <button class="closebtn" @click="closeNav">&times;</button>
        </div>
        <div class="content">
          <p>{{ roomInfo.comment }}</p>
        </div>
        <div class="money">
          <h3>임대료</h3>
          <div style="display: flex">
            <div class="deposit">
              <strong>보증금</strong>{{ roomInfo.deposit }}만원
            </div>
            <div class="rent">
              <strong>월세</strong> {{ roomInfo.monthly }}만원
            </div>
          </div>
        </div>
        <div class="options">
          <h3>옵션</h3>
          <ul>
            <li>침대</li>
            <li>냉장고</li>
            <li>전자레인지</li>
            <li>인터넷</li>
            <li>세탁기</li>
            <li>책상</li>
            <li>의자</li>
            <li>건조기</li>
            <!-- 다른 옵션들도 추가 가능 -->
          </ul>
        </div>
        <div class="dates">
          <h3>양도 기간</h3>
          <p>
            <span class="transfer-period"
              >{{ roomInfo.startDate }} ~ {{ roomInfo.endDate }}</span
            >
          </p>
        </div>
      </div>
      <div>
        <button class="transfer-btn">신청하기</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.closebtn {
  color: black;
  top: 0;
  right: 430px;
  font-size: 30px;
  margin-left: 50px;
}
.rent {
  margin-left: 3%;
}
.money {
  border-bottom: 2px solid #5c546b;
  padding-bottom: 10px;
  margin-bottom: 20px;
}

.money div {
  margin-bottom: 5px;
}

.money strong {
  color: #5c546b;
}

.transfer-btn {
  display: inline-block;
  margin-right: 10px;
  background-color: #5c546b;
  color: #fff;
  padding: 10px 20px;
  border-radius: 5px;
}
.container {
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  max-width: 800px;
  margin: 50px auto;
  padding: 20px;
  /* background-color: #fff; */
  background-color: #f5f5f5;
  border-radius: 8px;
  box-shadow: 0 19px 38px rgba(0, 0, 0, 0.3), 0 15px 12px rgba(0, 0, 0, 0.22);
}

h1,
h2,
h3 {
  color: #5c546b;
}

.property-details {
  display: flex;
  flex-direction: column;
  margin-top: 20px;
}

.title {
  border-bottom: 2px solid #5c546b;
  padding-bottom: 10px;
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
}

.content {
  margin-bottom: 20px;
}

.options h3 {
  color: #5c546b;
}

.options ul {
  list-style: none;
  padding: 0;
}

.options li {
  display: inline-block;
  margin-right: 10px;
  background-color: #5c546b;
  color: #fff;
  padding: 5px 10px;
  border-radius: 5px;
}

.dates {
  border-top: 2px solid #5c546b;
  padding-top: 20px;
  margin-top: 20px;
}

.dates p {
  margin: 0;
  border-bottom: 2px solid #5c546b;
  padding-bottom: 10px;
  margin-bottom: 20px;
}

.dates strong {
  color: #5c546b;
}

.dates .transfer-period {
  color: #555;
  font-size: large;
  font-weight: bold;
}

strong {
  color: #333;
}
</style>