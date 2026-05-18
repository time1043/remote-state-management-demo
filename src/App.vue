<template>
  <main>
    <h1>Advice App</h1>
    <p>{{ isFetching ? "Loading..." : advice }}</p>
    <button @click="() => refetch()" :disabled="isFetching">Get Advice</button>
  </main>
</template>

<script setup lang="ts">
import { useQuery } from "@tanstack/vue-query";

async function fetchAdvice() {
  const response = await fetch("https://api.adviceslip.com/advice");
  const data = await response.json();
  return data.slip.advice as string;
}

const {
  data: advice,
  isFetching,
  refetch,
} = useQuery({
  queryKey: ["advice"],
  queryFn: fetchAdvice,
});
</script>

<style scoped></style>
