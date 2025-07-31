
# 📘 SQL Temelleri ve İleri Seviye Konular – Detaylı Notlar

Bu doküman, SQL'e dair temel ve ileri konuların detaylı açıklamalarını içermektedir. Konular, ilişkisel veritabanlarından başlayarak index yapıları, transaction yönetimi ve aggregation fonksiyonlarına kadar kapsamlı şekilde ele alınmıştır.

---

## 🧩 1. İlişkisel Veritabanı (Relational Database)

### ✔️ Tanım:
İlişkisel veritabanı, verileri **tablo (table)** yapısında saklayan ve tablolar arasında **ilişki (relation)** kurabilen bir veritabanı modelidir.

### 📐 Özellikleri:
- Veriler satır (record) ve sütun (field) yapısında tutulur.
- **ACID** kurallarına uyar:
  - **A**tomicity: İşlem ya tamamen gerçekleşir ya hiç gerçekleşmez.
  - **C**onsistency: Veri bütünlüğü korunur.
  - **I**solation: Paralel işlemler birbirini etkilemez.
  - **D**urability: İşlem tamamlandıysa veri kalıcıdır.

---

## 💬 2. SQL Nedir?

### ✔️ Tanım:
**SQL (Structured Query Language)**, ilişkisel veritabanlarında veri oluşturma, değiştirme, silme ve sorgulama için kullanılan standart dildir.

### ⚙️ Temel SQL Komutları:
- `SELECT`: Veri sorgular.
- `INSERT`: Veri ekler.
- `UPDATE`: Veri günceller.
- `DELETE`: Veri siler.
- `CREATE`: Yeni tablo/veritabanı oluşturur.
- `ALTER`: Tablo yapısını değiştirir.

---

## 🔐 3. Anahtar Türleri (Keys)

### 🔹 Primary Key:
- Satırları benzersiz tanımlar.
- NULL olamaz.

### 🔹 Foreign Key:
- Başka bir tablonun primary key’ine referans verir.
- Tablolar arası ilişki kurar.

### 🔹 Unique Key:
- Tekil değerleri zorunlu kılar.
- NULL’a izin verir.

### 🔹 Composite Key:
- Birden fazla sütunun birlikte oluşturduğu primary key.

### 🔹 Candidate Key:
- Primary olabilecek tüm sütun(lar).

### 🔹 Alternate Key:
- Candidate key olup, seçilmeyenler.

---

## 🧾 4. Veri Tipleri

### 🔹 Sayısal:
- `INT`, `FLOAT`, `DECIMAL`, `BIGINT`, `SMALLINT`

### 🔹 Metinsel:
- `VARCHAR(n)`, `CHAR(n)`, `TEXT`

### 🔹 Tarih/Zaman:
- `DATE`, `TIME`, `DATETIME`, `TIMESTAMP`

### 🔹 Mantıksal:
- `BOOLEAN` (`TRUE`/`FALSE`)

### 🔹 Özel:
- `ENUM`, `SET`, `JSON`, `UUID`, `ARRAY`

---

## 🧠 5. Index Nedir?

### ✔️ Tanım:
Veritabanındaki arama ve filtreleme işlemlerini hızlandırmak için kullanılan özel yapılardır.

### 🔹 Özellikleri:
- B-Tree veri yapısı ile çalışır.
- Arama süresini O(log n)’ye düşürür.
- Yazma işlemlerini yavaşlatabilir.

---

## 🌳 6. B-Tree Yapısı

### ✔️ Tanım:
Index’lerin arka planında kullanılan sıralı ve dengeli ağaç yapısıdır.

### 🔹 Özellikleri:
- Düğümler sıralı tutulur.
- Dallar aralıklarla ayrılır.
- `t` = minimum derece:
  - Maksimum `2t - 1` anahtar
  - Maksimum `2t` çocuk

---

## 🔗 7. Composite Index

### ✔️ Tanım:
Birden fazla sütun üzerine oluşturulan **tek bir index**tir.

### 🔹 Özellikleri:
- `CREATE INDEX idx ON tablo(sutun1, sutun2);`
- Sadece **ilk sütun(lar)** sorguda varsa index kullanılır.

---

## 🧭 8. Unique Index

### ✔️ Tanım:
Verinin tekrarını engelleyen özel index türüdür.

### 🔹 Kullanım:
- `email`, `tc_kimlik_no` gibi alanlarda kullanılır.
- `CREATE UNIQUE INDEX idx_email ON Kullanicilar(email);`

---

## 📚 9. SQL Komut Türleri

### 🔹 DDL (Data Definition Language)
- `CREATE`, `ALTER`, `DROP`, `TRUNCATE`

### 🔹 DML (Data Manipulation Language)
- `SELECT`, `INSERT`, `UPDATE`, `DELETE`

### 🔹 DCL (Data Control Language)
- `GRANT`, `REVOKE`

### 🔹 TCL (Transaction Control Language)
- `COMMIT`, `ROLLBACK`, `SAVEPOINT`

---

## 🔁 10. Transaction Control

### ✔️ Tanım:
Veritabanı işlemlerini güvenli ve tutarlı hale getirmek için kullanılır.

### 🔹 Komutlar:
- `START TRANSACTION` / `BEGIN`
- `COMMIT`: Kalıcı hale getirir.
- `ROLLBACK`: Geri alır.
- `SAVEPOINT`: Ara nokta belirler.

---

## ⚙️ 11. ENGINE Nedir?

### ✔️ Tanım:
Veritabanı sisteminin tabloları nasıl işleyeceğini belirleyen motor yapısıdır (özellikle MySQL’de).

### 🔹 Örnekler:
- `InnoDB`: Transaction + foreign key destekler.
- `MyISAM`: Daha hızlı SELECT ama transaction yok.
- `MEMORY`: RAM’de tutulan geçici veri.

---

## 🔤 12. SQL Tümceleri (Clauses)

### ✔️ Tanım:
SQL sorgularını oluşturan yapısal parçalardır.

### 🔹 Yaygın Tümceler:
- `SELECT`
- `FROM`
- `WHERE`
- `GROUP BY`
- `HAVING`
- `ORDER BY`
- `LIMIT`

---

## 📊 13. Aggregation (Toplulaştırma)

### ✔️ Tanım:
Veri satırlarından özet bilgi çıkarmaya yarayan işlemler.

### 🔹 Fonksiyonlar:
- `COUNT()`, `SUM()`, `AVG()`, `MIN()`, `MAX()`
- Genellikle `GROUP BY` ve `HAVING` ile kullanılır.

---

🧑‍💻 Hazırlayan: Seccad & ChatGPT  
📅 Tarih: 2025  
📁 Format: Markdown (.md)

