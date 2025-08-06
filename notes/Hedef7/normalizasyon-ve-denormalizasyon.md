
# 📘 Normalizasyon ve Denormalizasyon

## 🧠 Tanımlar

| Kavram | Açıklama |
|--------|----------|
| **Normalizasyon** | Veritabanı tasarımında verileri parçalayarak tekrarı önleme işlemidir. |
| **Denormalizasyon** | Verileri daha hızlı erişim için tekrar içerecek şekilde birleştirme işlemidir. |

---

## 🧱 Şemalı Veritabanlarında (SQL)

### 🎯 Amaç:
- Veri tutarlılığını korumak
- Gereksiz tekrarları azaltmak (redundancy)
- Veri bütünlüğü (data integrity)

### 🔧 Örnek (Normalizasyon):

#### 1. Students tablosu
| id | name   |
|----|--------|
| 1  | Seccad |
| 2  | Ahmet  |

#### 2. Courses tablosu
| id | title        |
|----|--------------|
| 1  | Veritabanı   |
| 2  | Web Geliştirme |

#### 3. Enrollments tablosu (ilişkilendirme)
| student_id | course_id |
|------------|-----------|
| 1          | 1         |
| 1          | 2         |

### 🧩 Avantajları:
- Veri tekrarı yoktur.
- Güncelleme kolaylığı sağlar.

### 🧱 Dezavantajları:
- JOIN işlemleri performansı yavaşlatabilir.

---

## 📦 Şemasız Veritabanlarında (NoSQL)

### 🎯 Amaç:
- Okuma hızını artırmak
- Dağıtık yapılarda erişim kolaylığı

### 🔧 Örnek (Denormalizasyon):

```json
{
  "student_id": 1,
  "name": "Seccad",
  "courses": [
    { "id": 1, "title": "Veritabanı" },
    { "id": 2, "title": "Web Geliştirme" }
  ]
}
```

> Tüm bilgiler tek belgede yer alır, `JOIN` gerekmez.

### ✅ Avantajları:
- Hızlı okuma sağlar (özellikle dağıtık sistemlerde)
- JOIN ihtiyacı yoktur

### ❌ Dezavantajları:
- Veri tekrarları vardır
- Güncellemeler karmaşıklaşır (birden fazla yerde aynı veri olabilir)

---

## 🎯 Ne Zaman Hangisi?

| Durum | Normalizasyon (SQL) | Denormalizasyon (NoSQL) |
|-------|----------------------|--------------------------|
| Veri tutarlılığı önemliyse | ✅ | ❌ |
| Okuma performansı öncelikliyse | ❌ | ✅ |
| Veri yapısı sabitse | ✅ | ✅ |
| Veri yapısı sık değişiyorsa | ❌ | ✅ |
