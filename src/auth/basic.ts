import "dotenv/config";
import { IncomingMessage, ServerResponse } from "http";
import crypto from "crypto";

const hash = (s: string) => crypto.createHash("sha256").update(s).digest();

function parseBasicAuth(req: IncomingMessage) {
  const h = req.headers.authorization;
  if (!h || Array.isArray(h)) return null;
  const [scheme, token] = h.split(" ");
  if (scheme !== "Basic" || !token) return null;
  const [username, password] = Buffer.from(token, "base64").toString("utf8").split(":");
  if (!username || !password) return null;
  return { username, password };
}

export async function isAdmin(req: IncomingMessage): Promise<boolean> {
  const creds = parseBasicAuth(req);
  if (!creds) return false;

  const username = process.env.ADMIN_USER;
  const password = process.env.ADMIN_PASS;
  if (!username || !password) {
    throw new Error("Admin credentials are not set in environment variables.");
  }
  const uOk = crypto.timingSafeEqual(hash(creds.username), hash(username));
  const pOk = crypto.timingSafeEqual(hash(creds.password), hash(password));
  return uOk && pOk;
}
export async function requireAdmin(req: IncomingMessage, res: ServerResponse) {
  if (await isAdmin(req)) return true;
  res.statusCode = 401;
  res.setHeader("Cache-Control", "no-store");
  res.end("Authentication required");
  return false;
}
