// backend/sqlite-crud-server.ts
import "dotenv/config";
import http from "http";
import { parse } from "url";
import { sendJSONResponse, sendErrorResponse } from "../src/utils/responseUtils.js";
import { parseRequestBody } from "../src/utils/requestUtils.js";
import { ROOT_DIR } from "../src/config/paths.js";
import path from "path";
import { open } from "sqlite";
import sqlite3 from "sqlite3";
import { postBodySchema, idSchema, putBodySchema } from "../src/utils/form-validation.js";
import { FEEDBACK_PATH } from "../src/types/urls.js";
import { handleCors } from "../src/utils/cors.js";
const dbPath = path.join(ROOT_DIR, "contact.db");
//open fonksiyonu ile SQLite veritabanını açıyoruz. Bu fonksiyon geriye bir Database nesnesi döndürüyor.
// Bu nesne üzerinden veri tabanı işlemlerini gerçekleştirebiliyoruz.
const db = await open({ filename: dbPath, driver: sqlite3.Database });
try {
    //foreign key kısıtlamalarını etkinleştiriyoruz. Bu, veritabanı ilişkilerinin düzgün çalışmasını sağlar.
    await db.exec("PRAGMA foreign_keys = ON;");
    // transaction başlatıyoruz. Bu, veritabanı işlemlerinin tamamının bir bütün olarak ele alınmasını sağlar.
    await db.exec("BEGIN TRANSACTION;");
    // tabloları oluşturuyoruz. Eğer tablolar zaten varsa, tekrar oluşturulmaz.
    await db.exec(`
    CREATE TABLE IF NOT EXISTS contact (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      first_name TEXT NOT NULL,
      last_name TEXT,
      email TEXT NOT NULL UNIQUE
    );
  `);
    await db.exec(`
    CREATE TABLE IF NOT EXISTS messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      contact_id INTEGER NOT NULL,
      content TEXT NOT NULL,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (contact_id) REFERENCES contact(id) ON DELETE CASCADE
    );
  `);
    // İndeksleri oluşturuyoruz. Bu, sorguların daha hızlı çalışmasını sağlar.
    await db.exec(`
    CREATE INDEX IF NOT EXISTS idx_messages_contact_id ON messages(contact_id);
  `);
    // transaction'ı commit ediyoruz. Bu, yaptığımız değişikliklerin veritabanına kaydedilmesini sağlar.
    await db.exec("COMMIT;");
    console.log("✅ Tablolar başarıyla oluşturuldu");
}
catch (err) {
    console.error("❌ Tablo/index oluşturulamadı:", err);
    // Eğer bir hata oluşursa, transaction'ı geri alıyoruz. Bu, veritabanının tutarlılığını korur.
    await db.exec("ROLLBACK;");
    // Veritabanı bağlantısını kapatıyoruz.
    process.exit(1);
}
const server = http.createServer((req, res) => {
    const parsedUrl = parse(req.url || "", true);
    const pathname = parsedUrl.pathname || "";
    // 🌐 CORS Ayarları
    const shouldStop = handleCors(req, res);
    if (shouldStop)
        return;
    (async () => {
        if (req.method === "GET" && pathname === FEEDBACK_PATH) {
            try {
                const rows = await db.all(`
        SELECT
          c.id,
          c.first_name,
          c.last_name,
          c.email,
          COALESCE(
            json_group_array(
              json_object(
                'id', m.id,
                'content', m.content,
                'created_at', m.created_at
              )
            ) FILTER (WHERE m.id IS NOT NULL),
            '[]'
          ) AS messages
        FROM contact c
        LEFT JOIN messages m ON c.id = m.contact_id
        GROUP BY c.id;
      `);
                const contacts = rows.map((row) => ({
                    ...row,
                    messages: JSON.parse(row.messages),
                }));
                sendJSONResponse(res, 200, contacts);
            }
            catch (err) {
                console.error("GET Hatası:", err);
                sendErrorResponse(res, "Veriler alınamadı");
            }
        }
        // POST: Yeni kayıt
        else if (req.method === "POST" && pathname === FEEDBACK_PATH) {
            try {
                const body = await parseRequestBody(req);
                const { error } = postBodySchema.validate(body, {
                    abortEarly: false,
                });
                if (error) {
                    const messages = error.details.map((err) => err.message);
                    sendErrorResponse(res, messages[0], 400);
                }
                const { first_name, last_name, email, message } = body;
                const existing = await db.get("SELECT id FROM contact WHERE email = ?", [email]);
                let contactId;
                if (existing) {
                    contactId = existing.id;
                }
                else {
                    const result = await db.run(`INSERT INTO contact (first_name, last_name, email) VALUES (?, ?, ?)`, [
                        first_name,
                        last_name,
                        email,
                    ]);
                    contactId = result.lastID;
                }
                await db.run("INSERT INTO messages (contact_id, content) VALUES (?, ?)", [contactId, message]);
                sendJSONResponse(res, 201, {
                    message: "Kayıt başarılı",
                    id: contactId,
                });
            }
            catch (err) {
                console.error("Ekleme hatası:", err);
                sendErrorResponse(res, "Kayıt eklenemedi");
            }
        }
        // PUT: Güncelle
        else if (req.method === "PUT" && pathname.startsWith(FEEDBACK_PATH)) {
            try {
                const id = Number(pathname.split("/")[3]);
                const { error } = idSchema.validate(id, { abortEarly: false });
                if (error) {
                    const messages = error.details.map((err) => err.message);
                    return sendErrorResponse(res, messages[0], 400);
                }
                // Body validasyonu
                const { first_name, last_name, email } = await parseRequestBody(req);
                const body = { first_name, last_name, email, id };
                const { error: bodyError } = putBodySchema.validate(body, {
                    abortEarly: false,
                });
                if (bodyError) {
                    const messages = bodyError.details.map((err) => err.message);
                    return sendErrorResponse(res, messages[0], 400);
                }
                const result = await db.run(`UPDATE contact SET first_name = ?, last_name = ?, email = ? WHERE id = ?`, [
                    first_name,
                    last_name,
                    email,
                    id,
                ]);
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
        else if (req.method === "DELETE" && pathname.startsWith(FEEDBACK_PATH)) {
            try {
                const id = Number(pathname.split("/")[3]);
                const { error } = idSchema.validate(id, {
                    abortEarly: false,
                });
                if (error) {
                    const messages = error.details.map((err) => err.message);
                    sendErrorResponse(res, messages[0], 400);
                }
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
server.listen(process.env.API_PORT, () => {
    console.log(`Sunucu https://localhost:${process.env.API_PORT} üzerinde çalışıyor.`);
});
//# sourceMappingURL=sqlite-server.js.map