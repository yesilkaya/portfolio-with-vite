
```ts
const CanCharge = {
    charge(vehicle: EVModel) : string{
    return `${this.name} cihazı, ${vehicle.model} aracını şarj ediyor.`;
  }
};

const HasLocation = {
  setLocation(lat: number, lng: number) {
    this.location = { lat: lat, lng:lng };
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

function logMethod(prototype: any, methodName: string) {
  const original = prototype[methodName];
  prototype[methodName] = function (...args: any[]) {
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

// Mixin ve decorator uygulanıyor
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


