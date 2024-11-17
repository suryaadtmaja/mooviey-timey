<script lang="ts" setup>
import { onClickOutside, useDebounceFn } from '@vueuse/core'
import { useMoviesStore } from '~/stores/movies'

const menu = ref([
  {
    label: 'Categories',
    value: [],
    icon: 'i-tabler-layout-grid-filled',
  },
  {
    label: 'Movies',
    link: '/movie',
  },
  {
    label: 'TV Shows',
    link: '/tv',
  },
  {
    label: 'Login',
  },
])

const loading = ref(false)
const store = useMoviesStore()
const search = ref('')
const { movieGenres, movieSearchResults } = storeToRefs(store)
const isOpen = ref(false)
const isSearching = ref(false)
const elSearch = ref(null)
const elCategories = ref(null)
function toggleDropdown() {
  isOpen.value = !isOpen.value
}
function handleFocus() {
  if (!search.value)
    return
  isSearching.value = true
}

async function searchByTitle() {
  if (!search.value)
    return
  try {
    loading.value = true
    isSearching.value = true
    await store.findMoviesByTitle(search.value)
  }
  catch (error) {
    console.error(error)
  }
  finally {
    loading.value = false
  }
}
onClickOutside(elCategories, () => isOpen.value = false)
onClickOutside(elSearch, () => isSearching.value = false)

await useAsyncData('genres', () => store.getMovieGenres('movie'))

watch(search, useDebounceFn(searchByTitle, 500))
</script>

