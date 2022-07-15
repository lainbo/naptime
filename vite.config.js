import { defineConfig } from 'vite'
import { resolve } from 'path'
import vue from '@vitejs/plugin-vue'
import viteCompression from 'vite-plugin-compression'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import Unocss from 'unocss/vite'
import { ArcoResolver } from 'unplugin-vue-components/resolvers'

export default defineConfig({
  base: './',
  plugins: [
    vue(),
    AutoImport({
      eslintrc: {
        enabled: true,
        filepath: './.eslintrc-auto-import.json',
        globalsPropValue: true
      },
      imports: ['vue', '@vueuse/core']
    }),
    Unocss(),
    Components({
      resolvers: [ArcoResolver()]
    }),
    viteCompression()
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      '@assets': resolve(__dirname, './src/assets'),
      '@comp': resolve(__dirname, './src/components'),
      '@utils': resolve(__dirname, './src/utils'),
      '@img': resolve(__dirname, './src/assets/img'),
      '@styles': resolve(__dirname, './src/styles'),
      '@views': resolve(__dirname, './src/views')
    }
  }
})
