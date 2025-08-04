| Özellik               | `db.exec(...)`                                  | `db.run(...)`                                         |
| --------------------- | ----------------------------------------------- | ----------------------------------------------------- |
| 🎯 Amaç               | Çoklu SQL komutlarını bir arada çalıştırmak     | Tek bir SQL komutunu çalıştırmak (parametre destekli) |
| 🔁 Geri dönüş değeri  | ❌ Yok — hiçbir metadata dönmez                  | ✅ `RunResult` metadata’sı (callback içindeki `this`)  |
| ⚠️ Hata kontrolü      | `try/catch` ile yapılır (hata varsa throw eder) | `callback` içinde `err` parametresiyle yakalanır      |
| 📌 Metadata’ya erişim | ❌ Mümkün değil                                  | ✅ `this.lastID`, `this.changes` ile erişilir          |
| ❓ Parametre desteği   | ❌ Yok                                           | ✅ `?` parametrelerini destekler                       |
| 🧱 Çoklu SQL desteği  | ✅ Var                                           | ❌ Yok (tek sorgu çalıştırabilir)                      |


Bu satırda db bir veritabanı nesnesidir 
db.serialize(() => {
  db.run("CREATE TABLE users (id INTEGER PRIMARY KEY, name TEXT)");
  db.run("INSERT INTO users (name) VALUES ('Seccad')");
  db.close();
});

-> **exec** bir geri dönüş değeri içermez sadece hata olma durumunda hata fırlatır ama **run** komutu geriye RunResult tipinde metadata dönderir ve bunlara run da tanımlanana callbak fonk içinde this ifadesiyle erişebiliriz **(this.lastID, this.changes)**

| Metot  | Amaç                  | Döndürdüğü veri               | Kullanım örneği                   |
| ------ | --------------------- | ----------------------------- | --------------------------------- |
| `all`  | Çoklu veri çekme      | Array of rows                 | `SELECT * FROM ...`               |
| `get`  | Tek satır çekme       | Row object                    | `SELECT * FROM ... WHERE id = ?`  |
| `run`  | Veri değiştirme       | `RunResult` (lastID, changes) | `INSERT`, `UPDATE`, `DELETE`      |
| `exec` | SQL komutu çalıştırma | `void`                        | `CREATE TABLE`, `BEGIN`, `COMMIT` |
