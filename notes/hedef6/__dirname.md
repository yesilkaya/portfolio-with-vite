# 📦 CommonJS (CJS) ve ESModules (ESM) Farkları

## 🔁 CommonJS (CJS)

CommonJS modülleri Node.js tarafından aşağıdaki gibi **otomatik olarak bir fonksiyonla sarılır**:

```js
(function (exports, require, module, __filename, __dirname) {
  // benim yazdığım dosya buraya konur
});
```

### Bu sarmalamanın sağladıkları:

* `require`, `module`, `exports`, `__filename`, `__dirname` gibi özel değişkenler otomatik tanımlanır.
* Dosya kendi içinde izole çalışır ve modül sistemi çalışabilir hâle gelir.

### Ancak...

* `require()` bir **fonksiyondur**, herhangi bir yerde çağrılabilir.
* JavaScript motorları veya bundler’lar (`Webpack`, `Rollup`) `require()`'ın **hangi modülü ne zaman çağıracağını** çalıştırmadan bilemez.
* Bu yüzden **statik analiz yapılamaz** ve **Tree Shaking mümkün değildir**.

---

## 📘 ESModules (ESM)

### Temel farklar:

* `import` ve `export` ifadeleri **bildirimdir** (declaration), yani kod daha çalıştırılmadan analiz edilebilir.
* Kodun en başında olmak zorundadır.
* ESM modülleri, CJS'deki gibi herhangi bir `wrapper` fonksiyonla sarılmaz.

### Sonuçları:

* **Statik analiz** mümkündür. Bundler, hangi modül neyi kullanıyor önceden bilir.
* **Tree Shaking** uygulanabilir: Kullanılmayan özellikler build'e dahil edilmez.
* `__dirname`, `__filename`, `require` gibi kavramlar mevcut değildir.

### Bunun yerine ne kullanılır?

```js
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
```

> `import.meta.url`, modülün URL temelli konum bilgisini verir. ESM'de global değil, bu yüzden bu yöntem kullanılır.

---

## ✅ Özet

| Özellik                   | CJS                            | ESM                                   |
| ------------------------- | ------------------------------ | ------------------------------------- |
| Modül Sistemi             | `require` / `module.exports`   | `import` / `export`                   |
| Sarma (Wrapping)          | Evet - `function(exports,...)` | Hayır                                 |
| İzole Çalışma             | Evet                           | Evet                                  |
| Statik Analiz             | Hayır                          | Evet                                  |
| Tree Shaking              | Hayır                          | Evet                                  |
| `__dirname`, `__filename` | Otomatik tanımlı               | Manuel hesaplanmalı (import.meta.url) |



*********************

## ESM Modülleri CJS'deki Gibi Sarmalanabilir miydi?

> ❌ **Hayır, ESM modülleri CJS'deki gibi otomatik olarak sarmalanamaz (veya sarmalanmaz).**

---

## 🔟 Neden ESM Modülleri Sarmalanmaz?

### 1. **ESM Statik Olarak Analiz Edilmek Üzere Tasarlandı**

* `import` ve `export` ifadeleri **bildirimdir** (declaration), fonksiyon değil.
* JavaScript motoru ya da bundler, kodu çalıştırmadan önce:

  * Hangi modül neyi dışa aktarmış?
  * Nereden hangi değişken gelmiş?
    bilgilerini **önceden çözümleyebilir**.
* Bu sayede:

  * ✅ Tree Shaking (kullanılmayan kodların atılması)
  * ✅ Daha hızlı derleme/yükleme
  * ✅ Daha iyi dairesel bağımlılık yönetimi

> ⚠️ Eğer CJS'deki gibi bir sarmalama olsaydı, bu avantajlar kaybolurdu.

---

### 2. **Top-Level Scope Gerekliliği**

* `import`/`export` sınırlaması nedeniyle sadece **en üst düzeyde** tanımlanabilir.
* CJS'deki gibi içeride sarmalı olsaydı, bu bir **syntax hatası** olurdu:

```js
// Geçerli (ESM)
import fs from "fs";

// Geçersiz
if (true) {
  import fs from "fs"; // ❌ SyntaxError: import declarations may only appear at top level
}
```

