import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.vue'],
    alias: {
      '@': '/src'
    }
  },
  server: {
    proxy: {
      '/max': {
        target: 'http://192.168.31.95:8089',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/max/, '')
      }
    }
  }
})
