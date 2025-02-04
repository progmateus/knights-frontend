<template>
  <main>
    <div class="flex justify-between mb-2">
      <div>

      </div>

      <button @click="handleClick" :class="[
        'rounded-full border-2  px-2 py-1',
        heroes !== 'null' ? 'bg-cyan-700' : 'border-cyan-700'
      ]">
        Hall de hérois
      </button>

      <RouterLink to="create">


        <button class="flex items-center gap-2 justify-center py-1 px-4 bg-cyan-800 rounded-md">
          Criar
          <svg xmlns="http://www.w3.org/2000/svg" width="1rem" height="1rem" fill="#ffffff" viewBox="0 0 256 256">
            <path
              d="M224,128a8,8,0,0,1-8,8H136v80a8,8,0,0,1-16,0V136H40a8,8,0,0,1,0-16h80V40a8,8,0,0,1,16,0v80h80A8,8,0,0,1,224,128Z">
            </path>
          </svg>
        </button>
      </RouterLink>

    </div>
    <div class="flex flex-wrap gap-6">
      <template v-if="isLoading">
        <KnightItemSkeleton />
        <KnightItemSkeleton />
        <KnightItemSkeleton />
        <KnightItemSkeleton />
        <KnightItemSkeleton />
        <KnightItemSkeleton />
        <KnightItemSkeleton />
        <KnightItemSkeleton />
        <KnightItemSkeleton />
        <KnightItemSkeleton />
        <KnightItemSkeleton />
        <KnightItemSkeleton />
        <KnightItemSkeleton />
        <KnightItemSkeleton />
      </template>
      <template v-else>
        <template v-for="knight of results?.pages.map(page => page).flat()">
          <KnightItem :knight="knight" />
        </template>
      </template>

      <div class="flex w-full items-center justify-center">
        <button v-if="hasNextPage" @click="onLoadMore"
          class="hover:scale-105 rounded-full border-spacing-1 border-zinc-700 border-2 p-1">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#52525C" viewBox="0 0 256 256">
            <path
              d="M224,128a8,8,0,0,1-8,8H136v80a8,8,0,0,1-16,0V136H40a8,8,0,0,1,0-16h80V40a8,8,0,0,1,16,0v80h80A8,8,0,0,1,224,128Z">
            </path>
          </svg>
        </button>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { ListKnightsService } from "../services/KnightsService"
import { type IKnightDTO } from "../dtos/IKnightDTO"
import { useInfiniteQuery } from '@tanstack/vue-query';
import { useRoute } from 'vue-router';
import KnightItem from '../components/knight/KnightItem.vue';
import KnightItemSkeleton from '../components/knight/KnightItemSkeleton.vue';
import router from '../routes';

const route = useRoute()

const nameRef = ref("")
const heroesRef = ref("")

const name = computed({
  get() {
    return String(route?.query?.name ?? "")
  },
  set(val) {
    nameRef.value = String(val)
  }
})

const heroes = computed({
  get() {
    return String(route?.query?.heroes ?? null)
  },
  set(val) {
    heroesRef.value = String(val)
  }
})

const loadKinghts = async (page: number): Promise<IKnightDTO[]> => {
  return ListKnightsService({ page, search: name.value, heroes: heroes.value != "null" ? Boolean(heroes.value) : undefined }).then(({ data }) => {
    return data.data
  }).catch((err) => {
    console.log(err)
  })
}

const onLoadMore = () => {
  fetchNextPage()
}

const handleClick = () => {
  const queries: any = {
    name: String(name.value),
  }

  if (heroes.value == "false" || !heroes.value || heroes.value == "null") {
    queries.heroes = true
  }

  router.push({ path: '/', query: queries })
}

const { data: results, isLoading, fetchNextPage, hasNextPage, refetch } = useInfiniteQuery<IKnightDTO[]>({
  queryKey: ['get-knights', name, Boolean(heroes.value)],
  queryFn: ({ pageParam }) => loadKinghts(Number(pageParam)),
  initialPageParam: 1,
  getNextPageParam: (lastPage, allPages, lastPageParam: any) => {
    console.log(allPages)
    if (lastPage.length === 0) {
      return undefined
    }
    return lastPageParam + 1
  }
})

watch(name, async () => {
  refetch()
})

watch(heroes, async () => {
  refetch()
})


</script>

<style scoped></style>
