<script setup>
import { ref } from "vue";
const a = defineProps({ selectOption: Array });
const emit = defineEmits(["onKeySelect"]);

const key = ref({value:"", text:""});

const onSelect = () => {
  // console.log(key.value);
  // console.log(key.value + "선택!!!");
  emit("onKeySelect", key.value);
};
</script>

<template>
  <select v-model="key" class="form-select form-select-sm ms-5 me-1 w-50" @change="onSelect">
    <option
      v-for="option in selectOption"
      :key="option"
      :value="option"
      :disabled="option.value === '' ? true : false"
      :selected="option.value === '' ? true : false"
    >
      {{ option.text }}
    </option>
  </select>
</template>

<style scoped></style>
