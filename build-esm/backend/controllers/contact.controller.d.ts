import { Request, Response } from "express";
export declare function getContacts(req: Request, res: Response): Promise<void>;
export declare function createContact(req: Request, res: Response): Promise<void>;
export declare function updateContact(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
export declare function deleteContact(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
