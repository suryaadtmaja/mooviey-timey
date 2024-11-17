<script setup lang="ts">
import type { PropType } from 'vue'
import type { Movies } from '~/types/MoviesType'

defineProps({
  movie: {
    type: Object as PropType<Movies>,
  },
  mediaType: {
    type: String as PropType<'movie' | 'tv' | any>,
  },
})
const store = useMoviesStore()
const { movieGenres } = storeToRefs(store)
function findGenres(id: number | undefined) {
  if (!movieGenres && !id)
    return
  const result = store.movieGenres.find(genre => genre.id === id)
  return result?.name
}
</script>

<template>
  <div>
    <div class="relative aspect-10/16 w-full">
      <div class="h-8 w-8 absolute bg-[#2E2E2E] hover:opacity-0 flex items-center justify-center right-0">
        <h3 class="text-white font-bold text-sm">
          {{ movie?.vote_average?.toFixed(1) || 0.0 }}
        </h3>
      </div>
      <div class="h-full w-full absolute hover:bg-[#2E2E2E] top-0 left-0 block opacity-0 hover:opacity-100 hover:cursor-pointer">
        <div class="h-full flex flex-col items-center justify-center space-y-8">
          <div class="flex items-center space-x-1">
            <div class="i-line-md-star-filled text-[#FFB802] h8" />
            <h3 class="text-white font-bold text-xl">
              {{ movie?.vote_average?.toFixed(1) || 0.0 }}
            </h3>
          </div>

          <h3 class="text-white text-lg font-semibold">
            {{ movie?.genre_ids && movie?.genre_ids[0] ? findGenres(movie?.genre_ids[0]) : '' }}
          </h3>
          <NuxtLink :to="`/${mediaType}/${movie?.id}`">
            <button
              class="uppercase rounded-3xl py-2 px-8 text-white text-sm font-bold bg-[#E74C3C]"
            >
              View
            </button>
          </NuxtLink>
        </div>
      </div>
      <div class="flex flex-col gap-1 h-full w-full">
        <img v-if="movie?.poster_path" :src="`https://image.tmdb.org/t/p/original/${movie.poster_path}`" class="w-full h-full block object-cover" height="400" width="600">
        <div v-else class="h-full flex bg-[#2E2E2E] items-center justify-center">
          <div class="i-material-symbols-broken-image text-xl text-white" />
        </div>
      </div>
    </div>
    <div class="pt-2">
      <h3 class="text-white text-sm font-medium truncate">
        {{ movie?.name || movie?.title || movie?.original_title }}
      </h3>
      <h3 class="text-[#929292] text-xs font-normal">
        {{ movie?.first_air_date ? new Date(movie?.first_air_date).getFullYear() : movie?.release_date ? new Date(movie?.release_date).getFullYear() : '' }}
      </h3>
    </div>
  </div>
</template>
