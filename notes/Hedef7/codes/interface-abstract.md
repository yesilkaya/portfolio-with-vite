```ts
interface IStationA {
  startAutoCharge(): void;
}

interface IStationB {
  increaseChargingPower(): void;
}


abstract class BaseStation{
  
  abstract initializeStation(): void;

  constructor(    
    public name: string){}

}

class StationModel1 extends BaseStation implements IStationA,IStationB {
  initializeStation(){
        return console.log(`${this.name} istasyonu uyandı.`);
  }
  startAutoCharge(){
    return console.log(`${this.name} Autocharge aktif edildi `);
  }
  increaseChargingPower(){
        return console.log("Şarj gücü arttırıldı");
  }

}
class StationModel2 extends BaseStation implements IStationB {
    initializeStation(){
        return console.log(`${this.name} istasyonu uyandı ve initialize edildi.`);
  }
  increaseChargingPower(){
        return console.log(`${this.name} Şarj gücü arttırıldı`);;
  }
}
const station_1 = new StationModel1("Eşarj101");
station_1.initializeStation();
station_1.startAutoCharge();
const station_2 = new StationModel2("Eşarj102");
station_2.initializeStation();
station_2.increaseChargingPower();

```