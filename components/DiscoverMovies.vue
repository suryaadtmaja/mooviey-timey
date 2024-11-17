<script setup lang="ts">
import type { PropType } from 'vue'
import MovieCard from '~/components/MovieCard.vue'
import type { Movies } from '~/types/MoviesType'

defineProps({
  activeFilter: {
    type: String,
  },
  movies: {
    type: Array as PropType<Movies[]>,
  },
})
defineEmits(['changeFilter'])
</script>

<template>
  <div class="max-w-[1200px] mx-auto pt-14">
    <div class="flex justify-between items-end pb-10">
      <div class="flex space-y-3 flex-col">
        <div class="bg-[#E74C3C] w-28 h-1.5" />
        <h3 class="text-white font-semibold text-2xl">
          Discover Movies
        </h3>
      </div>
      <div class="flex space-x-2">
        <button
          :class="activeFilter === 'popularity.desc' ? 'bg-[#E74C3C]' : 'bg-black/20'"
          class="rounded-3xl py-2 px-4 text-white text-sm font-semibold"
          @click="$emit('changeFilter', 'popularity.desc')"
        >
          Popularity
        </button>
        <button
          :class="activeFilter === 'primary_release_date.desc' ? 'bg-[#E74C3C]' : 'bg-black/20'"
          class="rounded-3xl py-2 px-4 text-white text-sm font-semibold"
          @click="$emit('changeFilter', 'primary_release_date.desc')"
        >
          Release Date
        </button>
      </div>
    </div>
    <div class="grid grid-cols-5 gap-4">
      <template v-for="movie in movies" :key="movie.id">
        <MovieCard :movie="movie" media-type="movie" />
      </template>
    </div>
  </div>
</template>
