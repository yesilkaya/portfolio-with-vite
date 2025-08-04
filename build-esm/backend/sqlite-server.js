// backend/sqlite-crud-server.ts
import http from "http";
import { parse } from "url";
import { sendJSONResponse, sendErrorResponse } from "../src/utils/responseUtils.js";
import { parseRequestBody } from "../src/utils/requestUtils.js";
import { ROOT_DIR } from "../src/config/paths.js";
import path from "path";
import { open } from "sqlite";
import sqlite3 from "sqlite3";
// 📦 Veritabanı bağlantısı
const dbPath = path.join(ROOT_DIR, "contact.db");
const db = await open({ filename: dbPath, driver: sqlite3.Database });
try {
    await db.exec("BEGIN TRANSACTION;");
    await db.exec(`
    CREATE TABLE IF NOT EXISTS contact (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      first_name TEXT NOT NULL,
      last_name TEXT,
      email TEXT NOT NULL UNIQUE,
      message TEXT
    );
  `);
    await db.exec(`
    CREATE INDEX IF NOT EXISTS idx_email ON contact(email);
  `);
    await db.exec("COMMIT;");
    console.log("✅ Tablolar başarıyla oluşturuldu");
}
catch (err) {
    console.error("❌ Tablo/index oluşturulamadı:", err);
    await db.exec("ROLLBACK;");
    process.exit(1);
}
const server = http.createServer((req, res) => {
    const parsedUrl = parse(req.url || "", true);
    const pathname = parsedUrl.pathname || "";
    // 🌐 CORS Ayarları
    const allowedOrigins = ["http://localhost:3000", "http://localhost:5173"];
    const origin = req.headers.origin;
    if (origin && allowedOrigins.includes(origin)) {
        res.setHeader("Access-Control-Allow-Origin", origin);
    }
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    if (req.method === "OPTIONS")
        return res.end();
    // 👇 Async wrapper
    (async () => {
        // GET: Tüm kayıtları getir
        if (req.method === "GET" && pathname === "/api/feedback") {
            try {
                const rows = await db.all("SELECT * FROM contact");
                sendJSONResponse(res, 200, rows);
            }
            catch (err) {
                console.error("Veri çekme hatası:", err);
                sendErrorResponse(res, "Veriler alınamadı");
            }
        }
        // POST: Yeni kayıt
        else if (req.method === "POST" && pathname === "/api/feedback") {
            try {
                const { first_name, last_name, email, message } = await parseRequestBody(req);
                const result = await db.run(`INSERT INTO contact (first_name, last_name, email, message) VALUES (?, ?, ?, ?)`, [first_name, last_name, email, message]);
                sendJSONResponse(res, 201, { message: "Kayıt başarılı", id: result.lastID });
            }
            catch (err) {
                if (err?.message?.includes("UNIQUE constraint failed")) {
                    console.error("Ekleme hatası: E-posta zaten kayıtlı");
                    return sendErrorResponse(res, "Bu e-posta zaten kayıtlı", 409);
                }
                console.error("Ekleme hatası:", err);
                sendErrorResponse(res, "Kayıt eklenemedi");
            }
        }
        // PUT: Güncelle
        else if (req.method === "PUT" && pathname.startsWith("/api/feedback/")) {
            const id = Number(pathname.split("/")[3]);
            if (isNaN(id))
                return sendErrorResponse(res, "Geçersiz ID", 400);
            try {
                const { first_name, last_name, email, message } = await parseRequestBody(req);
                const result = await db.run(`UPDATE contact SET first_name = ?, last_name = ?, email = ?, message = ? WHERE id = ?`, [first_name, last_name, email, message, id]);
                if (result.changes === 0) {
                    return sendErrorResponse(res, "Kullanıcı bulunamadı", 404);
                }
                sendJSONResponse(res, 200, { message: "Kullanıcı güncellendi" });
            }
            catch (err) {
                if (err?.message?.includes("UNIQUE constraint failed")) {
                    return sendErrorResponse(res, "Bu e-posta başka kullanıcıda kayıtlı", 409);
                }
                console.error("Güncelleme hatası:", err);
                sendErrorResponse(res, "Güncelleme başarısız");
            }
        }
        // DELETE: Sil
        else if (req.method === "DELETE" && pathname.startsWith("/api/feedback/")) {
            const id = Number(pathname.split("/")[3]);
            if (isNaN(id))
                return sendErrorResponse(res, "Geçersiz ID", 400);
            try {
                const result = await db.run(`DELETE FROM contact WHERE id = ?`, [id]);
                if (result.changes === 0) {
                    return sendErrorResponse(res, "Kullanıcı bulunamadı", 404);
                }
                sendJSONResponse(res, 200, { message: "Kullanıcı silindi" });
            }
            catch (err) {
                console.error("Silme hatası:", err);
                sendErrorResponse(res, "Silme hatası");
            }
        }
        // 404: Bilinmeyen endpoint
        else {
            sendErrorResponse(res, "Böyle bir endpoint yok", 404);
        }
    })(); // immediately invoked async fn
});
server.listen(4000, () => {
    console.log("🚀 Sunucu http://localhost:4000 üzerinde çalışıyor.");
});
//# sourceMappingURL=sqlite-server.js.map