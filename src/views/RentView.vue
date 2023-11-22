<script setup>
import { ref, onMounted, watch } from "vue";

// Store Import
import {useRentStore } from '@/stores/rentStore';
import {storeToRefs } from 'pinia';

// API Import
import { getApartDealInfo } from "@/api/apart";

// Component Import
import VRentMap from '../components/common/VRentMap.vue';
import VRentSearchBar from "../components/rent/VRentSearchBar.vue";

//Store
const rentStore = useRentStore();
const {
    selectedSido,
    selectedGugun,
    selectedDong,
    rentRoomList,
} = storeToRefs(rentStore);

// const {getCurrentLocation} = houseStore;

// Data



let debounce = null;
</script>

<template>
    <!-- <ul v-for="(list, index) in rentRoomList" :key="index">
        <li> userId : {{ list.userId }}</li>
        <li> lat : {{ list.lat }}</li>
        <li> lng : {{ list.lat }}</li>
        <li> lat : {{ list.lat }}</li>
        <li> lat : {{ list.lat }}</li>
        <li> lat : {{ list.lat }}</li>
    </ul> -->
    
    <VRentSearchBar />
    <VRentMap />
    <!-- <VKakaoMap /> -->
    <!-- <SideInfoModal /> -->
</template>

<style scoped>
</style>