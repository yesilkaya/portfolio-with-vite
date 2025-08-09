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