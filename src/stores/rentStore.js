
import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

// API Import
import { getAddress } from "@/api/sido";
import { searchRentRoom } from '@/api/rent';

export const useRentStore = defineStore('rent', () => {
    // State
    const sidoList = ref([{ text: "시/도 선택", code: "" }]);
    const gugunList = ref([{ text: "구/군 선택", code: "" }]);
    const dongList = ref([{ text: "법정동 선택", code: "" }]);


    const selectedSido = ref({ text: "", code: "" });
    const selectedGugun = ref({ text: "", code: "" });
    const selectedDong = ref({ text: "", code: "" });

    const rentRoomList = ref([]);

    const markerPositions = ref([]);

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
        rentRoomList.value = [];
        markerPositions.value = [];
        // search(params);
    }

    function search(params) {
        console.log("search()");
        getRentRoomList(params);
    }

    const getRentRoomList = async (params) => {
        console.log("params: " ,JSON.stringify(params));
        await searchRentRoom(
            // {
            //     deposit:0,
            //     endDate:"",
            //     monthy:0,
            //     options: [
            //         0,
            //     ],
            //     startDate:"",
            // },
            params,
            ({data})=>{
                console.log("data : ", data);
                data.forEach((item)=> {
                    console.log("item" , item);
                    rentRoomList.value.push(item);
                });
            },
            (err) => {
                console.log(err);
            }
        )
    }

    return {
        // State
        sidoList,
        gugunList,
        dongList,
        selectedSido,
        selectedGugun,
        selectedDong,
        rentRoomList,
        markerPositions,

        //getter
        // isReadyToSearch,

        // Action
        getSidoList,
        changeSido,
        changeGugun,
        changeDong,
        search,
    }
})