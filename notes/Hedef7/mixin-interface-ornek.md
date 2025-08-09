
# TypeScript: Mixin, Interface ve Tip Güvenli this Bağlamı Örneği

Bu belge, TypeScript'te mixin yapısının `interface`, `generic type`, `type alias` ve `this` bağlamı ile birlikte nasıl kullanılacağını gösteren bir örneği ve açıklamalarını içerir.

---

## 🎯 Amaç

Birden fazla sınıfa ortak bir `charge()` yeteneği (davranışı) kazandırmak. Bu işlem, `name` özelliği olan sınıflara özel olarak uygulanacak ve `charge()` metodu, güvenli bir şekilde `this.name` özelliğini kullanabilecek.

---

## 📦 Ortak Modeller

```ts
class EVModel {
  constructor(public model: string, public batteryLevel: number) {}
}

class User {
  constructor(public name: string) {}
}
```

---

## 🧩 Interface: ICanCharge

```ts
interface ICanCharge<T extends object> {
  charge(this: T, vehicle: EVModel): string;
}
```

- `charge` metodunun `this` bağlamının `T` tipinde bir nesne olmasını garanti eder.
- Böylece `this.name` gibi kullanımda derleyici desteği sağlanır.

---

## ⚒️ Constructor Type Alias

```ts
type Constructor<T = {}> = new (...args: any[]) => T;
```

- Farklı sınıflar mixin’e geçirilebilsin diye constructor tipini genelleyerek tanımlar.

---

## 🧪 Mixin Fonksiyonu: WithCharging

```ts
function WithCharging<TBase extends Constructor<{ name: string }>>(Base: TBase) {
  return class extends Base implements ICanCharge<InstanceType<TBase>> {
    charge(this: InstanceType<TBase>, vehicle: EVModel): string {
      return `${this.name} cihazı, ${vehicle.model} aracını şarj ediyor.`;
    }
  };
}
```

### Açıklamalar:
- `TBase extends { name: string }` ile mixin’e geçirilen sınıfın `name` özelliğine sahip olması zorunlu hale gelir.
- `InstanceType<TBase>` sayesinde `this` bağlamı geçilen sınıfın instance tipiyle eşleşir.
- `implements ICanCharge<...>` ifadesiyle `charge()` metodunun interface'e uygunluğu garanti altına alınır.

---

## 🧱 Uygulanan Sınıflar

```ts
class StationModel {
  constructor(public name: string) {}
}

class MobileCharger {
  constructor(public name: string, public location: string) {}
}

const StationWithCharge = WithCharging(StationModel);
const MobileWithCharge = WithCharging(MobileCharger);
```

---

## 🚀 Kullanım

```ts
const vehicle = new EVModel("Hyundai IONIQ", 60);

const station = new StationWithCharge("Eşarj 101");
console.log(station.charge(vehicle));
// Çıktı: "Eşarj 101 cihazı, Hyundai IONIQ aracını şarj ediyor."

const mobile = new MobileWithCharge("VoltGO", "Ankara");
console.log(mobile.charge(vehicle));
// Çıktı: "VoltGO cihazı, Hyundai IONIQ aracını şarj ediyor."
```

---

## ✅ Sonuç

| Yapı                        | Açıklama |
|-----------------------------|----------|
| `interface ICanCharge<T>`   | `charge` metodunun `this` bağlamını tip güvenli hale getirir |
| `Constructor<T>`            | Her sınıfı mixin’e geçirilebilir kılar |
| `WithCharging` mixin        | Ek davranış (charge) kazandırır |
| `TBase extends { name: string }` | `name` zorunluluğunu derleme zamanında garanti eder |
| `InstanceType<TBase>`       | `this` bağlamı → geçilen sınıfın tipi |
| `implements`                | `charge()` metodunun `interface` ile uyumlu olduğunu tanımlar |

---

> Bu yapı, TypeScript'te mixin kullanarak çoklu kalıtımı tip güvenli şekilde uygulamanın en iyi örneklerinden biridir.
