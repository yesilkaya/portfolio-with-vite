import { ServerResponse } from "http";
export declare function sendJSONResponse(res: ServerResponse, statusCode: number, data: any): void;
export declare function sendErrorResponse(res: ServerResponse, message: string, statusCode?: number): void;
