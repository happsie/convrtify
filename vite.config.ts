import { build, defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/convrtify/',
  plugins: [react()],
  build: {
    outDir: 'build'
  }
})
