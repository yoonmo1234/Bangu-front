<script setup>
import { ref } from "vue";

// Store Import
import {storeToRefs } from 'pinia';
import {useRentStore } from '@/stores/rentStore';

const rentStore = useRentStore();
const {
    // State
    selectedSido,
    selectedGugun,
    selectedDong,

  } = storeToRefs(rentStore);
  const {
    // Action
    changeSido,
    changeGugun,
    changeDong,
  } = rentStore;




const props = defineProps({ selectOption: Array, type:String });
const emit = defineEmits(["onKeySelect"]);


// const key = ref({text:"", code:""});
const key = ref("");

const onSelect = (e) => {
  const text = e.target.options[e.target.selectedIndex].attributes['name'].value;
  if(props.type === 'sido') {
    selectedDong.value.code = "";
    selectedDong.value.text = "";
    selectedGugun.value.code = "";
    selectedGugun.value.text = "";
    selectedSido.value.code = key.value;
    selectedSido.value.text = text;
    changeSido();
  }else if(props.type ==='gugun') {
    // selectedGugun.value.code = key.value;
    selectedDong.value.code = "";
    selectedDong.value.text = "";
    selectedGugun.value.code = key.value;
    selectedGugun.value.text = text;
    changeGugun();
  }else {
    selectedDong.value.code = key.value;
    selectedDong.value.text = text;
    console.log("changeDong()");
    changeDong({
      deposit:deposit.value,
      monthly:monthly.value,
      endDate:endDate.value,
      startDate:startDate.value,
      options:options.value,
    });
  }
};
</script>

<template>
  <!-- <select  v-model="key" class="form-select form-select-sm ms-5 me-1 w-50" @change="onSelect"> -->
    <div class="custom-box">
      <select  v-model="key" @change="onSelect">
        <option
          v-for="option in selectOption"
          :key="option.code"
          :value="option.code"
          :name="option.text"
          :disabled="option.code === '' ? true : false"
        >
          {{ option.text }}
        </option>
      </select>
      


    </div>
</template>

<style scoped>
.custom-box {
  /* position: absolute;
  top: 50%;
  left: 50%; */
  transform: translate(-50%, -50%);
}

.custom-box select {
  background-color: #5c546b;
  color: white;
  padding: 12px;
  width: 150px;
  border: none;
  font-size: 15px;
  box-shadow: 0 5px 25px rgba(0, 0, 0, 0.2);
  -webkit-appearance: button;
  appearance: button;
  outline: none;
}

/* .custom-box::before {
  content: "\f13a";
  position: absolute;
  top: 0;
  right: 0;
  width: 20%;
  height: 100%;
  text-align: center;
  font-size: 28px;
  line-height: 45px;
  color: rgba(255, 255, 255, 0.5);
  background-color: rgba(255, 255, 255, 0.1);
  pointer-events: none;
} */

.custom-box:hover::before {
  color: rgba(255, 255, 255, 0.6);
  background-color: rgba(255, 255, 255, 0.2);
}

.custom-box select option {
  padding: 30px;
}
</style>
