// src/components/Header.tsx
"use client"; // State kullanacağımız için

import Link from 'next/link';
import { useState, FormEvent, ChangeEvent } from 'react'; // useState, FormEvent, ChangeEvent importları
import { useRouter } from 'next/navigation'; // Yönlendirme için

// Basit bir arama ikonu (SVG)
const SearchIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-5 h-5"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
    />
  </svg>
);

// Basit bir Kalp ikonu (SVG) - Favoriler için
const HeartIcon = () => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    fill="none" 
    viewBox="0 0 24 24" 
    strokeWidth={1.5} 
    stroke="currentColor" 
    className="w-5 h-5"
  >
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" 
    />
  </svg>
);

const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter(); // Yönlendirme için router hook'u

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Formun sayfa yenilemesini engelle
    if (searchQuery.trim()) {
      // Arama terimini URL'ye query parametresi olarak ekleyip arama sayfasına yönlendir
      router.push(`/search?query=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery(''); // Arama kutusunu temizle (opsiyonel)
    }
    // console.log('Aranan kelime:', searchQuery); // Geliştirme sırasında loglamayı açabilirsiniz
  };

  return (
    <header className="bg-gradient-to-r from-slate-900 to-slate-700 text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-5 flex justify-between items-center">
        <Link href="/" className="text-3xl font-extrabold hover:text-sky-400 transition-colors duration-300 ease-in-out tracking-tight">
          Film<span className="text-sky-400">İzle</span>
        </Link>
        
        {/* Sağ Taraftaki Arama ve Navigasyon Grubu */}
        <div className="flex items-center space-x-4">
          {/* Arama Formu */}
          <form onSubmit={handleSearchSubmit} className="flex items-center">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Film ara..."
                className="bg-slate-700 text-white placeholder-gray-400 border-2 border-slate-600 
                           focus:border-sky-500 focus:ring-sky-500 focus:outline-none 
                           rounded-l-md py-2 px-3 transition-colors duration-300 ease-in-out
                           text-sm w-36 sm:w-48 md:w-64" // Farklı ekran boyutları için genişlik ayarı
              />
            </div>
            <button
              type="submit"
              className="bg-sky-500 hover:bg-sky-600 text-white font-semibold 
                         py-2 px-3 rounded-r-md transition-colors duration-300 ease-in-out
                         flex items-center border-2 border-sky-500 hover:border-sky-600"
              aria-label="Ara"
            >
              <SearchIcon />
              <span className="ml-1.5 hidden sm:inline text-sm">Ara</span>
            </button>
          </form>

          {/* Favoriler Linki */}
          <Link 
            href="/favorites" 
            className="flex items-center text-white hover:text-sky-400 transition-colors duration-300 ease-in-out
                       bg-slate-700 hover:bg-slate-600 px-3 py-2 rounded-md border-2 border-slate-600 hover:border-sky-500"
            title="Favorilerim"
          >
            <HeartIcon />
            <span className="ml-1.5 hidden sm:inline text-sm">Favoriler</span>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
