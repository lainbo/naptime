import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetUno,
  transformerDirectives,
  transformerVariantGroup
} from 'unocss'

export default defineConfig({
  shortcuts: [{ 'flex-c': 'flex items-center justify-center' }, { 'grid-c': 'grid place-items-center' }],
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      warn: true
    })
  ],
  transformers: [transformerDirectives(), transformerVariantGroup()]
})
