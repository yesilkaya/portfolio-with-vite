
```ts


class EVModel {
  constructor(public model: string, public batteryLevel: number) {}
}

interface ICanCharge<T extends object> { //1
  charge(this: T, vehicle: EVModel): string;
}

type Constructor<T = {}> = new (...args: any[]) => T; //2

function WithCharging<TBase extends Constructor<{ name: string , location?: string}>>(Base: TBase) { //3
  return class extends Base implements ICanCharge<InstanceType<TBase>> { //4
    charge(this: InstanceType<TBase>, vehicle: EVModel): string {
return `${this.name} cihazı, ${vehicle.model} aracını` +
       `${this.location ? ` ${this.location} konumunda` : ''} şarj ediyor.`;
}    }
  };

abstract class BaseCharger {
  constructor(
    public name: string,
  ) {}
}

class LocalCharger extends BaseCharger{
  initialize(){
    return `${this.name} başlatıldı`;
  }
}
class MobileCharger extends BaseCharger {
  location?:string;

  constructor(name:string,location?:string){
    super(name);
    this.location = location;
  }
}

// ✅ Mixin uygulanmış versiyonlar
const StationWithCharge = WithCharging(LocalCharger);
const MobileWithCharge = WithCharging(MobileCharger);

const vehicle = new EVModel("Hyundai IONIQ", 60);

const  station_1 = new StationWithCharge("Eşarj 101");
const  station_2 = new MobileWithCharge("VoltGO","Ankara");
console.log(station_1.initialize());
console.log(station_1.charge(vehicle));
console.log(station_2.charge(vehicle));


```
1 -> ICanCharge<T> interface'i, charge() metodunun this bağlamının T türünde bir nesne olmasını garanti eder. Bu sayede metot içindeki this kullanımı, T tipine göre derleyici tarafından kontrol edilir.

2 -> // ✅ Generic type alias (mixin için)
// Constructor burada bir type alias'dır.(takma ad) ve T tipinde bir class örneği dönderen bir fonksiyonu(Constructor) temsi eder. 
// Mixin fonksiyonunu yazarken tanımladığımız bu tipin constructor'ını mixini uygulayacak olan class'ın constructor'ına göre owerride edeceğiz.
//Constructor<T> ifadesi, T tipinde bir nesne oluşturan constructor fonksiyonunu temsil eden bir type alias’tır.
//new (...args: any[]) => T sayesinde farklı sayıda ve türde argüman alan tüm sınıflar desteklenmiş olur.

3 -> // ✅ Mixin fonksiyonu
// Burada  "TBase extends Constructor<{ name: string }>" diyerek mixini uygularken geçeceğimiz classın **{ name: string }** property'sine sahip olması gerektiğini belirtiyoruz. bu sayede bu property'e sahip olmayan bir class bu mixin'i uygulayamayacak. Çünkü biz biliyoruz ki mixindeki charge metodu this.name üzerinden uygulanacağı classın "name" propertysine erişmeye çalışacak. Eğer name property'si olmaz ise çalışma zamanında undefined hatasıyla karşılaşılabilir. Bu hataya çalışma zamanında yakalanmamk için derleme zamanında tip kontrolü ile bu durumu garanti altına alıyoruz.

4 -> //Bu fonksiyon, kendisine gönderilen sınıfı genişleterek (extends) ICanCharge arayüzünü uygulayan (implements) yeni bir sınıf üretir.
//charge() metodunun this bağlamı, parametre olarak alınan sınıfın instance (örnek) tipi olan InstanceType<TBase> ile tanımlanır. Böylece this.name gibi özelliklere güvenli erişim sağlanır.