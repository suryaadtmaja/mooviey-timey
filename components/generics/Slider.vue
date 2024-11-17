<script setup lang="ts">
import type { PropType } from 'vue'
import { useMounted } from '@vueuse/core'

import { Autoplay, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/vue'
import type { Movies } from '~/types/MoviesType'
import 'swiper/css'
import 'swiper/css/pagination'

defineProps({
  trendingMovies: {
    type: Array as PropType<Movies[]>,
  },
})

// Create 10 slides
const modules = [Pagination, Autoplay]

const store = useMoviesStore()
const { movieGenres } = storeToRefs(store)

function findGenres(id: number) {
  if (!movieGenres)
    return
  const result = store.movieGenres.find(genre => genre.id === id)
  return result?.name
}
</script>

<template>
  <ClientOnly>
    <div class="relative py-16">
      <Swiper
        :modules="modules"
        :loop="true"
        :space-between="50"
        :slides-per-view="3"
        :autoplay="{
          pauseOnMouseEnter: true,
          delay: 2000,
        }"
        :pagination="{
          el: '.swiper-pagination',
          enabled: true,
          clickable: true,
          dynamicBullets: true,
          dynamicMainBullets: 4,
        }"
        :grab-cursor="true"
      >
        <SwiperSlide
          v-for="(slide, idx) in trendingMovies"
          :key="idx"
        >
          <NuxtLink
            :to="`/movie/${slide.id}`"
          >
            <div class="grid grid-cols-2 items-center">
              <div class="aspect-10/16 min-w-56">
                <img v-if="slide.poster_path" :src="`https://image.tmdb.org/t/p/original/${slide.poster_path}`" class="w-full h-full block object-cover">
              </div>
              <div class="h-[85%] bg-black ">
                <div class="p-4 flex flex-col space-y-1">
                  <div class="flex items-center space-x-1">
                    <div class="i-line-md-star-filled text-[#FFB802] text-sm" />
                    <h3 class="text-white font-bold text-lg">
                      {{ slide.vote_average.toFixed(1) }}
                    </h3>
                  </div>
                  <h3 class="text-white text-2xl font-medium">
                    {{ slide.name ? slide.name : slide.title }}
                  </h3>
                  <div class="flex space-x-2 items-center">
                    <h3 class="text-white text-lg font-normal">
                      {{ slide.first_air_date ? new Date(slide.first_air_date).getFullYear() : slide.release_date ? new Date(slide.release_date).getFullYear() : '' }}
                    </h3>
                    <div class="h-2 w-2 rounded-full bg-white/50" />
                    <h3 class="text-white text-lg font-normal">
                      {{ findGenres(slide.genre_ids[0]) }}
                    </h3>
                  </div>
                  <div>
                    <p class="text-white text-xs font-normal line-clamp-7">
                      {{ slide.overview }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </NuxtLink>
        </SwiperSlide>
      </Swiper>
      <div class="swiper-pagination max-w-[260px]" />
    </div>
  </ClientOnly>
</template>

<style>
.swiper-slide {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  font-size: 4rem;
  font-weight: bold;
  font-family: 'Roboto', sans-serif;
}

.swiper-pagination-bullet {
  width: 12px;
  height: 12px;
  background-color: rgba(255,255,255, .50);
}

.swiper-pagination-bullet-active {
  @apply bg-red-500 w-14 rounded-lg transition transition-width duration-500;
}
</style>
