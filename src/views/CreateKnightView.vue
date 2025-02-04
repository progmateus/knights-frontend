<template>
  <div class="flex flex-col gap-20 min-h-screen w-full bg-zinc-900 rounded-xl p-8">
    <div class="grid grid-cols-2 gap-10">
      <Input v-model="knight.name" id="name" label="Nome" placeholder="John Doe" />
      <Input v-model="knight.nickname" id="nickname" label="Apelido" placeholder="johndoe" />
      <Input v-model="knight.birthday" id="birthday" label="Data de nascimento" type="date"
        placeholder="Enter your username" />
      <Select :options="options" v-model="knight.keyAttribute" id="keyAttribute" label="Atributo principal"
        placeholder="Enter your username"></Select>
    </div>

    <div>
      <p class="text-zinc-500 text-lg mb-4 uppercase">Habilidades</p>
      <div class="grid grid-cols-2 gap-10">
        <Input v-model="attribute.strength" id="strength" label="Força" placeholder="0-10" type="number" min="0"
          max="20" />
        <Input v-model="attribute.dexterity" id="dexterity" label="Destreza" placeholder="0-10" type="number" min="0"
          max="20" />
        <Input v-model="attribute.constitution" id="constitution" label="Constituição" placeholder="0-10" type="number"
          min="0" max="20" />
        <Input v-model="attribute.intelligence" id="intelligence" label="Inteligência" placeholder="0-10" type="number"
          min="0" max="20" />
        <Input v-model="attribute.wisdom" id="wisdom" label="Sabedoria" placeholder="0-10" type="number" min="0"
          max="20" />
        <Input v-model="attribute.charisma" id="charisma" label="Carisma" placeholder="0-10" type="number" min="0"
          max="20" />
      </div>
    </div>

    <div>
      <p class="text-zinc-500 text-lg mb-4 uppercase">Armas</p>
      <div class="flex flex-wrap gap-6">
        <template v-for="weapon in weaponsLoaded">
          <div @click="selectWeapon(weapon._id)"
            class="flex flex-auto max-w-64 w-64 rounded-lg gap-6 bg-zinc-900 border-zinc-800 px-8 py-4 overflow-hidden border-2 hover:border-zinc-600 hover:cursor-pointer">
            <input type="checkbox" :id="weapon._id" :value="weapon._id" v-model="weapons" />
            <span :for="weapon._id">{{ weapon.name }}</span>
          </div>
        </template>
      </div>
    </div>
    <div class="flex items-center justify-center">
      <button @click="handleCreate" class="flex items-center text-xl py-2 px-12 bg-cyan-800 rounded-md">
        Criar
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount, ref } from 'vue';
import Input from '../components/form/Input.vue';
import Select from '../components/form/Select.vue';
import type { IAttributeDTO } from '../dtos/IAttributeDTO';
import type { IKnightDTO } from '../dtos/IKnightDTO';
import type { IWeaponDTO } from '../dtos/IWeaponDTO';
import { CreateKnightService } from "../services/KnightsService"
import { ListWeaponsService } from "../services/WeaponsService"
import { useQueryClient } from '@tanstack/vue-query';
import router from "../routes/index";

const queryClient = useQueryClient();

const knight = ref<IKnightDTO>({} as IKnightDTO)
const attribute = ref<IAttributeDTO>({} as IAttributeDTO)
const weapons = ref<string[]>([])
const weaponsLoaded = ref<IWeaponDTO[]>([])

const options = [
  { label: 'Força', value: 'strength' },
  { label: 'Destreza', value: 'dexterity' },
  { label: 'Constituição', value: 'constitution' },
  { label: 'Inteligência', value: 'intelligence' },
  { label: 'Sabedoria', value: 'wisdom' },
  { label: 'Carisma', value: 'charisma' },
]

const handleCreate = () => {
  CreateKnightService({
    name: knight.value.name,
    nickname: knight.value.nickname,
    weapons: weapons.value,
    attributes: attribute.value,
    birthday: knight.value.birthday,
    keyAttribute: knight.value.keyAttribute,
  }).then(async ({ data }) => {
    await queryClient.invalidateQueries({
      queryKey: ['get-knights']
    })
    router.push(`/${data.data._id}`);
  })
}

const selectWeapon = (weaponId: string) => {
  var weaponsArray = weapons.value
  if (weaponsArray.find((x) => x == weaponId)) {
    weapons.value = weaponsArray.filter((x) => x != weaponId)
  } else {
    weapons.value = [
      ...weapons.value,
      weaponId
    ]
  }
}

const loadWeapons = () => {
  ListWeaponsService().then(({ data }) => {
    weaponsLoaded.value = data
  })
}

onBeforeMount(() => {
  loadWeapons()
})

</script>

<style scoped></style>
