<script setup>
import { ref, onMounted } from "vue";
import { useRoomStore } from "@/stores/roomStore.js";

const roomStore = useRoomStore();
const { registRoom } = roomStore;

const address = ref(null);
const roomInfo = ref({
  deposit: null,
  monthly: null,
  startDate: null,
  endDate: null,
  options: [],
  userId: null,
  subject: null,
  comment: null,
  lat: null,
  lng: null,
  fileInfos: [],
});

const opt = ref([]);

const registRoomTransfer = async () => {
  // console.log("registr room func");
  // await getLatLng();
  //await geocoder.addressSearch(address.value, callback);
  console.log("registRoomTransfer");
  await registRoom(roomInfo.value);
};

const sample4_execDaumPostcode = () => {
  console.log("execDaum");
  new daum.Postcode({
    oncomplete: function (data) {
      // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

      // 도로명 주소의 노출 규칙에 따라 주소를 표시한다.
      // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
      var roadAddr = data.roadAddress; // 도로명 주소 변수
      var extraRoadAddr = ""; // 참고 항목 변수

      // 법정동명이 있을 경우 추가한다. (법정리는 제외)
      // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
      if (data.bname !== "" && /[동|로|가]$/g.test(data.bname)) {
        extraRoadAddr += data.bname;
      }
      // 건물명이 있고, 공동주택일 경우 추가한다.
      if (data.buildingName !== "" && data.apartment === "Y") {
        extraRoadAddr +=
          extraRoadAddr !== "" ? ", " + data.buildingName : data.buildingName;
      }
      // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
      if (extraRoadAddr !== "") {
        extraRoadAddr = " (" + extraRoadAddr + ")";
      }

      // 우편번호와 주소 정보를 해당 필드에 넣는다.
      document.getElementById("sample4_postcode").value = data.zonecode;
      document.getElementById("sample4_roadAddress").value = roadAddr;
      document.getElementById("sample4_jibunAddress").value = data.jibunAddress;

      // 참고항목 문자열이 있을 경우 해당 필드에 넣는다.
      if (roadAddr !== "") {
        document.getElementById("sample4_extraAddress").value = extraRoadAddr;
      } else {
        document.getElementById("sample4_extraAddress").value = "";
      }

      var guideTextBox = document.getElementById("guide");
      // 사용자가 '선택 안함'을 클릭한 경우, 예상 주소라는 표시를 해준다.
      if (data.autoRoadAddress) {
        var expRoadAddr = data.autoRoadAddress + extraRoadAddr;
        guideTextBox.innerHTML = "(예상 도로명 주소 : " + expRoadAddr + ")";
        guideTextBox.style.display = "block";
      } else if (data.autoJibunAddress) {
        var expJibunAddr = data.autoJibunAddress;
        guideTextBox.innerHTML = "(예상 지번 주소 : " + expJibunAddr + ")";
        guideTextBox.style.display = "block";
      } else {
        guideTextBox.innerHTML = "";
        guideTextBox.style.display = "none";
      }
    },
  }).open();
};

