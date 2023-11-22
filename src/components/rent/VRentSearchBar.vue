
<script setup>
import { ref, onMounted } from 'vue';

// Store Import
import { storeToRefs } from 'pinia';
import { useRentStore } from '@/stores/rentStore';

// Component Import
import VSelect from "@/components/common/VSelectRent.vue";



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
    <div class="rent-search-bar">
        <div class="btn">
              <label>
                  <input type="checkbox" name="check" value="1" v-model="options">
                  <span></span>
                  <i class="fa-solid fa-bed"></i>
                </label>
                <label>
                    <input type="checkbox" name="check" value="2" v-model="options">
                    <span></span>
                    <i class="fa-solid fa-toilet-portable"></i>
                </label>
            <label>
                <input type="checkbox" name="check" value="3" v-model="options">
                <span></span>
                <i class="fa-solid fa-bath"></i>
            </label>
            <label>
                <input type="checkbox" name="check" value="4" v-model="options">
                <span></span>
                <i class="fa-solid fa-kaaba"></i>
            </label>
            <label>
                <input type="checkbox" name="check" value="5" v-model="options">
                <span></span>
                <i class="fa-solid fa-shirt"></i>
            </label>
            <label>
                <input type="checkbox" name="check" value="6" v-model="options">
                <span></span>
                <i class="fa-solid fa-chair"></i>
            </label>
            <label>
                <input type="checkbox" name="check" value="7" v-model="options">
                <span></span>
                <i class="fa-solid fa-fire-burner"></i>
            </label>
            <label>
                <input type="checkbox" name="check" value="8" v-model="options">
                <span></span>
                <i class="fa-solid fa-wifi"></i>
            </label>
        </div>
            <VSelectRent type="sido" :selectOption="sidoList" @onKeySelect="changeSido" />
            <VSelectRent type="gugun" :selectOption="gugunList" @onKeySelect="gugunChange" />
            <VSelectRent type="dong" :selectOption="dongList" @onKeySelect="dongChange" />
        
            <div class="right-side">
                <div>
                    <label for="deposit">보증금  </label>
                    <input class="custom-date input" v-model="deposit" type="number" name="deposit" id="deposit" placeholder="deposit">
                </div>
                <div>
                    <label for="deposit">월세  </label>
                    <input class="custom-date input" v-model="monthly" type="number" name="monthly" id="" placeholder="monthly">
                </div>
                <div>
                    <label for="startDate">입주일  </label>
                    <input class="custom-date input" v-model="startDate" type="date" name="startDate" id="startDate" placeholder="startDate">
                </div>
                <div>
                    <label for="endDate">퇴거일  </label>
                    <input class="custom-date input" v-model="endDate" type="date" name="endDate" id="">
                </div>
                <div style="text-align: center; margin-left:50px">
                    <button class="search-btn" @click="sendData"><i class="fa-solid fa-magnifying-glass"></i></button>
                </div>
            </div>
    </div>
</template>

<style scoped>
@import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css");
.rent-search-bar {
    position: absolute;
    left: 100px;
    top: 160px;
    z-index: 3;
    /* display: flex; */
    background-color: white;
    padding: 40px;
    width:500px;
    border-radius: 10px;
    display: flex;
    justify-content: space-between;
    box-shadow: 0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22);
}
.custom-date {
    background-color: white;
}
.right-side{
    display: flex;
    flex-direction: column;
    justify-content: space-around;
}
input[text] {
    width:200px;
}
*,
*::before,
*::after {
    box-sizing: border-box;
}

* {
    margin: 0;
    padding: 0;
}

body {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    background: #000;
}

.btn {
    max-width: 140px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    gap: 20px;
}

.btn label {
    cursor: pointer;
    position: relative;
    width: 40px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.btn label input {
    appearance: none;
}

.btn label span {
    position: absolute;
    width: 100%;
    height: 100%;
    background: linear-gradient(#FFF, #EBF5FC, #EBF5FC);
    border-radius: 5px;
    box-shadow: inset 0 5px 1px 0 rgba(0, 0, 0, 0.1), 0 5px 15px rgba(0, 0, 0, 0.1), 0 -5px 15px rgba(0, 0, 0, 0.15);
}

.btn label i {
    position: relative;
    top: 3px;
    font-size: 1.5rem;
    color: #686868;
}

.btn label input:checked ~ span {
    box-shadow: inset 0 -5px 0 0 rgba(0, 0, 0, 0.2), 0 2px 10px rgba(0, 0, 0, 0.75);
    background: linear-gradient(#4a2b73, #59317a, #562b73);

}

.btn label input:checked ~ i {
    top: -3px;
    color: #FFF;
    /* filter: drop-shadow(0 0 5px #ea00ff) drop-shadow(0 0 8px #d400ff) drop-shadow(0 0 12px #ff00dd) drop-shadow(0 0 16px #c300ff) drop-shadow(0 0 5px#9900ff); */
}
.input {
    /* border: 1px solid black; */
    box-shadow: 2px 2px 7px 0 rgb(0, 0, 0, 0.2);
    width:200px;
    padding:5px;
    padding-left:5px;
  border: 2px solid lightgrey;
    outline: none;
    box-shadow: 0px 0px 20px -18px;
}
.input:hover {
  border: 2px solid lightgrey;
  box-shadow: 0px 0px 20px -17px;
}

.input:active {
  transform: scale(0.95);
}

.input:focus {
  border: 2px solid grey;
}
.search-btn {
    margin-left:10px;
    font-size: 25px;
    background-color: #5c546b; 
    color: white;
    width: 100px;
    border-radius: 7px;
}
input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}
label {
	display:inline-block;
	text-align:center;
	width:80px;
}
</style>
