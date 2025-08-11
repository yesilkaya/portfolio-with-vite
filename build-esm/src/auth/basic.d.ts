import "dotenv/config";
import { IncomingMessage, ServerResponse } from "http";
export declare function isAdmin(req: IncomingMessage): Promise<boolean>;
export declare function requireAdmin(req: IncomingMessage, res: ServerResponse): Promise<boolean>;
