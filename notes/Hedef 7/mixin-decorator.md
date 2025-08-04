
```ts
// CanCharge mixin'i charge adında bir metoda sahiptir.
// Bu metot EVModel tipinde bir parametre alır ve string döndürür.
// Metot içinde `this.name` ifadesi kullanılmasına rağmen `CanCharge` objesinde `name` adında bir property yoktur.
// Bu nedenle `charge` metodunun `this` bağlamı, daha sonra `name` özelliğine sahip bir objeye atanmak üzere tasarlanmıştır.
// Genellikle bu bağlama işlemi `Object.assign(..., CanCharge)` gibi yollarla yapılır.
// Böylece methodun `this` değeri, hedef sınıfın (`StationModel`) instance'ına bağlanmış olur.
const CanCharge = {
    charge(vehicle: EVModel) : string{
    return `${this.name} cihazı, ${vehicle.model} aracını şarj ediyor.`;
  }
};

// HasLocation mixin'i iki metoda sahiptir:
// 1. `setLocation(lat, lng)`: İki adet number parametre alır ve çağrıldığı objenin `location` property’sini `{ lat, lng }` şeklinde ayarlar.
// 2. `getLocation()`: Eğer `location` tanımlıysa, `lat` ve `lng` değerlerini içeren bir konum mesajı döndürür. 
//    Aksi takdirde "önce Lokasyon ata" mesajını verir.
//
// Bu metodlar, mixin'in uygulanacağı objede `location?: { lat: number; lng: number }` şeklinde bir property beklentisi taşır.

const HasLocation = {
  setLocation(lat: number, lng: number) {
    this.location = { lat, lng };
  },
  getLocation() {
    return this.location !== undefined ?`📍 Konum: ${this.location.lat}, ${this.location.lng}` : `önce Lokasyon ata`;
  }
};

const WhichUserCharging = {
  chargingUser(user: User): string{
      return `Kullanıcı: ${user.name},`;
      
  }
};


function logMethod(target: any, methodName: string) {
  const original = target[methodName];
  target[methodName] = function (...args: any[]) {
    console.log(`➡️ ${methodName} çağrıldı`, args);
    return original.apply(this, args);
  };
}

class User {
  constructor(public name: string, public role: string) {}
}

class EVModel {
  constructor(public model: string, public batteryLevel: number) {}
}

class StationModel {
  name: string;
  location?: { lat: number; lng: number };
  charge!: (vehicle: EVModel) => string;
  setLocation!: (lat: number, lng: number) => void;
  getLocation!: () => string;
  chargingUser!: (user: User) => string;

  constructor(name: string) {
    this.name = name;
  }
}

// Mixin ve decorator uygula
Object.assign(StationModel.prototype, CanCharge, HasLocation, WhichUserCharging );
logMethod(StationModel.prototype, "charge");
logMethod(StationModel.prototype, "setLocation");

const user = new User("Seccad", "operator");
const vehicle = new EVModel("Kia EV6", 40);
const station = new StationModel("Eşarj 101");

console.log(station.getLocation());
station.setLocation(41.0, 29.0);
console.log(station.getLocation());

console.log(station.chargingUser(user));
console.log(station.charge(vehicle));


```


