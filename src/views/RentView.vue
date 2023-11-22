<script setup>
import { ref, onMounted, watch } from "vue";

// Store Import
import { useRentStore } from "@/stores/rentStore";
import { storeToRefs } from "pinia";

// API Import
import { getApartDealInfo } from "@/api/apart";

// Component Import
import VKakaoMap from "../components/common/VKakaoMap.vue";
import HouseSearchBar from "../components/house/HouseSearchBar.vue";
import VRentSearchBar from "../components/rent/VRentSearchBar.vue";

//Store
const rentStore = useRentStore();
const {
  selectedSido,
  selectedGugun,
  selectedDong,
  // apartDealList,
  // markerPositions,
} = storeToRefs(rentStore);

// const {getCurrentLocation} = houseStore;

// Data

let debounce = null;
</script>

<template>
  <RouterView></RouterView>
  <!-- <VRentSearchBar /> -->
  <!-- <VKakaoMap /> -->
  <!-- <SideInfoModal /> -->
</template>

<style scoped></style>
