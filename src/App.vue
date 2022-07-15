<template>
  <div class="h-screen" :style="{ cursor: idle && isFullscreen ? 'none' : 'default' }" @click="changeFullScreen">
    <MainView />
  </div>
</template>

<script setup>
const { isFullscreen, toggle } = useFullscreen()
const { idle } = useIdle(2 * 1000) // 闲置时间2s
// 全屏切换
function changeFullScreen() {
  toggle()
}
</script>

<style lang="scss" scoped></style>
