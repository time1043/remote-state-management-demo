<template>
  <main>
    <h1>Advice App</h1>
    <p>{{ advice }}</p>
    <button @click="getAdvice">Get Advice</button>
  </main>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";

const advice = ref("Advice ...");

async function getAdvice() {
  // https://api.adviceslip.com/
  const response = await fetch("https://api.adviceslip.com/advice");
  const data = await response.json();
  advice.value = data.slip.advice;
}

onMounted(() => {
  getAdvice();
});
</script>

<style scoped></style>
