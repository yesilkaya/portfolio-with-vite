// cors.ts
import { IncomingMessage, ServerResponse } from "http";
import { DEBUG_PORT, HTTP_PORT } from "../types/urls.js";

export function handleCors(req: IncomingMessage, res: ServerResponse): boolean {
  const allowedOrigins = [`http://localhost:${HTTP_PORT}`, `http://localhost:${DEBUG_PORT}`];
  const origin = req.headers.origin;

  if (origin && allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.writeHead(204); // No Content
    res.end();
    return true; // ✅ Cevap verildi, artık devam etme
  }

  return false; // ❌ CORS sadece header ayarı yaptı, devam edilebilir
}
