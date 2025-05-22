// src/components/MovieCard.tsx
import Image from 'next/image';
import Link from 'next/link';
import { FavoriteButton } from './FavoriteButton';

// tmdb.ts dosyasındaki Movie arayüzünü burada da kullanabiliriz
// veya proptypes için daha spesifik bir arayüz tanımlayabiliriz.
// Şimdilik tmdb.ts'deki Movie arayüzüne benzer bir yapı varsayalım.
interface Movie {
  id: number;
  title: string;
  poster_path: string | null;
  release_date: string;
  vote_average: number;
  overview: string; // MovieCard'da kısa bir özet gösterebiliriz
}

interface MovieCardProps {
  movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const posterBaseUrl = 'https://image.tmdb.org/t/p/w500'; // w500 poster boyutu

  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg overflow-hidden transform transition-all hover:scale-105 group">
      {/* Link tüm kartı sarmak yerine sadece poster ve başlığı sarabilir, 
          ama favori butonunun tıklama olayını doğru yönetmek için şimdilik böyle kalsın.
          FavoriteButton içindeki e.stopPropagation() önemli. */}
      <Link href={`/movie/${movie.id}`} passHref>
        {/* Poster alanı - relative konumlandırma eklendi */}
        <div className="relative h-96"> 
          {movie.poster_path ? (
            <Image
              src={`${posterBaseUrl}${movie.poster_path}`}
              alt={`${movie.title} posteri`}
              layout="fill"
              objectFit="cover" // Resmin alanı kaplamasını sağlar, gerekirse kırpar
              className="transition-opacity duration-300 ease-in-out group-hover:opacity-75" // group-hover eklendi
            />
          ) : (
            <div className="w-full h-full bg-gray-200 dark:bg-slate-700 flex items-center justify-center">
              <span className="text-gray-500 dark:text-slate-400">Poster Yok</span>
            </div>
          )}
          {/* Favori Butonu - Posterin üzerine konumlandırıldı */}
          <div className="absolute top-2 right-2 z-10 opacity-80 group-hover:opacity-100 transition-opacity duration-200">
            <FavoriteButton movieId={movie.id} movieTitle={movie.title} compact={true} />
          </div>
        </div>
      </Link>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-1 truncate" title={movie.title}>
          <Link href={`/movie/${movie.id}`} className="hover:text-sky-500 dark:hover:text-sky-400 transition-colors">
            {movie.title}
          </Link>
        </h3>
        <p className="text-sm text-gray-600 dark:text-slate-300 mb-1">
          Yayın Tarihi: {movie.release_date ? new Date(movie.release_date).toLocaleDateString('tr-TR') : 'Bilinmiyor'}
        </p>
        <p className="text-sm text-gray-700 dark:text-slate-200 font-medium">
          Puan: {movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'} / 10
        </p>
        {/* Kısa bir özet de eklenebilir, ancak kartı çok büyütmemeli
        <p className="text-xs text-gray-500 mt-2 line-clamp-3">
          {movie.overview}
        </p>
        */}
      </div>
    </div>
  );
};

export default MovieCard;