<template>
  <div class="w-full relative  bg-white/5 z-50">
    <div class="max-w-[1200px] h-16 max-h-16 flex items-center justify-between mx-auto">
      <div class="flex space-x-8">
        <NuxtLink to="/">
          <div class="logo w-32">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 113 31"><path fill="#fff" fill-rule="evenodd" d="M34.01 7.75 30.23 0h7.558v27.125c0 2.131-1.7 3.875-3.779 3.875H19.864l7.528-4.457a2.25 2.25 0 0 0 1.09-1.94c0-.8-.415-1.539-1.09-1.939l-14.768-8.741a2.138 2.138 0 0 0-2.184 0 2.249 2.249 0 0 0-1.091 1.94V31h-5.57C1.7 31 0 29.256 0 27.125V3.875C0 1.744 1.7 0 3.779 0h1.89l3.778 7.75h5.668L11.336 0h3.78l3.778 7.75h5.668L20.783 0h3.78l3.778 7.75h5.668Z" clip-rule="evenodd" /><path fill="#fff" d="M63.072 14.856 60.978.935H58.03l-3.685 8.551L50.66.935h-2.928l-2.133 13.92h2.986l1.338-9.068 4.054 9.049h.717l4.053-9.049 1.339 9.069h2.986ZM69.003 15.174c3.239 0 5.663-2.446 5.663-5.688 0-3.241-2.424-5.668-5.663-5.668-3.239 0-5.663 2.427-5.663 5.668 0 3.242 2.424 5.688 5.663 5.688Zm0-2.744c-1.63 0-2.793-1.194-2.793-2.944 0-1.73 1.164-2.943 2.793-2.943 1.629 0 2.792 1.213 2.792 2.943 0 1.75-1.163 2.944-2.792 2.944ZM80.684 15.174c3.24 0 5.663-2.446 5.663-5.688 0-3.241-2.424-5.668-5.663-5.668-3.238 0-5.662 2.427-5.662 5.668 0 3.242 2.424 5.688 5.662 5.688Zm0-2.744c-1.629 0-2.792-1.194-2.792-2.944 0-1.73 1.163-2.943 2.792-2.943 1.63 0 2.793 1.213 2.793 2.943 0 1.75-1.163 2.944-2.793 2.944ZM93.888 4.117l-2.522 7.199-2.56-7.2h-3.025l4.267 10.74h2.618l4.15-10.74h-2.928ZM97.378 2.685h2.812V0h-2.812v2.685Zm0 12.17h2.832V4.118h-2.832v10.739ZM112.101 9.466c0-3.102-2.211-5.648-5.43-5.648-3.103 0-5.43 2.446-5.43 5.668s2.346 5.688 5.43 5.688c2.444 0 4.441-1.492 5.197-3.838h-2.967c-.426.775-1.241 1.253-2.23 1.253-1.377 0-2.308-.816-2.56-2.287h7.932c.039-.279.058-.557.058-.836Zm-5.43-3.162c1.28 0 2.191.716 2.599 2.029h-5.081c.329-1.273 1.221-2.029 2.482-2.029Z" /><path fill="#E74C3C" d="M55.8 16.76H45.308v2.805h3.781v11.117h2.929V19.565H55.8V16.76ZM56.462 18.51h2.813v-2.684h-2.813v2.685Zm0 12.172h2.832v-10.74h-2.831v10.74ZM72.93 19.704a3.938 3.938 0 0 0-3.238 1.71c-.62-1.074-1.707-1.71-3.045-1.71-1.241 0-2.385.616-3.122 1.571L63 19.943h-1.978v10.739h2.831v-5.807c0-1.67.757-2.625 2.037-2.625 1.008 0 1.551.755 1.551 2.187v6.245h2.754v-5.807c0-1.67.756-2.625 2.017-2.625 1.028 0 1.57.755 1.57 2.187v6.245h2.832V23.96c0-2.526-1.512-4.256-3.684-4.256ZM88.397 25.292c0-3.102-2.21-5.648-5.43-5.648-3.103 0-5.43 2.447-5.43 5.668 0 3.222 2.346 5.688 5.43 5.688 2.443 0 4.441-1.491 5.197-3.838h-2.967c-.427.775-1.241 1.253-2.23 1.253-1.377 0-2.308-.816-2.56-2.287h7.932c.039-.279.058-.557.058-.836Zm-5.43-3.162c1.28 0 2.191.716 2.599 2.029h-5.082c.33-1.273 1.222-2.029 2.483-2.029Z" /></svg>
          </div>
        </NuxtLink>
        <div ref="elSearch" class="form-search bg-black/15 max-w-xl w-xl rounded relative inline-block">
          <label for="Search" class="sr-only">Search</label>
          <div class="relative">
            <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <div class="i-material-symbols-movie text-white/17" />
            </div>
            <input
              v-model="search"
              type="search"
              bg="transparent"
              text="sm neutral-200"
              p="2"
              border="gray-300 rounded"
              placeholder="Find movie"
              class="ps-10 placeholder-neutral-200 focus:outline-none w-full"
              @focus="handleFocus"
            >
            <div v-if="!isSearching" class="absolute inset-y-0 end-0 flex items-center pe-3 pointer-events-none">
              <div class="i-material-symbols-search-rounded text-neutral-200" />
            </div>
          </div>
          <div v-show="isSearching" class="z-50 absolute w-full rounded-b-lg bg-black/90 max-h-48 overflow-y-auto">
            <div v-if="!loading && movieSearchResults.length > 0" class="flex flex-col">
              <template v-for="movie in movieSearchResults" :key="movie.id">
                <NuxtLink :to="`/${movie.media_type}/${movie.id}`">
                  <div class="hover:bg-gray-200 text-neutral-200 hover:text-neutral-900 w-full py-2">
                    <h3 class="text-sm font-semibold px-2">
                      {{ movie.name ? movie.name : movie.title }}
                    </h3>
                  </div>
                </NuxtLink>
              </template>
            </div>
            <div v-else-if="!loading && movieSearchResults.length === 0" class="p-4">
              <h3 class="text-neutral-200">
                No Data Found
              </h3>
            </div>
            <div v-else class="flex justify-center items-center h-full w-full p-4">
              <div role="status">
                <svg aria-hidden="true" class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                  <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                </svg>
                <span class="sr-only">Loading...</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="flex space-x-12 relative">
        <template v-for="link in menu" :key="link.label">
          <div v-if="link.value" class="relative inline-block">
            <button class="text-neutral-200 flex space-x-2 items-center" @click="toggleDropdown">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><path fill="currentColor" d="M9 3a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zm10 0a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zM9 13a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2zm10 0a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2z" /></svg>
              <h3 class="uppercase font-semibold text-sm text-neutral-200">
                {{ link.label }}
              </h3>
            </button>

            <div
              v-show="isOpen"
              ref="elCategories"
              class="absolute mt-2 max-w-42 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none max-h-xs overflow-y-auto w-36 overflow-x-hidden"
            >
              <div class="py-1 w-full">
                <template v-for="genre in movieGenres" :key="genre.id">
                  <NuxtLink
                    :to="{
                      path: '/movie',
                      query: {
                        genres: genre.id,
                      },
                    }"
                  >
                    <button
                      class="uppercase block text-sm text-gray-700 hover:bg-gray-100 font-semibold w-full"
                    >
                      <p class="px-4 py-2 text-left">
                        {{ genre.name }}
                      </p>
                    </button>
                  </NuxtLink>
                </template>
              </div>
            </div>
          </div>
          <div v-else>
            <NuxtLink v-if="link.link" :to="link.link">
              <h3 class="uppercase font-semibold text-sm text-neutral-200">
                {{ link.label }}
              </h3>
            </NuxtLink>
            <h3 v-else class="uppercase font-semibold text-sm text-neutral-200">
              {{ link.label }}
            </h3>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>
