<script setup lang="ts">
import Hero from '~/components/Hero.vue'
import MovieCard from '~/components/MovieCard.vue'
import type { MovieDetail, Movies, Review, ReviewDetails } from '~/types/MoviesType'

const route = useRoute()
const movie = ref<MovieDetail>()
const review = ref<Review[]>()
const recommendations = ref<Movies[]>()

async function getMovieById(params: string) {
  try {
    const res = await $fetch<MovieDetail>(`/api/tmdb/movie/${params}`)
    movie.value = res
  }
  catch (error: any) {
    showError({
      fatal: true,
      statusCode: error?.statusCode,
      statusMessage: error?.statusMessage,
      message: error?.message,
    })
  }
}

async function getMovieReviews(params: string) {
  try {
    const res = await $fetch<ReviewDetails>(`/api/tmdb/movie/${params}/reviews`)
    review.value = res.results
  }
  catch (error: any) {
    showError({
      fatal: true,
      statusCode: error?.statusCode,
      statusMessage: error?.statusMessage,
      message: error?.message,
    })
  }
}

async function getMovieRecommendations(params: string) {
  try {
    const res = await $fetch<{
      results: Movies[]
    }>(`/api/tmdb/movie/${params}/recommendations`)
    recommendations.value = res.results
  }
  catch (error: any) {
    showError({
      fatal: true,
      statusCode: error?.statusCode,
      statusMessage: error?.statusMessage,
      message: error?.message,
    })
  }
}

watch(() => route.params, (val) => {
  const id = String(val.id)
  getMovieById(id)
  getMovieReviews(id)
  getMovieRecommendations(id)
}, {
  deep: true,
  immediate: true,
})
useHead({
  title: computed(() => movie.value?.title || movie.value?.original_title || 'Movies'),
})
</script>

<template>
  <div v-if="movie" class="h-full bg-white">
    <Hero :movie="movie" />
    <div class="max-w-[1200px] mx-auto py-48">
      <h3 class="uppercase text-sm font-semibold pb-6 text-[#FF0000]">
        REVIEWS
      </h3>
      <div v-if="review && review.length > 0" class="grid grid-cols-2 gap-8">
        <template v-for="data in review" :key="data.id">
          <MovieReview :review="data" />
        </template>
      </div>
      <div v-else>
        <h3 class="text-sm font-normal text-black/80">
          No reviews yet
        </h3>
      </div>
    </div>
    <div class="py-20 bg-[#1E232B]">
      <div v-if="recommendations" class=" max-w-[1200px] mx-auto">
        <h3 class="uppercase text-sm font-semibold pb-6 text-white">
          RECOMMENDATION MOVIES
        </h3>
        <div v-if="recommendations && recommendations.length > 0" class="grid grid-cols-5 gap-4">
          <template v-for="data in recommendations" :key="data.id">
            <MovieCard :movie="data" media-type="movie" />
          </template>
        </div>
        <div v-else>
          <h3 class="text-sm font-normal text-neutral-200">
            No Recommendations Yet
          </h3>
        </div>
      </div>
    </div>
  </div>
</template>
