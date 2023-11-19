<script setup>
import { ref } from "vue";

// Store Import
import {storeToRefs } from 'pinia';
import {useHouseStore } from '@/stores/houseStore';

const houseStore = useHouseStore();
const {
    // State
    selectedSido,
    selectedGugun,
    selectedDong,

  } = storeToRefs(houseStore);
  const {
    // Action
    changeSido,
    changeGugun,
    changeDong,
  } = houseStore;


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
    changeDong(); // 사실상 필요없음
  }
};
</script>

<template>
  <select v-el v-model="key" class="form-select form-select-sm ms-5 me-1 w-50" @change="onSelect">
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
</template>

<style scoped></style>
