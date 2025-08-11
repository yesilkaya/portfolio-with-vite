// src/auth/credentials.ts
const AUTH_HEADER_KEY = "authHeader";

export function buildBasicToken(username: string, password: string) {
  return "Basic " + btoa(`${username}:${password}`);
}

export function setAuthHeader(token: string) {
  try { localStorage.setItem(AUTH_HEADER_KEY, token); } catch {}
}
export function getAuthHeader(): Record<string, string> {
  try {
    const t = localStorage.getItem(AUTH_HEADER_KEY);
    return t ? { Authorization: t } : {};
  } catch { return {}; }
}
export function clearAuthHeader() {
  try { localStorage.removeItem(AUTH_HEADER_KEY); } catch {}
}

