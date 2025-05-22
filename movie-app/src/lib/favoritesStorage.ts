// src/lib/favoritesStorage.ts

const FAVORITES_KEY = 'favoriteMovies';

// localStorage'ın kullanılabilir olup olmadığını kontrol et
const isLocalStorageAvailable = (): boolean => {
  try {
    const testKey = '__localStorageTest__';
    localStorage.setItem(testKey, testKey);
    localStorage.removeItem(testKey);
    return true;
  } catch (e) {
    return false;
  }
};

/**
 * localStorage'dan favori film ID'lerini alır.
 * @returns Favori film ID'lerinin bir dizisi. localStorage yoksa veya hata oluşursa boş dizi döner.
 */
export const getFavoriteMovieIds = (): number[] => {
  if (!isLocalStorageAvailable()) {
    console.warn('localStorage is not available.');
    return [];
  }
  try {
    const favoritesJson = localStorage.getItem(FAVORITES_KEY);
    return favoritesJson ? JSON.parse(favoritesJson) : [];
  } catch (error) {
    console.error('Error parsing favorites from localStorage:', error);
    return [];
  }
};

/**
 * Bir film ID'sini favorilere ekler.
 * @param movieId Eklenecek film ID'si.
 */
export const addFavoriteMovieId = (movieId: number): void => {
  if (!isLocalStorageAvailable()) {
    console.warn('localStorage is not available. Cannot add favorite.');
    return;
  }
  try {
    const favorites = getFavoriteMovieIds();
    if (!favorites.includes(movieId)) {
      const updatedFavorites = [...favorites, movieId];
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(updatedFavorites));
    }
  } catch (error) {
    console.error('Error adding favorite to localStorage:', error);
  }
};

/**
 * Bir film ID'sini favorilerden çıkarır.
 * @param movieId Çıkarılacak film ID'si.
 */
export const removeFavoriteMovieId = (movieId: number): void => {
  if (!isLocalStorageAvailable()) {
    console.warn('localStorage is not available. Cannot remove favorite.');
    return;
  }
  try {
    const favorites = getFavoriteMovieIds();
    const updatedFavorites = favorites.filter((id) => id !== movieId);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(updatedFavorites));
  } catch (error) {
    console.error('Error removing favorite from localStorage:', error);
  }
};

/**
 * Bir filmin favorilerde olup olmadığını kontrol eder.
 * @param movieId Kontrol edilecek film ID'si.
 * @returns Film favorilerdeyse true, değilse false.
 */
export const isFavoriteMovie = (movieId: number): boolean => {
  if (!isLocalStorageAvailable()) {
    // localStorage yoksa, hiçbir şey favori değildir.
    return false;
  }
  try {
    const favorites = getFavoriteMovieIds();
    return favorites.includes(movieId);
  } catch (error) {
    console.error('Error checking favorite in localStorage:', error);
    return false;
  }
};
