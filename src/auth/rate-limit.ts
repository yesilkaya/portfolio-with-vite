import { IncomingMessage, ServerResponse } from "http";

const rateLimitMap = new Map<string, number[]>();

export function rateLimit(
  req: IncomingMessage,
  res: ServerResponse,
  limit = 10,
  windowMs = 60 * 1000
): boolean {
  const ip = (req.socket.remoteAddress || "unknown").replace(/^::ffff:/, "");
  const now = Date.now();

  const timestamps = (rateLimitMap.get(ip) || []).filter((ts) => now - ts < windowMs);
  timestamps.push(now);
  rateLimitMap.set(ip, timestamps);

  if (timestamps.length > limit) {
    res.statusCode = 429;
    res.setHeader("Content-Type", "application/json");
    res.setHeader("Cache-Control", "no-store");
    res.end(JSON.stringify({ error: "Too Many Requests" }));
    return false;
  }

  return true;
}
