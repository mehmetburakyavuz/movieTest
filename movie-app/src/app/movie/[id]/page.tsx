// src/app/movie/[id]/page.tsx
import { getMovieDetails, MovieDetails, Genre } from '@/lib/tmdb'; // MovieDetails ve Genre'yi import et
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation'; // Film bulunamazsa 404 için
import { FavoriteButton } from '@/components/FavoriteButton'; // FavoriteButton import edildi

// Sayfa başlığını dinamik olarak ayarlamak için metadata oluşturma fonksiyonu
export async function generateMetadata({ params }: { params: { id: string } }) {
  const movie = await getMovieDetails(params.id);
  if (!movie) {
    return {
      title: 'Film Bulunamadı',
    };
  }
  return {
    title: `${movie.title} | Film Sitesi`,
    description: movie.overview.substring(0, 160), // İlk 160 karakter
  };
}

interface MovieDetailPageProps {
  params: {
    id: string; // Dinamik segmentten gelen ID (string olarak gelir)
  };
}

const MovieDetailPage: React.FC<MovieDetailPageProps> = async ({ params }) => {
  const movie: MovieDetails | null = await getMovieDetails(params.id);

  if (!movie) {
    notFound(); // Film bulunamazsa 404 sayfası göster
  }

  const posterBaseUrl = 'https://image.tmdb.org/t/p/w780'; // Daha büyük poster veya backdrop
  const backdropBaseUrl = 'https://image.tmdb.org/t/p/w1280';

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Backdrop Image (Opsiyonel) */}
      {movie.backdrop_path && (
        <div className="relative h-64 md:h-96 rounded-lg overflow-hidden shadow-lg mb-8">
          <Image
            src={`${backdropBaseUrl}${movie.backdrop_path}`}
            alt={`${movie.title} backdrop`}
            layout="fill"
            objectFit="cover"
            priority // Önemli bir resim olduğu için önceliklendir
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20"></div>
        </div>
      )}

      <div className="bg-white shadow-xl rounded-lg p-6 md:p-8 -mt-16 md:-mt-24 relative z-10">
        <div className="md:flex md:space-x-8">
          {/* Poster */}
          <div className="md:w-1/3 mb-6 md:mb-0">
            {movie.poster_path ? (
              <Image
                src={`${posterBaseUrl}${movie.poster_path}`}
                alt={`${movie.title} posteri`}
                width={780}
                height={1170} // w780 için tipik oran
                className="rounded-lg shadow-md"
                style={{ width: '100%', height: 'auto' }} // Responsive olmasını sağlar
              />
            ) : (
              <div className="w-full h-96 bg-gray-200 flex items-center justify-center rounded-lg">
                <span className="text-gray-500">Poster Yok</span>
              </div>
            )}
          </div>

          {/* Film Bilgileri */}
          <div className="md:w-2/3">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">{movie.title}</h1>
            {movie.tagline && <p className="text-lg text-gray-600 italic mb-4">"{movie.tagline}"</p>}
            
            {/* Favori Butonu Buraya Eklendi */}
            <FavoriteButton movieId={movie.id} movieTitle={movie.title} />

            <div className="mb-4">
              <h2 className="text-xl font-semibold text-gray-700 mb-2">Özet</h2>
              <p className="text-gray-700 leading-relaxed">{movie.overview || 'Özet bulunamadı.'}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 mb-6">
              <div>
                <span className="font-semibold">Puan:</span> {movie.vote_average ? `${movie.vote_average.toFixed(1)}/10 (${movie.vote_count} oy)` : 'N/A'}
              </div>
              <div>
                <span className="font-semibold">Süre:</span> {movie.runtime ? `${movie.runtime} dakika` : 'Bilinmiyor'}
              </div>
              <div>
                <span className="font-semibold">Yayın Tarihi:</span> {movie.release_date ? new Date(movie.release_date).toLocaleDateString('tr-TR') : 'Bilinmiyor'}
              </div>
              <div>
                <span className="font-semibold">Durum:</span> {movie.status || 'Bilinmiyor'}
              </div>
            </div>

            {movie.genres && movie.genres.length > 0 && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-700 mb-2">Türler</h3>
                <div className="flex flex-wrap gap-2">
                  {movie.genres.map((genre: Genre) => (
                    <span key={genre.id} className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm">
                      {genre.name}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {movie.homepage && (
              <div className="mb-4">
                <Link href={movie.homepage} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 hover:underline transition-colors">
                  Filmin Web Sitesi
                </Link>
              </div>
            )}
            
            <Link href="/" className="text-blue-600 hover:text-blue-800 hover:underline transition-colors">
              &larr; Ana Sayfaya Dön
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailPage;
