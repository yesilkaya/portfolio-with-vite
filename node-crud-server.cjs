const http = require("http");
const mysql = require("mysql2");
const url = require("url");

// MySQL bağlantısı
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Esarj1652", 
  database: "node_crud",
});

db.connect((err) => {
  if (err) {
    console.error("❌ MySQL bağlantı hatası:", err.message);
    return;
  }
    console.log("✅ MySQL'e bağlandı.");
});

// Yardımcı fonksiyon: Body verisini oku
function parseRequestBody(req, callback) {
  let body = "";
  req.on("data", (chunk) => {
    body += chunk.toString();
  });
  req.on("end", () => {
    callback(JSON.parse(body));
  });
}

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const { pathname } = parsedUrl;

  // CORS ayarları

  /* Bir web sayfası, kendi yüklendiği origin dışında bir yere HTTP isteği yapmaya çalıştığında bu bir "cross-origin request", yani "başka kaynaktan istek" olur. Bu isteğin gittiği kaynak(restfull api servis) CORS ayarlarıyla  sitenin yüklendiği kaynağa izin vermişse(gönderilen cevapta bu bilgi yer alır) cevap tarayıcı tarafından kabul edilir aksi durumda cevap gelir ama tarayıcıda işlenmez. */

  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.writeHead(204);
    return res.end();
  }

  // ✅ CREATE (POST) /users
  if (req.method === "POST" && pathname === "/users") {
    parseRequestBody(req, ({ name, email }) => {
      const sql = "INSERT INTO users (name, email) VALUES (?, ?)";
      db.query(sql, [name, email], (err, result) => {
        if (err) return res.end(JSON.stringify({ error: "Ekleme hatası" }));
        res.writeHead(201, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ id: result.insertId, name, email }));
      });
    });
  }

  // ✅ READ (GET) /users
  else if (req.method === "GET" && pathname === "/users") {
    db.query("SELECT * FROM users", (err, results) => {
      if (err) return res.end(JSON.stringify({ error: "Okuma hatası" }));
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(results));
    });
  }

  // ✅ UPDATE (PUT) /users/:id
  else if (req.method === "PUT" && pathname.startsWith("/users/")) {
    const id = pathname.split("/")[2];
    parseRequestBody(req, ({ name, email }) => {
      const sql = "UPDATE users SET name = ?, email = ? WHERE id = ?";
      db.query(sql, [name, email, id], (err) => {
        if (err) return res.end(JSON.stringify({ error: "Güncelleme hatası" }));
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Kullanıcı güncellendi" }));
      });
    });
  }

  // ✅ DELETE /users/:id
  else if (req.method === "DELETE" && pathname.startsWith("/users/")) {
    const id = pathname.split("/")[2];
    db.query("DELETE FROM users WHERE id = ?", [id], (err) => {
      if (err) return res.end(JSON.stringify({ error: "Silme hatası" }));
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Kullanıcı silindi" }));
    });
  }

  // ❌ Not found
  else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Bulunamadı" }));
  }
});

server.listen(4000, () => {
  console.log("🚀 Sunucu http://localhost:4000 adresinde çalışıyor.");
});
