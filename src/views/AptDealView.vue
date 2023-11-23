<script setup>
import { ref, onMounted, watch } from "vue";

// Store Import
import { useHouseStore } from '@/stores/houseStore';
import { storeToRefs } from 'pinia';

// API Import
import { getApartDealInfo } from "@/api/apart";

// Component Import
import VKakaoMap from '../components/common/VKakaoMap.vue';
import HouseSearchBar from "../components/house/HouseSearchBar.vue";
import SideInfoModal from "../components/house/SideInfoModal.vue";

//Store
const houseStore = useHouseStore();
const {
  selectedSido,
  selectedGugun,
  selectedDong,
  apartDealList,
  markerPositions,
  noApartFlag,
  toggle,
} = storeToRefs(houseStore);

const { getCurrentLocation } = houseStore;

// Data
const currentLocation = ref({});
const flag = ref(false);
// const apts = ref([]);


let debounce = null;

const getApartList = async () => {
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
  () => apartDealList.value,
  async () => {
    clearTimeout(debounce);
    debounce = setTimeout(async () => {
      console.log("watch(apartDealList)");
      // markerPositions.value = [];
      var geocoder = new kakao.maps.services.Geocoder();
      if (apartDealList.value.length === 0) {
        console.log("아파트 리슽 ㅡ크기 0");
        await geocoder.addressSearch(`${selectedSido.value.text} + ${selectedGugun.value.text}`, (result, status) => {
          if (status === kakao.maps.services.Status.OK) {
            markerPositions.value.push({
              latlng: new kakao.maps.LatLng(result[0].y, result[0].x),
              title: selectedGugun.value.text,
            });
          }
        });
      }
      else {
        for (const apt of apartDealList.value) {
          const len = selectedDong.value.text.split(" ").length;
          const dong = selectedDong.value.text.split(" ")[len - 1].trim();
          // if (apt['법정동'].trim() === dong) {
          let add = apt['중개사소재지'].trim() + " " + apt['법정동'].trim() + " " + apt['지번'];
          await geocoder.addressSearch(add, (result, status) => {
            if (status === kakao.maps.services.Status.OK) {
              markerPositions.value.push({
                latlng: new kakao.maps.LatLng(result[0].y, result[0].x),
                title: apt['아파트'],
              })
            }
          },
            {
              analyze_type: 'EXACT',
            });
          // }
        }
      }
    }, 50)
  },
  {
    deep: true,
  }
)
</script>

<template>
  <HouseSearchBar :toggle="toggle" />
  <VKakaoMap />
  <SideInfoModal />
</template>

<style scoped></style>