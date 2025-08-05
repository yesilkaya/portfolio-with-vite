// backend/sqlite-crud-server.ts
import http from "http";
import { parse } from "url";
import {
  sendJSONResponse,
  sendErrorResponse,
} from "../src/utils/responseUtils.js";
import { parseRequestBody } from "../src/utils/requestUtils.js";
import { FormData } from "../src/types/user.js";
import { ROOT_DIR } from "../src/config/paths.js";
import path from "path";
import { open } from "sqlite";
import sqlite3 from "sqlite3";

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
} catch (err) {
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
  const allowedOrigins = ["http://localhost:3000", "http://localhost:5173"];
  const origin = req.headers.origin;
  if (origin && allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.end();

  (async () => {
    if (req.method === "GET" && pathname === "/api/feedback") {
      try {
        const contacts = await db.all("SELECT * FROM contact");

        const contactsWithMessages = await Promise.all(
          contacts.map(async (contact) => {
            const messages = await db.all(
              `SELECT id, content, created_at FROM messages WHERE contact_id = ? ORDER BY created_at DESC`,
              [contact.id]
            );

            return {
              ...contact,
              messages: messages,
            };
          })
        );

        sendJSONResponse(res, 200, contactsWithMessages);
      } catch (err) {
        console.error("GET Hatası:", err);
        sendErrorResponse(res, "Veriler alınamadı");
      }
    }

    // POST: Yeni kayıt
    else if (req.method === "POST" && pathname === "/api/feedback") {
      try {
        const { first_name, last_name, email, message } =
          await parseRequestBody<FormData>(req);

        // E-posta ile kullanıcı var mı kontrol et
        const existing = await db.get(
          "SELECT id FROM contact WHERE email = ?",
          [email]
        );
        let contactId: number;
        if (existing) {
          contactId = existing.id;
        } else {
          const result = await db.run(
            `INSERT INTO contact (first_name, last_name, email) VALUES (?, ?, ?)`,
            [first_name, last_name, email]
          );
          contactId = result.lastID!;
        }
        await db.run(
          "INSERT INTO messages (contact_id, content) VALUES (?, ?)",
          [contactId, message]
        );
        sendJSONResponse(res, 201, {
          message: "Kayıt başarılı",
          id: contactId,
        });
      } catch (err: any) {
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
      if (isNaN(id)) return sendErrorResponse(res, "Geçersiz ID", 400);

      try {
        const { first_name, last_name, email } =
          await parseRequestBody<FormData>(req);
        const result = await db.run(
          `UPDATE contact SET first_name = ?, last_name = ?, email = ? WHERE id = ?`,
          [first_name, last_name, email, id]
        );

        if (result.changes === 0) {
          return sendErrorResponse(res, "Kullanıcı bulunamadı", 404);
        }
        sendJSONResponse(res, 200, { message: "Kullanıcı güncellendi" });
      } catch (err: any) {
        if (err?.message?.includes("UNIQUE constraint failed")) {
          return sendErrorResponse(
            res,
            "Bu e-posta başka kullanıcıda kayıtlı",
            409
          );
        }
        console.error("Güncelleme hatası:", err);
        sendErrorResponse(res, "Güncelleme başarısız");
      }
    }
    // DELETE: Sil
    else if (req.method === "DELETE" && pathname.startsWith("/api/feedback/")) {
      const id = Number(pathname.split("/")[3]);
      if (isNaN(id)) return sendErrorResponse(res, "Geçersiz ID", 400);

      try {
        const result = await db.run(`DELETE FROM contact WHERE id = ?`, [id]);
        if (result.changes === 0) {
          return sendErrorResponse(res, "Kullanıcı bulunamadı", 404);
        }
        sendJSONResponse(res, 200, { message: "Kullanıcı silindi" });
      } catch (err) {
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
