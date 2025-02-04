<template>
  <dialog ref="dialog">
    <div class="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div class="fixed inset-0 bg-gray-500/75 transition-opacity" aria-hidden="true"></div>

      <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div
            class="relative transform overflow-hidden rounded-lg bg-zinc-900 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
            <div class="bg-zinc-900 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div class="sm:flex sm:items-start">
                <div class="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full sm:mx-0 sm:size-10">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#9F9FA9" viewBox="0 0 256 256">
                    <path
                      d="M227.31,73.37,182.63,28.68a16,16,0,0,0-22.63,0L36.69,152A15.86,15.86,0,0,0,32,163.31V208a16,16,0,0,0,16,16H92.69A15.86,15.86,0,0,0,104,219.31L227.31,96a16,16,0,0,0,0-22.63ZM51.31,160,136,75.31,152.69,92,68,176.68ZM48,179.31,76.69,208H48Zm48,25.38L79.31,188,164,103.31,180.69,120Zm96-96L147.31,64l24-24L216,84.68Z">
                    </path>
                  </svg>
                </div>
                <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <h3 class="text-base font-semibold text-zinc-300" id="modal-title">Alterar apelido</h3>
                  <div class="mt-2">
                    <Input v-model="nickname" id="strength" type="text" min="0" max="20" />
                  </div>
                </div>
              </div>
            </div>
            <div class="bg-zinc-900 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 gap-2">
              <button @click="handleUpdateNickname" :disabled="nickname == props.oldNickname || !nickname" type="button"
                class="inline-flex w-full justify-center rounded-md bg-cyan-800 px-3 py-2 text-sm font-semibold text-zinc-200 shadow-xs hover:bg-cyan-700 sm:ml-3 sm:w-auto disabled:opacity-25">Alterar</button>
              <button @click="close" type="button"
                class="mt-3 inline-flex w-full justify-center rounded-md bg-zinc-900 px-3 py-2 text-sm font-semibold text-zinc-200 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-zinc-800 sm:mt-0 sm:w-auto">Cancel</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </dialog>
</template>

<script setup lang="ts">
import { ref, useTemplateRef } from "vue";
import Input from "../form/Input.vue"
import { UpdateKnightNicknameService } from "../../services/KnightsService"
import { useRoute } from "vue-router";
import { useQueryClient } from "@tanstack/vue-query";
import type { IKnightDTO } from "../../dtos/IKnightDTO";

const route = useRoute()

const props = defineProps<{
  oldNickname: string
}>()

const nickname = ref(props.oldNickname)
const dialog = useTemplateRef('dialog')

const queryClient = useQueryClient()

const close = () => {
  dialog.value?.close()
}

const handleUpdateNickname = () => {
  if (nickname.value == props.oldNickname || !nickname.value) {
    return
  }
  UpdateKnightNicknameService(String(route.params.id), nickname.value).then(async () => {
    await queryClient.setQueryData(['get-knight-profile', String(route.params.id)], (oldData: IKnightDTO) => {
      return { ...oldData, nickname: nickname.value }
    })
    close()
  })
}


</script>
