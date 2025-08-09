import { type IncomingMessage } from "http";
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
