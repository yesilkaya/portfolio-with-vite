import { saveCSV, saveNDJSON } from "./fileUtils.js";
import { sendJSONResponse } from "./responseUtils.js";
import { insertContactToDB } from "./sqliteUtils.js";
/**
 * @description POST isteklerini yöneten fonksiyondur.
 *
 * @param {IncomingMessage} req - Gelen HTTP isteği.
 * @param {ServerResponse} res - Sunucunun vereceği yanıt.
 * @param {postRequestPaths} endpoint - İsteğin hedeflendiği API endpoint’i.
 *
 * @example
 * handlePostRequest(req, res, "/api/contact");
 */
export async function handlePostRequest(req, res, endpoint) {
    let body = "";
    req.on("data", (chunk) => (body += chunk));
    req.on("end", async () => {
        if (endpoint === "/api/contact") {
            try {
                const data = JSON.parse(body);
                await saveCSV(data);
                await saveNDJSON(data);
                const insertedId = await insertContactToDB(data);
                sendJSONResponse(res, 200, {
                    success: true,
                    id: insertedId,
                    message: "Mesaj alındı ve kaydedildi.",
                });
            }
            catch (err) {
                console.error("Hata:", err);
                sendJSONResponse(res, 500, {
                    error: "Sunucu hatası veya geçersiz veri",
                });
            }
        }
        else if (endpoint === "/api/feedback") {
        }
        else {
            sendJSONResponse(res, 404, { error: "API endpoint not found" });
            return;
        }
    });
}
/**
 * Gelen HTTP isteğinin body kısmını okur ve JSON’a parse eder.
 *
 * @template T - Beklenen veri tipi.
 * @param {IncomingMessage} req - HTTP isteği.
 * @returns {Promise<T>} - Parselenmiş JSON nesnesi.
 *
 * @example
 * const data = await parseRequestBody<User>(req);
 */
export function parseRequestBody(req) {
    return new Promise((resolve, reject) => {
        let body = "";
        req.on("data", (chunk) => {
            body += chunk.toString();
        });
        req.on("end", () => {
            try {
                const parsedData = JSON.parse(body);
                resolve(parsedData);
            }
            catch (error) {
                reject(new Error("Geçersiz JSON"));
            }
        });
        req.on("error", () => {
            reject(new Error("İstek verisi okunamadı"));
        });
    });
}
//# sourceMappingURL=requestUtils.js.map