---

### 3. **Tarayıcılarla Uyumlu Olmalı**

* CJS sadece Node.js'e özgüdür.
* ESM ise hem **Node.js** hem de **tarayıcılar** tarafından desteklenir.
* Tarayıcıda `require`, `__dirname`, `module.exports` zaten **yoktur**.

> Node.js de ESM'i tarayıcılarla uyumlu tutmak için bu sarmalamayı uygulamaz.

---

## 🔎 Peki `__dirname` Gibi Tanımlar Nerede?

CJS:

```js
console.log(__dirname); // Varsayılan olarak vardır
```

ESM:

```ts
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
```

---

## 📈 Karşılaştırma Tablosu

| Özellik                       | CommonJS (CJS)                  | ECMAScript Modules (ESM) |
| ----------------------------- | ------------------------------- | ------------------------ |
| Sarmalanır mı?                | ✅ Evet (function(exports, ...)) | ❌ Hayır                  |
| Statik analiz yapılabilir mi? | ❌ Hayır                         | ✅ Evet                   |
| `__dirname` erişimi           | ✅ Varsayılan                    | ❌ Manuel tanımlanmalı    |
| Tree Shaking desteği          | ❌ Yok                           | ✅ Var                    |
| Platform uyumu                | 🔹 Sadece Node.js               | ✅ Node.js + Tarayıcı     |

---

## 🎯 Son Söz

CJS modülleri Node.js tarafından bir fonksiyon ile sarmalanırken, ESM modülleri sarmalanmaz. Bunun temel sebebi ESM'in **statik analiz edilebilir**, **tarayıcı uyumlu** ve **optimize edilebilir(tree shaking)** bir yapı sunmasıdır.

Tree Shaking uygulanabilmesi için statik analiz yani çalışmadan önce, derleme aşamasında import/export analizi yapılması şarttır. Aksi halde build çıktısına neleri dahil edip edemeyeceğini bilemezdi. Static analiz yapılabilmesi için de CJS de olduğu gibi __dirname sağlayacak bir fonksiyon ile sarmalanmaması gerekiyor bu sebeplede __dirname ESM modüllerinde default olarak tanımlı gelmiyor.

Bu sayede modern projelerde daha performanslı, daha sade build çıktıları alabiliriz.

*********************
özetleyelim . CJS modülleri tanımlandığında node.js tarafından  "module wrapper" denilen bir sarmalama fonksiyonu ile sarmalanır.

(function (exports, require, module, __filename, __dirname) {
  // benim yazdığım dosya buraya konur
});

modülde kullandığımız require, module, __dirname gibi default olarak tanımlı ifadeler bu sarmalama fonksiyonundan gelir ve bizim kullanımımıza sunulur. Aksi halde bu tanımalamaları ve onlara ait özellikleri kullanamaz olurduk. Ancak CJS modüllerinin kullandığı require / module.exports yapısı statik analize yani kodu çalıştırmadan derleme aşamasındaki analize uygun değildir. çünkü require bir fonksiyondur ve herhangi bir yerde çağrılabilir. V8 motorları bu ifadeyi ancak çalışma zamanında işleyebilir ve öncesinde neyi import neyi export edeceğini bilemez. CJS modüllerinde Tree Shaking uygulanamamasının sebebi de budur.

Gelelim ESM'e; ESM'de import/export ifadesi kodun en başında tanımlanmak zorundadır(top-level) ve ifade değil, bildirimdir (declaration) → JavaScript motoru veya bundler, bu ifadeyi çalıştırmadan önce görebilir ve neyin nereden geldiğini çıkarabilir. Ayrı CJS deki gibi herhangi bir wrapper ile de sarmalanmaz ki __dirname gibi tanımlar default olarak elimizin altında olsun. import/export ifadelerinin bir bildirim olması ve kodun en üstünde tanımlanmış olması; importların kod çalıştırılmadan önce çözümlenmesini ve gereksiz modül özelliklerinin build çıktısına dahil edilmemesini sağlar.(Tree Shanking)

*********************
