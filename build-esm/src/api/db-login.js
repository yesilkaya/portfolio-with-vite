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
        const text = await res.text().catch(() => "");
        if (res.ok) {
            return { success: true };
        }
        else {
            clearAuthHeader();
            return { success: false, message: `Giriş başarısız: ${res.status} ${text || ""}` };
        }
    }
    catch (err) {
        clearAuthHeader();
        return { success: false, message: "Sunucuya ulaşılamadı" };
    }
}
//# sourceMappingURL=db-login.js.map