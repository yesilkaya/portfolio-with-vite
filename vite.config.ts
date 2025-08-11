/*import { defineConfig, type UserConfigExport} from 'vite'
import react from '@vitejs/plugin-react'

const config: UserConfigExport = defineConfig({
  plugins: [react()],
})

export default config
*/


import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// ESM'de __dirname üretme
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [react()],
  server: {
    https: {
      key: fs.readFileSync(path.resolve(__dirname, 'certs/mykey.key')),
      cert: fs.readFileSync(path.resolve(__dirname, 'certs/mycert.crt')),
    },
    host: 'localhost',
    port: 5173
  }
});

