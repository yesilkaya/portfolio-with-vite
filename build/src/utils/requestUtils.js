"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handlePostRequest = handlePostRequest;
exports.parseRequestBody = parseRequestBody;
const fileUtils_1 = require("./fileUtils");
const responseUtils_1 = require("./responseUtils");
async function handlePostRequest(req, res) {
    let body = "";
    req.on("data", (chunk) => (body += chunk));
    req.on("end", async () => {
        try {
            const data = JSON.parse(body);
            await (0, fileUtils_1.saveCSV)(data);
            await (0, fileUtils_1.saveNDJSON)(data);
            (0, responseUtils_1.sendJSONResponse)(res, 200, {
                message: "Mesaj alındı ve kaydedildi.",
            });
        }
        catch (err) {
            console.error("Hata:", err);
            (0, responseUtils_1.sendJSONResponse)(res, 500, { error: "Sunucu hatası veya geçersiz veri" });
        }
    });
}
function parseRequestBody(req) {
    return new Promise((resolve, reject) => {
        let body = "";
        req.on("data", chunk => body += chunk);
        req.on("end", () => {
            try {
                resolve(JSON.parse(body));
            }
            catch {
                reject(new Error("Invalid JSON"));
            }
        });
    });
}
