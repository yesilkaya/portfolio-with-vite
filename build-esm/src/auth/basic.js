// src/auth/require-admin-express.ts
import "dotenv/config";
import crypto from "crypto";
const hash = (s) => crypto.createHash("sha256").update(s).digest();
function parseBasicAuth(req) {
    const h = req.headers.authorization;
    if (!h || Array.isArray(h))
        return null;
    const [scheme, token] = h.split(" ");
    if (scheme !== "Basic" || !token)
        return null;
    const [username, password] = Buffer.from(token, "base64").toString("utf8").split(":");
    if (!username || !password)
        return null;
    return { username, password };
}
async function isAdmin(req) {
    const creds = parseBasicAuth(req);
    if (!creds)
        return false;
    const username = process.env.ADMIN_USER;
    const password = process.env.ADMIN_PASS;
    if (!username || !password) {
        throw new Error("Admin credentials are not set in environment variables.");
    }
    const userHash = hash(creds.username);
    const passHash = hash(creds.password);
    if (userHash.length !== hash(username).length || passHash.length !== hash(password).length) {
        return false;
    }
    const uOk = crypto.timingSafeEqual(userHash, hash(username));
    const pOk = crypto.timingSafeEqual(passHash, hash(password));
    return uOk && pOk;
}
export function requireAdmin(options) {
    const challenge = options?.challenge ?? true;
    return async (req, res, next) => {
        if (await isAdmin(req)) {
            return next();
        }
        res.status(401);
        if (challenge) {
            res.setHeader("WWW-Authenticate", 'Basic realm="Admin Area", charset="UTF-8"');
        }
        res.setHeader("Cache-Control", "no-store");
        res.json({ error: "Authentication required" });
    };
}
//# sourceMappingURL=basic.js.map