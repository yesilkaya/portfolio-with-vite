# 🛡️ SQL Injection Nedir?

**SQL Injection**, kötü niyetli kişilerin bir uygulamanın veritabanına gönderdiği verileri manipüle ederek **yetkisiz veri okuma**, **veri silme/değiştirme** veya **sisteme sızma** gibi saldırılar gerçekleştirmesine olanak tanıyan bir güvenlik açığıdır.

---

## 📌 Örnek: Güvensiz Kod

```ts
const email = req.body.email;
const password = req.body.password;

const sql = `SELECT * FROM users WHERE email = '${email}' AND password = '${password}'`;
db.get(sql, (err, row) => {
  if (row) {
    console.log("Giriş başarılı!");
  }
});
```

### 🔥 Kötü niyetli kullanıcı şu veriyi girerse:

```sql
Email: ' OR 1=1 --
Şifre: (boş)
```

Oluşan sorgu:

```sql
SELECT * FROM users WHERE email = '' OR 1=1 --' AND password = ''
```

- `OR 1=1` her zaman **true** olduğu için tüm kullanıcılar gelir.
- `--` sonrası yorum olur, şifre kontrolü devre dışı kalır.

---

## ✅ Güvenli Kod: Parametreli Sorgu

```ts
const sql = `SELECT * FROM users WHERE email = ? AND password = ?`;
db.get(sql, [email, password], (err, row) => {
  if (row) {
    console.log("Giriş başarılı!");
  }
});
```

- `?` yer tutucular escape edilerek bağlanır.
- `sqlite3_bind_text()` gibi fonksiyonlarla özel karakterler güvenli hale getirilir.
- SQL yapısı bozulmadan sadece **değer karşılaştırması** yapılır.

---

## 🔐 Escape İşlemi Nedir?

Escape işlemi, kullanıcıdan gelen verideki özel karakterlerin (örneğin `'`, `--`, `;`) **anlamını yitirmesi** için dönüştürülmesidir.

| Girdi                      | Escape Edilmiş |
|---------------------------|----------------|
| `O'Reilly`                | `O''Reilly`     |
| `' OR 1=1 --`             | `'' OR 1=1 --`  |

---

## 🚫 Tehlikeli Kod Biçimleri

```ts
const sql = `DELETE FROM users WHERE email = '${email}'`;
```

Bu tarz doğrudan string birleştirme içeren SQL sorguları **en büyük riski** taşır.

---

## ✅ Önerilen Koruma Yöntemleri

| Yöntem                     | Açıklama                                       |
|----------------------------|------------------------------------------------|
| ✅ Parametreli Sorgular     | `?` ile SQL yer tutucuları kullanın            |
| ✅ ORM Kullanımı            | Sequelize, Prisma gibi ORM'ler güvenli sorgu üretir |
| ✅ Input Doğrulama          | Girdi uzunluğu, formatı, boşluk kontrolleri     |
| ✅ Şifre Hashleme           | Şifreleri `bcrypt`, `argon2` gibi algoritmalarla saklayın |
| ✅ Yetkisiz SQL komutlarını engelle | Kullanıcının gönderdiği veriyi **komut değil, veri** olarak ele alın |

---

## 💡 Kısa Özet

- SQL Injection, kullanıcı verisinin sorgu yapısını bozarak veritabanını ele geçirmesidir.
- `?` kullanarak sorgu hazırlamak en temel korunma yöntemidir.
- Escape işlemi verinin anlamını yitirmesini sağlar.
- Her zaman `parametreli sorgu` kullan!
