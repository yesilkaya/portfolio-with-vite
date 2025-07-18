"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveCSV = saveCSV;
exports.saveNDJSON = saveNDJSON;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const csvPath = path_1.default.join(__dirname, "../..", "iletisim_kayitlari.csv");
const jsonPath = path_1.default.join(__dirname, "../..", "iletisim_kayitlari.json");
async function saveCSV(data) {
    const safeMessage = data.message.replace(/"/g, '""');
    const row = `"${data.firstName}","${data.lastName}","${data.email}","${safeMessage}"\n`;
    await fs_1.default.promises.appendFile(csvPath, row, "utf8");
}
async function saveNDJSON(data) {
    const ndjsonPath = path_1.default.join(__dirname, "../..", "iletisim_kayitlari.ndjson");
    const jsonData = JSON.stringify(data) + "\n";
    await fs_1.default.promises.appendFile(ndjsonPath, jsonData, "utf8");
}
