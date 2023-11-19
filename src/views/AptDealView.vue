<script setup>
import VKakaoMap from '../components/common/VKakaoMap.vue';
import { ref, onMounted, watch } from "vue";
import { getAddress } from "@/api/sido";
import { getApartDealInfo } from "@/api/apart";
import VSelect from "@/components/common/VSelect.vue";

const sidoList = ref([]);
const gugunList = ref([{ text: "구군선택", value: "" }]);
const dongList = ref([{ text: "법정동선택", value: "" }]);

// const selected = ref("");
// const selected = ref({
//     sido: "",
//     gugun: "",
//     dong: "",
// });
const selectedSido = ref({ text: "", code: "" });
const selectedGugun = ref({ text: "", code: "" });
const selectedDong = ref({ text: "", code: "" });

const currentLocation = ref({});
const apartDealList = ref([]);

const markerList = ref([]);


onMounted(() => {
    getSidoList();
})

// 시도 얻기
const getSidoList = () => {
    getAddress(
        {
            regcode_pattern: "*00000000",
            is_ignore_zero: true,
        },
        ({ data }) => {
            // console.log(data.regcodes);
            let options = [];
            options.push({ text: "시도선택", value: "" });
            data.regcodes.forEach((sido) => {
                options.push({ text: sido.name, value: sido.code });
            });
            sidoList.value = options;
        },
        (err) => {
            console.log(err);
        }
    )
}
const sidoChange = (key) => {
    selectedSido.value.code = key.value;
    selectedSido.value.text = key.text;
    gugunList.value = [{ text: "구군선택", value: "" }];
    dongList.value = [{ text: "법정동선택", value: "" }];
    getAddress({
        regcode_pattern: key.value.substr(0, 2) + "*0000",
        is_ignore_zero: true,
    },
        ({ data }) => {
            // console.log("구군 정보 : ", data);
            let options = [...gugunList.value];
            data.regcodes.forEach((gugun) => {
                // options.push({ text: gugun.name.split(" ")[1], value: gugun.code });
                options.push({ text: gugun.name, value: gugun.code });
            });
            gugunList.value = options;
        },
        (err) => {
            console.log(err);
        })
}
const gugunChange = (key) => {
    selectedGugun.value.code = key.value;
    selectedGugun.value.text = key.text;
    dongList.value = [{ text: "구군선택", value: "" }];
    // 구군 정보가 불러와졌다면 동 정보 불러오기
    getAddress({
        regcode_pattern: key.value.substr(0, 5) + "*",
        is_ignore_zero: true,
    },
        ({ data }) => {
            // console.log("법정동 정보 : ", data);
            let options = [...dongList.value];
            data.regcodes.forEach((dong) => {
                options.push({ text: dong.name, value: dong.code });
            });
            dongList.value = options;
        },
        (err) => {
            console.log(err);
        })
}
const dongChange = (key) => {
    // console.log("key : ", key)
    selectedDong.value.code = key.value;
    selectedDong.value.text = key.text;
    getCurrentLocation();
    getApartList();
    setMarkerList();
}

const getCurrentLocation = async () => {
    // console.log("asdasd",selectedDong.value.text);
    var geocoder = new kakao.maps.services.Geocoder();
    await geocoder.addressSearch(selectedDong.value.text, (result, status) => {
        if (status === kakao.maps.services.Status.OK) {
            // console.log(result);
            const curLatLng = {
                lat: result[0].y, // 위도
                lng: result[0].x, // 경도
            }
            currentLocation.value = curLatLng;
            // currentLocation.value.lat =  result[0].x;
            // currentLocation.value.lng =  result[0].y;
        }
    });
}

