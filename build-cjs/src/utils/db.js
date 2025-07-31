"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const sqlite3_1 = __importDefault(require("sqlite3"));
const path_1 = __importDefault(require("path"));
const paths_js_1 = require("../config/paths.js");
const dbPath = path_1.default.join(paths_js_1.ROOT_DIR, "contact.db");
// Veritabanı bağlantısı
exports.db = new sqlite3_1.default.Database(dbPath, (err) => {
    if (err)
        console.error("DB bağlantı hatası:", err);
    else
        console.log("SQLite veritabanı bağlandı:", dbPath);
});
// Tabloyu oluştur (eğer yoksa)
exports.db.run(`
CREATE TABLE IF NOT EXISTS contact (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    first_name TEXT NOT NULL,
    last_name TEXT,
    email TEXT NOT NULL UNIQUE,
    message TEXT
  )
`);
//# sourceMappingURL=db.js.map