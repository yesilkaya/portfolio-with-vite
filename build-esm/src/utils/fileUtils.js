import fs from "fs";
import path from "path";
import { CSV_PATH, NDJSON_PATH } from "../config/paths.js";
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
export async function saveCSV(data) {
    const safeMessage = data.message.replace(/"/g, '""');
    const row = `"${data.firstName}","${data.lastName}","${data.email}","${safeMessage}"\n`;
    await fs.promises.appendFile(CSV_PATH, row, "utf8");
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
export async function saveNDJSON(data) {
    const ndjsonPath = path.join(NDJSON_PATH);
    const jsonData = JSON.stringify(data) + "\n";
    await fs.promises.appendFile(ndjsonPath, jsonData, "utf8");
}
//# sourceMappingURL=fileUtils.js.map