<script setup lang="ts">
import DiscoverMovies from '~/components/DiscoverMovies.vue'
import Slider from '~/components/generics/Slider.vue'
import type { Movies } from '~/types/MoviesType'

useHead({
  title: 'Moovie Time',
})
const store = useMoviesStore()
const { trendingMovies } = storeToRefs(store)
const filterMovies = ref('popularity.desc')
const filteredMoviesData = ref<Movies[]>([])

await useAsyncData('trending', () => store.getTrendingMovies())

function changeMovieFilter(filter: string) {
  filterMovies.value = filter
}

async function fetchMoviesByFilter() {
  try {
    const res = await $fetch<{
      results: Movies[]
    }>(`/api/tmdb/discover/movie?sort_by=${filterMovies.value}`)
    filteredMoviesData.value = res.results
  }
  catch (error) {
    console.error(error)
  }
}

onMounted(() => fetchMoviesByFilter())
watch(filterMovies, () => {
  fetchMoviesByFilter()
})
</script>

<template>
  <div class="bg-[#1E232A] h-full">
    <div class="h-full py-8">
      <Slider :trending-movies="trendingMovies" />
    </div>
    <div class="py-8 relative bg-[#1E232A]">
      <div class="bg-white/5 h-full absolute inset-y-0 max-h-72 w-full pointer-events-none" />
      <DiscoverMovies
        :active-filter="filterMovies"
        :movies="filteredMoviesData"
        @change-filter="changeMovieFilter"
      />
    </div>
  </div>
</template>
