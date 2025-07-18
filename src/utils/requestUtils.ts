import http from "http";
import{ContactData} from "../types/contact";
import { saveCSV, saveNDJSON } from "./fileUtils";
import { sendJSONResponse } from "./responseUtils";

export async function handlePostRequest(req: http.IncomingMessage, res: http.ServerResponse) {
    let body = "";
  
    req.on("data", (chunk) => (body += chunk));
  
    req.on("end", async () => {
      try {
        const data = JSON.parse(body) as ContactData;
  
        await saveCSV(data);
        await saveNDJSON(data);
  
        sendJSONResponse(res, 200, {
          message: "Mesaj alındı ve kaydedildi.",
        });
      } catch (err) {
        console.error("Hata:", err);
        sendJSONResponse(res, 500, { error: "Sunucu hatası veya geçersiz veri" });
      }
    });
  }
  
  export function parseRequestBody<T>(req: http.IncomingMessage): Promise<T> {
    return new Promise((resolve, reject) => {
      let body = "";
      req.on("data", chunk => body += chunk);
      req.on("end", () => {
        try {
          resolve(JSON.parse(body) as T);
        } catch {
          reject(new Error("Invalid JSON"));
        }
      });
    });
  }