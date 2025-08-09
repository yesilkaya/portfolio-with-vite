// src/server.ts
import http from "http";
import mysql from "mysql2/promise";
import { parse } from "url";
import { parseRequestBody } from "../src/utils/requestUtils.js";
import { FormData } from "../src/types/user.js";

import { sendJSONResponse, sendErrorResponse } from "../src/utils/responseUtils.js";
import { postBodySchema, idSchema, putBodySchema } from "../src/utils/form-validation.js";
import { handleCors } from "../src/utils/cors.js";
import { CONTACTS_PATH, API_PORT, DB_NAME } from "../src/types/urls.js";

const db = await (async () => {
  try {
    // 1. MySQL sunucusuna bağlan(Database ismi vermediğimiz için sadece mysql sunucusuna bağlanır)
    const serverConn = await mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "",
    });

    // 2. Veritabanı yoksa oluştur
    await serverConn.query(`CREATE DATABASE IF NOT EXISTS \`${DB_NAME}\`;`);
    // Veritabanı oluşturulduktan sonra bağlantıyı kapat. Çünkü tablo oluşturmak için kuracağımız bağlantıda veritabanı ismi de belirtmemiz gerekiyor. Bu  bağlantıda veritabanı ismi olmadığı için kapatıyoruz.
    await serverConn.end();
    console.log(`✅ Veritabanı '${DB_NAME}' yoksa oluşturuldu.`);

    // 3. Veritabanına bağlan
    const conn = await mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "",
      database: DB_NAME,
    });

    // 4. Tabloları oluştur
    await conn.beginTransaction();

    await conn.execute(`
      CREATE TABLE IF NOT EXISTS contact (
        id INT AUTO_INCREMENT PRIMARY KEY,
        first_name VARCHAR(100) NOT NULL,
        last_name VARCHAR(100),
        email VARCHAR(255) NOT NULL UNIQUE
      );
    `);

    await conn.execute(`
      CREATE TABLE IF NOT EXISTS messages (
        id INT AUTO_INCREMENT PRIMARY KEY,
        contact_id INT NOT NULL,
        content TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (contact_id) REFERENCES contact(id) ON DELETE CASCADE
      );
    `);

    await conn.commit();
    console.log("✅ Tablolar başarıyla oluşturuldu");
    return conn;
  } catch (err) {
    console.error("❌ Veritabanı kurulurken hata:", err);
    process.exit(1);
  }
})();


const server = http.createServer(async (req, res) => {
  const parsedUrl = parse(req.url || "", true);
  const pathname = parsedUrl.pathname || "";

  const shouldStop = handleCors(req, res);
  if (shouldStop) return;
  
  // GET /contacts
  if (req.method === "GET" && pathname === CONTACTS_PATH) {
    try {
      const [rows] = await db.query(`
      SELECT c.*, 
      IFNULL(
        JSON_ARRAYAGG(
          JSON_OBJECT('id', m.id, 'content', m.content, 'created_at', m.created_at)
        ),
        JSON_ARRAY()
      ) AS messages
      FROM contact c
      LEFT JOIN messages m ON c.id = m.contact_id
      GROUP BY c.id
    `);

      sendJSONResponse(res, 200, rows);
    } catch (err) {
      console.error("GET /contacts hatası:", err);
      return sendErrorResponse(res, "Kullanıcılar alınamadı");
    }
  }
  // POST: Yeni kayıt
  else if (req.method === "POST" && pathname === CONTACTS_PATH) {
    try {
      const body = await parseRequestBody<FormData>(req);
      const { error } = postBodySchema.validate(body, {
        abortEarly: false,
      });
      if (error) {
        const messages = error.details.map((err) => err.message);
        return sendErrorResponse(res, messages[0], 400);
      }

      const { first_name, last_name, email, message } = body;

      const [rows] = await db.execute("SELECT * FROM contact WHERE email = ?", [email]);
      const existing = (rows as any[])[0];

      let contactId: number;
      if (existing) {
        contactId = existing.id;
      } else {
        await db.beginTransaction();

        const result = (await db.execute(`INSERT INTO contact (first_name, last_name, email) VALUES (?, ?, ?)`, [
          first_name,
          last_name,
          email,
        ])) as [mysql.ResultSetHeader, any];
        contactId = result[0].insertId;
      }
      await db.execute("INSERT INTO messages (contact_id, content) VALUES (?, ?)", [contactId, message]);

      if (!existing) await db.commit();

      sendJSONResponse(res, 201, {
        message: "Kayıt başarılı",
        id: contactId,
      });
    } catch (err: any) {
      await db.rollback();
      console.error("Ekleme hatası:", err);
      sendErrorResponse(res, "Kayıt eklenemedi");
    }
  }

  // PUT /contacts/:id
  else if (req.method === "PUT" && pathname?.startsWith(CONTACTS_PATH + "/")) {
    try {
      const id = Number(pathname.split("/")[2]);
      const { error } = idSchema.validate(id, { abortEarly: false });

      if (error) {
        const messages = error.details.map((err) => err.message);
        return sendErrorResponse(res, messages[0], 400);
      }

      // Body validasyonu
      const { first_name, last_name, email } = await parseRequestBody<FormData>(req);
      const body = { first_name, last_name, email, id };

      const { error: bodyError } = putBodySchema.validate(body, {
        abortEarly: false,
      });
      if (bodyError) {
        const messages = bodyError.details.map((err) => err.message);
        return sendErrorResponse(res, messages[0], 400);
      }

      const [result] = (await db.execute(`UPDATE contact SET first_name = ?, last_name = ?, email = ? WHERE id = ?`, [
        first_name,
        last_name,
        email,
        id,
      ])) as [mysql.ResultSetHeader, any];

      if (result.affectedRows === 0) {
        return sendErrorResponse(res, "Kullanıcı bulunamadı", 404);
      }

      return sendJSONResponse(res, 200, { message: "Kullanıcı güncellendi" });
    } catch (err: any) {
      if (err?.message?.includes("UNIQUE constraint failed")) {
        return sendErrorResponse(res, "Bu e-posta başka kullanıcıda kayıtlı", 409);
      }
      console.error("Güncelleme hatası:", err);
      return sendErrorResponse(res, "Güncelleme başarısız");
    }
  }

  // DELETE: Sil
  else if (req.method === "DELETE" && pathname.startsWith(CONTACTS_PATH + "/")) {
    try {
      const id = Number(pathname.split("/")[2]);
      const { error } = idSchema.validate(id, {
        abortEarly: false,
      });
      if (error) {
        const messages = error.details.map((err) => err.message);
        return sendErrorResponse(res, messages[0], 400);
      }

      const [result] = (await db.execute(`DELETE FROM contact WHERE id = ?`, [id])) as [mysql.ResultSetHeader, any];
      if (result.affectedRows === 0) {
        return sendErrorResponse(res, "Kullanıcı bulunamadı", 404);
      }
      return sendJSONResponse(res, 200, { message: "Kullanıcı silindi" });
    } catch (err) {
      console.error("Silme hatası:", err);
      return sendErrorResponse(res, "Silme hatası");
    }
  }
  // 404: Bilinmeyen endpoint
  else {
    return sendErrorResponse(res, "Böyle bir endpoint yok", 404);
  }
});

server.listen(API_PORT, () => {
  console.log(`🚀 Server running on http://localhost:${API_PORT}`);
});
