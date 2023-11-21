<script setup>
import { ref, watch, computed, onMounted } from "vue";

// Store Import
import { storeToRefs } from 'pinia';
import { useHouseStore } from '@/stores/houseStore';

const houseStore = useHouseStore();
let debounce = null;


const {
  // State
  markerPositions,
  selectedSido,
  selectedGugun,
  selectedDong,

} = storeToRefs(houseStore);

var map;
const positions = ref([]);
// const positions = computed(() => markerPositions);
const markers = ref([]);

const props = defineProps({ markerList: Array, currentLocation: Object, });
onMounted(() => {
  if (window.kakao && window.kakao.maps) {
    initMap();
  } else {
    const script = document.createElement("script");
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=${import.meta.env.VITE_KAKAO_MAP_SERVICE_KEY
      }&libraries=services,clusterer`;
    /* global kakao */
    script.onload = () => kakao.maps.load(() => initMap());
    document.head.appendChild(script);
  }
});

const initMap = () => {
  const container = document.getElementById("map");
  const options = {
    center: new kakao.maps.LatLng(33.450701, 126.570667),
    level: 3, 
  }; 
  map = new kakao.maps.Map(container, options);
}

watch(
  markerPositions,
  (ol, ne) => {
    clearTimeout(debounce);
    debounce = setTimeout(() => {
        if(markerPositions.value.length === 0) {
          deleteMarkers();
          moveLocation();
          return;
        }
        else {
         loadMarkers();
        }
    },50)
  }
)

const loadMarkers = () => {
  // 현재 표시되어있는 marker들이 있다면 map에 등록된 marker를 제거한다.
  deleteMarkers();

  // 마커 이미지를 생성합니다
  //   const imgSrc = require("@/assets/map/markerStar.png");
  // 마커 이미지의 이미지 크기 입니다
  //   const imgSize = new kakao.maps.Size(24, 35);
  //   const markerImage = new kakao.maps.MarkerImage(imgSrc, imgSize);

  // 마커를 생성합니다
  markers.value = [];
  markerPositions.value.forEach((position) => {
    const marker = new kakao.maps.Marker({
      map: map, // 마커를 표시할 지도
      position: position.latlng, // 마커를 표시할 위치
      title: position.title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됨.
      clickable: true, // // 마커를 클릭했을 때 지도의 클릭 이벤트가 발생하지 않도록 설정합니다
      // image: markerImage, // 마커의 이미지
    });
    markers.value.push(marker);
  });

  // 4. 지도를 이동시켜주기
  // 배열.reduce( (누적값, 현재값, 인덱스, 요소)=>{ return 결과값}, 초기값);
  const bounds = markerPositions.value.reduce(
    (bounds, position) => bounds.extend(position.latlng),
    new kakao.maps.LatLngBounds()
  );

  map.setBounds(bounds);

};

const deleteMarkers = () => {
  console.log("deleteMarkers");
  console.log("markers.value.length",markers.value.length);
  if (markers.value.length > 0) {
    markers.value.forEach((marker) => {
      console.log("marker: ",marker);
      marker.setMap(null)
    });
  }
};
const moveLocation = async () => {
        var geocoder = new kakao.maps.services.Geocoder();
        const addr = `${selectedSido.value.text} ${selectedGugun.value.text} ${selectedDong.value.text}`;
        console.log("addr : ", addr);
        await geocoder.addressSearch(addr, (result, status) => {
            if (status === kakao.maps.services.Status.OK) {
                const curLatLng = {
                    lat: result[0].y, // 위도
                    lng: result[0].x, // 경도
                }
                // currentLocation.value = curLatLng;
                map.panTo(curLatLng);
            }
        });
    }

</script>

<template>


  <div id="map"></div>
</template>

<style>
#map {
  width: 100%;
  height:100vh;
}
#mu-header {
  position: static;
}
</style>
