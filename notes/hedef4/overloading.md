# Function Overloading:

bir fonksiyonun farklı tür ve sayıda parametre almasını mümkün kılarak, tek bir gövde (body) üzerinden gelen argümanlara göre farklı davranışlar sergilemesini sağlayan TypeScript özelliğidir.

Overloading yapısında birden fazla call signature (imza) tanımlanabilir, ancak tek bir implementation (gövde) bulunmalıdır. Bu implementation, belirtilen tüm imzaların mümkün olan en genel birleşimini kapsamalı ve her olası senaryoyu içermelidir.

TypeScript’te overload edilen bir fonksiyonun derleme (transpile) sonucu olan JavaScript dosyasında sadece **tek bir fonksiyon** oluşur.


# 🎯 Overloading'in Amaçları

✅ Kod tekrarını azaltmak
Tek bir fonksiyonla birçok kullanım senaryosunu kapsayarak DRY prensibini uygular.

✅ Okunabilirliği artırmak
Farklı işlevler yerine tek bir anlamlı fonksiyon adıyla tüm varyantlar sunulur.

✅ IDE desteği sağlamak
Otomatik tamamlama, tip kontrolü ve dokümantasyon IntelliSense üzerinden görünür hâle gelir.

✅ Hataları erkenden yakalamak
Derleme zamanında tip uyuşmazlıkları yakalanır, runtime hataları azaltılır.


```ts
type Method = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

function logger(path: Method): string;
function logger(error: Error): string;

function logger(param: Method | Error): string {
  if (param instanceof Error) {
    return `Hata Mesajı: ${param.message}`;
  }

  switch (param) {
    case "GET":
      return "GET isteği";
    case "POST":
      return "POST isteği";
    case "PUT":
      return "PUT isteği ";
    case "DELETE":
      return "DELETE isteği ";
    case "PATCH":
      return "PATCH isteği ";
    default:
      throw Error("Bilinmeyen istek türü");
  }
}

logger(Error("Hata oluştu!"));
logger("GET");  
```


