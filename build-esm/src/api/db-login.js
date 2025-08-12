import { CONTACTS_URL } from "../types/urls";
import { buildBasicToken, setAuthHeader, getAuthHeader, clearAuthHeader } from "../auth/credentials";
export async function doLoginRequest(username, password) {
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
        let message = "";
        try {
            const data = await res.json();
            message = data?.error || data?.message || "";
        }
        catch {
            // JSON değilse text olarak oku
            message = await res.text().catch(() => "");
        }
        if (res.ok) {
            return { success: true };
        }
        else {
            clearAuthHeader();
            return { success: false, message: `Giriş başarısız: ${res.status} ${message}` };
        }
    }
    catch (err) {
        clearAuthHeader();
        return { success: false, message: "Giriş isteği başarısız" };
    }
}
//# sourceMappingURL=db-login.js.map