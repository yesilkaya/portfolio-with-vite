import fs from "fs";
import path from "path";
import { ContactData } from "../types/contact";

const csvPath = path.join(__dirname,"../..", "iletisim_kayitlari.csv");
const jsonPath = path.join(__dirname,"../..", "iletisim_kayitlari.json");

export async function saveCSV(data: ContactData): Promise<void> {
  const safeMessage = data.message.replace(/"/g, '""');
  const row = `"${data.firstName}","${data.lastName}","${data.email}","${safeMessage}"\n`;
  await fs.promises.appendFile(csvPath, row, "utf8");
}

export async function saveNDJSON(data: ContactData): Promise<void> {
  const ndjsonPath = path.join(__dirname, "../..", "iletisim_kayitlari.ndjson");

  const jsonData = JSON.stringify(data) + "\n";
  await fs.promises.appendFile(ndjsonPath, jsonData, "utf8");
}
