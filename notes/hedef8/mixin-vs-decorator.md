# TypeScript: Mixin vs Dekoratör — Özet

## 1. Ortak Nokta
- **Mixin** de **dekoratör** de **runtime** davranışıdır.
- Her ikisi de sınıflara sonradan özellik/metot ekleyebilir.
- TypeScript bunların runtime’da ne yaptığını görmez; sadece tip imzası üzerinden compile-time kontrol yapar.

## 2. Farklar

| Özellik               | Mixin                                                                                     | Dekoratör |
|---------              |-------                                                                                    |-----------|
| **Tetiklenme**        | Fonksiyon olarak **manuel** çağrılır: `WithX(Base)`                                       | `@WithX` ile **class tanımı sırasında** otomatik çağrılır |
| **Tip Çıkarımı**      | Generics ile dönüş tipi açıkça tanımlandığı için TS compile-time’da yeni üyeleri bilir    | TS varsayılan olarak tip değişimini **öngörmez** |
| **Ek Tip İşlemi**     | Gerekmez (tip imzaszı doğru yazılmışsa)                                                    | Gerekir (`interface merge`, dönüş tipi genişletme, `as` cast) |
| **Kullanım Alanı**    | Güçlü tip güvenliği, zincirleme kompozisyon                                               | Anotasyon stili, framework entegrasyonu |
| **Derleyici Ayarı**   | Özel ayar gerekmez                                                                        | `"experimentalDecorators": true` (legacy) gerekir |

## 3. Önemli Notlar
- **Mixin** dönüş tipini TS bildiği için, eklenen metodlar derleme hatası vermez.
- **Dekoratör** tip genişletmesini **sen** bildirirsen derleme hatası vermez.
- Abstract class’a her ikisi de uygulanabilir.
- Runtime’da davranış aynıdır: class’ın constructor’ı değiştirilir veya prototype’ına metot eklenir.

## 4. Kısa Özet
> **Mixin**: "Bu sınıfa şunları ekle, bana yeni sınıf döndür" — *sen çağırırsın, tipi TS hemen bilir.*  
> **Dekoratör**: "Bu sınıfa şunu uygula" — *TS tip değişimini varsayımsal olarak bilmez, bildirmen gerekir.*
