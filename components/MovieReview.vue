<script setup lang="ts">
import type { Review } from '~/types/MoviesType'

defineProps({
  review: {
    type: Object as PropType<Review>,
  },
})

function formatDate(date: string) {
  const format = new Date(date)
  const formattedDate = format.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
  return formattedDate
}
</script>

<template>
  <div class="rounded-lg shadow-lg p-6  bg-[#F9F9F9] ">
    <div class="flex justify-between mb-6">
      <div class="flex space-x-6 items-center">
        <img src="https://image.tmdb.org/t/p/original//l1175hgL5DoXnqeZQCcU3eZIdhX.jpg" class="h-12 w-12 rounded-full">
        <div class="flex flex-col">
          <h3 class="text-[#1E232A] text-sm font-semibold">
            {{ review?.author || review?.author_details.name || '' }}
          </h3>
          <p class="text-xs text-[#666666] font-regular">
            {{
              formatDate(review?.created_at || '') }}
          </p>
        </div>
      </div>
      <div class="flex items-start space-x-2 rounded-lg bg-[#C4C4C4]/28 p-1">
        <div class="i-line-md-star-filled text-[#FFB802] text-lg" />
        <h3 class="font-semibold text-black text-4xl">
          7.0
        </h3>
      </div>
    </div>
    <p class="line-clamp-8 font-italic text-xs leading-relaxed" v-html="review?.content" />
  </div>
</template>
