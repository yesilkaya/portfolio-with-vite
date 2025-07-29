# 🔍 jsx ve jsxs Nedir?
📦 Nereden gelir?

import { jsx, jsxs } from "react/jsx-runtime";
React 17 ve sonrası için gelen yeni JSX dönüşüm sisteminin fonksiyonlarıdır.

| Fonksiyon | Ne işe yarar?                                | Ne zaman kullanılır?               |
| --------- | -------------------------------------------- | ---------------------------------- |
| `jsx`     | Tek bir çocuk (`children`) varsa kullanılır. | `<div>Metin</div>` gibi            |
| `jsxs`    | Birden fazla çocuk varsa kullanılır.         | `<div><p>1</p><p>2</p></div>` gibi |


🧪 Örnek 1: jsx → Tek çocuk

// TypeScript / JSX
const elem = <h1>Merhaba</h1>;
Bu transpile edilince:


const elem = jsx("h1", { children: "Merhaba" });
🧪 Örnek 2: jsxs → Çok çocuk

const elem = (
  <div>
    <p>Satır 1</p>
    <p>Satır 2</p>
  </div>
);
Bu transpile edilince:


const elem = jsxs("div", {
  children: [
    jsx("p", { children: "Satır 1" }),
    jsx("p", { children: "Satır 2" })
  ]
});
🔁 Yani: jsxs çoklu çocukları dış konteynıra sararken, içerideki her bir öğe jsx ile oluşturulur.

# 🧠 Neden React.createElement yerine geçtiler?
Eskiden bu JSX:


const elem = <h1>Merhaba</h1>;
şuna dönüşürdü:


const elem = React.createElement("h1", null, "Merhaba");
Ama şimdi:

Daha hızlı çalışan,

Daha az kodla yazılmış,

React'ı import etme zorunluluğu olmayan

bir sistem geldi: JSX Runtime (jsx/jsxs).

🎯 Özet
| JSX Kod                       | Ne Üretilir?                         | Açıklama           |
| ----------------------------- | ------------------------------------ | ------------------ |
| `<h1>Merhaba</h1>`            | `jsx("h1", { children: "Merhaba" })` | Tek çocuk → `jsx`  |
| `<div><p>1</p><p>2</p></div>` | `jsxs("div", { children: [...] })`   | Çok çocuk → `jsxs` |


