// src/components/Footer.tsx

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-gray-700 text-white text-center p-4 mt-auto">
      <div className="container mx-auto">
        <p>&copy; {currentYear} Film Sitesi Projesi. Tüm hakları saklıdır.</p>
        <p className="text-sm text-gray-400 mt-1">
          Next.js ve TMDB API ile güçlendirilmiştir.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
