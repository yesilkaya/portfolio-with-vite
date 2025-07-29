Developer Console Açma : F12 (Görünüm Değişme : Cmd + Shift + D)


✅ lsof -i :3000  // 3000 portunu kullanan uygulamayıyı gösterir
        COMMAND   PID            USER   FD   TYPE             DEVICE SIZE/OFF NODE NAME
        node    89580 seccadyesilkaya   12u  IPv6 0x8e97fdc3f7bdc26e      0t0  TCP *:hbci (LISTEN)
✅ kill -9 89580 // 3000 portunu kullanan "89580" numaralı uygulamayıyı durdurur.


✅ npx ts-node http-server.ts

✅ npx ts-node node-crud-server.ts




✅ node [xxx-server.js](Ör: build/backend/http-server.js) -> node komutu ve devamında dosya yolu + dosya-adi.js belirtilerek sunucu başlatılır



***************************

# npm run build(vite build) 
-> komutu ile fronend için yazılmış ts/tsx dosyaları vite aracılığıyla kök dizinde dist klasörü altında build edilerek yayına hazır hale getirilir.(index.html + index.js + index.css + .png vs)
# tsc
-> tsconfig.json dosyasında: 
"outDir": "./build" ile belirtilen yolda build klasörü oluşturarak 
"include": ["backend/**/*", "env.d.ts"] içinde belirtilen klasörde bulunan ts ve tsx dosyalarını(ve bunlardaki bağımlı importları) js'e transpile ederek .js dosyalarını oluşturur ve bu dosyalar .js olduğu için node komutu ile çalıştırlabilir hale gelir

# npx jsdoc -c jsdoc.json
 JSDoc dokümantasyon aracını çalıştırarak projenizdeki JavaScript (veya TypeScript dönüşümlü JavaScript) dosyalarından API dokümantasyonu üretir. İşlemde -c jsdoc.json parametresiyle özel bir yapılandırma dosyası (jsdoc.json) kullanılır.