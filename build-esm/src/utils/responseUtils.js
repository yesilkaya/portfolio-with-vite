export function sendJSONResponse(res, statusCode, data) {
    res.writeHead(statusCode, { "Content-Type": "application/json" });
    res.end(JSON.stringify(data));
}
export function sendErrorResponse(res, message, statusCode = 500) {
    sendJSONResponse(res, statusCode, { error: message });
}
//# sourceMappingURL=responseUtils.js.map