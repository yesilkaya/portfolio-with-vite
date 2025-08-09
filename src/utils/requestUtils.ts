import {type  IncomingMessage, type ServerResponse } from "http";


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
export function parseRequestBody<T>(req: IncomingMessage): Promise<T> {
  return new Promise((resolve, reject) => {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    req.on("end", () => {
      try {
        const parsedData = JSON.parse(body) as T;
        resolve(parsedData);
      } catch (error) {
        reject(new Error("Geçersiz JSON"));
      }
    });

    req.on("error", () => {
      reject(new Error("İstek verisi okunamadı"));
    });
  });
}
