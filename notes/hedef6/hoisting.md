
# Hoisting Nedir? (JavaScript)

**Hoisting**, JavaScript'in çalışma zamanında değişken ve fonksiyon bildirimlerini otomatik olarak kapsamlarının (scope) en üstüne "taşımasıdır".

---

## 🔹 Değişkenlerde Hoisting

### `var` ile Tanımlama

- `var` ile tanımlanan değişkenler **hoist edilir**.
- Ancak **sadece bildirimi yukarı taşınır**, değer ataması yerinde kalır.

```js
console.log(a); // undefined
var a = 5;
```

### `let` ve `const` ile Tanımlama

- `let` ve `const` da hoist edilir ama **Temporal Dead Zone (TDZ)** içindedir.
- TDZ, değişkenin tanımlandığı satıra kadar süren erişim yasağıdır.

```js
console.log(b); // ReferenceError
let b = 10;
```

---

## 🔹 Fonksiyonlarda Hoisting

### Fonksiyon Bildirimi (Function Declaration)

- Tamamı hoist edilir.
- Tanımlanmadan önce çağrılabilir.

```js
greet(); // "Merhaba"
function greet() {
  console.log("Merhaba");
}
```

### Fonksiyon İfadesi (Function Expression)

- Sadece değişken adı hoist edilir.
- Değer tanımsız olduğu için çağrılması hata verir.

```js
sayHi(); // ReferenceError
const sayHi = function() {
  console.log("Selam");
};
```

---

## 🧠 Hoisting Özet Tablosu

| Yapı                    | Hoisting | TDZ Var mı? | Tanımdan Önce Kullanım |
|------------------------|----------|-------------|-------------------------|
| `var`                  | ✔️       | ❌          | `undefined` döner       |
| `let` / `const`        | ✔️       | ✔️          | ❌ `ReferenceError`     |
| Fonksiyon Bildirimi    | ✔️       | ❌          | ✔️                      |
| Fonksiyon İfadesi      | ✔️ (isim) | ✔️          | ❌ `ReferenceError`     |

---

## 🔍 Neden Önemlidir?

- Hoisting, hatalı davranışlara neden olabilir.
- Değişkenleri ve fonksiyonları **her zaman önce tanımlamak** iyi bir pratiktir.

```js
// Kötü örnek
doSomething();
function doSomething() { ... }

// İyi örnek
function doSomething() { ... }
doSomething();
```
