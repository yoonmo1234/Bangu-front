<script setup>
import { ref, onMounted } from "vue";
import { getAddress } from '@/api/sido';

import { getApartDealInfo } from "@/api/apart";
// Data
const sidoList = ref([]);
const gugunList = ref([{ text: "구군선택", value: "" }]);
const dongList = ref([]);

const apartList = ref([]);
const selectApt = ref({});

onMounted(() => {
    getSidoList();
})

const getSidoList = () => {
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
    );
}

const onChangeSido = (val) => {
    getAddress(
        {
            regcode_pattern: val.substr(0, 5) + "*",
            is_ignore_zero: true,
        },
        ({ data }) => {
            let options = [];
            options.push({ text: "구군선택", value: "" });
            data.regcodes.forEach((gugun) => {
                // options.push({ text: gugun.name.split(" ")[1], value: gugun.code });
                const list = gugun.name.split(" ");
                const addName = list[list.length - 1];
                options.push({ text: addName, value: gugun.code });
            });
            gugunList.value = options;
        },
        (err) => {
            console.log(err);
        })
};

const onChangeGugun = (val) => {
    listGugun(
        { sido: val },
        ({ data }) => {
            let options = [];
            options.push({ text: "법정동선택", value: "" });
            data.regcodes.forEach((dong) => {
                const list = dong.name.split(" ");
                const addName = list[list.length - 1];
                options.push({ text: addName, value: dong.code });
            });
            dongList.value = options;
        },
        (err) => {
            console.log(err);
        }
    );
};

const onChangeDong = (val) => {
  console.log("val : ", val)
  param.value.zscode = val;
  getApartList();
};

    const getApartList = async (val) => {
        let years = [
            202201,
            202202,
            202203,
            202204,
            202205,
            202206,
            202207,
            202208,
            202209,
            202210,
            202211,
            202212,
        ];
        let apartList = [];
        for(let i =0; i<years.length;i++) {
            await getApartDealInfo({
                serviceKey: import.meta.env.VITE_OPEN_API_SERVICE_KEY,
                LAWD_CD: val.value.substring(0, 5), //앞의 5개가 지역코드임
                DEAL_YMD: years[i],
            },
                ({ data }) => {
                    // console.log("data.response.body.items.item", data.response.body.items.item);
                    // apartDealList.value = data.response.body.items.item;
                    apartList.push(...data.response.body.items.item);
                },
                (err) => {
                    console.log(err);
                }
            );
        }
        setTimeout(() => {
            console.log("apartList",apartList);
            apartDealList.value = apartList;
        },1000)
    } // getApartList End
</script>

<template>
    <VSelect :selectOption="sidoList" @onKeySelect="onChangeSido" />
    <VSelect :selectOption="gugunList" @onKeySelect="onChangeGugun" />
    <VSelect :selectOption="dongList" @onKeySelect="onChangeDong" />
</template>

<style scoped></style>