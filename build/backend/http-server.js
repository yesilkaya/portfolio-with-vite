"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("http");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const requestUtils_1 = require("../src/utils/requestUtils"); // Import the function to handle POST requests
const PORT = 3000;
const distDir = path_1.default.join(__dirname, "..", "dist");
const mimeTypes = {
    ".html": "text/html",
    ".js": "text/javascript",
    ".css": "text/css",
    ".json": "application/json",
    ".png": "image/png",
    ".pdf": "application/pdf",
};
const server = (0, http_1.createServer)((req, res) => {
    console.log(`${req.method} ${req.url}`);
    if (req.method === "GET") {
        let filePath = path_1.default.join(distDir, req.url === "/" ? "index.html" : decodeURIComponent(req.url || ""));
        const ext = path_1.default.extname(filePath);
        fs_1.default.access(filePath, fs_1.default.constants.F_OK | fs_1.default.constants.R_OK, (err) => {
            if (err && ext !== ".html") {
                res.writeHead(404, { "Content-Type": "text/plain" });
                res.end("404 Not Found");
                return;
            }
            if (err)
                filePath = path_1.default.join(distDir, "index.html");
            fs_1.default.readFile(filePath, (readErr, data) => {
                if (readErr) {
                    res.writeHead(500);
                    res.end("Internal Server Error");
                    return;
                }
                const contentType = mimeTypes[ext] ||
                    "application/octet-stream";
                res.writeHead(200, { "Content-Type": contentType });
                res.end(data);
                console.log(`Gönderilen dosya: ${filePath}`);
            });
        });
    }
    else if (req.method === "POST" && req.url === "/api/contact") {
        (0, requestUtils_1.handlePostRequest)(req, res);
    }
});
server.listen(PORT, () => {
    console.log(`Sunucu çalışıyor: http://localhost:${PORT}`);
});
