"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendJSONResponse = sendJSONResponse;
exports.sendErrorResponse = sendErrorResponse;
function sendJSONResponse(res, statusCode, data) {
    res.writeHead(statusCode, { "Content-Type": "application/json" });
    res.end(JSON.stringify(data));
}
function sendErrorResponse(res, message, statusCode = 500) {
    sendJSONResponse(res, statusCode, { error: message });
}
//# sourceMappingURL=responseUtils.js.map