import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import WindiCSS from 'vite-plugin-windicss'
import viteCompression from 'vite-plugin-compression'
export default defineConfig({
  base: '/naptime_vite/',
  plugins: [WindiCSS(), vue(), viteCompression()],
})
