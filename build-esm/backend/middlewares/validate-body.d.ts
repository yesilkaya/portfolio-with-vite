import { Request, Response, NextFunction } from "express";
export declare function validatePost(req: Request, res: Response, next: NextFunction): Response<any, Record<string, any>> | undefined;
export declare function validatePut(req: Request, res: Response, next: NextFunction): Response<any, Record<string, any>> | undefined;
export declare function validateDelete(req: Request, res: Response, next: NextFunction): Response<any, Record<string, any>> | undefined;
