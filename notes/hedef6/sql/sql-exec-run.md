
# 📘 SQLite `database` Metotları Karşılaştırması

## 🧠 GENEL TABLO

| Metot       | Amaç                              | Geri Dönüş Değeri                   | Ne için kullanılır?                  |
|-------------|-----------------------------------|-------------------------------------|--------------------------------------|
| `run`       | Değişiklik yapan sorgular         | `{ lastID, changes }`               | INSERT, UPDATE, DELETE               |
| `exec`      | Çoklu SQL komutu çalıştırma       | `void`                              | CREATE TABLE, PRAGMA, çoklu sorgular |
| `get`       | Tek satır döndüren sorgular       | `{...}` tek nesne veya `undefined`  | SELECT ama sadece 1 satır isteniyorsa|
| `all`       | Çok satır döndüren sorgular       | `Array<{...}>`                      | SELECT ile tüm eşleşen kayıtlar      |
| `prepare`   | Parametreli ve tekrar tekrar çalıştırılacak sorgular | `Statement` nesnesi     | performanslı tekrar sorgular         |

---

## 🧪 Detaylı Açıklamalar ve Örnekler

### 1. `run`

Veritabanında kayıt **ekleme, silme veya güncelleme** işlemleri için:

```ts
const result = await db.run("INSERT INTO contact (first_name, email) VALUES (?, ?)", ["Ali", "ali@example.com"]);
console.log(result.lastID);     // Eklenen kaydın ID'si
console.log(result.changes);    // Etkilenen satır sayısı
```

### 2. `exec`

**Çoklu SQL komutunu** bir seferde çalıştırmak için (transaction, tablo oluşturma vb.):

```ts
await db.exec(`
  BEGIN TRANSACTION;
  CREATE TABLE IF NOT EXISTS contact (...);
  PRAGMA foreign_keys = ON;
  COMMIT;
`);
```

### 3. `get`

SELECT ile **tek bir satır** almak için:

```ts
const user = await db.get("SELECT * FROM contact WHERE id = ?", [1]);
console.log(user?.email);
```

### 4. `all`

SELECT ile **birden fazla satır** almak için:

```ts
const users = await db.all("SELECT * FROM contact WHERE email LIKE ?", ["%@gmail.com"]);
console.log(users.length); // Tüm Gmail kullanıcıları
```

### 5. `prepare`

Aynı sorguyu farklı parametrelerle **çok kez çalıştırmak** için:

```ts
const stmt = await db.prepare("SELECT * FROM contact WHERE id = ?");
for (let i = 1; i <= 10; i++) {
  const row = await stmt.get(i);
  console.log(row);
}
await stmt.finalize();
```

---

💡 Not: `prepare` ile birlikte `.get()`, `.run()`, `.all()` gibi alt metotlar kullanılabilir.
