type Constructor<T = {}> = new (...args: any[]) => T;

Bu type alias şunu temsil eder:

T türünü döndüren (yani bir class örneği oluşturan) herhangi bir constructor fonksiyonu.

| Parça                  | Anlamı                                                               |
| ---------------------- | -------------------------------------------------------------------- |
| `type Constructor<T>`  | `T` adında generic (genel) bir tür alır                              |
| `= {}`                 | Eğer kullanıcı `T` vermezse varsayılanı boş bir nesne türüdür (`{}`) |
| `new (...args: any[])` | Her tür ve sayıda argüman alabilen bir `constructor`                 |
| `=> T`                 | Bu constructor çağrıldığında `T` türünde bir nesne döner             |

 Yani:
Constructor<T> → T tipinde nesne oluşturan herhangi bir sınıf türünü temsil eder.
Bu sınıfın constructor'ı argüman alabilir ama kaç tane ve hangi tipte olduğu fark etmez.