<script setup>
import { ref, onMounted, watch,} from "vue";

const props = defineProps({ toggle: Boolean });

// Store Import
import { useRentStore } from "@/stores/rentStore";
import { storeToRefs } from "pinia";

// API Import
import { getApartDealInfo } from "@/api/apart";

// Component Import

import VRentMap from "@/components/common/VRentMap.vue";
import VRentSearchBar from "../components/rent/VRentSearchBar.vue";
import RentInfoModal from "../components/rent/RentInfoModal.vue";

//Store
const rentStore = useRentStore();
const { selectedSido, selectedGugun, selectedDong, rentRoomList } =
  storeToRefs(rentStore);

// const {getCurrentLocation} = houseStore;

// Data

const toggle = ref(false);

let debounce = null;

const toggleUpdate = (newValue) => {
  toggle.value = newValue;
};
</script>

<template>
  <VRentSearchBar :toggle="toggle" @toggleUpdate="toggleUpdate" />
  <VRentMap />
  <RentInfoModal :toggle="toggle" @toggleToFalse="toggleUpdate" />
</template>

<style scoped></style>
