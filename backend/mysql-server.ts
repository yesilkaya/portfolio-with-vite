import "dotenv/config";
import https from "https";
import mysql from "mysql2/promise";
import { parse } from "url";
import { parseRequestBody } from "../src/utils/requestUtils.js";
import { FormData } from "../src/types/user.js";

import { sendJSONResponse, sendErrorResponse } from "../src/utils/responseUtils.js";
import { postBodySchema, idSchema, putBodySchema } from "../src/utils/form-validation.js";
import { handleCors } from "../src/utils/cors.js";
import { CONTACTS_PATH } from "../src/types/urls.js";
import { messages } from "../src/messages/Messages.js";
import { requireAdmin, isAdmin } from "../src/auth/basic.js";

import fs from "fs";
import path from "path";


import { ROOT_DIR } from "../src/config/paths.js";

const sslOptions = {
  key: fs.readFileSync(path.resolve(ROOT_DIR, "certs/mykey.key")),
  cert: fs.readFileSync(path.resolve(ROOT_DIR, "certs/mycert.crt")),
};

const db = await (async () => {
  try {
    const serverConn = await mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "",
    });

    await serverConn.query(`CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME}\`;`);
    await serverConn.end();
    console.log(messages.db.created(process.env.DB_NAME ?? ""));

    const conn = await mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "",
      database: process.env.DB_NAME,
    });

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
    console.log(messages.db.tables_created);
    return conn;
  } catch (err) {
    console.error(messages.db.error, err);
    process.exit(1);
  }
})();

const server = https.createServer(sslOptions, async (req, res) => {
  const parsedUrl = parse(req.url || "", true);
  const pathname = parsedUrl.pathname || "";

  const shouldStop = handleCors(req, res);
  if (shouldStop) return;

  // GET /contacts
  else if (req.method === "GET" && pathname === CONTACTS_PATH) {
    if (!(await requireAdmin(req, res))) return;
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
              ORDER BY c.id DESC
            `);

      res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
      res.setHeader("Pragma", "no-cache");
      res.setHeader("Expires", "0");
      res.setHeader("Vary", "Origin, Authorization");

      sendJSONResponse(res, 200, rows);
    } catch (err) {
      console.error("GET /contacts hatası:", err);
      return sendErrorResponse(res, messages.get.contacts_error);
    }
  }

  // POST: Yeni kayıt
  else if (req.method === "POST" && pathname === CONTACTS_PATH) {
    if (await isAdmin(req)) {
      res.statusCode = 403;
      return res.end("Admin cannot create");
    }
    let txStarted = false;

    try {
      const body = await parseRequestBody<FormData>(req);
      const { error } = postBodySchema.validate(body, {
        abortEarly: false,
      });
      if (error) {
        const errMsg = error.details.map((err) => err.message);
        return sendErrorResponse(res, errMsg[0], 400);
      }

      const { first_name, last_name, email, message } = body;

      const [rows] = await db.execute("SELECT id FROM contact WHERE email = ?", [email]);
      const existing = (rows as any[])[0];

      let contactId: number;
      if (existing) {
        contactId = existing.id;
      } else {
        await db.beginTransaction();
        txStarted = true;

        const result = (await db.execute(`INSERT INTO contact (first_name, last_name, email) VALUES (?, ?, ?)`, [
          first_name,
          last_name,
          email,
        ])) as [mysql.ResultSetHeader, any];
        contactId = result[0].insertId;
      }
      await db.execute("INSERT INTO messages (contact_id, content) VALUES (?, ?)", [contactId, message]);

      if (!existing) await db.commit();
      txStarted = false;

      sendJSONResponse(res, 201, {
        message: messages.post.create_success,
        id: contactId,
      });
    } catch (err: any) {
      if (txStarted) {
        try {
          await db.rollback();
          txStarted = false;
        } catch {}
      }
      console.error("Ekleme hatası:", err);
      sendErrorResponse(res, messages.post.create_error);
    }
  }

  // PUT /contacts/:id
  else if (req.method === "PUT" && pathname?.startsWith(CONTACTS_PATH + "/")) {
    if (!(await requireAdmin(req, res))) return;

    try {
      const id = Number(pathname.split("/")[2]);
      const { error } = idSchema.validate(id, { abortEarly: false });

      if (error) {
        const errMsg = error.details.map((err) => err.message);
        return sendErrorResponse(res, errMsg[0], 400);
      }

      // Body validasyonu
      const { first_name, last_name, email } = await parseRequestBody<FormData>(req);
      const body = { first_name, last_name, email, id };

      const { error: bodyError } = putBodySchema.validate(body, {
        abortEarly: false,
      });
      if (bodyError) {
        const errMsg = bodyError.details.map((err) => err.message);
        return sendErrorResponse(res, errMsg[0], 400);
      }

      const [result] = (await db.execute(`UPDATE contact SET first_name = ?, last_name = ?, email = ? WHERE id = ?`, [
        first_name,
        last_name,
        email,
        id,
      ])) as [mysql.ResultSetHeader, any];

      if (result.affectedRows === 0) {
        return sendErrorResponse(res, messages.common.not_found, 404);
      }

      return sendJSONResponse(res, 200, { message: messages.put.update_success });
    } catch (err: any) {
      if (err?.code === "ER_DUP_ENTRY") {
        return sendErrorResponse(res, messages.put.update_conflict, 409);
      }
      console.error("Güncelleme hatası:", err);
      return sendErrorResponse(res, messages.put.update_error);
    }
  }

  // DELETE: Sil
  else if (req.method === "DELETE" && pathname.startsWith(CONTACTS_PATH + "/")) {
    if (!(await requireAdmin(req, res))) return;

    try {
      const id = Number(pathname.split("/")[2]);
      const { error } = idSchema.validate(id, {
        abortEarly: false,
      });
      if (error) {
        const errMsg = error.details.map((err) => err.message);
        return sendErrorResponse(res, errMsg[0], 400);
      }

      const [result] = (await db.execute(`DELETE FROM contact WHERE id = ?`, [id])) as [mysql.ResultSetHeader, any];
      if (result.affectedRows === 0) {
        return sendErrorResponse(res, messages.common.not_found, 404);
      }
      return sendJSONResponse(res, 200, { message: messages.delete.delete_success });
    } catch (err) {
      console.error("Silme hatası:", err);
      return sendErrorResponse(res, messages.delete.delete_error);
    }
  }

  // 404: Bilinmeyen endpoint
  else {
    return sendErrorResponse(res, messages.http.endpoint_not_found, 404);
  }
});

server.listen(process.env.API_PORT, () => {
  console.log(`🚀 Server running on https://localhost:${process.env.API_PORT}`);
});
