<script setup lang="ts">
import DiscoverMovies from '~/components/DiscoverMovies.vue'
import MovieFilter from '~/components/MovieFilter.vue'
import type { Movies } from '~/types/MoviesType'

definePageMeta({
  middleware: 'validate-page',
})
const filter = ref({
  name: 'Popularity Ascending',
  value: 'popularity.asc',
})
const options = [
  {
    name: 'Popularity Ascending',
    value: 'popularity.asc',
  },
  {
    name: 'Popularity Descending',
    value: 'popularity.desc',
  },
  {
    name: 'Release Date Ascending',
    value: 'primary_release_date.asc',
  },
  {
    name: 'Release Date Descending',
    value: 'primary_release_date.desc',
  },
  {
    name: 'Rating Ascending',
    value: 'vote_average.asc',
  },
  {
    name: 'Rating Descending',
    value: 'vote_average.desc',
  },
]

const pagination = ref(1)
const router = useRouter()
const route = useRoute()
const store = useMoviesStore()
const { movieGenres } = storeToRefs(store)
const filteredMoviesData = ref<Movies[]>([])
const selectedGenres = ref(route.query.genres && Array.isArray(route.query.genres) ? [...route.query.genres] : route.query.genres ? [route.query.genres] : [])

await useAsyncData('trending', () => store.getTrendingMovies())
await useAsyncData('genre', () => store.getMovieGenres(String(route.params.slug) || ''))

async function fetchMoviesByFilter(genres: string) {
  try {
    const res = await $fetch<{
      results: Movies[]
    }>(`/api/tmdb/discover/${route.params.slug}?page=${pagination.value}&sort_by=${filter.value.value}&with_genres${genres}`)
    filteredMoviesData.value = res.results
  }
  catch (error) {
    console.error(error)
  }
}

watch([selectedGenres, filter, pagination], () => {
  router.push({
    query: {
      genres: [...selectedGenres.value],
    },
  })
  fetchMoviesByFilter(`=${[...selectedGenres.value]}`)
}, {
  immediate: true,
})

useHead({
  title: 'Moovie Time',
})
</script>

<template>
  <div>
    <div class="py-8 relative bg-[#1E232A]">
      <div class="bg-white/5 h-full absolute inset-y-0 max-h-72 w-full pointer-events-none" />
      <div class="max-w-[1200px] mx-auto pt-14">
        <div class="flex justify-between items-end pb-10">
          <div class="flex space-y-3 flex-col">
            <div class="bg-[#E74C3C] w-28 h-1.5" />
            <h3 class="text-white font-semibold text-2xl">
              Movies
            </h3>
          </div>
        </div>
        <div class="w-full flex space-x-4">
          <div>
            <MovieFilter
              v-model:selected-filter="filter"
              v-model:selected-genres="selectedGenres"
              :genres="movieGenres"
              :filter-options="options"
            />
          </div>
          <div v-if="filteredMoviesData.length > 0" class="col-span-4 grid grid-cols-4 gap-4">
            <template v-for="movie in filteredMoviesData" :key="movie.id">
              <MovieCard :movie="movie" :media-type="route.params.slug" />
            </template>

            <div v-if="filteredMoviesData.length > 0" class="col-span-4 flex justify-center">
              <button
                class="rounded-3xl py-2 px-4 text-white text-sm font-semibold bg-[#E74C3C]"
                @click="pagination += 1"
              >
                Load More
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
