"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const mysql2_1 = __importDefault(require("mysql2"));
const url_1 = require("url");
const requestUtils_1 = require("../src/utils/requestUtils");
const responseUtils_1 = require("../src/utils/responseUtils");
// DB bağlantısı
const db = mysql2_1.default.createConnection({
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
const server = http_1.default.createServer((req, res) => {
    const parsedUrl = (0, url_1.parse)(req.url || "", true);
    const pathname = parsedUrl.pathname || "";
    // CORS
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    if (req.method === "OPTIONS") {
        res.writeHead(204);
        return res.end();
    }
    // CREATE
    if (req.method === "POST" && pathname === "/users") {
        (0, requestUtils_1.parseRequestBody)(req)
            .then(({ name, email }) => {
            const sql = "INSERT INTO users (name, email) VALUES (?, ?)";
            db.query(sql, [name, email], (err, result) => {
                if (err)
                    return (0, responseUtils_1.sendErrorResponse)(res, "Ekleme hatası");
                (0, responseUtils_1.sendJSONResponse)(res, 201, { id: result.insertId || "-", name, email });
            });
        })
            .catch(() => (0, responseUtils_1.sendErrorResponse)(res, "Geçersiz JSON", 400));
    }
    // READ
    else if (req.method === "GET" && pathname === "/users") {
        db.query("SELECT * FROM users", (err, results) => {
            if (err)
                return (0, responseUtils_1.sendErrorResponse)(res, "Okuma hatası");
            (0, responseUtils_1.sendJSONResponse)(res, 200, results);
        });
    }
    // UPDATE
    else if (req.method === "PUT" && pathname.startsWith("/users/")) {
        const id = pathname.split("/")[2];
        (0, requestUtils_1.parseRequestBody)(req)
            .then(({ name, email }) => {
            const sql = "UPDATE users SET name = ?, email = ? WHERE id = ?";
            db.query(sql, [name, email, id], (err) => {
                if (err)
                    return (0, responseUtils_1.sendErrorResponse)(res, "Güncelleme hatası");
                (0, responseUtils_1.sendJSONResponse)(res, 200, { message: "Kullanıcı güncellendi" });
            });
        })
            .catch(() => (0, responseUtils_1.sendErrorResponse)(res, "Geçersiz JSON", 400));
    }
    // DELETE
    else if (req.method === "DELETE" && pathname.startsWith("/users/")) {
        const id = pathname.split("/")[2];
        db.query("DELETE FROM users WHERE id = ?", [id], (err) => {
            if (err)
                return (0, responseUtils_1.sendErrorResponse)(res, "Silme hatası");
            (0, responseUtils_1.sendJSONResponse)(res, 200, { message: "Kullanıcı silindi" });
        });
    }
    // NOT FOUND
    else {
        (0, responseUtils_1.sendErrorResponse)(res, "Bulunamadı", 404);
    }
});
server.listen(4000, () => {
    console.log("🚀 Sunucu http://localhost:4000 adresinde çalışıyor.");
});
//# sourceMappingURL=node-crud-server.js.map