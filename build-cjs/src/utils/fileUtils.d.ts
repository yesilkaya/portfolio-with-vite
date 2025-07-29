import { ContactData } from "../types/contact.js";
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
export declare function saveCSV(data: ContactData): Promise<void>;
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
export declare function saveNDJSON(data: ContactData): Promise<void>;
