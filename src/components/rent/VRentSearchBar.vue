
<script setup>
import { ref, onMounted } from 'vue';

// Store Import
import { storeToRefs } from 'pinia';
import { useRentStore } from '@/stores/rentStore';

// Component Import
import VSelect from "@/components/common/VSelectRent.vue";
import VRentOptions from './VRentOptions.vue';



const rentStore = useRentStore();
const {
    // State
    sidoList,
    gugunList,
    dongList,

    // Action
    changeSido,
} = storeToRefs(rentStore);

const { getSidoList, search } = rentStore;


  // Data
  const deposit = ref(0);
  const monthly = ref(0);
  const endDate = ref("");
  const startDate = ref("");
  const options = ref([]);

onMounted(() => {
    getSidoList();
});

const sendData = () => {
    search({
      deposit:deposit.value,
      monthly:monthly.value,
      endDate:endDate.value,
      startDate:startDate.value,
      options:options.value,
    });
}

</script>

<template>
    <VRentOptions />
    <div class="vselect-container">
        <VSelectRent type="sido" :selectOption="sidoList" @onKeySelect="changeSido" />
        <VSelectRent type="gugun" :selectOption="gugunList" @onKeySelect="gugunChange" />
        <VSelectRent type="dong" :selectOption="dongList" @onKeySelect="dongChange" />
    </div>

    <!--  -->
    <input v-model="deposit" type="number" name="deposit" id="" placeholder="deposit">
    <input v-model="monthly" type="number" name="monthly" id="" placeholder="monthly">
    <input v-model="startDate" type="date" name="startDate" id="" placeholder="startDate">
    <input v-model="endDate" type="date" name="endDate" id="">
    <fieldset>
        <legend>필요한 옵션을 선택하세요:</legend>

        <div>
            <input type="checkbox" id="scales" name="bed" value="0" v-model="options" />
            <label for="scales">침대</label>
        </div>
        <div>
            <input type="checkbox" id="horns" name="ref" value="1" v-model="options" />
            <label for="horns">냉장고</label>
        </div>
        <div>
            <input type="checkbox" id="horns" name="laun" value="2" v-model="options" />
            <label for="horns">세탁기</label>
        </div>
        <div>
            <input type="checkbox" id="horns" name="dest" value="3" v-model="options" />
            <label for="horns">책상</label>
        </div>
        <div>
            <input type="checkbox" id="horns" name="chair" value="4" v-model="options" />
            <label for="horns">의자</label>
        </div>
        <div>
            <input type="checkbox" id="horns" name="dry" value="5" v-model="options" />
            <label for="horns">건조기</label>
        </div>
        <div>
            <input type="checkbox" id="horns" name="oven" value="6" v-model="options" />
            <label for="horns">전자레인지</label>
        </div>
        <div>
            <input type="checkbox" id="horns" name="inter" value="7" v-model="options" />
            <label for="horns">인터넷</label>
        </div>
    </fieldset>
    <button @click="sendData">불러오기</button>
</template>

<style scoped>
.vselect-container {
    position: absolute;
    left: 150px;
    top: 180px;
    z-index: 3;
    /* display: flex; */
    /* background-color: white; */
    /* width:400px; */
}
</style>
