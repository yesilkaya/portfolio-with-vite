export function sendJSONResponse(res, statusCode, data) {
    res.writeHead(statusCode, { "Content-Type": "application/json" });
    res.end(JSON.stringify(data));
    return;
}
export function sendErrorResponse(res, message, statusCode = 500) {
    sendJSONResponse(res, statusCode, { error: message });
    return;
}
//# sourceMappingURL=responseUtils.js.map