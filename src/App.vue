<template>
  <main>
    <h1>Advice App</h1>
    <p>{{ isValidating ? "Loading..." : advice }}</p>
    <button @click="() => getAdvice()" :disabled="isValidating">
      Get Advice
    </button>
  </main>
</template>

<script setup lang="ts">
import { computed } from "vue";
import useSWRV from "swrv";

const fetcher = (...args: Parameters<typeof fetch>) =>
  fetch(...args).then((res) => res.json());

const {
  data,
  isValidating,
  mutate: getAdvice,
} = useSWRV("https://api.adviceslip.com/advice", fetcher);

const advice = computed(() => data.value?.slip?.advice);
</script>

<style scoped></style>
