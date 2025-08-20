import { Request, Response, NextFunction } from "express";
export declare function getContacts(req: Request, res: Response, next: NextFunction): Promise<void>;
export declare function createContact(req: Request, res: Response, next: NextFunction): Promise<void>;
export declare function updateContact(req: Request, res: Response, next: NextFunction): Promise<void>;
export declare function deleteContact(req: Request, res: Response, next: NextFunction): Promise<void>;
