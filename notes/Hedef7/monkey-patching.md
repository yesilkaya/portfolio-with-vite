🐒 **MONKEY PATCHING NEDİR?**
Monkey patching, var olan bir nesne, sınıf ya da fonksiyonun davranışını çalışma zamanında (runtime) değiştirme veya üzerine yazma işlemidir.

```ts
1. Metot eklemek:
String.prototype.reverse = function () {
  return this.split("").reverse().join("");
};

2. Mevcut metodu değiştirmek:
const originalLog = console.log;
console.log = (...args) => {
  originalLog("🐵", ...args);
};

//Güvenli Yöntem
declare global {
  interface String {
    reverse(): string;
  }
}

String.prototype.reverse = function () {
  return this.split("").reverse().join("");
};
```

**Alternatifler**

🔄 ALTERNATİFLER
✅ Decorator → Daha güvenli, okunabilir ve izole davranış ekleme yöntemi

✅ Wrapper fonksiyon → Davranışı sarmalayan fonksiyonlar

✅ Adapter / Mixin / Inheritance → OOP tabanlı çözüm