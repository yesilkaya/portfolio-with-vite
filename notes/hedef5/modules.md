# 🆚 CommonJS vs ES Modules: Derin Teknik Karşılaştırma

Bu doküman, JavaScript'teki iki farklı modül sistemini kapsamlı bir şekilde karşılaştırır: **CommonJS (CJS)** ve **ES Modules (ESM)**.

---

## 1️⃣ Yükleme Zamanı

- **CommonJS (CJS):** Modüller çalışma zamanında (`require()`) yüklenir.
- **ES Modules (ESM):** Modüller derleme/parsing zamanında (`import`) çözülür.

📌 **Neden?**  
ESM, bağımlılıkları analiz etmek için statik yapıya sahiptir. Bu da tree-shaking gibi optimizasyonları mümkün kılar. CJS'de `require()` bir fonksiyon olduğu için modül çözümleme anlık olarak yapılır.

---

## 2️⃣ İçe Aktarma (Import) Söz Dizimi

- **CJS:** `const mod = require('./mod')`
- **ESM:** `import mod from './mod.js'`

📌 **Neden?**  
ESM JavaScript diline entegre edilmiştir (`import` ifadesi), CJS ise sadece Node.js’e özgü bir `require()` fonksiyonuna dayanır.

---

## 3️⃣ Dışa Aktarma (Export) Söz Dizimi

- **CJS:** `module.exports = ...` veya `exports.name = ...`
- **ESM:** `export default ...`, `export const name = ...`

📌 **Neden?**  
CJS'de modüller bir obje dönerken, ESM'de export’lar statik olarak analiz edilir. Bu, daha gelişmiş analiz ve optimizasyonlara izin verir.

---

## 4️⃣ Modül Sistemi Standardı

- **CJS:** Node.js’e özgü bir sistemdir.
- **ESM:** JavaScript’in resmi modül sistemidir (ECMAScript 2015+ standardı).

📌 **Neden?**  
ESM, hem tarayıcılar hem de diğer JS çalışma ortamları (Node, Deno vs.) tarafından desteklenir.

---

## 5️⃣ Asenkron Modül Yükleme

- **CJS:** Senkron çalışır (`require` hemen çalışır).
- **ESM:** Asenkron çalışır (`import` statiktir ve promise tabanlı `import()` kullanılabilir).

📌 **Neden?**  
ESM, daha performanslı ve ağ üzerinden yüklenmeye uygun olacak şekilde tasarlanmıştır.

---

## 6️⃣ Dosya Uzantısı

- **CJS:** `.js` uzantısı yeterlidir.
- **ESM:** `.mjs`, `.js` (eğer `type: "module"` tanımlanmışsa).

📌 **Neden?**  
Node.js ESM modülleri tanıyabilmek için ya `.mjs` uzantısı ister ya da `package.json` içinde `"type": "module"` belirtilmiş olmalıdır.

---

## 7️⃣ Module Resolution (Modül Bulma)

- **CJS:** Otomatik uzantı ekler (`.js`, `.json`, `.node`).
- **ESM:** Uzantı zorunludur (örneğin `./mod.js` yazılmalı).

📌 **Neden?**  
ESM’de modül yolları kesin olmalı ki statik analiz yapılabilsin. Bu, kararlılık sağlar.

---

## 8️⃣ Tarayıcı Desteği

- **CJS:** Tarayıcıda doğrudan çalışmaz.
- **ESM:** Tarayıcıda yerel olarak çalışır.

📌 **Neden?**  
ESM, `<script type="module">` ile doğrudan HTML içinde kullanılabilir. CJS ise yalnızca Node.js içinde anlamlıdır.

---

## 9️⃣ `import.meta`

- **CJS:** Yoktur.
- **ESM:** `import.meta.url` gibi özelliklerle modül hakkında bilgi alınabilir.

📌 **Neden?**  
ESM, modülün bulunduğu dizin gibi bilgilere `import.meta` üzerinden ulaşılmasını sağlar. Bu, dinamik yollar oluşturmak için kullanılır.

---

## 🔟 `__dirname` / `__filename`

- **CJS:** Global olarak mevcuttur.
- **ESM:** Yoktur; manuel olarak tanımlanmalıdır.

📌 **Nasıl tanımlanır (ESM)?**

```js
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


1️⃣1️⃣ JSON Dosyalarını İçe Aktarma
CJS: Doğrudan require('./data.json') ile yüklenir.

ESM: import json from './data.json' assert { type: "json" }; gerekir.

📌 Neden?
ESM modüllerinde JSON import etmek deneysel bir özelliktir ve açıkça belirtmek gerekir (assert).

1️⃣2️⃣ package.json Ayarı
CJS: Ayar gerekmez (default).

ESM: "type": "module" satırı gerekir.

📌 Neden?
.js uzantılı dosyanın ESM olarak yorumlanabilmesi için bu ayarın yapılması gerekir. Aksi takdirde .js CJS olarak değerlendirilir.