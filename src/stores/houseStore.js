import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

// API Import
import { getAddress } from "@/api/sido";
import { getApartDealInfo } from "@/api/apart";

export const useHouseStore = defineStore('house', () => {
    // State
    const sidoList = ref([{ text: "시/도 선택", code: "" }]);
    const gugunList = ref([{ text: "구/군 선택", code: "" }]);
    const dongList = ref([{ text: "법정동 선택", code: "" }]);


    const selectedSido = ref({ text: "", code: "" });
    const selectedGugun = ref({ text: "", code: "" });
    const selectedDong = ref({ text: "", code: "" });

    const apartDealList = ref([]);

    const markerPositions = ref([]);


    // Getters
    const isReadyToSearch = computed(() => selectedDong.value.code === "" ? false : true);

    // if(selectedDong.value.code === "") {
    //     return false;
    // }else {
    //     return true;
    // }


    // Actions

    // 시/도 목록 얻기
    function getSidoList() {
        getAddress(
            {
                regcode_pattern: "*00000000",
                is_ignore_zero: true,
            },
            ({ data }) => {
                let options = [];
                options.push({ text: "시/도 선택", code: "" });
                data.regcodes.forEach((sido) => {
                    options.push({ text: sido.name, code: sido.code });
                });
                sidoList.value = options;
            },
            (err) => {
                console.log(err);
            }
        )
    }

    function changeSido() {
        // selectedDong.value = {code : "", text : "",};
        selectedDong.value.code = "";
        selectedDong.value.text = "";
        gugunList.value = [{ text: "구군선택", code: "" }];
        dongList.value = [{ text: "법정동선택", code: "" }];
        getAddress({
            regcode_pattern: selectedSido.value.code.substr(0, 2) + "*0000",
            is_ignore_zero: true,
        },
            ({ data }) => {
                // console.log("구군 정보 : ", data);
                let options = [...gugunList.value];
                data.regcodes.forEach((gugun) => {
                    // options.push({ text: gugun.name.split(" ")[1], value: gugun.code });
                    const list = gugun.name.split(" ");
                    const addName = list[list.length - 1];
                    options.push({ text: addName, code: gugun.code });
                });
                gugunList.value = options;
            },
            (err) => {
                console.log(err);
            })
    }

    function changeGugun() {
        if (selectedDong.value.code !== "") {
            selectedDong.value.code = "";
            selectedDong.value.text = "";
        }
        dongList.value = [{ text: "법정동 선택", code: "" }];

        // 구군 정보가 불러와졌다면 동 정보 불러오기
        getAddress({
            regcode_pattern: selectedGugun.value.code.substr(0, 5) + "*",
            is_ignore_zero: true,
        },
            ({ data }) => {
                // console.log("법정동 정보 : ", data);
                let options = [...dongList.value];
                data.regcodes.forEach((dong) => {
                    const list = dong.name.split(" ");
                    const addName = list[list.length - 1];
                    options.push({ text: addName, code: dong.code });
                });
                dongList.value = options;
            },
            (err) => {
                console.log(err);
            })
    }

    function changeDong() {
        // console.log("key : ", key)
        // selectedDong.value.code = key.value;
        // selectedDong.value.text = key.text;

        // getCurrentLocation();
        // getApartList();
        // setMarkerList();
        search();
    }

    function search() {
        apartDealList.value = [];
        // markerPositions.value = [];
        // setTimeout(() => {
        // }, 50)
        getApartList();
    }

    // 내부 API

    const getCurrentLocation = () => {
        var geocoder = new kakao.maps.services.Geocoder();
    }

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
    return {
        // State
        sidoList,
        gugunList,
        dongList,
        selectedSido,
        selectedGugun,
        selectedDong,
        apartDealList,
        markerPositions,

        //getter
        isReadyToSearch,

        // Action
        getSidoList,
        changeSido,
        changeGugun,
        changeDong,
    }
})