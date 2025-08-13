export function handleCors(allowedPorts) {
    // .env'den gelen ek origin'leri ayıkla
    const extraOrigins = process.env.FRONTEND_ORIGINS?.split(",").map(o => o.trim()) || [];
    // Varsayılan localhost origin'leri + ekstra origin'ler
    const allowedOrigins = [
        `http://localhost:${allowedPorts?.httpPort || process.env.HTTP_PORT}`,
        `http://localhost:${allowedPorts?.debugPort || process.env.DEBUG_PORT}`,
        ...extraOrigins
    ].filter(Boolean);
    return (req, res, next) => {
        const origin = req.headers.origin;
        // Origin izinliyse header'ları ekle
        if (origin && allowedOrigins.includes(origin)) {
            res.setHeader("Access-Control-Allow-Origin", origin);
            res.setHeader("Access-Control-Allow-Credentials", "true");
        }
        res.setHeader("Vary", "Origin");
        res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
        res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
        // Preflight (OPTIONS) isteğinde hemen cevap dön
        if (req.method === "OPTIONS") {
            return res.status(204).end();
        }
        next();
    };
}
//# sourceMappingURL=cors-express.js.map