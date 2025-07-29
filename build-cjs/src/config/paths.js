"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NDJSON_PATH = exports.CSV_PATH = exports.ROOT_DIR = void 0;
// src/config/paths.ts
const url_1 = require("url");
const path_1 = require("path");
const __filename = (0, url_1.fileURLToPath)(import.meta.url);
const __dirname = (0, path_1.dirname)(__filename);
exports.ROOT_DIR = (0, path_1.resolve)(__dirname, "../../..");
exports.CSV_PATH = (0, path_1.join)(exports.ROOT_DIR, "iletisim_kayitlari.csv");
exports.NDJSON_PATH = (0, path_1.join)(exports.ROOT_DIR, "iletisim_kayitlari.ndjson");
//# sourceMappingURL=paths.js.map