
✅ 1. CommonJS ve ESM Arasındaki Fark

| Özellik        | CommonJS                     | ES Modules                               |
| -------------- | ---------------------------- | ---------------------------------------- |
| Dosya uzantısı | `.js` (varsayılan)           | `.mjs` veya `"type": "module"`           |
| İçe aktarma    | `const mod = require('...')` | `import mod from '...'`                  |
| Dışa aktarma   | `module.exports = ...`       | `export default ...` veya `export {...}` |
| Senkron        | ✅                            | ❌ (asenkron modül çözümü)                |


✅ 1: package.json içinde modül türünü belirtiyoruz (Bu, .js uzantılı dosyaların ESM olarak yorumlanmasını sağlar. )
{
  "type": "module"
}

✅ 2. tsconfig Yapılandırması Ayrıştırıldı
// tsconfig.esm.json
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "module": "ESNext",
    "outDir": "build-esm",
    "jsx": "react-jsx"
  },
}

✅ 3. Tüm import ve export Yapıları Dönüştürüldü
| CommonJS                       | ESM                          |
| ------------------------------ | ---------------------------- |
| `const mod = require('./mod')` | `import mod from './mod.js'` |
| `module.exports = something`   | `export default something`   |
| `exports.func = ...`           | `export function func() {}`  |

✅ 4. __dirname ve __filename Kendi Başına Tanımlandı
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


✅ 5. scripts Yapılandırması Güncellendi
"scripts": {
  "server:build:esm": "tsc -p tsconfig.esm.json",
  "start:esm": "node ./build-esm/backend/http-server.js"
}

✅ 6. Derleme ve Çalıştırma Testleri Yapıldı
npm run server:build:esm   # → ESM derlemesi (./build-esm)
npm run start:esm          # → ESM çıktısını çalıştırma
