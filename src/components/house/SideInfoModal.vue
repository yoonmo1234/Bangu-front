<script setup>
import { ref, watch,computed } from "vue";
import { useHouseStore } from '@/stores/houseStore';
import { storeToRefs } from 'pinia';

//Store
const houseStore = useHouseStore();
const {
    selectedDong,
    apartDealList,
} = storeToRefs(houseStore);
const toggle = ref(true);

const a = computed(() => apartDealList.value);
watch(
    selectedDong.value,
    () => {
        console.log(" 실행됨")
        console.log(apartDealList.value);
        if (selectedDong.code !== "") {
            openNav();
        } else {
            closeNav();
        }
    }
)
function openNav() {
    document.getElementById("mySidenav").style.width = "400px";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}
</script>

<template>
    <div id="mySidenav" class="sidenav">
        <button class="closebtn" @click="closeNav">&times;</button>
        <div v-for="(item, index) in apartDealList" :key="index" class="card">
            <div class="container">
                <h4><b>{{ item['아파트'] }}</b></h4>
                <p>주소 : {{ item['중개사소재지'] }}</p>
                <p> 건축년도{{ item['건축년도'] }}</p>
                <p> 거래금액{{ item['거래금액'] }},000</p>
            </div>
        </div>
    </div>
</template>

<style scoped>
.sidenav {
    border-radius: 5px;
    height: 750px;
    width: 0;
    /* width:400px; */
    position: fixed;
    z-index: 5;
    top: 150px;
    right: 0;
    background-color: #5c546b;
    overflow-x: hidden;
    transition: 0.5s;
    overflow-y: scroll;
    padding-top: 40px;
}

.sidenav a {
    padding: 8px 8px 8px 32px;
    text-decoration: none;
    font-size: 25px;
    color: #818181;
    display: block;
    transition: 0.3s;
}

.sidenav a:hover {
    color: #f1f1f1;
}

.sidenav .closebtn {
    color: white;
    position: absolute;
    top: 0;
    right: 25px;
    font-size: 36px;
    margin-left: 50px;
}

.card {
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    transition: 0.3s;
    width: 300px;
    background-color: white;
    padding: 20px;
    margin: 30px;
    margin-left: 42px;
}

.card:hover {
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
}

.container {
    padding: 2px 16px;
}
</style>