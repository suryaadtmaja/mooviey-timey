import type { Movies } from '~/types/MoviesType'

interface Genres {
  id: number
  name: string
}
interface GenreResponse {
  genres: Genres[]
}

interface MovieSearchResponse {
  results: Movies[]
}

interface State {
  movieGenres: Genres[]
  movieSearchResults: Movies[]
  trendingMovies: Movies[]
}
export const useMoviesStore = defineStore('movies', {
  state: (): State => {
    return {
      movieGenres: [],
      movieSearchResults: [],
      trendingMovies: [],
    }
  },
  actions: {
    async getTrendingMovies() {
      const res = await $fetch<MovieSearchResponse>('/api/tmdb/trending/all/day')
      this.trendingMovies = res.results
    },
    async findMoviesByTitle(title: string) {
      const res = await $fetch<MovieSearchResponse>(`/api/tmdb/search/multi?query=${title}`)
      this.movieSearchResults = res.results
    },
    async getMovieGenres(type: string) {
      const res = await $fetch<GenreResponse>(`/api/tmdb/genre/${type}/list`)
      this.movieGenres = res.genres
    },
  },
})
