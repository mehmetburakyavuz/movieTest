// src/components/FavoriteButton.tsx
"use client";

import { useState, useEffect } from 'react';
import {
  addFavoriteMovieId,
  removeFavoriteMovieId,
  isFavoriteMovie
} from '@/lib/favoritesStorage'; // @/lib alias'ını kullanıyoruz

interface FavoriteButtonProps {
  movieId: number;
  movieTitle?: string; // ARIA etiketleri ve kullanıcı mesajları için opsiyonel
  compact?: boolean; // Yeni prop eklendi
}

// Boş Kalp İkonu
const HeartIconOutline: React.FC<{ compact?: boolean }> = ({ compact }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-6 h-6 ${!compact ? 'mr-2' : ''}`}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
  </svg>
);

// Dolu Kalp İkonu
const HeartIconSolid: React.FC<{ compact?: boolean }> = ({ compact }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={`w-6 h-6 text-red-500 ${!compact ? 'mr-2' : ''}`}>
    <path d="M11.645 20.91a.75.75 0 0 1-1.29 0A12.952 12.952 0 0 0 3 10.079a5.25 5.25 0 0 1 9.477-2.614.563.563 0 0 0 .546 0A5.25 5.25 0 0 1 21 10.079c0 3.11-2.036 5.795-5.355 8.831Z" />
  </svg>
);

export const FavoriteButton: React.FC<FavoriteButtonProps> = ({ movieId, movieTitle, compact = false }) => {
  const [isFavorited, setIsFavorited] = useState(false);

  // Bileşen yüklendiğinde ve movieId değiştiğinde favori durumunu kontrol et
  useEffect(() => {
    setIsFavorited(isFavoriteMovie(movieId));
  }, [movieId]);

  const handleToggleFavorite = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); // Link tıklamasını engellemek için (eğer buton bir Link içindeyse)
    e.stopPropagation(); // Olayın üst elementlere yayılmasını engelle

    if (isFavorited) {
      removeFavoriteMovieId(movieId);
      setIsFavorited(false);
      // İsteğe bağlı: Kullanıcıya bildirim göster (örneğin, bir toast mesajı)
      // console.log(`"${movieTitle || movieId}" favorilerden çıkarıldı.`);
    } else {
      addFavoriteMovieId(movieId);
      setIsFavorited(true);
      // console.log(`"${movieTitle || movieId}" favorilere eklendi.`);
    }
  };

  const baseClasses = `rounded-lg flex items-center justify-center 
                     transition-all duration-200 ease-in-out transform hover:scale-105 
                     focus:outline-none focus:ring-2 focus:ring-offset-2`;
  
  const compactClasses = `p-2`; // Compact mod için padding

  const fullClasses = `mt-4 mb-6 py-3 px-5 font-semibold w-full sm:w-auto text-base`; // Tam mod için stiller

  const stateClasses = isFavorited
    ? 'bg-red-100 text-red-700 hover:bg-red-200 border-2 border-red-500 focus:ring-red-500'
    : 'bg-sky-500 text-white hover:bg-sky-600 border-2 border-sky-500 focus:ring-sky-500';
  
  // Compact modda buton arka planını biraz daha belirgin yapmak için hafif bir opaklık eklenebilir
  const compactOverlayClasses = compact ? 'bg-black bg-opacity-30 hover:bg-opacity-50 border-none' : '';


  return (
    <button
      onClick={handleToggleFavorite}
      className={`${baseClasses} ${compact ? compactClasses : fullClasses} ${compact ? compactOverlayClasses : stateClasses} ${compact && isFavorited ? 'text-red-500' : compact && !isFavorited ? 'text-white' : ''} `}
      aria-label={isFavorited ? `"${movieTitle || 'Bu film'}" favorilerden çıkar` : `"${movieTitle || 'Bu film'}" favorilere ekle`}
      title={compact ? (isFavorited ? 'Favorilerden çıkar' : 'Favorilere ekle') : undefined} // Compact modda title ekleyelim
    >
      {isFavorited ? <HeartIconSolid compact={compact} /> : <HeartIconOutline compact={compact} />}
      {!compact && (
        <span>{isFavorited ? 'Favorilerden Çıkar' : 'Favorilere Ekle'}</span>
      )}
    </button>
  );
};
