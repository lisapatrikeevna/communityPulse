

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

import * as path from 'path'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,  // Убедитесь, что этот порт свободен
  },
  resolve: {
    alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }],
  },
})
