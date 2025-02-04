<template>
  <main>
    <div class="flex items-center mb-14 justify-between gap-5">
      <RouterLink class="text-2xl font-extrabold text-white" to="/">
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#9F9FA9" viewBox="0 0 256 256">
          <path
            d="M136,100a12,12,0,1,1-12-12A12,12,0,0,1,136,100Zm96,29.48A104.29,104.29,0,0,1,130.1,232l-2.17,0a103.32,103.32,0,0,1-69.26-26A8,8,0,1,1,69.34,194a84.71,84.71,0,0,0,20.1,13.37L116,170.84c-22.78-9.83-47.47-5.65-61.4-3.29A31.84,31.84,0,0,1,23.3,154.72l-.3-.43-13.78-22a8,8,0,0,1,2.59-11.05L112,59.53V32a8,8,0,0,1,8-8h8A104,104,0,0,1,232,129.48Zm-16-.22A88,88,0,0,0,128,40V64a8,8,0,0,1-3.81,6.81L27.06,130.59l9.36,15A15.92,15.92,0,0,0,52,151.77c16-2.7,48.77-8.24,78.07,8.18A40.06,40.06,0,0,0,168,120a8,8,0,0,1,16,0,56.07,56.07,0,0,1-51.8,55.83l-27.11,37.28A90.89,90.89,0,0,0,129.78,216,88.29,88.29,0,0,0,216,129.26Z">
          </path>
        </svg>
      </RouterLink>

      <form v-on:submit.prevent="handleSubmit"
        class="flex flex-1 items-center max-w-[500px] gap-3 rounded-full bg-zinc-900 px-5 py-3 ring-zinc-700">
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#9F9FA9" viewBox="0 0 256 256">
          <path
            d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z">
          </path>
        </svg>

        <input v-model="search" placeholder="Buscar produto..."
          class="w-full bg-transparent outline-none placeholder:text-zinc-500" />
      </form>

      <div class="flex items-center gap-4 w-30 h-30" />
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import router from '../../routes';

const search = ref("")

const handleSubmit = () => {
  router.push({ path: '/', query: { name: String(search.value) } })
}
</script>

<style scoped></style>
