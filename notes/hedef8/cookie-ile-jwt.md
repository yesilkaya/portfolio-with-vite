# Cookie ile JWT Kullanımı — Güvenli Kimlik Doğrulama Rehberi

## 1. Neden Cookie ile JWT?
- **httpOnly Cookie**: JavaScript'ten erişilemez, XSS ile token çalınmasını zorlaştırır.
- **SameSite**: CSRF riskini azaltır.
  - `Lax`: Çoğu SPA için yeterlidir.
  - `None; Secure`: Cross-site istek gerekiyorsa, HTTPS şart.
- **Secure**: Sadece HTTPS üzerinden gönderilir.

## 2. Cookie vs Authorization Header
- **Cookie**: Tarayıcı otomatik gönderir (kolay kullanım), ancak CSRF riski vardır.
- **Header (Bearer)**: Manuel eklenir, CSRF’ye karşı avantajlıdır fakat XSS riskine karşı localStorage kullanımı tehlikelidir.

## 3. Önerilen Mimari
- **Access Token** (kısa ömür: 5–15 dk) → Header *veya* httpOnly cookie.
- **Refresh Token** (uzun ömür: 7–30 gün) → httpOnly + Secure + SameSite=Strict/Lax cookie.
- Yenileme endpoint’i (`/auth/refresh`) sadece cookie ile çalışır, yeni access token döner.
- Logout endpoint’i refresh cookie’yi siler ve sunucuda versiyon kontrolü yapar.

## 4. Express Örneği

```ts
import express from "express";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";

const app = express();
app.use(express.json());
app.use(cookieParser());

// CORS ayarları
app.use((req, res, next) => {
  const origin = "https://localhost:5173";
  res.header("Access-Control-Allow-Origin", origin);
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  if (req.method === "OPTIONS") return res.sendStatus(204);
  next();
});

const JWT_SECRET = "dev-secret";
const REFRESH_SECRET = "dev-refresh-secret";

app.post("/auth/login", (req, res) => {
  const { email, password } = req.body;
  const userId = "123";

  const accessToken = jwt.sign({ sub: userId }, JWT_SECRET, { expiresIn: "10m" });
  const refreshToken = jwt.sign({ sub: userId, ver: 1 }, REFRESH_SECRET, { expiresIn: "7d" });

  res.cookie("refresh_token", refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/auth",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.json({ accessToken });
});

app.post("/auth/refresh", (req, res) => {
  const rt = req.cookies.refresh_token;
  if (!rt) return res.sendStatus(401);
  try {
    const payload = jwt.verify(rt, REFRESH_SECRET);
    const newAccess = jwt.sign({ sub: payload.sub }, JWT_SECRET, { expiresIn: "10m" });
    res.json({ accessToken: newAccess });
  } catch {
    res.sendStatus(401);
  }
});

app.post("/auth/logout", (req, res) => {
  res.clearCookie("refresh_token", { path: "/auth" });
  res.sendStatus(204);
});

app.listen(3001, () => console.log("Server çalışıyor"));
```

## 5. Vite (Frontend) Kullanımı

```ts
// Refresh token kullanarak access token alma
await fetch("https://localhost:3001/auth/refresh", {
  method: "POST",
  credentials: "include", // cookie gönderimi
});

// Korunan endpoint'e erişim
await fetch("https://localhost:3001/me", {
  headers: { Authorization: `Bearer ${accessToken}` },
  credentials: "include",
});
```

## 6. CSRF Koruması
- `SameSite=Lax` çoğu durumda yeterli.
- Cross-site gerekiyorsa `SameSite=None; Secure` + **CSRF token** kullan.
- Double submit token yöntemi önerilir (cookie + header/body).

## 7. İpuçları
- **__Host-** prefix kullanarak cookie'yi host'a bağlayın.
- Path kısıtlaması (`path: "/auth"`) ile kapsamı daraltın.
- Rolling cookie ile refresh token'ı her yenilemede güncelleyin.

---

**Özet:**  
JWT’yi httpOnly cookie ile kullanmak, XSS riskini düşürür; SameSite ve Secure ile CSRF riskini yönetirsin. Access token’ı kısa, refresh token’ı uzun ömürlü yaparak güvenlik + kullanılabilirlik dengesi sağlanır.
