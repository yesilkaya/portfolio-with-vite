# CommonJS vs ESM: Tree Shaking ve Bellek Kullanımı

JavaScript modüllerini dışa aktarırken (export/import), kullanılan modül sistemi belleğe alınma ve build çıktısı açısından farklı davranışlar gösterir. Bu belge, **CommonJS (CJS)** ile **ESM (ECMAScript Modules)** arasındaki farkları ve **tree shaking** etkisini örneklerle açıklar.

---

## 📦 Bundler Nedir?

> **Bundler (Paketleyici)**: Modern web geliştirmede ayrık dosyaları birleştirerek tarayıcıya veya Node.js'e uygun hale getiren araçtır.  
> Örnekler: **Webpack**, **Rollup**, **Vite**

---

## 📁 Proje Yapısı

```plaintext
tree-shaking-demo/
├── cjs/
│   ├── index.js
│   └── myModule.js
├── esm/
│   ├── index.mjs
│   └── myModule.mjs
└── package.json
```

```js
// cjs/myModule.js
function foo() {
  console.log("foo çağrıldı");
}

function bar() {
  console.log("🚨 bar çağrıldı ama kullanılmadı");
}

module.exports = {
  foo,
  bar,
};
```
********************************************
 
```js
// cjs/index.js
const { foo } = require("./myModule");

foo();
```

> foo çağrıldı
Ama bar fonksiyonu da belleğe alındı çünkü CJS modüllerde bütün modül içe aktarılır.


********************************************
```ts
// esm/myModule.mjs
export function foo() {
  console.log("foo çağrıldı");
}

export function bar() {
  console.log("🚨 bar çağrıldı ama kullanılmadı");
}
```
********************************************
```ts
// esm/index.mjs
import { foo } from './myModule.mjs';

foo();
```
********************************************

foo çağrıldı
Eğer sadece foo kullanılıyorsa, bar fonksiyonu build çıktısına dahil edilmez ❗
Yani tree shaking uygulanır.

********************************************

| Özellik                      | CommonJS (`require`) | ESM (`import`)                     |
| ---------------------------- | -------------------- | ---------------------------------- |
| Tüm modül belleğe alınır mı? | ✅ Evet               | ❌ Hayır (kullanılmayan atılabilir) |
| Tree shaking çalışır mı?     | ❌ Hayır              | ✅ Evet (build sırasında)           |
| Performans farkı             | Daha fazla bellek    | Daha optimize (ESM + bundler)      |

********************************************