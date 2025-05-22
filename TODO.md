# Next.js Film Sitesi Geliştirme Görev Listesi

## Aşama 1: Proje Kurulumu ve Temel Yapılandırma (Next.js)
- [ ] **Next.js Projesi Oluşturma:**
    - [ ] `create-next-app` ile yeni bir proje başlat (TypeScript ile önerilir).
    - [ ] Gerekli bağımlılıkları belirle (örneğin, `axios` veya `swr` veri çekme için, seçilen stil çözümü için paketler).
- [ ] **Temel Proje Yapısı:**
    - [ ] `pages/` dizinini gözden geçir (temel sayfalar: `index`, `_app`, `_document`).
    - [ ] `components/` klasörünü oluştur (yeniden kullanılabilir UI bileşenleri için).
    - [ ] `public/` klasörünü gözden geçir (statik varlıklar için: resimler, fontlar).
    - [ ] `styles/` klasörünü oluştur (global stiller ve/veya CSS modülleri için).
    - [ ] `lib/` veya `utils/` klasörünü oluştur (yardımcı fonksiyonlar, API istemcisi vb.).
- [ ] **API Entegrasyonu (TMDB):**
    - [ ] TMDB API anahtarını `.env.local` dosyasına güvenli bir şekilde ekle.
    - [ ] TMDB API'sine istek atmak için bir istemci (client) modülü oluştur (`lib/tmdb.js` gibi).
- [ ] **Stil Çözümü Kurulumu:**
    - [ ] Seçilen stil çözümünü projeye entegre et (örn: Tailwind CSS kurulumu ve yapılandırması).

## Aşama 2: Temel Sayfalar ve Bileşenler (Next.js & React)
- [ ] **Genel Layout Bileşeni:**
    - [ ] `components/Layout.js` oluştur (Header, Footer, ana içerik alanı).
    - [ ] `pages/_app.js` içinde `Layout` bileşenini kullanarak tüm sayfalara uygula.
- [ ] **Ana Sayfa (`pages/index.js` veya `pages/index.tsx`):**
    - [ ] Popüler filmleri ve kategori listesini göstermek için temel yapıyı oluştur.
    - [ ] Popüler filmleri `getServerSideProps` veya `getStaticProps` ile çekip listele.
- [ ] **Film Kartı Bileşeni (`components/MovieCard.js` veya `.tsx`):**
    - [ ] Tek bir filmin posterini, başlığını, kısa bilgisini ve favori butonunu gösterecek şekilde tasarla.
- [ ] **Film Listesi Bileşeni (`components/MovieList.js` veya `.tsx`):**
    - [ ] `MovieCard` bileşenlerini kullanarak bir film listesi oluştur.
- [ ] **Kategori Navigasyon Bileşeni (`components/CategoryNavigation.js` veya `.tsx`):**
    - [ ] Film kategorilerini listeleyecek ve tıklanabilir linkler sunacak şekilde tasarla.
    - [ ] Kategori verilerini `getStaticProps` ile çek (eğer kategoriler sık değişmiyorsa).

## Aşama 3: Dinamik Rotalar ve Veri Gösterimi (Next.js)
- [ ] **Film Detay Sayfası (`pages/movie/[id].js` veya `.tsx`):**
    - [ ] Dinamik rota oluştur.
    - [ ] `getServerSideProps` veya (`getStaticProps` + `getStaticPaths`) kullanarak belirli bir filmin detaylarını TMDB API'den çekip göster.
- [ ] **Kategori Sayfası (`pages/category/[slug].js` veya `.tsx`):**
    - [ ] Dinamik rota oluştur.
    - [ ] Seçilen kategoriye ait filmleri TMDB API'den çekip listele (`getServerSideProps` veya `getStaticProps` + `getStaticPaths`).

## Aşama 4: Favoriler Fonksiyonelliği (React Context/State & LocalStorage)
- [ ] **Favoriler Context/State Yönetimi:**
    - [ ] Favori filmleri yönetmek için bir React Context veya global state çözümü (örn: Zustand, Jotai - başlangıç için Context yeterli) oluştur.
    - [ ] Favori filmlerin ID'lerini `localStorage` ile senkronize et.
- [ ] **Favoriye Ekle/Çıkar Butonu (`components/FavoriteButton.js` veya `.tsx`):**
    - [ ] Film kartlarında ve detay sayfasında bu butonu kullan.
    - [ ] Butona tıklandığında filmi favorilere ekleme/çıkarma işlemini Context/State üzerinden yap.
    - [ ] Butonun görünümünü (favoride mi değil mi) Context/State'e göre güncelle.
- [ ] **Favoriler Sayfası (`pages/favorites.js` veya `.tsx`):**
    - [ ] Favori filmleri Context/State üzerinden alıp `MovieList` bileşeni ile listele.
    - [ ] Favori filmlerin detaylarını (poster, başlık vb.) TMDB API'den (veya `localStorage`'da saklanan ek veriden) alıp göster.

## Aşama 5: API Rotaları ve İsteğe Bağlı Geliştirmeler (Next.js API Routes)
- [ ] **TMDB Proxy API Rotası (Önerilir - `pages/api/tmdb.js` veya `pages/api/movies/[...params].js`):**
    - [ ] TMDB API isteklerini bu rota üzerinden yönlendirerek API anahtarını client-side'dan gizle.
    - [ ] Client-side'daki API istemcisini bu proxy rotasını kullanacak şekilde güncelle.
- [ ] **Arama Fonksiyonu:**
    - [ ] Arama çubuğu bileşeni oluştur.
    - [ ] Kullanıcının girdiği terime göre TMDB API'sinden (proxy üzerinden) arama yapıp sonuçları göster (client-side fetching veya yeni bir sayfa/`getServerSideProps` ile).
- [ ] **Sayfalama (Pagination):**
    - [ ] Uzun film listelerinde sayfalama ekle (hem API isteklerinde hem de UI'da).

## Aşama 6: Stil, İyileştirmeler ve Test
- [ ] **Detaylı Stil Uygulaması:**
    - [ ] Seçilen stil çözümünü kullanarak tüm sayfalara ve bileşenlere şık bir görünüm kazandır.
    - [ ] Mobil uyumluluk (Responsive Design) üzerinde detaylı çalış.
- [ ] **Yüklenme Durumları ve Hata Yönetimi:**
    - [ ] Veri çekme işlemleri sırasında yüklenme göstergeleri (loading spinners/skeletons) ekle.
    - [ ] API hatalarını veya boş sonuçları kullanıcıya uygun şekilde bildir.
- [ ] **Kod İyileştirmesi ve Erişilebilirlik:**
    - [ ] Kodu yeniden düzenle (refactor), bileşenleri optimize et.
    - [ ] Yorum satırları ekle.
    - [ ] Temel erişilebilirlik (a11y) standartlarına dikkat et.
- [ ] **Test:**
    - [ ] Temel kullanıcı akışlarını (ana sayfa, film detayı, kategori, favoriler) test et.
    - [ ] Farklı tarayıcılarda ve cihazlarda kontrol et.

## Aşama 7: Dağıtım (Opsiyonel)
- [ ] **Dağıtım Platformu Seçimi:**
    - [ ] Vercel (Next.js için doğal platform), Netlify, AWS Amplify gibi bir platform seç.
- [ ] **Dağıtım:**
    - [ ] Projeyi seçilen platforma deploy et.