const getApartList =  async () => {
     await getApartDealInfo({
        serviceKey: import.meta.env.VITE_OPEN_API_SERVICE_KEY,
        LAWD_CD: selectedGugun.value.code.substring(0, 5), //앞의 5개가 지역코드임
        DEAL_YMD: 202301,
    },
         ({ data }) => {
            console.log("지역 코드 ", selectedGugun.value.code.substring(0, 5));
            apartDealList.value = data.response.body.items.item;
            console.log("apartDealList.value",apartDealList.value);
            // setMarkerList();
        },
        (err) => {
            console.log(err);
        }
    );
}
watch(apartDealList, () => {
    // markerList.value.clear()];
    markerList.value.splice(0,markerList.value.length);
    console.log("markerList.value : ", markerList.value);
    setMarkerList();
})
const setMarkerList =  async () => {
    const apts = [];
    var geocoder = new kakao.maps.services.Geocoder();
 
    for(const apt of apartDealList.value) {
        const len = selectedDong.value.text.split(" ").length;
        const dong = selectedDong.value.text.split(" ")[len-1].trim();
        if(apt['법정동'].trim() === dong) {
            // geocoder.addressSearch(apt['도로명'].trim(), (result, status) => {
                let add = apt['중개사소재지'].trim() + " " + apt['법정동'].trim() + " " +  apt['지번'];
                console.log("add : ", add);
            await geocoder.addressSearch(add, (result, status) => {
                if (status === kakao.maps.services.Status.OK) {
                    // apts.push({
                    //     lat : result[0].y,
                    //     lng : result[0].x,
                    // });
                    // markerList.value = apts;
                    markerList.value.push({
                        lat : result[0].y,
                        lng : result[0].x,
                    });
                }
            },
            {
                analyze_type : 'EXACT',
            });
        }
    }


    // if문으로 하나만 주었을 떄
    // const apt = (apartDealList.value)[0]
    // console.log("apt : " , apt);
    //             let add = apt['중개사소재지'].trim() + " " + apt['법정동'].trim() + " " +  apt['지번'];
    //             console.log("add : ", add);
    //         await geocoder.addressSearch(add, (result, status) => {
    //             if (status === kakao.maps.services.Status.OK) {
    //                 apts.push({
    //                     lat : result[0].y,
    //                     lng : result[0].x,
    //                 });
    //                 markerList.value = apts;
    //             }
    //         },
    //         {
    //             analyze_type : 'EXACT',
    //         });

    //  apartDealList.value.forEach((apt) => {
    //     const len = selectedDong.value.text.split(" ").length;
    //     const dong = selectedDong.value.text.split(" ")[len-1].trim();
    //     if(apt['법정동'].trim() === dong) {
    //         // geocoder.addressSearch(apt['도로명'].trim(), (result, status) => {
    //             let add = apt['중개사소재지'].trim() + " " + apt['법정동'].trim() + " " +  apt['지번'];
    //             console.log("add : ", add);
    //         geocoder.addressSearch(add, (result, status) => {
    //             if (status === kakao.maps.services.Status.OK) {
    //                 apts.push({
    //                     lat : result[0].y,
    //                     lng : result[0].x,
    //                 });
    //             }
    //         },
    //         {
    //             analyze_type : 'EXACT',
    //         });
    //     }
    // });
    // markerList.value = apts;
    // console.log("markerList.value",markerList.value)
    // console.log("markerList에 변화 일어남");
}

</script>

<template>
    <!-- <v-select @update:modelValue="sidoChange" label="시도정보" :items="sidoList" :item-title="'text'" :item-value="'value'"
            variant="solo-filled"></v-select>
        <v-select @update:modelValue="gugunChange" label="구군정보" :items="gugunList" :item-title="'text'" :item-value="'value'"
            variant="solo-filled"></v-select>
        <v-select @update:modelValue="dongChange" label="법정동정보" :items="dongList" :item-title="'text'" :item-value="'value'" variant="solo-filled"></v-select> -->

    <VSelect :selectOption="sidoList" @onKeySelect="sidoChange" />
    <VSelect :selectOption="gugunList" @onKeySelect="gugunChange" />
    <VSelect :selectOption="dongList" @onKeySelect="dongChange" />
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

    <VKakaoMap :currentLocation="currentLocation" :markerList="markerList" :apartDealList="apartDealList" />
</template>

<style scoped>
.tmp {
    width: 1000px;
    border: 1px solid rgba(0, 0, 0, 0.15);
    position: absolute !;
}
</style>