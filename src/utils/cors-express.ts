// src/utils/cors-express.ts
import { Request, Response, NextFunction } from "express";

export function handleCors() {

  // Varsayılan localhost origin'leri + ekstra origin'ler
  const allowedOrigins = [
    `http://localhost:${process.env.HTTP_PORT}`,
    `http://localhost:${process.env.DEBUG_PORT}`,
  ].filter(Boolean);

  return (req: Request, res: Response, next: NextFunction) => {
    const origin = req.headers.origin;

    // Origin izinliyse header'ları ekle
    if (origin && allowedOrigins.includes(origin)) {
      res.setHeader("Access-Control-Allow-Origin", origin);
      res.setHeader("Access-Control-Allow-Credentials", "true");
    }

    res.setHeader("Vary", "Origin");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

    // Preflight (OPTIONS) isteğinde hemen cevap dön
    if (req.method === "OPTIONS") {
      return res.status(204).end();
    }

    next();
  };
}
