<template>
  <template v-if="knight">
    <div class="flex items-center justify-center min-h-screen w-full">
      <div class="flex flex-col gap-20 h-full w-[100%] lg:w-[60%] bg-zinc-900 rounded-xl p-8">
        <div>
          <div class="mb-8 text-zinc-600 text-2xl"> Informações </div>
          <div class="grid lg:grid-cols-3 sm:grid-cols-2 gap-10">
            <div>
              <div class="text-zinc-200 font-bold">NOME</div>
              <div class="text-zinc-400">{{ knight.name }}</div>
            </div>

            <div>
              <div class="text-zinc-200 font-bold">APELIDO</div>
              <div class="text-zinc-400">{{ knight.nickname }}</div>
            </div>

            <div>
              <div class="text-zinc-200 font-bold">DATA DE NASCIMENTO</div>
              <div class="text-zinc-400">{{ convertDate(knight.birthday) }}</div>
            </div>

            <div>
              <div class="text-zinc-200 font-bold">HABILIDADE PRINCIPAL</div>
              <div class="text-zinc-400">{{ convertAtt(knight.keyAttribute) }}</div>
            </div>
          </div>
        </div>


        <div>
          <div class="mb-8 text-zinc-600 text-2xl"> Habilidades </div>
          <div class="grid grid-cols-2  lg:grid-cols-3 gap-10">
            <div>
              <div class="text-zinc-200 font-bold">FORÇA</div>
              <div class="text-zinc-400">{{ knight?.attributes?.strength }}</div>
            </div>

            <div>
              <div class="text-zinc-200 font-bold">DESTREZA</div>
              <div class="text-zinc-400">{{ knight?.attributes?.dexterity }}</div>
            </div>

            <div>
              <div class="text-zinc-200 font-bold">CONSTITUIÇÃO</div>
              <div class="text-zinc-400">{{ knight?.attributes?.constitution }}</div>
            </div>

            <div>
              <div class="text-zinc-200 font-bold">INTELIGENCIA</div>
              <div class="text-zinc-400">{{ knight?.attributes?.intelligence }}</div>
            </div>


            <div>
              <div class="text-zinc-200 font-bold">SABEDORIA</div>
              <div class="text-zinc-400">{{ knight?.attributes?.wisdom }}</div>
            </div>

            <div>
              <div class="text-zinc-200 font-bold">CARISMA</div>
              <div class="text-zinc-400">{{ knight?.attributes?.charisma }}</div>
            </div>
          </div>
        </div>

        <div>
          <div class=" text-zinc-600 text-2xl mb-8"> Armas </div>
          <div class="flex flex-wrap gap-6">
            <template v-for="weapon in knight.weapons">
              <WeaponItem :weapon="weapon" />
            </template>
          </div>
        </div>

        <div class="flex flex-col justify-center gap-5">
          <button @click="dialogUpdateNickname?.$refs.dialog.show()" :disabled="knight.isHero"
            class="'flex items-center justify-center text-xl py-2 px-12  rounded-md bg-cyan-800 hover:bg-cyan-700">
            Alterar
          </button>

          <button @click="handleDelete" :disabled="knight.isHero" :class="[
            'flex items-center text-xl py-2 px-12  rounded-md justify-center',
            !knight.isHero ? 'bg-red-500 hover:bg-red-400' : 'bg-zinc-800'
          ]">
            Deletar
          </button>
        </div>
      </div>
      <DialogUpdateNickname ref="dialogUpdateNickname" :oldNickname="knight.nickname" />
    </div>
  </template>
</template>

<script setup lang="ts">
import { onBeforeMount, ref, useTemplateRef } from 'vue';
import type { IKnightDTO } from '../dtos/IKnightDTO';
import { DeleteKnightService, GetKnightProfileService } from "../services/KnightsService"
import WeaponItem from '../components/WeaponItem.vue';
import DialogUpdateNickname from '../components/dialogs/DialogUpdateNickname.vue';
import router from "../routes/index";

import { useRoute } from 'vue-router';
import { useQuery, useQueryClient } from '@tanstack/vue-query';

const route = useRoute()

const params = ref(route.params)

const dialogUpdateNickname = useTemplateRef('dialogUpdateNickname')

const queryClient = useQueryClient()


const loadProfile = (): Promise<IKnightDTO> => {
  return GetKnightProfileService(String(params.value.id)).then(({ data }) => {
    return data.data
  }).catch(() => {
    router.push("/");
  })
}

const { data: knight, } = useQuery<IKnightDTO>({
  queryKey: ['get-knight-profile', String(route.params.id)],
  queryFn: loadProfile,
})

const convertAtt = (att: string) => {
  const obj: any = {
    "strength": "Força",
    "dexterity": "Destreza",
    "constitution": "Constituição",
    "intelligence": "Inteligencia",
    "wisdom": "Sabedoria",
    "charisma": "Carisma",
  }

  return obj[att];
}

const convertDate = (date: Date): string => {
  if (!date) return ""
  return new Intl.DateTimeFormat('pt-BR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  }).format(new Date(date)).replace(',', '')
}

const handleDelete = () => {
  DeleteKnightService(String(params.value.id)).then(async () => {

    await Promise.all([
      queryClient.invalidateQueries({
        queryKey: ['get-knights']
      }),
      queryClient.setQueryData(['get-knight-profile', String(route.params.id)], (oldData: IKnightDTO) => {
        return { ...oldData, isHero: true }
      })
    ])
  })
}

onBeforeMount(() => {
  loadProfile()
})

</script>

<style scoped></style>
