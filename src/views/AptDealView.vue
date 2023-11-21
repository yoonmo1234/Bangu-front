<script setup>
import { ref, onMounted, watch } from "vue";

// Store Import
import {useHouseStore } from '@/stores/houseStore';
import {storeToRefs } from 'pinia';

// API Import
import { getApartDealInfo } from "@/api/apart";

// Component Import
import VKakaoMap from '../components/common/VKakaoMap.vue';
import HouseSearchBar from "../components/house/HouseSearchBar.vue";

//Store
const houseStore = useHouseStore();
const {
    selectedSido,
    selectedGugun,
    selectedDong,
    apartDealList,
    markerPositions,
    noApartFlag,
} = storeToRefs(houseStore);

const {getCurrentLocation} = houseStore;


// Data
const currentLocation = ref({});
const flag = ref(false);
// const apts = ref([]);


let debounce = null;

const getApartList =  async () => {
     await getApartDealInfo({
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
}

watch(
    apartDealList,
    async (ol, ne) => {
      let apts = [];
      // apartDealList를 초기화 하는 거면 밑의 로직은 실행 안되게 하는 if문
      clearTimeout(debounce);
      debounce = setTimeout(async () => {

      if(apartDealList.value.length === 0) {
        return;
      }
      else {
        // markerPositions.value = [];
        var geocoder = new kakao.maps.services.Geocoder();
      let i = 1;
      const size = apartDealList.value.length;
      for (const apt of apartDealList.value) {
            const len = selectedDong.value.text.split(" ").length;
          const dong = selectedDong.value.text.split(" ")[len - 1].trim();
          if (apt['법정동'].trim() === dong) {
            let add = apt['중개사소재지'].trim() + " " + apt['법정동'].trim() + " " + apt['지번'];
            await geocoder.addressSearch(add, (result, status) => {
              if (status === kakao.maps.services.Status.OK) {
                apts.push({
                  latlng: new kakao.maps.LatLng(result[0].y, result[0].x),
                  title: apt['아파트'],
                  // lat : result[0].y,
                  // lng : result[0].x,
                });
              }
            },
              {
                analyze_type: 'EXACT',
              });
          }
        }
        // if(apts.length === 0) {
        //   const pos = getCurrentLocation();
        //   apts.push({
        //     latlng:new kakao.maps.LatLng(pos.lat, pos.lng),
        //     title:"아파트없음",
        //   });
        //   markerPositions.value = apts;
        // }else {
        //   markerPositions.value = apts;
        // }
        setTimeout(() => {
          markerPositions.value = apts;
        },1000)
      }

      },50)
    }
)
</script>

<template>
    <HouseSearchBar />
    <VKakaoMap />
</template>

<style scoped>
</style>