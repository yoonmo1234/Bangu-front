<script setup>
import { ref, onMounted } from 'vue';

// Store Import
import {storeToRefs } from 'pinia';
import {useHouseStore } from '@/stores/houseStore';

// Component Import
import VSelect from "@/components/common/VSelect.vue";

// const props = defineProps({toggle:Boolean});

const houseStore = useHouseStore();
const {
    // State
    sidoList,
    gugunList,
    dongList,

    // Action
    changeSido,
} = storeToRefs(houseStore);

const {getSidoList} = houseStore;


onMounted(() => {
    getSidoList();
});

</script>

<template>
        <div class="vselect-container">
            <VSelect type="sido" :selectOption="sidoList"  />
            <VSelect type="gugun" :selectOption="gugunList"  />
            <VSelect type="dong" :selectOption="dongList" />
        </div>
</template>

<style scoped>
.vselect-container {
    position: absolute;
    left : 150px;
    top : 180px;
    z-index: 3;
    /* display: flex; */
    /* background-color: white; */
    /* width:400px; */
}
</style>
