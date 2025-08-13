import { Request, Response, NextFunction } from "express";
export declare function handleCors(allowedPorts?: {
    httpPort?: string;
    debugPort?: string;
}): (req: Request, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
