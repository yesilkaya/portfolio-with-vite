import { CONTACTS_URL } from "../types/urls";
import { buildBasicToken, setAuthHeader, getAuthHeader, clearAuthHeader } from "../auth/credentials";

export async function doLoginRequest(username: string, password: string) {
  if (!username || !password) {
    return { success: false, message: "Kullanıcı adı ve şifre gerekli" };
  }

  const token = buildBasicToken(username, password);
  setAuthHeader(token); // localStorage gibi kalıcı

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

    // JSON veya text hata mesajı
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
