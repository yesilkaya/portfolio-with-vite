# 🔒 Closure (Kapanım) Nedir?

**Closure**, bir fonksiyonun **kendi tanımlandığı çevredeki (lexical scope)** değişkenlere **erişmeye devam etmesidir.**

> Yani bir fonksiyon, tanımlandığı yerdeki değişkenleri hatırlar ve kullanabilir – hatta o dış fonksiyon bitmiş olsa bile.

---

## 🧠 Tanımın Kökü

- **Scope (Kapsam)**: Bir değişkenin nereden erişilebilir olduğunu belirler.
- **Lexical Scope**: Kod yazıldığı sıraya göre kapsam belirlenir (yani JavaScript’te kapsam yapısı statiktir).

---

## 📦 Closure Nasıl Oluşur?

Bir fonksiyon, **içinde tanımlandığı ortamın değişkenlerine erişmeye devam ediyorsa**, closure oluşur.

### ✅ Basit Örnek:

```js
function dışFonksiyon() {
  let sayı = 0;

  return function içFonksiyon() {
    sayı++;
    console.log("Sayı:", sayı);
  };
}

const sayaç = dışFonksiyon(); // dışFonksiyon çalıştı ve içFonksiyon döndü
const sayaç2 = dışFonksiyon(); // dışFonksiyon çalıştı ve içFonksiyon döndü
const sayaç3 = dışFonksiyon(); // dışFonksiyon çalıştı ve içFonksiyon döndü

sayaç(); // "Sayı: 1"
sayaç(); // "Sayı: 2"
```

> `sayaç` fonksiyonu çalıştığında, hâlâ `sayı` değişkenine erişebiliyor.  
> Çünkü `içFonksiyon`, tanımlandığı yerin (closure’ın) hafızasını taşıyor.

---

## 🔄 Closure’ların Kullanım Alanları

- 🔒 **Özel değişken saklamak** (dışarıdan erişilemez)
- 🧠 **Bellekte veri tutmak** (örneğin sayaç gibi)
- 🔁 **Fonksiyon fabrikaları oluşturmak**
- 📦 **State yönetimi** (özellikle React gibi yapılarda ilham alınan yapı)

---

## 🎓 Gerçekçi Örnek: Tıklama Takipçisi

```js
function createClickTracker(text) {
  let count = 0;

  return function () {
    count++;
    console.log(`${text} ${count} kez tıklandı.`);
  };
}

const blogTikla = createClickTracker("Blog");
const iletisimTikla = createClickTracker("İletişim");

blogTikla(); // Blog 1 kez tıklandı.
blogTikla(); // Blog 2 kez tıklandı.
iletisimTikla(); // İletişim 1 kez tıklandı.
```

> Her `createClickTracker()` çağrısı kendi `count` değişkenine sahip olur.  
> Çünkü her biri **kendi closure’ını oluşturur.**

---

## 🎯 Özetle

| Özellik | Açıklama |
|--------|----------|
| 📌 **Tanım** | Bir fonksiyonun, tanımlandığı çevredeki değişkenleri hatırlaması |
| 🧠 **Amaç** | Özel veriler saklamak, state tutmak |
| 🧰 **Kullanım** | Sayaçlar, özel alanlar, fonksiyon üreticiler |
| 🔐 **Fayda** | Güvenli, izole ve kalıcı değişken saklama imkanı sağlar |
