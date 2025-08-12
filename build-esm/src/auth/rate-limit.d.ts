import { IncomingMessage, ServerResponse } from "http";
export declare function rateLimit(req: IncomingMessage, res: ServerResponse, limit?: number, windowMs?: number): boolean;
