// src/components/MovieList.tsx
import MovieCard from './MovieCard'; // MovieCard bileşenini import et

// MovieCard'daki Movie arayüzünü veya tmdb.ts'deki Movie arayüzünü kullanabiliriz.
// Tutarlılık için tmdb.ts'den export edip burada import etmek daha iyi olabilir,
// ama şimdilik MovieCard'daki ile aynı olduğunu varsayalım.
interface Movie {
  id: number;
  title: string;
  poster_path: string | null;
  release_date: string;
  vote_average: number;
  overview: string;
}

interface MovieListProps {
  movies: Movie[];
  listTitle?: string; // Opsiyonel liste başlığı
}

const MovieList: React.FC<MovieListProps> = ({ movies, listTitle }) => {
  if (!movies || movies.length === 0) {
    return (
      <div className="text-center py-8">
        {listTitle && <h2 className="text-2xl font-semibold mb-4">{listTitle}</h2>}
        <p className="text-gray-600">Gösterilecek film bulunamadı.</p>
      </div>
    );
  }

  return (
    <section className="py-8">
      {listTitle && (
        <h2 className="text-3xl font-bold text-gray-800 mb-6 pl-4 md:pl-0">
          {listTitle}
        </h2>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </section>
  );
};

export default MovieList;
