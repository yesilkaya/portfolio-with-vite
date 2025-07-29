"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("http");
const fs_1 = require("fs");
const fs_2 = require("fs");
const path_1 = __importDefault(require("path"));
const requestUtils_js_1 = require("../src/utils/requestUtils.js");
const paths_js_1 = require("../src/config/paths.js");
/**
 * Sunucunun çalışacağı port numarası.
 * @constant {number}
 */
const PORT = 3000;
/**
 * Dağıtım dizini, statik dosyaların bulunduğu klasör.
 * @constant {string}
 */
const distDir = path_1.default.join(paths_js_1.ROOT_DIR, "dist");
/**
 * MIME türleri, dosya uzantılarına göre içerik türlerini belirler.
 * @property {string} .html - HTML dosyaları için MIME türü.
 * @property {string} .js - JavaScript dosyaları için MIME türü.
 * @property {string} .css - CSS dosyaları için MIME türü.
 * @property {string} .json - JSON dosyaları için MIME türü.
 * @property {string} .png - PNG resimleri için MIME türü.
 * @property {string} .pdf - PDF dosyaları için MIME türü.
 */
const mimeTypes = {
    ".html": "text/html",
    ".js": "text/javascript",
    ".css": "text/css",
    ".json": "application/json",
    ".png": "image/png",
    ".pdf": "application/pdf",
};
/**
 * HTTP sunucusu, gelen istekleri dinler ve uygun yanıtları gönderir.
 * @function
 * @param {IncomingMessage} req - Gelen HTTP isteği.
 * @param {ServerResponse} res - Sunucunun vereceği yanıt.
 */
const server = (0, http_1.createServer)((req, res) => {
    console.log(`${req.method} ${req.url}`);
    if (req.method === "GET") {
        let filePath = path_1.default.join(distDir, req.url === "/" ? "index.html" : decodeURIComponent(req.url || ""));
        const ext = path_1.default.extname(filePath);
        (0, fs_1.access)(filePath, fs_2.constants.F_OK | fs_2.constants.R_OK, (err) => {
            if (err && !(ext === ".html" || ext === "")) {
                res.writeHead(404, { "Content-Type": "text/plain" });
                res.end("404 Not Found");
                return;
            }
            if (err)
                filePath = path_1.default.join(distDir, "index.html");
            (0, fs_1.readFile)(filePath, (readErr, data) => {
                if (readErr) {
                    res.writeHead(500);
                    res.end("Internal Server Error");
                    return;
                }
                const contentType = mimeTypes[ext] || "text/html";
                res.writeHead(200, { "Content-Type": contentType });
                res.end(data);
                console.log(`Gönderilen dosya: ${filePath}`);
            });
        });
    }
    else if (req.method === "POST" && req.url === "/api/contact") {
        (0, requestUtils_js_1.handlePostRequest)(req, res, req.url);
    }
    else {
        res.writeHead(405, { Allow: "GET, POST" });
        res.end("Method Not Allowed");
    }
});
/**
 * Sunucu, belirtilen portta dinlemeye başlar.
 * @function
 * @param {number} PORT - Sunucunun dinleyeceği port numarası.
 */
server.listen(PORT, () => {
    console.log(`Sunucu çalışıyor: http://localhost:${PORT}`);
});
//# sourceMappingURL=http-server.js.map