// src/lib/tmdb.ts

const TMDB_API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';

export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  release_date: string;
  vote_average: number;
}

export interface Genre {
  id: number;
  name: string;
}

export interface ProductionCompany {
  id: number;
  logo_path: string | null;
  name: string;
  origin_country: string;
}

export interface MovieDetails extends Movie { 
  backdrop_path: string | null;
  genres: Genre[];
  homepage: string | null;
  imdb_id: string | null;
  original_language: string;
  original_title: string;
  popularity: number;
  production_companies: ProductionCompany[];
  runtime: number | null; 
  status: string; 
  tagline: string | null;
  video: boolean; 
  vote_count: number;
}

export interface PaginatedResponse<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}

export async function getPopularMovies(): Promise<PaginatedResponse<Movie> | null> {
  if (!TMDB_API_KEY) {
    console.error('TMDB API Anahtarı bulunamadı. Lütfen .env.local dosyasını kontrol edin.');
    return null;
  }

  const url = `${TMDB_BASE_URL}/movie/popular?api_key=${TMDB_API_KEY}&language=tr-TR&page=1`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      console.error(`TMDB API hatası: ${response.status} ${response.statusText}`);
      const errorData = await response.json().catch(() => null);
      console.error('Hata Detayı:', errorData);
      return null;
    }
    const data: PaginatedResponse<Movie> = await response.json();
    return data;
  } catch (error) {
    console.error('Popüler filmler çekilirken bir hata oluştu:', error);
    return null;
  }
}

export async function getMovieDetails(movieId: number | string): Promise<MovieDetails | null> {
  if (!TMDB_API_KEY) {
    console.error('TMDB API Anahtarı bulunamadı. Lütfen .env.local dosyasını kontrol edin.');
    return null;
  }

  const id = typeof movieId === 'string' ? parseInt(movieId, 10) : movieId;
  if (isNaN(id)) {
      console.error('Geçersiz film ID:', movieId);
      return null;
  }

  const url = `${TMDB_BASE_URL}/movie/${id}?api_key=${TMDB_API_KEY}&language=tr-TR`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      console.error(`TMDB API (Film Detay) hatası: ${response.status} ${response.statusText}`);
      const errorData = await response.json().catch(() => null);
      console.error('Hata Detayı (Film Detay):', errorData);
      return null;
    }
    const data: MovieDetails = await response.json();
    return data;
  } catch (error) {
    console.error(`Film detayları (ID: ${id}) çekilirken bir hata oluştu:`, error);
    return null;
  }
}

export async function searchMovies(query: string, page: number = 1): Promise<PaginatedResponse<Movie> | null> {
  if (!TMDB_API_KEY) {
    console.error('TMDB API Anahtarı bulunamadı. Lütfen .env.local dosyasını kontrol edin.');
    return null;
  }

  if (!query || query.trim() === '') {
    console.error('Arama sorgusu boş olamaz.');
    return null; // Boş sorgu için null döndür
  }

  const encodedQuery = encodeURIComponent(query.trim());
  const url = `${TMDB_BASE_URL}/search/movie?api_key=${TMDB_API_KEY}&query=${encodedQuery}&language=tr-TR&page=${page}&include_adult=false`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      console.error(`TMDB API (Film Arama) hatası: ${response.status} ${response.statusText}`);
      const errorData = await response.json().catch(() => null);
      console.error('Hata Detayı (Film Arama):', errorData);
      return null;
    }
    const data: PaginatedResponse<Movie> = await response.json();
    return data;
  } catch (error) {
    console.error(`Filmler (sorgu: "${query}") aranırken bir hata oluştu:`, error);
    return null;
  }
}

// Gelecekte eklenebilecek diğer fonksiyonlar için örnekler:
// export async function getMovieDetails(movieId: number) { /* ... */ }
// export async function getMoviesByCategory(categoryId: string) { /* ... */ }
