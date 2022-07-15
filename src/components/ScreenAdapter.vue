<script setup>
import { debounce } from 'lodash-es'
const props = defineProps({
  width: {
    type: Number,
    default: 1920
  },
  height: {
    type: Number,
    default: 1080
  }
})

const style = reactive({
  width: `${props.width}px`,
  height: `${props.height}px`,
  transform: 'scale(1) translate(-50%, -50%)'
})

// 获取放大缩小比例
function getScale() {
  const w = window.innerWidth / props.width
  const h = window.innerHeight / props.height
  return [w, h]
}
// 设置比例
function setScale() {
  const [sX, sY] = getScale()
  style.transform = `scale(${sX},${sY}) translate(-50%, -50%)`
}
onMounted(() => {
  setScale()
})
window.addEventListener('resize', debounce(setScale, 100))

onBeforeUnmount(() => {
  window.removeEventListener('resize', setScale)
})
</script>

<template>
  <div class="screen-adapter" :style="style">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.screen-adapter {
  transform-origin: 0 0;
  position: absolute;
  left: 50%;
  top: 50%;
  transition: 0.2s all ease;
}
</style>
