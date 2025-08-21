import { CONTACTS_URL } from "../../shared/types/urls";
import { buildBasicToken, setAuthHeader, getAuthHeader, clearAuthHeader } from "./credentials";

export async function doLoginRequest(username: string, password: string) {
  if (!username || !password) {
    return { success: false, message: "Kullanıcı adı ve şifre gerekli" };
  }

  const token = buildBasicToken(username, password);
  setAuthHeader(token);

  try {
    const res = await fetch(CONTACTS_URL, {
      method: "GET",
      headers: { ...getAuthHeader() },
      credentials: "omit",
      cache: "no-store",
    });

    if (res.ok) {
      return { success: true };
    }

    let message = "";
    try {
      const data = await res.json();
      message = data?.error || data?.message || "";
    } catch {
      message = await res.text().catch(() => "");
    }

    clearAuthHeader();
    return { success: false, message: `Giriş başarısız: ${res.status} ${message}` };
  } catch (err) {
    clearAuthHeader();
    return { success: false, message: "Giriş isteği başarısız" };
  }
}
