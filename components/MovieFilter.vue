<script setup lang="ts">
import type { PropType } from 'vue'

interface Genres {
  id: number
  name: string
}
defineProps({
  genres: {
    type: Array as PropType<Genres[]>,
  },
  filterOptions: {
    type: Array as PropType<{ name: string, value: string }[]>,
  },
})

interface SelectFilter {
  name: string
  value: string
}

const selectedFilter = defineModel('selectedFilter', {
  type: Object as PropType<SelectFilter>,
})
const selectedGenres = defineModel('selectedGenres', {
  type: Array,
})
const selectFilter = ref(false)

function selectFilterOption(filter: SelectFilter) {
  selectedFilter.value = filter
  selectFilter.value = !selectFilter.value
}
</script>

<template>
  <div class="rounded-lg flex flex-col divide-y divide-[#FFFFFF]/7 w-60 bg-gradient-to-b from-[#0E1723] to-[#1E232A] ">
    <div class="p-4">
      <h3 class="text-[#E5E5E5] font-semibold text-base">
        Sort Result By
      </h3>
    </div>
    <div class="p-4">
      <button class="rounded-lg flex justify-between bg-[#2F363F] p-2 w-full items-center" @click="selectFilter = !selectFilter">
        <h3 class="text-[#E5E5E5] font-normal text-sm">
          {{ selectedFilter?.name }}
        </h3>
        <!-- <div class="i-material-symbols-arrow-drop-up-rounded text-[#C4C4C4]" /> -->
        <div class="i-material-symbols-arrow-drop-down-rounded text-[#C4C4C4]" />
      </button>
      <div v-show="selectFilter" class="z-50 absolute rounded-b-lg bg-[#111419] max-h-48 overflow-y-auto">
        <div class="w-full p-3">
          <template v-for="filter in filterOptions" :key="filter">
            <div class="w-full hover:bg-white cursor-pointer" @click="selectFilterOption(filter)">
              <h3 class="text-neutral-200 hover:text-neutral-900 text-sm font-semibold p-2">
                {{ filter.name }}
              </h3>
            </div>
          </template>
        </div>
      </div>
    </div>
    <div class="p-4">
      <h3 class="text-[#E5E5E5] font-semibold text-base">
        Genres
      </h3>
    </div>
    <div class="p-4">
      <div class="flex flex-col space-y-2">
        <template v-for="genre in genres" :key="genre.id">
          <div class="flex space-x-2 w-full justify-between">
            <p class="text-[#E5E5E5] text-sm">
              {{ genre.name }}
            </p>
            <input v-model="selectedGenres" type="checkbox" :name="genre.name" :value="genre.id" class="accent-[#E74C3C] w-4 h-4 rounded-lg bg-gray-100 cursor-pointer">
          </div>
        </template>
      </div>
    </div>
  </div>
</template>
