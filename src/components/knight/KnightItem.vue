<template>
  <RouterLink :to="props.knight._id"
    class="group flex-auto w-72 max-w-96 rounded-lg bg-zinc-900 px-8 py-4 overflow-hidden">
    <div class="group-hover:scale-105 transition-transfor duration-500 uppercase flex flex-col gap-2 text-zinc-400">
      <div class="flex justify-between">
        <span>Nome</span>
        <span class="font-bold ">{{ props.knight.name }}</span>
      </div>
      <div class="flex justify-between">
        <span>Idade</span>
        <span class="font-bold ">{{ props.knight.age }}</span>
      </div>
      <div class="flex justify-between">
        <span>Armas</span>
        <span class="font-bold ">{{ props.knight.weaponsCount }}</span>
      </div>
      <div class="flex justify-between">
        <span>Atributo</span>
        <span class="font-bold ">{{ props.knight.keyAttribute }}</span>
      </div>
      <div class="flex justify-between">
        <span>Ataque</span>
        <span class="font-bold ">{{ props.knight.attack }}</span>
      </div>
      <div class="flex justify-between">
        <span>Exp</span>
        <span class="font-bold ">{{ props.knight.exp }}</span>
      </div>
    </div>
  </RouterLink>
</template>


<script setup lang="ts">
import type { IKnightDTO } from "../../dtos/IKnightDTO";

const props = defineProps<{
  knight: IKnightDTO
}>()
</script>



<style scoped></style>
