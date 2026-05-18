<template>
  <main>
    <h1>Advice App</h1>
    <p>{{ isLoading ? "Loading..." : advice }}</p>
    <button @click="getAdvice" :disabled="isLoading">Get Advice</button>
  </main>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";

const advice = ref("Advice ...");
const isLoading = ref(false);

async function getAdvice() {
  isLoading.value = true;
  const response = await fetch("https://api.adviceslip.com/advice");
  const data = await response.json();
  advice.value = data.slip.advice;
  isLoading.value = false;
}

onMounted(() => {
  getAdvice();
});
</script>

<style scoped></style>
