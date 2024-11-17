export interface Movies {
  backdrop_path: string
  id: number
  name?: string
  title?: string
  original_name: string
  original_title?: string
  overview: string
  poster_path: string
  media_type: string
  adult: boolean
  original_language: string
  genre_ids: number[]
  popularity: number
  first_air_date: string
  vote_average: number
  vote_count: number
  origin_country: string[]
  release_date?: string
}

interface Genre {
  id: number
  name: string
}

interface ProductionCompany {
  id: number
  logo_path: string | null
  name: string
  origin_country: string
}

interface ProductionCountry {
  iso_3166_1: string
  name: string
}

interface SpokenLanguage {
  english_name: string
  iso_639_1: string
  name: string
}

export interface MovieDetail {
  adult: boolean
  backdrop_path: string | null
  belongs_to_collection: any | null
  budget: number
  genres: Genre[]
  homepage: string | null
  id: number
  imdb_id: string | null
  origin_country: string[]
  original_language: string
  original_title: string
  overview: string | null
  popularity: number
  poster_path: string | null
  production_companies: ProductionCompany[]
  production_countries: ProductionCountry[]
  release_date?: string
  revenue: number
  runtime: number | null
  spoken_languages: SpokenLanguage[]
  status: string
  tagline: string | null
  title: string
  video: boolean
  vote_average: number
  vote_count: number
  first_air_date?: string
}

export interface ReviewDetails {
  id: number
  page: number
  results: Review[]
}

export interface Review {
  author: string
  author_details: AuthorDetails
  content: string
  created_at: string // ISO 8601 format date
  id: string
  updated_at: string // ISO 8601 format date
  url: string
}

export interface AuthorDetails {
  name: string
  username: string
  avatar_path: string
  rating: number | null
}
