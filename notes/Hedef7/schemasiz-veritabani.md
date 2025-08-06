
# 📘 Şemasız Veritabanları (Schema-less Databases)

## 🧠 Nedir?

Şemasız veritabanları, verileri önceden tanımlı bir şema (yani tablo yapısı) olmadan saklamaya olanak tanır. 
Bu tür veritabanları, veri yapısının esnek olduğu, sık değiştiği veya sabitlenmesinin zor olduğu durumlar için uygundur.

---

## 📦 Örnek (MongoDB)

```json
// Aynı koleksiyonda farklı yapıda iki belge
{ "name": "Seccad", "email": "seccad@example.com" }
{ "name": "Ahmet", "phone": "+905555555555" }
```

- `email` sadece ilk belgede var.
- `phone` sadece ikinci belgede var.
- İki belge aynı koleksiyonda olmasına rağmen farklı yapıda olabilir.

---

## 📚 Türleri

| Tür | Açıklama | Örnek Veritabanlar |
|-----|----------|---------------------|
| **Belge Tabanlı** | JSON benzeri belgeleri saklar | MongoDB, CouchDB |
| **Anahtar-Değer** | Key ile value eşleşmesi saklar | Redis, DynamoDB |
| **Kolon Tabanlı** | Satırlar farklı kolonlara sahip olabilir | Cassandra, HBase |
| **Graf Veritabanları** | Düğümler ve bağlantıları (kenarlar) saklar | Neo4j, ArangoDB |

---

## ✅ Avantajları

- **Esneklik:** Alanlar veri ile birlikte tanımlanır, dinamik yapıya uygundur.
- **Yüksek Performans:** Özellikle büyük verilerde hızlı veri yazımı ve okunması sağlar.
- **Yatay Ölçeklenebilirlik:** Kolayca dağıtık yapıya geçilebilir.

---

## ❌ Dezavantajları

- **Veri Bütünlüğü Yok:** Hatalı veya eksik veri girilebilir.
- **JOIN gibi ilişkisel işlemler zordur.**
- **Query'ler karmaşıklaşabilir.**

---

## 🎯 Ne Zaman Kullanılır?

| Uygun Senaryo | Açıklama |
|---------------|----------|
| **Hızlı prototipleme** | Şema tanımlamadan hızlı geliştirme |
| **Sık değişen veri yapısı** | Alanlar değişiyorsa |
| **Büyük veri uygulamaları** | Veri akışı hızlı ve çeşitliyse |
