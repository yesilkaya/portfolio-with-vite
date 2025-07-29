# 🌀 Event Loop Nedir? Nasıl Çalışır?

`Event Loop`, Node.js’in eşzamanlı olmayan (asenkron) işlemleri sırayla ve düzgün bir şekilde yürütmesini sağlayan döngüsel bir yapıdır.

## 🔁 Event Loop Fazları

| Faz                  | Ne çalışır?                               | Örnek API                  |
| -------------------- | ----------------------------------------- | -------------------------- |
| **Timers**           | `setTimeout`, `setInterval`              | `setTimeout(fn, 0)`        |
| **Pending Callbacks**| Sistem kaynaklı ikinci callback’ler       | TCP hata callback          |
| **Idle, Prepare**    | Node.js içsel işlemler                    | Dahili                     |
| **Poll**             | I/O işlemleri ve callback’ler             | `fs.readFile`, `net request` |
| **Check**            | `setImmediate` callback’leri              | `setImmediate(fn)`         |
| **Close Callbacks**  | Kapanış callback’leri                     | `socket.on('close')`       |
| **Microtasks (her faz)** | `Promise`, `process.nextTick`, `queueMicrotask` | `Promise.resolve().then()` |

## 🔄 Fazların Sıralaması

Node.js Event Loop, bu fazları aşağıdaki sırayla döngüsel olarak işler:

1. **Timers** fazı  
   `setTimeout`, `setInterval` gibi zamanlayıcı fonksiyonların callback’lerini çalıştırır.

2. **Pending Callbacks** fazı  
   Sistem kaynaklı (I/O, TCP vb.) ikinci aşama callback’leri çalıştırır.

3. **Idle, Prepare** fazı  
   Node.js’in kendi iç hazırlık işlemleri burada gerçekleşir.

4. **Poll** fazı  
   Yeni gelen I/O olayları dinlenir ve varsa ilgili callback çalıştırılır.

5. **Check** fazı  
   `setImmediate` ile eklenen callback’ler burada yürütülür.

6. **Close Callbacks** fazı  
   Örneğin `socket.on('close')` gibi kapanma olayları burada işlenir.

---

## 🔬 Microtask Kuyruğu

Her fazın sonunda **microtask kuyruğu** boşaltılır.

Microtask'lar:
- `Promise.then()`
- `process.nextTick()`
- `queueMicrotask()`

Her fazın bitiminde bu microtask kuyruğu işlenir. Bu microtask’ler, fazdan bağımsız olarak önceliklidir.

---

## 🧠 Neden Farklı Fazlar Var?

Fazlar, callback’lerin tipine göre ayrı kuyruğa yerleştirilmesini sağlar:

- `setTimeout` → Timers kuyruğunda bekler
- `fs.readFile`, `http.get` gibi I/O işlemleri → Poll fazında bekler
- `setImmediate` → Check fazında bekler

Bu sistem sayesinde **Node.js, her tür asenkron işlemi verimli ve adil bir şekilde işler.**

---

## ✅ Özet

- Fazlar, farklı tür callback’leri sırayla işlemek için kullanılır.
- Her fazda ilgili callback’ler çalıştırılır.
- Her fazın sonunda microtask kuyruğu (promise/nextTick) işlenir.
- Event Loop bu fazlar arasında sürekli döner.

Bu yapı sayesinde:
- Bloklamayan asenkron davranış elde edilir,
- Performans ve kaynak yönetimi optimize edilir.

---
