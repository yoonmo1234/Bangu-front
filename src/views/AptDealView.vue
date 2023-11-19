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
    isReadyToSearch,
    apartDealList,
    markerPositions
} = storeToRefs(houseStore);

// const {getSidoList} = houseStore;

// Data
const currentLocation = ref({});

watch(isReadyToSearch, () => {
    if(isReadyToSearch.value) {
        console.log("검색 준비 완료!");
        getCurrentLocation();
        getApartList();
    }
})

const getCurrentLocation = async () => {
    var geocoder = new kakao.maps.services.Geocoder();
    const addr = `${selectedSido.value.text} ${selectedGugun.value.text} ${selectedDong.value.text}`;
    console.log("addr : ", addr);
    await geocoder.addressSearch(addr, (result, status) => {
        if (status === kakao.maps.services.Status.OK) {
            const curLatLng = {
                lat: result[0].y, // 위도
                lng: result[0].x, // 경도
            }
            currentLocation.value = curLatLng;
        }
    });
}
watch(
    apartDealList,
    async () => {
 // Marker 포지션 구하기
    const apts = [];
    var geocoder = new kakao.maps.services.Geocoder();
 
    for(const apt of apartDealList.value) {
        const len = selectedDong.value.text.split(" ").length;
        const dong = selectedDong.value.text.split(" ")[len-1].trim();
        if(apt['법정동'].trim() === dong) {
                let add = apt['중개사소재지'].trim() + " " + apt['법정동'].trim() + " " +  apt['지번'];
                console.log("add : ", add);
            await geocoder.addressSearch(add, (result, status) => {
                if (status === kakao.maps.services.Status.OK) {
                    apts.push({
                        latlng: new kakao.maps.LatLng(result[0].y, result[0].x),
                        title : apt['아파트'],
                        // lat : result[0].y,
                        // lng : result[0].x,
                    });
                    // markerList.value = apts;
                    // markerList.value.push({
                    //     lat : result[0].y,
                    //     lng : result[0].x,
                    // });
                }
            },
            {
                analyze_type : 'EXACT',
            });
        }
    }
    console.log("apt :",apts)
    markerPositions.value = apts;
})
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
// watch(apartDealList, () => {
//     // markerList.value.clear()];
//     markerList.value.splice(0,markerList.value.length);
//     console.log("markerList.value : ", markerList.value);
//     setMarkerList();
// })
// const setMarkerList =  async () => {
//     const apts = [];
//     var geocoder = new kakao.maps.services.Geocoder();
 
//     for(const apt of apartDealList.value) {
//         const len = selectedDong.value.text.split(" ").length;
//         const dong = selectedDong.value.text.split(" ")[len-1].trim();
//         if(apt['법정동'].trim() === dong) {
//             // geocoder.addressSearch(apt['도로명'].trim(), (result, status) => {
//                 let add = apt['중개사소재지'].trim() + " " + apt['법정동'].trim() + " " +  apt['지번'];
//                 console.log("add : ", add);
//             await geocoder.addressSearch(add, (result, status) => {
//                 if (status === kakao.maps.services.Status.OK) {
//                     // apts.push({
//                     //     lat : result[0].y,
//                     //     lng : result[0].x,
//                     // });
//                     // markerList.value = apts;
//                     markerList.value.push({
//                         lat : result[0].y,
//                         lng : result[0].x,
//                     });
//                 }
//             },
//             {
//                 analyze_type : 'EXACT',
//             });
//         }
//     }
// }

</script>

<template>
    {{ isReadyToSearch }}
    <!-- <v-select @update:modelValue="sidoChange" label="시도정보" :items="sidoList" :item-title="'text'" :item-value="'value'"
            variant="solo-filled"></v-select>
        <v-select @update:modelValue="gugunChange" label="구군정보" :items="gugunList" :item-title="'text'" :item-value="'value'"
            variant="solo-filled"></v-select>
        <v-select @update:modelValue="dongChange" label="법정동정보" :items="dongList" :item-title="'text'" :item-value="'value'" variant="solo-filled"></v-select> -->


        <HouseSearchBar />

    <!-- <VSelect :selectOption="sidoList" @onKeySelect="sidoChange" />
    <VSelect :selectOption="gugunList" @onKeySelect="gugunChange" />
    <VSelect :selectOption="dongList" @onKeySelect="dongChange" /> -->



    <!-- <VSelect :selectOption="dongList"/> -->
    <!-- <select v-model="selected.sido" name="asdf" id="asdf">
            <option  v-for="(list) in sidoList" :key="list.value" :value="list.value">{{ list.text }}</option>
        </select>
        <select name="asdf" id="asdf">
            <option v-for="(list) in sidoList" :key="list.value" :value="list.value">{{ list.text }}</option>
        </select>
        <select name="asdf" id="asdf">
            <option v-for="(list) in sidoList" :key="list.value" :value="list.value">{{ list.text }}</option>
        </select> -->

    <VKakaoMap :currentLocation="currentLocation" :markerList="markerList" />
</template>

<style scoped>
.tmp {
    width: 1000px;
    border: 1px solid rgba(0, 0, 0, 0.15);
    position: absolute !;
}
</style>