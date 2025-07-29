
# 📬 HTTP İstemcisi ile Projeyi Test Etme Görev Planı

## 🎯 Amaç:
Projedeki tüm endpoint’leri **Postman** gibi bir HTTP istemcisiyle test edilebilir hale getirmek.

---

## ✅ Adımlar

### 1. Tarayıcı Harici HTTP İstemcisi Kurulumu (0.5 gün)

- [ ] Herhangi bir tarayıcı eklentisi yerine **Postman** gibi bağımsız bir istemci yüklenmeli.
- [ ] Önerilen araç: [Postman](https://www.postman.com/downloads/)

### 2. Yeni Postman Projesi Oluştur

- [ ] Postman içinde proje adına uygun bir **Collection** oluştur (örneğin: `MyApp API`).
- [ ] Ortak base URL (örneğin: `http://localhost:3000`) `Environments` altında tanımlanmalı.

### 3. Her Endpoint için Bir İstek Tanımla

- [ ] `GET /` → Ana sayfa
- [ ] `GET /about` → Hakkında sayfası
- [ ] `POST /api/contact` → İletişim formu verisi gönderme
- [ ] `GET /assets/image.png` → Statik dosya çağırımı
- [ ] Diğer tüm backend endpoint'leri eklenmeli

### 4. Test Edilebilirlik Sağla

- [ ] Her sayfaya Postman'dan istek yapılabilmeli
- [ ] Her istekten anlamlı yanıt dönmeli (200, 404, 500 gibi kodlara göre)
- [ ] Yanıt body’si okunabilir ve doğrulanabilir olmalı (JSON, HTML, vs.)

---

## 🛠️ Ekstra Öneri:

- [ ] Tüm endpoint’lere örnek payload ve yanıt örnekleri eklenebilir.
- [ ] Authorization gereken endpoint'ler varsa `Bearer Token` veya `API Key` kullanımı tanımlanmalı.
- [ ] Otomatik test senaryoları için Postman `Tests` sekmesi kullanılabilir.

---

## 🕓 Tahmini Süre:
**0.5 gün**

---

## 🗃️ Klasör Yapısı Önerisi (Postman Collection):

```
MyApp API (Collection)
├── 🟢 GET /home
├── 🟢 GET /about
├── 🟡 POST /api/contact
├── 🔵 GET /assets/*
└── 🔴 Diğer özel endpoint’ler
```

---

## 📁 Export:
> Postman collection `.json` olarak dışa aktarılmalı ve repoya `docs/postman_collection.json` altında eklenmeli.
