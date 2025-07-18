export interface TimelineEntry {
  date: string;
  title: string;
  description: string;
}

export const timelineData: TimelineEntry[] = [
  {
    date: "4 Temmuz",
    title: "Linkle Tıklanarak Gidilen Başka Bir Sayfa",
    description:
      "React Router kullanarak portföy sitesinde sayfa yönlendirmeleri dinamik hale getirildi. Projeler'e tıklanıldığında kullanıcı farklı route'lardaki sayfalara yönlendiriliyor. Böylece tek sayfa yerine çoklu rota yapısı kuruldu.",
  },
  {
    date: "4 Temmuz",
    title: "API'den Veri Çekme (LinkedIn, GitHub)",
    description:
      "GitHub API'si ile profil bilgileri ve repo listesi çekilerek projeler dinamik olarak listelendi. Axios kullanılarak veri çekme işlemi gerçekleştirildi, yüklenme durumu ve hata yönetimi de eklendi.",
  },
  {
    date: "4 Temmuz",
    title: "Web Uygulamasını Hosting'de Yayınlama",
    description:
      "Portföy sitesi Vercel üzerinden, GitHub repo bağlantısı kurularak canlıya alındı.",
  },
  {
    date: "5 Temmuz",
    title: "Node.js Nedir?",
    description:
      "Node.js, tarayıcı dışında JavaScript çalıştırmaya olanak sağlayan bir çalışma ortamıdır. Backend tarafında sunucu kurma, API yazma ve dosya sistemi işlemleri gibi görevlerde yaygın olarak kullanılır.",
  },
  {
    date: "5 Temmuz",
    title: "NPM Nedir?",
    description:
      "NPM (Node Package Manager), JavaScript projelerinde kullanılan paketleri yönetmek için kullanılan bir araçtır. Projede React, styled-components, Ant Design gibi kütüphaneler NPM ile yüklendi ve yönetildi.",
  },
  {
    date: "6-7 Temmuz",
    title: "React",
    description:
      "Component yapısı, state yönetimi, props kullanımı gibi React’in temel kavramları öğrenildi. useState, useEffect gibi hook'lar ile dinamik kullanıcı arayüzleri geliştirildi.",
  },
  {
    date: "7 Temmuz",
    title: "Ant Design ",
    description:
      "Ant Design bileşen kütüphanesi ile profesyonel görünümlü UI öğeleri oluşturuldu. Formlar, butonlar, layout yapıları projeye entegre edildi.",
  },
  {
    date: "7 Temmuz",
    title: "CSS-in-JS ",
    description:
      "`styled-components` ile komponent bazlı stil yazma pratiği geliştirildi.",
  },
  {
    date: "9-10 Temmuz",
    title: "Portföyü Vite ile Yeniden Oluşturma",
    description:
      "Performans artışı ve modern geliştirme deneyimi için proje Vite ile yeniden yapılandırıldı. ",
  },
  {
    date: "-",
    title: "TypeScript ile Yeniden Oluşturma",
    description:
      "Kod güvenliğini artırmak ve otokompleteleri daha etkili kullanmak için proje TypeScript ile yeniden yazılacak. Arayüz tanımları, props ve API veri yapıları tiplerle tanımlanarak hata olasılıkları en aza indirilecek.",
  },
  {
    date: "-",
    title: "Eşarj ile Tanışma",
    description:
      "Eşarj bünyesinde Flutter geliştiricisi olarak başladığım bu süreçte yazılım süreçlerine mobil odaklı katkı verdim. Daha sonra backend geliştirmeye de yönelerek Node.js ve TypeScript tabanlı projelerde aktif rol almaya başladım.",
  },
];
