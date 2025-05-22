// src/app/favorites/page.tsx
"use client";

import { useState, useEffect } from 'react';
import { getFavoriteMovieIds } from '@/lib/favoritesStorage';
import { getMovieDetails, MovieDetails, Movie } from '@/lib/tmdb'; // MovieDetails ve Movie tiplerini import et
import MovieList from '@/components/MovieList';
import Link from 'next/link';

const FavoritesPage = () => {
  const [favoriteMovies, setFavoriteMovies] = useState<MovieDetails[]>([]); // Veya Movie[] eğer MovieList onu bekliyorsa
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFavoriteMovies = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const favoriteIds = getFavoriteMovieIds();
        if (favoriteIds.length === 0) {
          setFavoriteMovies([]);
          setIsLoading(false);
          return;
        }

        // Her bir ID için film detaylarını çek
        // Not: getMovieDetails string ID bekliyor, localStorage'dan number geliyor. Kontrol et!
        // tmdb.ts'deki getMovieDetails params.id: string alıyor.
        const moviePromises = favoriteIds.map(id => getMovieDetails(String(id)));
        const results = await Promise.all(moviePromises);
        
        // Başarılı bir şekilde çekilen filmleri filtrele (null olmayanlar)
        const validMovies = results.filter(movie => movie !== null) as MovieDetails[];
        setFavoriteMovies(validMovies);

      } catch (err) {
        console.error("Favori filmler getirilirken hata:", err);
        setError("Favori filmleriniz getirilirken bir sorun oluştu.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchFavoriteMovies();
  }, []); // Bağımlılık dizisi boş, sadece bileşen yüklendiğinde çalışır

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-sky-500"></div>
          <p className="ml-4 text-xl text-gray-700 dark:text-gray-300">Favoriler Yükleniyor...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <p className="text-xl text-red-500 bg-red-100 dark:bg-red-900 dark:text-red-300 p-4 rounded-md shadow">{error}</p>
        <Link href="/" className="mt-6 inline-block text-sky-500 hover:text-sky-600 font-semibold">
          Ana Sayfaya Dön
        </Link>
      </div>
    );
  }

  if (favoriteMovies.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-3xl font-bold text-slate-800 dark:text-white mb-8">Favori Filmlerim</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-4">
          Henüz favorilerinize film eklememişsiniz.
        </p>
        <Link href="/" className="text-sky-500 hover:text-sky-600 font-semibold">
          Film Keşfetmeye Başla &rarr;
        </Link>
      </div>
    );
  }

  // MovieList'in Movie[] beklediğini varsayarak MovieDetails[]'i dönüştürmemiz gerekebilir.
  // Şimdilik MovieList'in MovieDetails[] kabul ettiğini varsayalım veya MovieDetails'ın Movie ile uyumlu olduğunu.
  // Eğer MovieList sadece Movie[] bekliyorsa, bir map işlemi gerekebilir.
  // Örneğin: const moviesForList: Movie[] = favoriteMovies.map(m => ({ id: m.id, title: m.title, poster_path: m.poster_path, release_date: m.release_date, vote_average: m.vote_average }));
  // Ancak MovieDetails zaten Movie tipini kapsıyor olmalı.
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-slate-800 dark:text-white mb-8">Favori Filmlerim</h1>
      <MovieList movies={favoriteMovies as Movie[]} /> {/* Tip zorlaması gerekebilir */}
    </div>
  );
};

export default FavoritesPage;
