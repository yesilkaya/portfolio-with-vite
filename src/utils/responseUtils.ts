import { ServerResponse } from "http";

export function sendJSONResponse(res: ServerResponse, statusCode: number, data: any) {
  res.writeHead(statusCode, { "Content-Type": "application/json" });
  res.end(JSON.stringify(data));
}

export function sendErrorResponse(res: ServerResponse, message: string, statusCode = 500) {
  sendJSONResponse(res, statusCode, { error: message });
}
