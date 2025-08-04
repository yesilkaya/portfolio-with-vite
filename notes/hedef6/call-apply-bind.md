
🔹 this nedir?
this, bir fonksiyonun hangi nesne üzerinden çağrıldığını belirten özel bir anahtar kelimedir.

```ts
const user = {
  name: "Seccad",
  greet() {
    console.log(this.name);
  },
};
const obj = {"name":"Ahmet"};
user.greet(); // "Seccad" → this = user
 const tempFunction = user.greet;
 tempFunction();

```

🔹 context nedir?
context, bir fonksiyonun çalıştığı bağlamı ifade eder. Bu bağlamda this değişkeni de tanımlanır.

function example() {
  console.log("context:", this);
}

example(); // context: window (tarayıcıda) veya global (Node.js)

📌 Yani context dediğimiz şey, bir fonksiyonun çalışırken içinden erişebildiği ortamdır.
Bu ortamda this, arguments, lexical scope vs. gibi şeyler bulunur.


| Özellik          | `this`                           | `context`                                     |
| ---------------- | -------------------------------- | --------------------------------------------- |
| Tanımı           | Fonksiyonun çağrıldığı nesne     | Fonksiyonun çalıştığı ortam/bağlam            |
| Türü             | Özel bir anahtar kelime (`this`) | Kavramsal bir terim                           |
| Nasıl belirlenir | Çağrılma şekline göre            | `this`, scope, lexical env. birlikte tanımlar |
| Örnek            | `this.name`                      | Function Execution Context                    |

************************************************************************************************


✅ call, apply, bind Ne Zaman ve Neden Kullanılır?
🎯 1. Bir fonksiyonu başka bir objeye aitmiş gibi kullanmak
Fonksiyon aslında bir nesneye bağlı değil ama sen this bağlamını istediğin nesneye yönlendirmek istiyorsun.

function selamla() {
  console.log(`Ben ${this.ad}`);
}
const kisi = { ad: "Seccad" };
selamla.call(kisi); // Ben Seccad


🎯 2. this bağlamı kopmuşsa (özellikle fonksiyon referansı olarak verildiğinde)
Bir nesne metodunu başka yerde bağımsız bir fonksiyon gibi çalıştırmak istediğinde this bağlamı kaybolur. bind ile sabitleyebilirsin, call / apply ile anlık verebilirsin.

const user = {
  ad: "Seccad",
  greet() {
    console.log(`Merhaba, ben ${this.ad}`);
  }
};

const detachedGreet = user.greet;
detachedGreet(); // ❌ this.ad undefined

const fixedGreet = user.greet.bind(user);
fixedGreet(); // ✅ Merhaba, ben Seccad

| Amaç                                              | Açıklama                                      |
| ------------------------------------------------- | --------------------------------------------- |
| ✅ Fonksiyonu bir nesneye aitmiş gibi çalıştırmak  | `call` / `apply` ile `this` belirlenir        |
| ✅ `this` bağlamını kaybetmiş fonksiyonu düzeltmek | `bind` ile yeni bir `this` bağlamı sabitlenir |


***************************************

# `call`, `apply`, `bind` ve `(0, jsx_runtime_1.jsx)` Açıklamaları

## 🔹 1. `call`, `apply`, `bind` Nedir?

### ✅ Amaç:
- Bir fonksiyonu farklı bir `this` bağlamı ile çağırmak.
- `this`'in hangi nesneyi işaret ettiğini kontrol etmek.

---

### 🔧 `call`
```js
function selamVer() {
  console.log(`Merhaba, ben ${this.ad}`);
}
const kisi = { ad: "Seccad" };
selamVer.call(kisi); // Merhaba, ben Seccad
```
- Fonksiyonu, `this` bağlamını belirterek çağırır.
- Argümanlar virgülle verilir.

---

### 🔧 `apply`
```js
selamVer.apply(kisi); // Merhaba, ben Seccad
```
- `call` gibidir, ama argümanları dizi olarak alır.

---

### 🔧 `bind`
```js
const yeniSelam = selamVer.bind(kisi);
yeniSelam(); // Merhaba, ben Seccad
```
- Fonksiyonu hemen çalıştırmaz, yeni bir bağlı fonksiyon döner.

---

## 🔹 2. `(0, jsx_runtime_1.jsx)` Nedir?

### 📦 Modül:
```js
import * as jsx_runtime_1 from "react/jsx-runtime";
```

### 💥 Problem:
```js
jsx_runtime_1.jsx(...) // HATALI olabilir, çünkü this bağlamı jsx_runtime_1 olur
```

- Eğer `jsx()` fonksiyonu içinde `this` kullanımı varsa, bu durumda bağlam bozulabilir.
- Örneğin: `this.debug` gibi ifadeler hata çıkarabilir.

---

### ✅ Çözüm: Bağlamsız çağrı
```js
(0, jsx_runtime_1.jsx)(...) // Doğrudan fonksiyon çağrısı (pure function gibi)
```

- `this` bağlamı `undefined` olur.
- Yan etkisiz ve güvenli çağrıdır.

---

## 🧠 Özet

| Yöntem                  | Açıklama                                                         |
|------------------------|------------------------------------------------------------------|
| `call`                 | Fonksiyonu belirli `this` ile çağırır                            |
| `apply`                | `call` gibidir ama argümanları dizi ile alır                     |
| `bind`                 | Yeni bir fonksiyon döndürür, `this` bağlamı atanmıştır           |
| `(0, jsx_runtime_1.jsx)` | Fonksiyonu bağlamsız çağırır, `this` hatalarını engeller          |

---

## 🔚 Sonuç

- `call`, `apply`, `bind` gibi yöntemler `this` kontrolü sağlar.
- `jsx_runtime_1.jsx` gibi fonksiyonları güvenli çalıştırmak için `(0, ...)` yöntemi önerilir.
