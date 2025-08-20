// src/middlewares/error-handler.ts
import { Request, Response, NextFunction } from "express";

export function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
  console.error(`[${new Date().toISOString()}] [${req.method}] ${req.url}`, err.details || err);

  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Sunucu hatası",
    ...(process.env.NODE_ENV === "development" && err.details ? { details: err.details } : {}),
  });
}
