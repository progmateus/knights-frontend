<script setup lang="ts">
import Header from "./components/header/Header.vue"
</script>

<template>
  <main class="bg-zinc-950 text-zinc-50 antialiased">
    <div class="mx-auto grid min-h-screen w-full max-w-[1600px] grid-rows-[min-content_max-content] gap-5 p-8">
      <Header />
      <router-view />
    </div>
  </main>
</template>

<style scoped></style>
