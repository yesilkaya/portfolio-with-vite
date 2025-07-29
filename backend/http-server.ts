import { createServer, type IncomingMessage, type ServerResponse } from "http";
import { readFile ,access} from "fs";   
import {  constants} from "fs";   
import path from "path";
import { handlePostRequest } from "../src/utils/requestUtils.js";
import { ROOT_DIR } from "../src/config/paths.js";


/**
 * Sunucunun çalışacağı port numarası.
 * @constant {number}
 */
const PORT = 3000;
/**
 * Dağıtım dizini, statik dosyaların bulunduğu klasör.
 * @constant {string}
 */
const distDir = path.join(ROOT_DIR, "dist");

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
} as const;

  
/**
 * HTTP sunucusu, gelen istekleri dinler ve uygun yanıtları gönderir.
 * @function
 * @param {IncomingMessage} req - Gelen HTTP isteği.
 * @param {ServerResponse} res - Sunucunun vereceği yanıt.
 */
const server = createServer((req: IncomingMessage, res: ServerResponse) => {
  console.log(`${req.method} ${req.url}`);

  if (req.method === "GET") {
    let filePath = path.join(
      distDir,
      req.url === "/" ? "index.html" : decodeURIComponent(req.url || "")
    );

    const ext = path.extname(filePath);

    access(filePath, constants.F_OK | constants.R_OK, (err) => {
      if (err && !(ext === ".html" || ext === "")) {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("404 Not Found");
        return;
      }

      if (err) filePath = path.join(distDir, "index.html");

      readFile(filePath, (readErr, data) => {
        if (readErr) {
          res.writeHead(500);
          res.end("Internal Server Error");
          return;
        }

        const contentType =
          mimeTypes[ext as keyof typeof mimeTypes] || "text/html";
        res.writeHead(200, { "Content-Type": contentType });
        res.end(data);
        console.log(`Gönderilen dosya: ${filePath}`);
      });
    });
  } else if (req.method === "POST" && req.url === "/api/contact") {
    handlePostRequest(req, res, req.url);
  } else {
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
