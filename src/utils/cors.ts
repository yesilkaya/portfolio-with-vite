// cors.ts
import { IncomingMessage, ServerResponse } from "http";

export function handleCors(req: IncomingMessage, res: ServerResponse): boolean {
  const allowedOrigins = [`http://localhost:${process.env.HTTP_PORT}`, `http://localhost:${process.env.DEBUG_PORT}`];
  const origin = req.headers.origin;

  if (origin && allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin); 
    res.setHeader("Vary", "Origin"); 
    res.setHeader("Access-Control-Allow-Credentials", "true");
  }
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    res.writeHead(204); // No Content
    res.end();
    return true; // Cevap verildi, artık devam etme
  }

  return false; // CORS sadece header ayarı yaptı, devam edilebilir
}
