import http from "http";
import mysql from "mysql2";
import { parse } from "url";

import { User } from "./src/types/user";
import { parseRequestBody } from "./src/utils/requestUtils";
import { sendJSONResponse, sendErrorResponse } from "./src/utils/responseUtils";

// DB bağlantısı
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Esarj1652",
  database: "node_crud",
});

db.connect((err) => {
  if (err) {
    console.error("MySQL bağlantı hatası:", err.message);
    return;
  }
  console.log("✅ MySQL'e bağlandı.");
});

const server = http.createServer(
  (req: http.IncomingMessage, res: http.ServerResponse) => {
    const parsedUrl = parse(req.url || "", true);
    const pathname = parsedUrl.pathname || "";

    // CORS
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, OPTIONS"
    );
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    if (req.method === "OPTIONS") {
      res.writeHead(204);
      return res.end();
    }

    // CREATE
    if (req.method === "POST" && pathname === "/users") {
      parseRequestBody<User>(req)
        .then(({ name, email }) => {
          const sql = "INSERT INTO users (name, email) VALUES (?, ?)";
          db.query(sql, [name, email], (err, result: any) => {
            if (err) return sendErrorResponse(res, "Ekleme hatası");
            sendJSONResponse(res, 201, { id: result.insertId || "-", name, email });
          });
        })
        .catch(() => sendErrorResponse(res, "Geçersiz JSON", 400));
    }

    // READ
    else if (req.method === "GET" && pathname === "/users") {
      db.query("SELECT * FROM users", (err, results) => {
        if (err) return sendErrorResponse(res, "Okuma hatası");
        sendJSONResponse(res, 200, results);
      });
    }

    // UPDATE
    else if (req.method === "PUT" && pathname.startsWith("/users/")) {
      const id = pathname.split("/")[2];
      parseRequestBody<User>(req)
        .then(({ name, email }) => {
          const sql = "UPDATE users SET name = ?, email = ? WHERE id = ?";
          db.query(sql, [name, email, id], (err) => {
            if (err) return sendErrorResponse(res, "Güncelleme hatası");
            sendJSONResponse(res, 200, { message: "Kullanıcı güncellendi" });
          });
        })
        .catch(() => sendErrorResponse(res, "Geçersiz JSON", 400));
    }

    // DELETE
    else if (req.method === "DELETE" && pathname.startsWith("/users/")) {
      const id = pathname.split("/")[2];
      db.query("DELETE FROM users WHERE id = ?", [id], (err) => {
        if (err) return sendErrorResponse(res, "Silme hatası");
        sendJSONResponse(res, 200, { message: "Kullanıcı silindi" });
      });
    }

    // NOT FOUND
    else {
      sendErrorResponse(res, "Bulunamadı", 404);
    }
  }
);

server.listen(4000, () => {
  console.log("🚀 Sunucu http://localhost:4000 adresinde çalışıyor.");
});
