<script setup>
import HeaderNav from './components/common/HeaderNav.vue';


</script>

<template>
  <div style="display: flex;flex-direction: column;">
    <HeaderNav />
    <RouterView />
  </div>
</template>

<style scoped>
</style>