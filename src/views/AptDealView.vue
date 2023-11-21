<script setup>
import { ref, onMounted, watch } from "vue";

// Store Import
import { useHouseStore } from "@/stores/houseStore";
import { storeToRefs } from "pinia";

// API Import
import { getApartDealInfo } from "@/api/apart";

// Component Import
import VKakaoMap from "../components/common/VKakaoMap.vue";
import HouseSearchBar from "../components/house/HouseSearchBar.vue";

//Store
const houseStore = useHouseStore();
const {
  selectedSido,
  selectedGugun,
  selectedDong,
  isReadyToSearch,
  apartDealList,
  markerPositions,
} = storeToRefs(houseStore);

// const {getSidoList} = houseStore;

// Data
const currentLocation = ref({});
const flag = ref(false);
const apts = ref([]);

const data = [];

// watch(isReadyToSearch, () => {
//     if(isReadyToSearch.value) {
//         console.log("검색 준비 완료!");
//         getCurrentLocation();
//         getApartList();
//     }else {
//         console.log("isReadyToSearch Watch 실행");
//     }
// })

const getCurrentLocation = async () => {
  var geocoder = new kakao.maps.services.Geocoder();
  const addr = `${selectedSido.value.text} ${selectedGugun.value.text} ${selectedDong.value.text}`;
  console.log("addr : ", addr);
  await geocoder.addressSearch(addr, (result, status) => {
    if (status === kakao.maps.services.Status.OK) {
      const curLatLng = {
        lat: result[0].y, // 위도
        lng: result[0].x, // 경도
      };
      currentLocation.value = curLatLng;
    }
  });
};

const getApartList = async () => {
  await getApartDealInfo(
    {
      serviceKey: import.meta.env.VITE_OPEN_API_SERVICE_KEY,
      LAWD_CD: selectedGugun.value.code.substring(0, 5), //앞의 5개가 지역코드임
      DEAL_YMD: 202301,
    },
    ({ data }) => {
      // console.log("지역 코드 ", selectedGugun.value.code.substring(0, 5));
      apartDealList.value = data.response.body.items.item;
      // console.log("apartDealList.value",apartDealList.value);
      // setMarkerList();
    },
    (err) => {
      console.log(err);
    }
  );
};

watch(apartDealList, async (ol, ne) => {
  // apartDealList를 초기화 하는 거면 밑의 로직은 실행 안되게 하는 if문
  if (apartDealList.value.length === 0) {
    return;
  }

  // markerPositions.value = [];
  // const apts = [];
  var geocoder = new kakao.maps.services.Geocoder();
  let i = 1;
  const size = apartDealList.value.length;
  for (const apt of apartDealList.value) {
    const len = selectedDong.value.text.split(" ").length;
    const dong = selectedDong.value.text.split(" ")[len - 1].trim();
    if (apt["법정동"].trim() === dong) {
      let add =
        apt["중개사소재지"].trim() +
        " " +
        apt["법정동"].trim() +
        " " +
        apt["지번"];
      await geocoder.addressSearch(
        add,
        (result, status) => {
          if (status === kakao.maps.services.Status.OK) {
            apts.value.push({
              latlng: new kakao.maps.LatLng(result[0].y, result[0].x),
              title: apt["아파트"],
              // lat : result[0].y,
              // lng : result[0].x,
            });
          }
        },
        {
          analyze_type: "EXACT",
        }
      );
    }
    if (i++ === size) {
      console.log("for문 안에서 apts : ", apts.value);
      console.log("for문 안에서 apts : ", apts);
      flag.value = true;
    }
  }
  //   console.log("apt :", apts)
  markerPositions.value = apts.value;
});
</script>

<template>
  <HouseSearchBar />
  <VKakaoMap :currentLocation="currentLocation" :markerList="markerList" />
</template>

<style scoped></style>
