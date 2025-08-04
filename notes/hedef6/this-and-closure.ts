const ev = {
    model: "Kia EV3",
    chargeRate: 20,
    startCharge(value:number){ return `${this.model} aracının şarj oranı : ${this.chargeRate+value}`}
  
  };
  console.log(ev.startCharge(20));
  const deger = ev.startCharge.bind(ev);
  const deger2 = ev.startCharge;
  console.log(deger(30));
  console.log(deger2(30)); //hata verecek this bağlamı kopuk olduğundan bu fonksiyonun kullandığı ${this.model} ifadesi hata verir.
  
  
  
  const ev2 = {
    model: "Kia EV5",
    chargeRate: 20,
    startCharge: function () {
      return () => {
        this.chargeRate += 10;
        return `${this.model} aracının şarj oranı : ${this.chargeRate}`;
      };
    },
  };
  const _startCharge = ev2.startCharge();
  console.log(_startCharge());
  console.log(_startCharge());
  
  
  
  
  
  function stopCharge(this: { model: string }, who: string, time: number) {
    console.log(`${this.model} şarjı ${who} tarafından durduruldu.`);
  }
  
  //stopCharge.call(ev2,"Seccad");
  const _stopCharge = stopCharge.bind(ev2);
  
  stopCharge.call(ev2,"Yusuf", 30);
  stopCharge.apply(ev2,["Ahmet", 45]);
  _stopCharge("Veli");
  _stopCharge("Ali");
  