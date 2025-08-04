| Sekme       | Ne işe yarar?                              |
| ----------- | ------------------------------------------ |
| Elements    | HTML ve CSS canlı düzenleme                |
| Console     | Hata mesajları ve JS çalıştırma            |
| Sources     | Kod adım adım çalıştırma, breakpoint koyma |
| Network     | API çağrılarını inceleme                   |
| Application | LocalStorage, Cookies, Cache               |
| Performance | Sayfa yüklenme ve render performansı       |
| Memory      | Bellek kullanımı, leak tespiti             |
| Lighthouse  | Otomatik performans/SEO/UX raporu          |


**chrome debug** -> hiç bir build almadan ya da transpile etmeye gerek olmadan **npm run dev** komutuyla http://localhost:5173/ url i üzerinden chrome açılarak dev tool da source sekmesinde break point koyarak src altındaki dosyaları chrome üzerinden debug edebiliyoruz



✅ npm run dev ile Debug Süreci – Vite ve Chrome DevTools
🔧 Ne Olur?
npm run dev komutu aslında Vite'in development server’ını çalıştırır.

Vite, bu sırada TypeScript ya da modern JS dosyalarını anlık olarak bellekte (memory) işler, transpile eder ve http://localhost:5173/ üzerinden servis eder.

Yani fiziksel olarak bir build klasörü oluşturulmaz.

Kodun hala .ts veya .tsx halindeyken, Chrome DevTools → Sources sekmesi üzerinden bu dosyaları görebilirsin (Vite sayesinde kaynak haritaları - source maps - sağlandığı için).

Bu sayede breakpoint koyduğunda TypeScript kodunun kendisinde durur, derlenmiş JavaScript değil.

🔍 Debug için Gerekli Koşullar
vite.config.ts içinde sourcemap desteklenir (genelde otomatik).

VS Code gibi bir IDE’ye özel bir şey yapmana gerek yoktur, Chrome DevTools yeterlidir.

npm run dev sırasında açılan sayfada F12 → Sources sekmesinden src/ klasörüne ulaşılır.

🛑 Ne Gereksiz?
npm run build → Prod build almanıza gerek yok.

tsc ile TypeScript’i manuel derlemene gerek yok.

.js dosyalarını görmek ya da kullanmak gereksiz çünkü her şey tarayıcıda live transpile ediliyor.

✅ Sonuç:
Evet, npm run dev ile açılan http://localhost:5173/ sayfasında, hiç transpile ya da build almadan Chrome üzerinden TypeScript kaynak dosyalarında breakpoint koyarak rahatlıkla debug yapabilirsin.
Bu, Vite + source maps + modern browser debugging’in bir avantajıdır.


*************************************************************************************************

**vs code debug** -> yine hiçbir transpile ya da builde gerek duymadan **npm run dev** komutuyla vite başlatıldıktan sonra F5 komutu ya da sol menüdeki debug iikonu üzerinden vs code debug başlatılabilir. VS Code üzerinden tsx dosyalarına debug point koyarak kod debug edilebilir. VS Code debug için kritk nokta npm run dev komutu ile vite'ın başlatılması gerektiğidir. 
   .vscode/launch.json dosyası içinde bir konfigürasyon yer almalı. url kısmı Vite sunucusunun çalıştığı adresi göstermeli.

   {
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Vite + Chrome Debug",
      "type": "chrome",
      "request": "launch",
      "url": "http://localhost:5173",
      "webRoot": "${workspaceFolder}/src"
    }
  ]
}
