| Özellik                    | Compile                                                             | Transpile                                                                      |
| -------------------------- | ------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| Tanım                      | Yüksek seviyeli bir dili, makine koduna çevirir (örn. C → Assembly) | Bir dili başka bir yüksek seviyeli dile çevirir (örn. TypeScript → JavaScript) |
| Hedef                      | Genellikle makine kodu (binary)                                     | Genellikle bir başka programlama dili                                          |
| Örnek                      | `javac`, `gcc`                                                      | `tsc`, `babel`, `coffee`                                                       |
| Çıktı çalıştırılabilir mi? | Evet, doğrudan (örn. `.exe`)                                        | Hayır, çalıştırılmak için başka ortam gerekir (örn. tarayıcı)                  |


✅ “Aslında JavaScript compile ediliyor, ama bunu biz manuel olarak yapmıyoruz. V8 motoru, çalışma zamanında (JIT) JavaScript kodlarını önce bytecode'a, sonra makine koduna compile ederek çalıştırır.”

🧠 Detay :
V8’in çalışma süreci şu şekilde özetlenebilir:
Parse → JS kodu taranır, AST (Abstract Syntax Tree) oluşturulur.
Interpreter (Ignition) → Hızlıca bytecode üretir ve çalıştırır.
Profiler → Hangi kod sık çalışıyor, bunu izler.
Compiler (TurboFan) → Çok kullanılan kod parçalarını native makine koduna çevirir.
Sonra bu makine kodu doğrudan çalıştırılır → daha hızlı olur.