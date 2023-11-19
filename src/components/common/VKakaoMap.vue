<script setup>
import { ref, watch, onMounted } from "vue";

// Store Import
import {storeToRefs } from 'pinia';
import {useHouseStore } from '@/stores/houseStore';

const houseStore = useHouseStore();


const {
    // State
    markerPositions,
} = storeToRefs(houseStore);

var map;
const positions = ref([]);
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

// watch(
//   ()=>props.markerList,
//   (ol,ne) => {
//     console.log("watch ( markerList 감지됨 )");
//     if(ne.length != 0 ) {

//       positions.value = [];
//       props.markerList.forEach((apart) => {
//         let obj = {};
//         obj.latlng = new kakao.maps.LatLng(apart.lat, apart.lng);
//         obj.title = apart.statNm;
  
//         positions.value.push(obj);
//       });
//       loadMarkers();
//     }
//     else {
//       positions.value = [];
//       loadMarkers();
//     }
//   },
//   { deep: true }
// );

watch(
  markerPositions,
  () => {
    if(markerPositions.length == 0) {
    }else {
      // loadMarkers();
      console.log("loadMarkers()")
    }
  }
);

watch(
  () => props.currentLocation,
  () => {
    // 이동할 위도 경도 위치를 생성합니다
    var moveLatLon = new kakao.maps.LatLng(
      props.currentLocation.lat,
      props.currentLocation.lng
    );

    // 지도 중심을 부드럽게 이동시킵니다
    // 만약 이동할 거리가 지도 화면보다 크면 부드러운 효과 없이 이동합니다
    map.panTo(moveLatLon);
    // map.panTo(moveLatLon);
    // var marker = new kakao.maps.Marker({
    //   map: map,
    //   position: new kakao.maps.LatLng(props.currentLocation.lat, map.getCenter().getLng()),
    // });
    // marker.setMap(map);
  },
  { deep: true }
);

const initMap = () => {
  const container = document.getElementById("map");
  const options = {
    center: new kakao.maps.LatLng(33.450701, 126.570667),
    level: 3,
  };
  map = new kakao.maps.Map(container, options);

  // loadMarkers();
};

const loadMarkers2 = () => {
  // 현재 표시되어있는 marker들이 있다면 map에 등록된 marker를 제거한다.


  // 마커를 생성합니다
}

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
  if (markers.value.length > 0) {
    markers.value.forEach((marker) => marker.setMap(null));
  }
};


function test() {
  console.log("props.markerList", props.markerList);
  console.log("markers", markers.value);
  console.log("positions", positions.value);
}
function test2() {
  positions.value = [];
  props.markerList.forEach((apart) => {
    let obj = {};
    obj.latlng = new kakao.maps.LatLng(apart.lat, apart.lng);
    obj.title = apart.statNm;

    positions.value.push(obj);
  });
  loadMarkers();
}
</script>

<template>
  <button class="btn" @click="test">markerList 출력</button>
  <button class="btn" @click="test2">마커그리기</button>

  <ul>
    <li v-for="(item) in markerPositions" :key="item.title">{{ item.title }}</li>
  </ul>

  <div id="map"></div>
</template>

<style>
#map {
  width: 100%;
  height: 800px;
}
</style>
