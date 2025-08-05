# 📘 TypeScript'te `abstract class` (Soyut Sınıf)

## 🔹 Tanım

`abstract class`, doğrudan örneği oluşturulamayan, ancak başka sınıflar tarafından genişletilmek (extend edilmek) üzere tasarlanmış sınıflardır.

```ts
abstract class Animal {
  abstract makeSound(): void;

  move(): void {
    console.log("Hayvan hareket ediyor.");
  }
}
```

- `abstract` metotlar gövdesizdir ve alt sınıf tarafından **zorunlu** olarak uygulanmalıdır.
- Gövdeli metotlar opsiyoneldir — alt sınıf isterse override eder.

---

## 🔸 Kullanım Amacı

1. Kod tekrarını azaltmak
2. Ortak davranışları merkezi hale getirmek
3. Alt sınıfları belirli metotları tanımlamaya zorlamak
4. Polimorfizmi desteklemek (farklı nesneleri ortak arayüzle işlemek)

---

## 🔹 Uygulama Örneği

```ts
abstract class Animal {
  constructor(public name: string) {}

  abstract makeSound(): void;

  move(): void {
    console.log(`${this.name} hareket ediyor.`);
  }
}

class Dog extends Animal {
  makeSound(): void {
    console.log("Hav hav!");
  }
}

const dog = new Dog("Karabaş");
dog.move();       // Karabaş hareket ediyor.
dog.makeSound();  // Hav hav!
```

> `new Animal(...)` ❌ HATA verir: Soyut sınıflardan doğrudan örnek oluşturulamaz.

---

## 🔸 Alt Sınıflar Ne Zaman Metot Yazmak Zorundadır?

- `abstract` olarak tanımlanan her metot **zorunlu olarak override edilmelidir.**
- Normal metotlar isteğe bağlı override edilir.

### 🔍 Hatalı Kullanım

```ts
abstract class Animal {
  abstract makeSound(): void {
    console.log("Hata! Gövdeli abstract olamaz.");
  }
}
```

⛔ Derleme Hatası: `An abstract method cannot have an implementation.`

---

## 🔸 Abstract Class vs Interface

| Özellik                | `abstract class`           | `interface`                  |
|------------------------|----------------------------|------------------------------|
| Metot gövdesi olabilir | ✅ Evet                     | ❌ Hayır (sadece imza)       |
| Özellik barındırabilir | ✅ Evet                     | ✅ Evet                      |
| Çoklu kalıtım          | ❌ Hayır                    | ✅ Evet                      |
| Amaç                   | Şablon + davranış          | Sözleşme (contract)          |

---

## 🧠 Özet

- `abstract class` → doğrudan örneği oluşturulamaz
- `abstract` metot → alt sınıf yazmak zorundadır
- Hem gövdeli hem gövdesiz metot içerebilir
- Davranış + yapı birleşimi sunar

---

> 📌 Soyut sınıflar, gerçek dünyadaki soyut kavramları modellemek ve alt sınıflara görev dağıtmak için güçlü bir araçtır.