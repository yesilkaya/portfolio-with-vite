import "dotenv/config";
import { Request, Response, NextFunction } from "express";
export declare function requireAdmin(options?: {
    challenge?: boolean;
}): (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare function forbidAdminOnPost(): (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
