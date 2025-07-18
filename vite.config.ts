import { defineConfig, type UserConfigExport} from 'vite'
import react from '@vitejs/plugin-react'

const config: UserConfigExport = defineConfig({
  plugins: [react()],
})

export default config

