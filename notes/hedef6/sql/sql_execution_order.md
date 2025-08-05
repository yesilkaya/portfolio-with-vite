# SQL Sorgu Sırasının Önemi

SQL (Structured Query Language), veritabanında veri sorgulamak ve işlemek için kullanılan bildirimsel bir dildir. SQL sorgularında kullanılan ifadelerin belirli bir sırası vardır. Bu sıraya uyulmazsa sorgular ya hata verir ya da yanlış çalışır.

---

## 📌 Neden Sıra Önemlidir?

SQL bir **bildirimsel (declarative)** dildir. Yani **ne yapılması gerektiğini** söylersin, **nasıl yapılacağını** değil. Veritabanı motoru bu ifadeleri kendi içinde **belirli bir mantıksal sıraya göre işler**.

---

## 🔄 SQL Sorgularının Gerçek Yürütme Sırası

| Sıra | SQL Bölümü      | Açıklama                                       |
|------|------------------|------------------------------------------------|
| 1    | `FROM`           | Veri alınacak tablo veya tablolar belirlenir. |
| 2    | `JOIN`           | Tablolar birleştirilir (varsa).               |
| 3    | `WHERE`          | Satır bazlı filtreleme yapılır.               |
| 4    | `GROUP BY`       | Gruplama işlemi uygulanır.                    |
| 5    | `HAVING`         | Gruplar üzerinde filtre uygulanır.            |
| 6    | `SELECT`         | Hangi sütunların döndürüleceği seçilir.       |
| 7    | `DISTINCT`       | Yinelenen satırlar elenir (isteğe bağlı).     |
| 8    | `ORDER BY`       | Sonuçlar sıralanır.                           |
| 9    | `LIMIT / OFFSET` | Kaç kayıt alınacağı ve hangi sıradan başlanacağı belirlenir. |

---

## ✅ Doğru Kullanım Örneği

```sql
SELECT name
FROM users
WHERE age > 18
ORDER BY name;
```

---

## ⛔ Yanlış Kullanım Örneği

```sql
SELECT name
WHERE age > 18
FROM users;
```

> Bu örnek hata verir çünkü `FROM` ifadesi olmadan `WHERE` neyi filtreleyeceğini bilemez.

---

## 💡 Notlar

- `WHERE` sadece satır bazlı filtre yapar, gruplar üzerinde değil.
- `HAVING` sadece `GROUP BY` sonrası kullanılır.
- `DISTINCT` çoğunlukla `SELECT` ile birlikte yazılsa da aslında `SELECT` sonrası işlenir.
