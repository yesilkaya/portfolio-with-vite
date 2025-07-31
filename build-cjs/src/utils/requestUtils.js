"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handlePostRequest = handlePostRequest;
exports.parseRequestBody = parseRequestBody;
const fileUtils_js_1 = require("./fileUtils.js");
const responseUtils_js_1 = require("./responseUtils.js");
const sqliteUtils_js_1 = require("./sqliteUtils.js");
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
async function handlePostRequest(req, res, endpoint) {
    let body = "";
    req.on("data", (chunk) => (body += chunk));
    req.on("end", async () => {
        if (endpoint === "/api/contact") {
            try {
                const data = JSON.parse(body);
                await (0, fileUtils_js_1.saveCSV)(data);
                await (0, fileUtils_js_1.saveNDJSON)(data);
                const insertedId = await (0, sqliteUtils_js_1.insertContactToDB)(data);
                (0, responseUtils_js_1.sendJSONResponse)(res, 200, {
                    success: true,
                    id: insertedId,
                    message: "Mesaj alındı ve kaydedildi.",
                });
            }
            catch (err) {
                console.error("Hata:", err);
                (0, responseUtils_js_1.sendJSONResponse)(res, 500, {
                    error: "Sunucu hatası veya geçersiz veri",
                });
            }
        }
        else if (endpoint === "/api/feedback") {
        }
        else {
            (0, responseUtils_js_1.sendJSONResponse)(res, 404, { error: "API endpoint not found" });
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
function parseRequestBody(req) {
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