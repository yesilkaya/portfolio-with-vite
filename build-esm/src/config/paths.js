// src/config/paths.ts
import { fileURLToPath } from "url";
import { dirname, resolve, join } from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
export const ROOT_DIR = resolve(__dirname, "../../..");
export const CSV_PATH = join(ROOT_DIR, "iletisim_kayitlari.csv");
export const NDJSON_PATH = join(ROOT_DIR, "iletisim_kayitlari.ndjson");
//# sourceMappingURL=paths.js.map