// src/app/search/page.tsx
"use client";

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { searchMovies, Movie, PaginatedResponse } from '../../lib/tmdb';
import MovieList from '../../components/MovieList';
import Link from 'next/link';

function SearchPageComponent() {
  const searchParams = useSearchParams();
  const query = searchParams.get('query');

  const [searchResults, setSearchResults] = useState<PaginatedResponse<Movie> | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (query) {
      const fetchMovies = async () => {
        setIsLoading(true);
        setError(null);
        setSearchResults(null);
        try {
          const data = await searchMovies(query);
          if (data) {
            setSearchResults(data);
            if (data.results.length === 0) {
              setError(`"${query}" için sonuç bulunamadı.`);
            }
          } else {
            setError('Arama sonuçları getirilemedi veya API anahtarı sorunu olabilir.');
          }
        } catch (err) {
          console.error("Arama sırasında hata:", err);
          setError('Filmler aranırken bir sorun oluştu.');
        } finally {
          setIsLoading(false);
        }
      };
      fetchMovies();
    } else {
      setSearchResults(null);
      setError(null);
    }
  }, [query]);

  return (
    <div className="container mx-auto px-4 py-8">
      {query && (
        <h1 className="text-3xl font-bold mb-8 text-slate-800 dark:text-white">
          Arama Sonuçları: <span className="text-sky-500">{query}</span>
        </h1>
      )}
      {!query && !isLoading && (
         <div className="text-center py-10">
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-4">Lütfen bir film arayın.</p>
            <Link href="/" className="text-sky-500 hover:text-sky-600 font-semibold">
              Ana Sayfaya Dön
            </Link>
         </div>
      )}

      {isLoading && (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-sky-500"></div>
          <p className="ml-4 text-xl text-gray-700 dark:text-gray-300">Yükleniyor...</p>
        </div>
      )}

      {error && !isLoading && (
        <div className="text-center py-10 px-4">
          <p className="text-xl text-red-500 bg-red-100 dark:bg-red-900 dark:text-red-300 p-4 rounded-md shadow">
            {error}
          </p>
           <Link href="/" className="mt-6 inline-block text-sky-500 hover:text-sky-600 font-semibold">
              Ana Sayfaya Dön
            </Link>
        </div>
      )}

      {!isLoading && !error && searchResults && searchResults.results.length > 0 && (
        <MovieList movies={searchResults.results} />
      )}
      
      {!isLoading && !error && query && searchResults && searchResults.results.length === 0 && (
         <div className="text-center py-10">
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-4">
              Aradığınız kriterlere uygun film bulunamadı.
            </p>
            <Link href="/" className="text-sky-500 hover:text-sky-600 font-semibold">
              Ana Sayfaya Dön
            </Link>
         </div>
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <SearchPageComponent />
    </Suspense>
  );
}

const LoadingFallback = () => (
  <div className="container mx-auto px-4 py-8 flex justify-center items-center h-screen">
    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-sky-500"></div>
    <p className="ml-4 text-xl text-gray-700 dark:text-gray-300">Sayfa Yükleniyor...</p>
  </div>
);
