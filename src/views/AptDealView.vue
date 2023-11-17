<script setup>
import VKakaoMap from "../components/common/VKakaoMap.vue";
import { ref, onMounted, watch } from "vue";
import { listSido } from "@/api/sido";

const sidoList = ref([]);
const gugunList = ref([{ text: "구군선택", value: "" }]);
const dong = ref([]);

// const selected = ref("");
const selected = ref({
  sido: "",
  gugun: "",
  dong: "",
});

onMounted(() => {
  getSidoList();
});

// 시도 얻기
const getSidoList = () => {
  listSido(
    ({ data }) => {
      console.log(data.regcodes);
      let options = [];
      options.push({ text: "시도선택", value: "" });
      data.regcodes.forEach((sido) => {
        options.push({ text: sido.name, value: sido.code });
      });
      sidoList.value = options;
    },
    (err) => {
      console.log(err);
    }
  );
};

watch(selected, (oldProp, newProp) => {
  console.log("oldProp : ", oldProp);
  console.log("newProp : ", newProp);
});
</script>

<template>
  <v-card class="tmp" style="width: 400px">
    <v-card-actions>
      <v-select
        v-model="selected.sido"
        label="시도선택"
        :items="sidoList"
        :item-title="'text'"
        :item-value="'value'"
        variant="solo-filled"></v-select>
      <v-select
        label="Select"
        :items="[
          'California',
          'Colorado',
          'Florida',
          'Georgia',
          'Texas',
          'Wyoming',
        ]"
        variant="solo-filled"></v-select>
      <v-select
        label="Select"
        :items="[
          'California',
          'Colorado',
          'Florida',
          'Georgia',
          'Texas',
          'Wyoming',
        ]"
        variant="solo-filled"></v-select>
      <!-- <select v-model="selected.sido" name="asdf" id="asdf">
        <option  v-for="(list) in sidoList" :key="list.value" :value="list.value">{{ list.text }}</option>
    </select>
    <select name="asdf" id="asdf">
        <option v-for="(list) in sidoList" :key="list.value" :value="list.value">{{ list.text }}</option>
    </select>
    <select name="asdf" id="asdf">
        <option v-for="(list) in sidoList" :key="list.value" :value="list.value">{{ list.text }}</option>
    </select> -->
    </v-card-actions>
  </v-card>
  <VKakaoMap />
</template>

<style scoped>
.tmp {
  width: 1000px;
  border: 1px solid rgba(0, 0, 0, 0.15);
  position: absolute!;
}
</style>
