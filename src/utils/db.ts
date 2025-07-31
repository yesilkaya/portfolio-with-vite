import sqlite3 from "sqlite3";
import path from "path";
import { ROOT_DIR } from "../config/paths.js";

const dbPath = path.join(ROOT_DIR, "contact.db");

// Veritabanı bağlantısı
export const db = new sqlite3.Database(dbPath, (err) => {
  if (err) console.error("DB bağlantı hatası:", err);
  else console.log("SQLite veritabanı bağlandı:", dbPath);
});

// Tabloyu oluştur (eğer yoksa)
db.run(`
CREATE TABLE IF NOT EXISTS contact (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    first_name TEXT NOT NULL,
    last_name TEXT,
    email TEXT NOT NULL UNIQUE,
    message TEXT
  )
`);
