# 📚 JSDoc Rehberi

## 🔍 JSDoc Nedir?

JSDoc, JavaScript ve TypeScript dosyalarında kodu belgelemek, IDE desteği sağlamak, tip kontrolü yapmak ve otomatik dokümantasyon üretmek için kullanılan bir yorum standardıdır.

## 🎯 Ne İşe Yarar?

| Amaç                 | Açıklama                                                   |
|----------------------|------------------------------------------------------------|
| 📖 Dokümantasyon     | Fonksiyonların ve nesnelerin açıklamalarını sağlar         |
| 🧠 IDE Desteği       | VSCode gibi editörlerde açıklama kutuları ve tip bilgisi   |
| 🧪 Tip Belirleme     | JavaScript'te daha güvenli kod yazımı sağlar               |
| 📄 Dökümantasyon     | `jsdoc` veya `typedoc` ile HTML belgeler üretilebilir      |

## 🛠 Kullanım Örnekleri

### Fonksiyon Açıklaması

```ts
/**
 * İki sayıyı toplar.
 * @param {number} a - Birinci sayı
 * @param {number} b - İkinci sayı
 * @returns {number} Toplam
 */
function add(a, b) {
  return a + b;
}
```

### Değişken Tipi

```ts
/** Yaş bilgisi */
let age /** @type {number} */ = 30;
```

### Sınıf Açıklaması

```ts
/**
 * Bir kullanıcıyı temsil eder.
 */
class User {
  /**
   * @param {string} name
   * @param {number} age
   */
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
}
```

## 🧾 Yaygın Etiketler

| Etiket       | Açıklama                                     |
|--------------|----------------------------------------------|
| `@param`     | Parametre tanımı                             |
| `@returns`   | Dönüş değeri açıklaması                      |
| `@typedef`   | Yeni bir nesne tipi tanımı                   |
| `@type`      | Bir değişkenin türünü belirtir               |
| `@property`  | Nesne içindeki alanları açıklar              |
| `@example`   | Kullanım örneği sağlar                       |
| `@deprecated`| Kullanımı önerilmeyen yapıları belirtir      |

## 🧩 Nesne Tip Tanımı Örneği

```ts
/**
 * @typedef {Object} Product
 * @property {string} name - Ürün adı
 * @property {number} price - Ürün fiyatı
 */

/**
 * Ürün formatlar.
 * @param {Product} product
 * @returns {string}
 */
function formatProduct(product) {
  return `${product.name}: ${product.price} TL`;
}
```

## 🔧 Otomatik Dökümantasyon Oluşturma

### JSDoc Aracı ile:

```bash
npm install --save-dev jsdoc
npx jsdoc src/ -d docs/
```

Bu komut, `src` klasöründeki JSDoc açıklamalarına göre `docs/` klasöründe HTML belgeleri oluşturur.

## 🧠 Püf Noktalar

- Açıklamaları her zaman fonksiyonun **üstüne** yaz
- Tip bilgilerini açıkça yaz: `string`, `number`, `boolean`, `string | number`
- `@example` ile gerçek kullanım örneği ver
- `@typedef` kullanarak karmaşık nesneleri tanımla

## 📌 TypeScript ile Kullanımı

TypeScript zaten tipli olduğu için zorunlu değildir ama:
- Public API'leri açıklamak
- Otomatik dökümantasyon almak
- IDE içinde detaylı yardım göstermek için faydalıdır.

---

## ✅ Özet

- JSDoc, kodu anlaşılır hale getirir ve belgeleme sürecini kolaylaştırır
- Tip güvenliği sağlar, IDE'ye destek verir
- Otomatik HTML dokümantasyonu üretilebilir
# JSDoc vs TypeDoc

## 🟡 JSDoc Nedir?

**JSDoc**, JavaScript (ve TypeScript) kodu için açıklama (dokümantasyon) yorumları yazmanı sağlar.

### 🔧 Temel Özellikleri:
- Yorum satırlarıyla (`/** ... */`) çalışır.
- Hem JavaScript hem TypeScript için uygundur.
- Tip belirtmek için `@param`, `@returns`, `@type`, `@typedef` gibi etiketler kullanılır.
- Belge üretmek için `jsdoc` CLI aracı kullanılır.
- Tip güvenliği sağlamaz, sadece belgelendirme içindir.

### ✅ Avantajları:
- Her yerde çalışır (TS, JS, hatta JSDoc destekli IDE’lerde).
- JS projeleri için iyi bir seçenek.
- Çıktı HTML belgeleri olarak üretilebilir.

### ❌ Dezavantajları:
- TypeScript gibi güçlü tip sistemini kullanmaz, manuel tip tanımı gerekir.
- Tip bilgisi genellikle senkronize kalmaz (tipi değiştirirsin ama yorum satırını unutabilirsin).

---

## 🔵 TypeDoc Nedir?

**TypeDoc**, doğrudan **TypeScript**'in tip sistemini ve kaynak kodunu analiz ederek otomatik belge oluşturan bir araçtır.

### 🔧 Temel Özellikleri:
- `typedoc` komutu ile çalışır.
- JSDoc yorumları destekler ama asıl veriyi **TypeScript tiplerinden** alır.
- Sınıflar, arabirimler, generics, namespace gibi TS öğelerini çok iyi işler.
- `tsconfig.json`'u okur.

### ✅ Avantajları:
- TypeScript'e özel güçlü tip desteği sağlar.
- Tip tanımları zaten kodda olduğundan, ekstra yorum yazmaya gerek yoktur.
- Otomatik olarak güncel kalır (kod değişince belge de güncellenir).
- HTML veya JSON çıktısı alınabilir.

### ❌ Dezavantajları:
- Sadece TypeScript projelerinde işe yarar.
- Çok eski JS projeleriyle uyumlu değildir.

---

## 🔍 Örnek Karşılaştırma

```ts
/**
 * Kullanıcının tam adını döndürür.
 * @param firstName Kullanıcının adı.
 * @param lastName Kullanıcının soyadı.
 * @returns Tam adı
 */
function getFullName(firstName: string, lastName: string): string {
  return `${firstName} ${lastName}`;
}
