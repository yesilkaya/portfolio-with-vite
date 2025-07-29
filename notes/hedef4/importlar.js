/*
🔧 1. CommonJS (CJS) Nedir?

Node.js’in varsayılan modül sistemidir (özellikle .js dosyalarında).
Modüller require() ve module.exports ile tanımlanır.
Senkron çalışır → modül anında yüklenir.

🌍 2. ES Modules (ESM) Nedir?

ES6 (2015) ile gelen modern modül sistemidir.
import / export sözdizimi kullanılır.
Asenkron çalışır → modül yüklemesi gecikebilir.
Tarayıcılar ve modern Node.js sürümleri bunu destekler.

CJS (CommonJS) ve ESM (ES Modules), JavaScript’te modül sistemidir. 
Yani dosyaları parçalara ayırma, dışa aktarma ve başka dosyalarda kullanma şeklimizi belirlerler.

cjs modülleri export edilirken modül bir obje olarak tüm fonksiyonları/özellikleri içerecek şekilde export edilir. 
Bu yüzden named import kullanıp tek bir fonksiyonu import etsek bile modül bir obje olarak tümüyle belleğe alınır.
Bu sebeple cjs ömodüllerinde tree shaking yapılamaz ve build çıktısına tüm modül dahil edilir.
Ör: 

module.exports = {
  foo: () => {},
  bar: () => {},
};


Ama esm modülleri obje olarak değil fonksiyon/özellik bazlı export edildiğinden named import kullanarak import edersek sadece çağırdığımız fonksiyon/özellik build çıktısına dahil edilir ve diğerleri belleğe alınmaz. Bu sebeple esm modüllerinde tree shaking yapılabilir. Bellek ve performans açısından daha verimli olur.

 ✅ Bundler(Vite, Webpack) varsa: bar fonksiyonu çıktıya dahil edilmez, yani tree shaking yapılır.

 Ör: 

export function foo() {}
export function bar() {}
*/
const fs_1 = __importDefault(require("fs"));


/*****************************************************
 

.ts dosyası:

import fs from "fs";                           // default import gibi
import * as fsAll from "fs";                   // tüm modülü named olarak
import { readFile, writeFile } from "fs";      // named import

"esModuleInterop": true iken tsc çalıştırılırsa;

.js dosyası:

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};

// `import fs from "fs";`
var fs_1 = __importDefault(require("fs"));

// `import * as fsAll from "fs";`
var fsAll = require("fs");

// `import { readFile, writeFile } from "fs";`
var fs_2 = require("fs");
var readFile = fs_2.readFile;
var writeFile = fs_2.writeFile;


| TypeScript İfadesi              | JavaScript'e Çevirisi (CommonJS)                          | Açıklama                                 |
| ------------------------------- | --------------------------------------------------------- | ---------------------------------------- |
| `import fs from "fs"`           | `var fs_1 = __importDefault(require("fs"));`              | default gibi kullanılır (`fs_1.default`) |
| `import * as fsAll from "fs"`   | `var fsAll = require("fs");`                              | tüm modül alınır                         |
| `import { readFile } from "fs"` | `var fs_2 = require("fs"); var readFile = fs_2.readFile;` | named fonksiyon alınır                   |


*/

/*
fs modülü ts den transpile edilerek js dosyası haline getirildiğinde default ve named importların nasıl çevrildiğini gösteren örnek.
Bu örnek, TypeScript'in CommonJS modül sistemine nasıl çevrildiğini ve import ifadelerinin nasıl işlendiğini gösterir.

yani default importlar ve named importlar tsc transpile'ı sonrası oluşan js dosyasında aynı isimle import edilecekken numaralandırılmış sistem sayesinde default import ve named importlar birbirinden ayrıştırılır. 

import fs from "fs";  --------> 
var fs_1 = __importDefault(require("fs"));


import { readFile, writeFile } from "fs"; ------------> 
var fs_2 = require("fs");
var readFile = fs_2.readFile;
var writeFile = fs_2.writeFile;


*/
 
/*

import * as fs from "fs";

Bu demektir ki: “fs modülündeki tüm named export’ları fs nesnesi altında topla”
tsc bunu şöyle çevirir : const fs = require("fs");
Ve artık doğrudan şu şekilde kullanırsın: fs.readFile(...); Çünkü fs zaten bir nesne ve readFile gibi fonksiyonları var.


*/

/*
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};

Bu şu demektir:

this.__importDefault zaten daha önce tanımlanmışsa, onu kullan.
Yoksa aşağıdaki function(mod) { ... } tanımını yap.
Bu, tekrar tekrar fonksiyon tanımlamayı önlemek için bir ön kontrol.

Bu fonksiyon, dışarıdan bir modül (mod) alır ve onu işler.
mod: Gelen modül nesnesidir (örneğin require("fs"))
mod.__esModule: Bu özel bayrak, modülün ES Module olup olmadığını belirtir.
Eğer mod.__esModule varsa → mod'u aynen döndür ---->  Yani zaten default export içeriyorsa, olduğu gibi döndür. Sarmalamaya gerek yok.

return { default: mod }; -> Bu, CommonJS modüllerini sahte bir default export gibi gösterir.

*/

/*
✅ "use strict" Neleri Denetler?
1. Tanımsız değişken kullanımı (global değişken oluşturma engellenir)
x = 5; // ❌ ReferenceError: x is not defined
2. Aynı isimli parametre tanımlama yasak
function foo(a, a) {} // ❌ SyntaxError
3. Rezerve kelimeleri değişken adı olarak kullanamazsın
let private = 1; // ❌ SyntaxError: Unexpected strict mode reserved word


*/