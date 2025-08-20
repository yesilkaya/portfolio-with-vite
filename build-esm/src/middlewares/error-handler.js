export function errorHandler(err, req, res, next) {
    console.error(`[${new Date().toISOString()}] [${req.method}] ${req.url}`, err.details || err);
    res.status(err.status || 500).json({
        success: false,
        message: err.message || "Sunucu hatası",
        ...(process.env.NODE_ENV === "development" && err.details ? { details: err.details } : {}),
    });
}
//# sourceMappingURL=error-handler.js.map