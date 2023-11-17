<script setup>
import VKakaoMap from '../components/common/VKakaoMap.vue';
import { ref, onMounted, watch } from "vue";
import { getAddress } from "@/api/sido";

const sidoList = ref([]);
const gugunList = ref([{ text: "구군선택", value: "" }]);
const dongList = ref([{ text: "법정동선택", value: "" }]);

// const selected = ref("");
// const selected = ref({
//     sido: "",
//     gugun: "",
//     dong: "",
// });
const selectedSido = ref("");
const selectedGugun = ref("");
const selectedDong = ref("");


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
            console.log(data.regcodes);
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
const sidoChange = (code) => {
    selectedSido.value = code;
    gugunList.value = [{ text: "구군선택", value: "" }];
    dongList.value = [{ text: "법정동선택", value: "" }];
    getAddress({
        regcode_pattern: code.substr(0, 2) + "*0000",
        is_ignore_zero: true,
    },
        ({ data }) => {
            console.log("구군 정보 : ", data);
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
const gugunChange = (code) => {
    selectedGugun.value = code;
    dongList.value = [{ text: "구군선택", value: "" }];
    // 구군 정보가 불러와졌다면 동 정보 불러오기
    getAddress({
        regcode_pattern: code.substr(0, 5) + "*",
        is_ignore_zero: true,
    },
        ({ data }) => {
            console.log("법정동 정보 : ", data);
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
const dongChange = (code) => {
    selectedDong.value = code;
}
</script>

<template>
    <v-select @update:modelValue="sidoChange" label="시도정보" :items="sidoList" :item-title="'text'" :item-value="'value'"
        variant="solo-filled"></v-select>
    <v-select @update:modelValue="gugunChange" label="구군정보" :items="gugunList" :item-title="'text'" :item-value="'value'"
        variant="solo-filled"></v-select>
    <v-select @update:modelValue="dongChange" label="법정동정보" :items="dongList" :item-title="'text'" :item-value="'value'" variant="solo-filled"></v-select>
    <!-- <select v-model="selected.sido" name="asdf" id="asdf">
        <option  v-for="(list) in sidoList" :key="list.value" :value="list.value">{{ list.text }}</option>
    </select>
    <select name="asdf" id="asdf">
        <option v-for="(list) in sidoList" :key="list.value" :value="list.value">{{ list.text }}</option>
    </select>
    <select name="asdf" id="asdf">
        <option v-for="(list) in sidoList" :key="list.value" :value="list.value">{{ list.text }}</option>
    </select> -->

    <VKakaoMap />
</template>

<style scoped>
.tmp {
    width: 1000px;
    border: 1px solid rgba(0, 0, 0, 0.15);
    position: absolute !;
}
</style>