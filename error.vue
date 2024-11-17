<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps({
  error: Object as () => NuxtError,
})
</script>

<template>
  <NuxtLayout>
    <div class="min-h-screen max-w-[1200px] mx-auto flex justify-center items-center flex text-white flex-col">
      <div class="flex flex-col pb-32 text-center space-y-8">
        <p class="text-4xl">
          {{ error?.statusCode }}
        </p>
        <p>{{ error?.statusMessage }}</p>
      </div>
      <NuxtLink to="/">
        Go back home
      </NuxtLink>
    </div>
  </NuxtLayout>
</template>
