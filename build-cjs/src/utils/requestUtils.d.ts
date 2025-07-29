import { type IncomingMessage, type ServerResponse } from "http";
/**
 *
 * @description POST isteklerini yöneten fonksiyonun imzasıdır.
 * @param {IncomingMessage} req - Gelen HTTP isteği.
 * @param {ServerResponse} res - Sunucunun vereceği yanıt.
 * @param {"/api/contact"} endpoint - İsteğin hedeflendiği API endpoint’i.
 * @example
 * handlePostRequest(req, res, "/api/contact");
 */
export declare function handlePostRequest(req: IncomingMessage, res: ServerResponse, endpoint: "/api/contact"): void;
/**
 *
 * @description POST isteklerini yöneten fonksiyonun imzasıdır.
 * @param {IncomingMessage} req - Gelen HTTP isteği.
 * @param {ServerResponse} res - Sunucunun vereceği yanıt.
 * @param {"/api/feedback"} endpoint - İsteğin hedeflendiği API endpoint’i.
 * @example
 * handlePostRequest(req, res, "/api/feedback");
 */
export declare function handlePostRequest(req: IncomingMessage, res: ServerResponse, endpoint: "/api/feedback"): void;
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
export declare function parseRequestBody<T>(req: IncomingMessage): Promise<T>;
