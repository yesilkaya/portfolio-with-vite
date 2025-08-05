
```ts
// ✅ Ortak modeller
class EVModel {
  constructor(public model: string, public batteryLevel: number) {}
}

class User {
  constructor(public name: string) {}
}

//ICanCharge<T> interface'i, charge() metodunun this bağlamının T türünde bir nesne olmasını garanti eder. Bu sayede metot içindeki this kullanımı, T tipine göre derleyici tarafından kontrol edilir.
interface ICanCharge<T extends object> {
  charge(this: T, vehicle: EVModel): string;
}

// ✅ Generic type alias (mixin için)
// Constructor burada bir type alias'dır.(takma ad) ve T tipinde bir class örneği dönderen bir fonksiyonu(Constructor) temsi eder. 
// Mixin fonksiyonunu yazarken tanımladığımız bu tipin constructor'ını mixini uygulayacak olan class'ın constructor'ına göre owerride edeceğiz.
//Constructor<T> ifadesi, T tipinde bir nesne oluşturan constructor fonksiyonunu temsil eden bir type alias’tır.
//new (...args: any[]) => T sayesinde farklı sayıda ve türde argüman alan tüm sınıflar desteklenmiş olur.
type Constructor<T = {}> = new (...args: any[]) => T;

// ✅ Mixin fonksiyonu
// Burada  "TBase extends Constructor<{ name: string }>" diyerek mixini uygularken geçeceğimiz classın **{ name: string }** property'sine sahip olması gerektiğini belirtiyoruz. bu sayede bu property'e sahip olmayan bir class bu mixin'i uygulayamayacak. Çünkü biz biliyoruz ki mixindeki charge metodu this.name üzerinden uygulanacağı classın "name" propertysine erişmeye çalışacak. Eğer name property'si olmaz ise çalışma zamanında undefined hatasıyla karşılaşılabilir. Bu hataya çalışma zamanında yakalanmamk için derleme zamanında tip kontrolü ile bu durumu garanti altına alıyoruz.
function WithCharging<TypeBase extends Constructor<{ name: string }>>(Base: TBase) {
    
//Bu fonksiyon, kendisine gönderilen sınıfı genişleterek (extends) ICanCharge arayüzünü uygulayan (implements) yeni bir sınıf üretir.
//charge() metodunun this bağlamı, parametre olarak alınan sınıfın instance (örnek) tipi olan InstanceType<TBase> ile tanımlanır. Böylece this.name gibi özelliklere güvenli erişim sağlanır.
  return class extends Base implements ICanCharge<InstanceType<TBase>> {
    charge(this: InstanceType<TBase>, vehicle: EVModel): string {
      return `${this.name} cihazı, ${vehicle.model} aracını şarj ediyor.`;
    }
  };
}

// ✅ Kullanıcı sınıfları (orijinal halleri)
// Bunlar charge() metoduna sahip değil

class StationModel {
  constructor(public name: string) {}
}

class MobileCharger {
  constructor(public name: string, public location: string) {}
}

// ✅ Mixin uygulanmış versiyonlar

const StationWithCharge = WithCharging(StationModel);
const MobileWithCharge = WithCharging(MobileCharger);

// ✅ Kullanım

const vehicle = new EVModel("Hyundai IONIQ", 60);

const station = new StationWithCharge("Eşarj 101");
console.log(station.charge(vehicle));
// "Eşarj 101 cihazı, Hyundai IONIQ aracını şarj ediyor."

const mobile = new MobileWithCharge("VoltGO", "Ankara");
console.log(mobile.charge(vehicle));
// "VoltGO cihazı, Hyundai IONIQ aracını şarj ediyor."

```