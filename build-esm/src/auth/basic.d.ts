import "dotenv/config";
import { Request, Response, NextFunction } from "express";
export declare function requireAdmin(options?: {
    challenge?: boolean;
}): (req: Request, res: Response, next: NextFunction) => Promise<void>;
