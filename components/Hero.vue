<script setup lang="ts">
import type { MovieDetail } from '~/types/MoviesType'

defineProps({
  movie: {
    type: Object as PropType<MovieDetail>,
    required: true,
  },
})
</script>

<template>
  <div
    v-if="movie"
    class=" bg-black/80 relative top-0 -mt-16 bg-cover bg-top bg-no-repeat aspect-25/9"
    :style="{ backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie?.backdrop_path})` }"
  >
    <div class="max-w-[1200px] absolute -bottom-1/4 left-1/2 -translate-x-1/2 transform w-full pl-56">
      <div class="flex flex-col space-y-2 ">
        <h3 class="text-sm font-semibold uppercase">
          Overview
        </h3>
        <h3 class="text-sm font-regular">
          {{ movie?.overview }}
        </h3>
      </div>
    </div>
    <div class="max-w-[1200px] absolute transform -bottom-1/8 w-full left-1/2 -translate-x-1/2 z-50">
      <div class="flex gap-8">
        <div class="aspect-10/16 w-48">
          <img v-if="movie?.poster_path" :src="`https://image.tmdb.org/t/p/original/${movie.poster_path}`" class="w-full h-full block object-cover" height="400" width="600">
          <div v-else class="h-full flex bg-[#2E2E2E] items-center justify-center">
            <div class="i-material-symbols-broken-image text-xl text-white" />
          </div>
        </div>

        <div>
          <div class="movie-info flex flex-col space-y-2">
            <h3 class="text-white text-3xl font-medium">
              {{ movie?.first_air_date ? new Date(movie?.first_air_date).getFullYear() : movie?.release_date ? new Date(movie?.release_date).getFullYear() : '' }}
            </h3>
            <h3 class="text-white text-3xl font-semibold">
              {{ movie?.title || movie?.original_title }}
            </h3>
            <div class="flex">
              <p class="text-sm text-white font-medium">
                {{ movie?.genres?.map(genre => genre.name).join(', ') }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="absolute bottom-0 w-full">
      <div class="bg-black/50 min-h-20 h-20 w-full flex items-center">
        <div class="max-w-[1200px] mx-auto flex space-x-12 pl-10 flex-wrap">
          <div class="rating flex space-x-4 ">
            <div class="flex space-x-2 items-center">
              <div class="i-line-md-star-filled text-[#FFB802] text-3xl" />
              <h3 class="text-3xl text-neutral-200 font-semibold">
                {{ movie?.vote_average ? movie?.vote_average.toFixed(1) : '' }}
              </h3>
            </div>
            <div class="flex flex-col space-y-1">
              <h3 class="uppercase text-xs text-[#929292] font-medium">
                User Score
              </h3>
              <h3 class="uppercase text-xs text-neutral-200 font-medium">
                {{ movie?.vote_count }} votes
              </h3>
            </div>
          </div>
          <div class="flex space-x-4 pl-6 border-l-1">
            <div class="flex flex-col space-y-1">
              <h3 class="uppercase text-xs text-[#929292] font-medium">
                Status
              </h3>
              <h3 class="uppercase text-xs text-neutral-200 font-medium">
                {{ movie?.status }}
              </h3>
            </div>
          </div>
          <div class="flex space-x-4 pl-6 border-l-1">
            <div class="flex flex-col space-y-1">
              <h3 class="uppercase text-xs text-[#929292] font-medium">
                Language
              </h3>
              <h3 class="uppercase text-xs text-neutral-200 font-medium">
                {{ movie?.status }}
              </h3>
            </div>
          </div>
          <div class="flex space-x-4 pl-6 border-l-1">
            <div class="flex flex-col space-y-1">
              <h3 class="uppercase text-xs text-[#929292] font-medium">
                Budget
              </h3>
              <h3 class="uppercase text-xs text-neutral-200 font-medium">
                {{ movie?.status }}
              </h3>
            </div>
          </div>
          <div class="flex space-x-4 pl-6 border-l-1">
            <div class="flex flex-col space-y-1">
              <h3 class="uppercase text-xs text-[#929292] font-medium">
                Production
              </h3>
              <h3 class="uppercase text-xs text-neutral-200 font-medium">
                {{ movie?.production_companies.length > 0 ? movie?.production_companies[0].name : '' }}
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
