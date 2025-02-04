<template>
  <div
    class="flex flex-auto max-w-64 w-64 rounded-lg gap-6 bg-zinc-900 border-zinc-800 px-8 py-4 overflow-hidden border-2">
    <span>{{ props.weapon.name }}</span>
  </div>
</template>

<script setup lang="ts">
import type { IWeaponDTO } from "../dtos/IWeaponDTO";

const props = defineProps<{
  weapon: IWeaponDTO
}>()


</script>

<style scoped></style>
