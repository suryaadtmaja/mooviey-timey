// https://nuxt.com/docs/api/configuration/nuxt-config
import process from 'node:process'

export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: ['@unocss/nuxt', '@pinia/nuxt'],
  runtimeConfig: {
    apiKey: process.env.TMDB_READ_ACCESS_TOKEN || '',
    baseUrl: 'https://api.themoviedb.org/3',
  },
  css: [
    '@unocss/reset/tailwind.css',
  ],
  typescript: {
    typeCheck: true,
  },
  pinia: {
    storesDirs: ['./stores/**'],
  },
})
