<template>
  <div class="container_cus bg-base" :class="theme">
    <div class="date-box">{{ dateStr }}</div>
    <div class="bottom_wrapper">
      <div class="time-box">{{ timeStr }}</div>
      <div class="clock">
        <div class="clock-face">
          <div class="hand hour-hand" :style="{ transform: `rotate(${hourDeg}deg)` }"></div>
          <div
            class="hand min-hand"
            :style="{
              transform: `rotate(${minDeg}deg)`,
              transition: minTransition,
            }"
          ></div>
          <div
            class="hand second-hand"
            :style="{
              transform: `rotate(${secondDeg}deg)`,
              transition: secTransition,
            }"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import dayjs from 'dayjs'
import { useStorage } from '@vueuse/core'
import { ref, onMounted } from 'vue'
const dateStr = ref('') // 日期的文字
const timeStr = ref('') // 时间的文字
const secondDeg = ref(0) // 秒针转动角度
const minDeg = ref(0) // 分针转动角度
const hourDeg = ref(0) // 时针转动角度
const secTransition = ref('') // 秒针transition值
const minTransition = ref('') // 分针transition值
const theme = ref('') // 主题
const timer = ref(null)
const weekMap = new Map([
  [0, '周日'],
  [1, '周一'],
  [2, '周二'],
  [3, '周三'],
  [4, '周四'],
  [5, '周五'],
  [6, '周六'],
])

// 计算文字
const setText = () => {
  dateStr.value = `${dayjs().format('MM月DD日')} · ${weekMap.get(dayjs().day())}`
  timeStr.value = dayjs().format('HH:mm:ss')
}
const reg = /^(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d$/
// 计算主题
const calcTheme = () => {
  // 校验localStorage中的时间是否正确，不正确则设为默认时间
  const defaultTime = '13:30:00'
  const time = localStorage.getItem('LOCALTIME')
  !reg.test(time) && localStorage.setItem('LOCALTIME', defaultTime)
  const getUpStr = dayjs().format('YYYY-MM-DD') + time
  const isAfter = dayjs().isAfter(dayjs(getUpStr))
  theme.value = isAfter ? 'light' : 'dark'
}

// 计算指针转动角度
const setDate = () => {
  const second = dayjs().second()
  const min = dayjs().minute()
  const hour = dayjs().hour()
  secondDeg.value = (second / 60) * 360
  minDeg.value = (min * 60 + second) * 0.1
  hourDeg.value = (hour / 12) * 360 + (min / 12 / 60) * 360

  // 解决指针跳顿问题，在发生跳顿的角度值处，将 CSS 的 `transition` 属性去掉
  secTransition.value = secondDeg.value === 0 ? 'all 0s' : 'all 0.05s cubic-bezier(0.9, 0.54, 0.26, 1.68)'
  minTransition.value = minDeg.value === 0 ? 'all 0s' : 'all 0.1s cubic-bezier(0.9, 0.54, 0.26, 1.68)'
}

// 页面数据初始化
const renderTime = () => {
  setText()
  setDate()
  calcTheme()
}
onMounted(() => {
  // 检测是否有LocalStorage，没有则设置
  const localTime = localStorage.getItem('LOCALTIME')
  if (!localTime || reg.test(localTime)) {
    useStorage('LOCALTIME', '13:30:00')
  }
  renderTime()
  timer.value = setInterval(() => renderTime(), 1000)
})
</script>

<style lang="scss" scoped>
@property --houdini-colorA {
  syntax: '<color>';
  inherits: false;
  initial-value: #323232;
}

@property --houdini-colorB {
  syntax: '<color>';
  inherits: false;
  initial-value: #3f3f3f;
}

@property --houdini-colorC {
  syntax: '<color>';
  inherits: false;
  initial-value: #1c1c1c;
}
.container_cus {
  text-shadow: -1px 4px 6px #00000030;
  @apply w-screen h-screen flex items-center justify-center flex-col text-white;
}

.bg-base {
  background-image: linear-gradient(to top, var(--houdini-colorA) 0%, var(--houdini-colorB) 100%);
  transition: 1s --houdini-colorA, 2s --houdini-colorB, 2.5s --houdini-colorC;
}

.dark {
  --houdini-colorA: #323232;
  --houdini-colorB: #3f3f3f;
  --houdini-colorC: #1c1c1c;

  background: linear-gradient(
      to bottom,
      var(--houdini-colorA) 0%,
      var(--houdini-colorB) 40%,
      var(--houdini-colorC) 150%
    ),
    linear-gradient(to top, rgba(255, 255, 255, 0.4) 0%, rgba(0, 0, 0, 0.25) 200%);
  background-blend-mode: multiply;
}

.light {
  --houdini-colorA: #6991c7;
  --houdini-colorB: #a3bded;
  --houdini-colorC: #def3f8;
  background-image: linear-gradient(
    45deg,
    var(--houdini-colorA) 0%,
    var(--houdini-colorB) 50%,
    var(--houdini-colorC) 100%
  );
}

.date-box,
.time-box {
  transition: all 0.2s ease;
  @apply text-140px select-none leading-normal text-center;
}

.time-box {
  @apply text-180px mr-70px leading-normal;
}

/* 时钟部分 */
.clock {
  @apply w-240px h-240px my-0 mx-auto relative rounded-full;
  border: 8px solid #fff;
  transform: rotate(90deg);
  box-shadow: 0 1px 8px #2222224d, inset 0 1px 8px #2222224d;
}

.clock-face {
  @apply relative w-full h-full;
}

.hand {
  @apply w-1/2 bg-white absolute top-1/2 right-1/2;
  transform-origin: 100% 50%;
  transition-timing-function: cubic-bezier(0.9, 0.54, 0.26, 1.68);
  box-shadow: 0 1px 8px #2222224d;
}

.clock-face:after {
  @apply w-12px h-12px top-1/2 left-1/2 absolute block bg-white z-4 rounded-full;
  content: '';
  transform: translate(-50%, -50%);
  box-shadow: 0 0 10px -3px #a2a2a2;
}

.hour-hand {
  @apply w-0 h-0 absolute bg-white z-1 top-1/2 left-1/2;
  margin: -4px 0 -4px -25%;
  padding: 4px 0 4px 25%;
  transform-origin: 100% 50%;
  border-radius: 4px 0 0 4px;
}

.min-hand {
  @apply z-2 w-5/12 h-5px -mt-2.5px;
  border-radius: 4px 0 0 4px;
  transition: all 0.1s cubic-bezier(0.9, 0.54, 0.26, 1.68);
}

.second-hand {
  @apply h-2px w-2/5 -mt-1px z-3 bg-white;
  transition: all 0.05s cubic-bezier(0.9, 0.54, 0.26, 1.68);
}

.bottom_wrapper {
  @apply flex items-center;
}
</style>
