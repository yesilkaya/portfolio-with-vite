"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveCSV = saveCSV;
exports.saveNDJSON = saveNDJSON;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const paths_js_1 = require("../config/paths.js");
/**
 * Verilen iletişim verisini CSV formatında `iletisim_kayitlari.csv` dosyasına ekler.
 *
 * @async
 * @function
 * @param {ContactData} data - Kaydedilecek iletişim verisi (ad, soyad, e-posta, mesaj).
 * @returns {Promise<void>} - Dosya yazımı tamamlandığında çözülür.
 *
 * @example
 * await saveCSV({
 *   firstName: "Ali",
 *   lastName: "Veli",
 *   email: "ali@example.com",
 *   message: "Merhaba, bu bir mesajdır."
 * });
 */
async function saveCSV(data) {
    const safeMessage = data.message.replace(/"/g, '""');
    const row = `"${data.firstName}","${data.lastName}","${data.email}","${safeMessage}"\n`;
    await fs_1.default.promises.appendFile(paths_js_1.CSV_PATH, row, "utf8");
}
/**
 * Verilen iletişim verisini NDJSON formatında `iletisim_kayitlari.ndjson` dosyasına ekler.
 *
 * NDJSON (Newline Delimited JSON), her satırda bir JSON nesnesi olacak şekilde yapılandırılmış bir formattır.
 *
 * @async
 * @function
 * @param {ContactData} data - Kaydedilecek iletişim verisi.
 * @returns {Promise<void>} - Dosya yazımı tamamlandığında çözülür.
 *
 * @example
 * await saveNDJSON({
 *   firstName: "Ayşe",
 *   lastName: "Yılmaz",
 *   email: "ayse@example.com",
 *   message: "Merhaba, geri dönüş bekliyorum."
 * });
 */
async function saveNDJSON(data) {
    const ndjsonPath = path_1.default.join(paths_js_1.NDJSON_PATH);
    const jsonData = JSON.stringify(data) + "\n";
    await fs_1.default.promises.appendFile(ndjsonPath, jsonData, "utf8");
}
//# sourceMappingURL=fileUtils.js.map