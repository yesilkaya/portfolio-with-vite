const http = require("http"); // 📦 Web sunucu oluşturmak için Node.js'in yerleşik http modülünü projeye dahil ediyoruz. require("http") Node.js'in çekirdek modülüdür, yani ayrıca yüklemene gerek yoktur.
const fs = require("fs"); // 📦 Node.js'in yerleşik fs modülünü kullanarak dosya sistemine erişiyoruz. Örneğin, index.html dosyasını okumak.
const path = require("path"); // 📦 Node.js'in yerleşik path modülünü kullanarak dosya yollarını yönetiyoruz. Dosya yollarını birleştirmek ve uzantılarını almak gibi işlemler için kullanılır. Platformlar arası uyumluluk sağlar (Windows/Linux).

// 📦 Bu kod, basit bir HTTP sunucusu oluşturur ve "dist" klasöründeki statik dosyaları sunar.

const PORT = 3000; // Sunucunun dinleyeceği port numarası


const csvPath = path.join(__dirname, "iletisim_kayitlari.csv");
if (!fs.existsSync(csvPath)) {
  fs.writeFileSync(csvPath, "Ad,Soyad,Email,Mesaj,Tarih\n", "utf8");  
}

const distDir = path.join(__dirname, "dist"); // 📁 Uygulamanın çıktılarının yer aldığı dist klasörünün tam dosya yolunu tanımlar.

const mimeTypes = {
  //📚 Tarayıcıya doğru içerik türünü (Content-Type) göndermek için dosya uzantısına göre MIME türü belirlenir.
  ".html": "text/html",
  ".js": "text/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".png": "image/png",
  ".pdf": "application/pdf",
};

const server = http.createServer((req, res) => {
  // 🚀 Bir HTTP sunucusu oluşturulur. Her gelen istekte (req, res) fonksiyonu çalışır.
  console.log(`🔗 İstek alındı: ${req.method} ${req.url}`); // 🔹 Gelen istek hakkında bilgi verir. Örneğin: GET /index.html

  // ✅ CORS için preflight isteği kontrolü
  if (req.method === "OPTIONS") {
    res.writeHead(204, {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    });
    return res.end();
  }
  
  if (req.method === "POST" && req.url === "/api/contact") {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk.toString(); // Gövde verisini topla
    });

    req.on("end", () => {
      try {
        const data = JSON.parse(body);
        const { firstName, lastName, email, message } = data;
        const now = new Date().toLocaleString("tr-TR");

        const safeMessage = message.replace(/"/g, '""');
        const row = `"${firstName}","${lastName}","${email}","${safeMessage}","${now}"\n`;

        const jsonPath = path.join(__dirname, "iletisim_kayitlari.json");
        fs.readFile(jsonPath, "utf8", (err, jsonData) => {
          let jsonArray = [];
        
          if (!err) {
            try {
              jsonArray = JSON.parse(jsonData);
              if (!Array.isArray(jsonArray)) jsonArray = [];
            } catch {
              jsonArray = [];
            }
          }
        
          const newRecord = { firstName, lastName, email, message, date: now };
        
          jsonArray.push(newRecord);
        
          // JSON olarak da güncellenmiş içeriği dosyaya yaz
          fs.writeFile(jsonPath, JSON.stringify(jsonArray, null, 2), "utf8", (err) => {
            if (err) {
              res.writeHead(500, {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
              });
              return res.end(JSON.stringify({ error: "JSON yazma hatası" }));
            }
        
            // CSV'ye ekle
            fs.appendFile(csvPath, row, "utf8", (err) => {
              if (err) {
                res.writeHead(500, {
                  "Content-Type": "application/json",
                  "Access-Control-Allow-Origin": "*",
                });
                return res.end(JSON.stringify({ error: "CSV yazma hatası" }));
              }
        
              res.writeHead(200, {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
              });
              res.end(JSON.stringify({ message: "Mesaj alındı ve kaydedildi." }));
            });
          });
        }); // ✅ EN SON readFile fonksiyonunun parantezleri burada kapanıyor
        
      } catch (err) {
        res.writeHead(400, {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        });
        res.end(JSON.stringify({ error: "Geçersiz JSON" }));
      }
    });

    return; // Burada dur, aşağıdaki static dosya kısmına girme
  }


  let filePath = path.join(
    distDir,
    req.url === "/" ? "index.html" : req.url
  ); /* 🔹 Eğer kullanıcı / (ana sayfa) istiyorsa → dist/index.html dosyası gösterilir. Diğer durumlarda URL neyse ona göre dosya yolu oluşturulur. Örnek:/app.js → dist/app.js */

  const ext = path.extname(filePath); // 🔹 Dosya uzantısını bulur. Örneğin filePath = /dist/style.css → ext = .css
  fs.access(filePath, fs.constants.F_OK, (err) => {
    // 🔹 fs.access ile dosyanın varlığını kontrol eder. Eğer dosya mevcut değilse, err değişkeni dolu olur.
    if (err) {
      // PDF, JS, CSS gibi dosyalar bulunamazsa 404 döndür
      if (ext !== ".html") {
        res.writeHead(404, { "Content-Type": "text/plain" });
        return res.end("404 Not Found");
      }

      // Eğer HTML sayfası yoksa, SPA fallback olarak index.html göster
      filePath = path.join(distDir, "index.html");
    }

    fs.readFile(filePath, (err, data) => {
      //🔸 filePath ile belirlenen dosya okunur.
      if (err) {
        // Dosya okunamazsa (bozuk, izin yok vs.) → 500 hatası döndürülür.
        res.writeHead(500);
        res.end("Internal Server Error");
      } else {
        // Dosya okunursa, doğru içerik türü ile birlikte dosya içeriği gönderilir.
        const contentType = mimeTypes[ext] || "application/octet-stream"; // 🔸 Dosya uzantısına göre doğru MIME türü belirlenir. Eğer uzantı tanımlı değilse, varsayılan olarak "application/octet-stream" kullanılır.
        res.writeHead(200, { "Content-Type": contentType }); // 🔸 200 OK durumu ile birlikte doğru içerik türü başlığı ayarlanır.
        res.end(data); // 🔸 Okunan dosya içeriği yanıt olarak gönderilir.
        console.log(`📄 Dosya gönderildi: ${filePath}`); // 🔹 Gönderilen dosyanın yolu konsola yazdırılır.
      }
    });
  });
});

server.listen(PORT, () => {
  // 🚀 Sunucu belirtilen portta dinlemeye başlar.
  console.log(`🚀 Sunucu çalışıyor: http://localhost:${PORT}`);
});