const getLatLng = async () => {
  console.log("getLatLng");
  // 주소-좌표 변환 객체를 생성합니다
  var geocoder = new kakao.maps.services.Geocoder();

  // 주소로 좌표를 검색합니다
  await geocoder.addressSearch(address.value, function(result, status) {
  
      // 정상적으로 검색이 완료됐으면 
      if (status === kakao.maps.services.Status.OK) {
          roomInfo.value.lat = result[0].y;
          roomInfo.value.lng = result[0].x;
          var coords = new kakao.maps.LatLng(result[0].y, result[0].x);
          console.log(coords);
          // 결과값으로 받은 위치를 마커로 표시합니다
          var marker = new kakao.maps.Marker({
              map: map,
              position: coords
          });

          // 인포윈도우로 장소에 대한 설명을 표시합니다
          var infowindow = new kakao.maps.InfoWindow({
              content: '<div style="width:150px;text-align:center;padding:6px 0;">우리회사</div>'
          });
          infowindow.open(map, marker);

          // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
          map.setCenter(coords);
      } 
  }); 
}
   

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
  <div class="room-content" style="display: flex; justify-content: center; margin-bottom: 5%;">
    <div style="display: flex;flex-direction: column;">
      <div id="map" style="width:600px;"></div>
      <div class="inputBox_container">
        <svg class="search_icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" alt="search icon" @click="getLatLng">
          <path d="M46.599 46.599a4.498 4.498 0 0 1-6.363 0l-7.941-7.941C29.028 40.749 25.167 42 21 42 9.402 42 0 32.598 0 21S9.402 0 21 0s21 9.402 21 21c0 4.167-1.251 8.028-3.342 11.295l7.941 7.941a4.498 4.498 0 0 1 0 6.363zM21 6C12.717 6 6 12.714 6 21s6.717 15 15 15c8.286 0 15-6.714 15-15S29.286 6 21 6z">
          </path>
        </svg>
        <input class="inputBox" id="inputBox" type="text" placeholder="Search For Products" v-model="address">
      </div>
    </div>
    <div class="registration-form">
      <h2>원룸 양도 등록</h2>
      <div class="form-group-set">
        <div class="form-column">
          <div class="form-group">
            <label for="subject">제목 Subject:</label>
            <input
              class="subject-input"
              type="text"
              id="subject"
              name="subject"
              v-model="roomInfo.subject"
              required />
          </div>

          <div class="form-group">
            <label for="comment">장점 Comment:</label>
            <textarea
              id="comment"
              name="comment"
              rows="4"
              v-model="roomInfo.comment"
              required></textarea>
          </div>
          <div class="form-group">
            <label for="deposit">보증금 Deposit:</label>
            <input
              type="number"
              id="deposit"
              name="deposit"
              v-model="roomInfo.deposit"
              required />
          </div>

          <div class="form-group">
            <label for="monthlyRent">월세 Monthly Rent:</label>
            <input
              type="number"
              id="monthlyRent"
              name="monthlyRent"
              v-model="roomInfo.monthly"
              required />
          </div>
        </div>

        <div class="form-column">
          <div class="form-group">
            <label for="startDate">임대 시작 희망일 Start Date:</label>
            <input
              type="date"
              id="startDate"
              name="startDate"
              v-model="roomInfo.startDate"
              required />
          </div>

          <div class="form-group">
            <label for="endDate">임대 종료 희망일 End Date:</label>
            <input
              type="date"
              id="endDate"
              name="endDate"
              v-model="roomInfo.endDate"
              required />
          </div>

          <div class="form-group options-group">
            <label
              ><input
                type="checkbox"
                id="bed"
                name="bed"
                value="1"
                v-model="roomInfo.options" />
              Bed</label
            >
            <label
              ><input
                type="checkbox"
                id="refrigerator"
                name="refrigerator"
                value="2"
                v-model="roomInfo.options" />
              Refrigerator</label
            >
            <label
              ><input
                type="checkbox"
                id="microwave"
                name="microwave"
                value="3"
                v-model="roomInfo.options" />
              Microwave</label
            >
            <label
              ><input
                type="checkbox"
                id="internet"
                name="internet"
                value="4"
                v-model="roomInfo.options" />
              Internet</label
            >
            <label
              ><input
                type="checkbox"
                id="washer"
                name="washer"
                value="5"
                v-model="roomInfo.options" />
              Washer</label
            >
            <label
              ><input
                type="checkbox"
                id="desk"
                name="desk"
                value="6"
                v-model="roomInfo.options" />
              Desk</label
            >
            <label
              ><input
                type="checkbox"
                id="chair"
                name="chair"
                value="7"
                v-model="roomInfo.options" />
              Chair</label
            >

            <label
              ><input
                type="checkbox"
                id="dryer"
                name="dryer"
                value="8"
                v-model="roomInfo.options" />
              Dryer</label
            >
          </div>

          <div class="form-group image-input">
            <label for="propertyImage">Upload Property Image:</label>
            <input
              type="file"
              id="propertyImage"
              name="propertyImage"
              accept="image/*" />
          </div>
        </div>

        <div style="clear: both"></div>

        <button type="submit" @click="registRoomTransfer">Register</button>
      </div>
      <!-- <input type="text" id="sample4_postcode" placeholder="우편번호" />
      <input
        type="button"
        @onclick="sample4_execDaumPostcode"
        value="우편번호 찾기" /><br />
      <input type="text" id="sample4_roadAddress" placeholder="도로명주소" />
      <input type="text" id="sample4_jibunAddress" placeholder="지번주소" />
      <span id="guide" style="color: #999; display: none"></span>
      <input type="text" id="sample4_detailAddress" placeholder="상세주소" />
      <input type="text" id="sample4_extraAddress" placeholder="참고항목" /> -->
    </div>
  </div>
</template>

<style scoped>
/* search address button css */
.inputBox_container {
  display: flex;
  align-items: center;
  flex-direction: row;
  max-width: 14em;
  width: auto;
  height: fit-content;
  background-color: #5c6370;
  border-radius: 0.8em;
  overflow: hidden;
}

.search_icon {
  height: 1em;
  padding: 0 0.5em 0 0.8em;
  fill: #abb2bf;
}

.inputBox {
  background-color: transparent;
  color: #ffffff;
  outline: none;
  width: 100%;
  border: 0;
  padding: 0.5em 1.5em 0.5em 0;
  font-size: 1em;
}

::placeholder {
  color: #abb2bf;
}
/* #mu-header {
  position: static;
} */

body {
  font-family: Arial, sans-serif;
  background-color: #f0f0f0; 
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.registration-form {
  /* background-color: #5c546b; Updated background color */
  /* position: relative; */
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  width: 700px;
  max-width: 100%;
  box-sizing: border-box;
  /* margin: auto;
  margin-top: 130px; */
  color: #fff; /* Text color for better contrast */
}
.form-group-set {
  margin-top: 40px;
}
.yoon-btn-container {
  text-align: left;
}
.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  font-weight: bold;
  margin-bottom: 8px;
}

/* input[type="text"], */
.subject-input,
input[type="number"],
input[type="date"],
input[type="checkbox"] {
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
  border: none;
  border-radius: 4px;
  margin-top: 4px;
  background-color: #eee;
  color: #333;
}

input[type="file"] {
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
  border: none;
  border-radius: 4px;
  margin-top: 4px;
  background-color: #eee;
  color: #333;
  cursor: pointer;
}

input[type="checkbox"] {
  margin-top: 8px;
}

textarea {
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-top: 4px;
  resize: vertical;
}

button {
  background-color: #726886;
  color: #fff;
  padding: 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

button:hover {
  background-color: #45a049;
}

/* Styling for the options form-group */
.options-group {
  display: flex;
  flex-wrap: nowrap; /* Make it a single line */
  overflow-x: auto; /* Enable horizontal scrolling for small screens */
}

.options-group label {
  flex: 0 0 auto; /* Prevent flex items from growing */
  margin-right: 10px;
}

.options-group label:last-child {
  margin-right: 0; /* Remove right margin for the last item */
}

.image-input {
  margin-top: 20px;
}


</style>
