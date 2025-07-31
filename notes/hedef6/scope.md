# Scope (Kapsam) Nedir?

JavaScript’te **scope (kapsam)**, bir değişkenin erişilebilir olduğu kod bloğunu ifade eder. Scope sayesinde değişkenlerin yaşam alanı belirlenir.

## Scope Türleri

### 1. Global Scope (Küresel Kapsam)
Kodun her yerinden erişilebilen kapsam türüdür. Fonksiyonların ve blokların dışında tanımlanan değişkenler bu kapsama girer.

```js
var mesaj = "Merhaba"; // global scope

function selamla() {
  console.log(mesaj); // erişilebilir
}
selamla();
```

### 2. Function Scope (Fonksiyon Kapsamı)
Bir fonksiyon içinde tanımlanan değişkenlere yalnızca o fonksiyonun içinde erişilebilir.

```js
function topla() {
  var sonuc = 5 + 3;
  console.log(sonuc); // 8
}
topla();
// console.log(sonuc); // HATA! çünkü fonksiyon dışında erişilemez
```

### 3. Block Scope (Blok Kapsamı)
`let` ve `const` ile tanımlanan değişkenler sadece tanımlandıkları blok içinde geçerlidir (`if`, `for`, `{}` vs).

```js
if (true) {
  let yas = 25;
  const ad = "Ali";
  console.log(yas, ad); // çalışır
}
// console.log(yas); // HATA!
// console.log(ad);  // HATA!
```

### 4. Lexical Scope (Söz Dizimsel Kapsam)
İç içe fonksiyonlarda, içteki fonksiyonlar dıştaki fonksiyonların scope'una erişebilir.

```js
function disFonksiyon() {
  const isim = "Ayşe";

  function icFonksiyon() {
    console.log(isim); // erişilebilir
  }

  icFonksiyon();
}
disFonksiyon();
```

## Önemli Notlar

- `var` değişkeni function-scope'tur, `let` ve `const` block-scope'tur.
- Lexical scope sayesinde closure’lar oluşur (fonksiyon bir scope’a tutunur).

## Özet

| Tür            | Anahtar Kelimeler | Erişilebilirlik              |
|----------------|-------------------|------------------------------|
| Global Scope   | var, let, const    | Her yerden                   |
| Function Scope | var               | Sadece tanımlandığı fonksiyonda |
| Block Scope    | let, const        | Sadece tanımlandığı blokta   |

---

🔁 Scope konusunu iyi anlamak, closure ve hoisting gibi ileri konuları öğrenmenin temelidir.
