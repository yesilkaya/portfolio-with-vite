import { createServer, type IncomingMessage, type ServerResponse } from "http";
import fs from "fs";
import path from "path";
import { handlePostRequest } from "../src/utils/requestUtils"; // Import the function to handle POST requests

const PORT = 3000;
const distDir = path.join(__dirname, "..", "dist");

const mimeTypes = {
  ".html": "text/html",
  ".js": "text/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".png": "image/png",
  ".pdf": "application/pdf",
} as const;

const server = createServer((req: IncomingMessage, res: ServerResponse) => {
  console.log(`${req.method} ${req.url}`);

  if (req.method === "GET") {
    let filePath = path.join(
      distDir,
      req.url === "/" ? "index.html" : decodeURIComponent(req.url || "")
    );

    const ext = path.extname(filePath);

    fs.access(filePath, fs.constants.F_OK | fs.constants.R_OK, (err) => {
      if (err && !(ext === ".html" || ext === '')) {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("404 Not Found");
        return;
      }

      if (err) filePath = path.join(distDir, "index.html");

       fs.readFile(filePath, (readErr, data) => {
        if (readErr) {
          res.writeHead(500);
          res.end("Internal Server Error");
          return;
        }

        const contentType =
          mimeTypes[ext as keyof typeof mimeTypes] ||
          "text/html";
        res.writeHead(200, { "Content-Type": contentType });
        res.end(data);
        console.log(`Gönderilen dosya: ${filePath}`);
      });
    });
  } else if (req.method === "POST" && req.url === "/api/contact") {
    handlePostRequest(req, res);
  }
  else{
    res.writeHead(405, { "Allow": "GET, POST" });
    res.end("Method Not Allowed");
  }
});

server.listen(PORT, () => {
  console.log(`Sunucu çalışıyor: http://localhost:${PORT}`);
});
