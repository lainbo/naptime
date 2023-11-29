<template>
  <div
    class="main_wrapper select-none flex-c overflow-hidden"
    :class="currentTheme"
    :style="{ cursor: idle && isFullscreen ? 'none' : 'default' }"
    @click="changeFullScreen"
  >
    <div text="150px #555 dark:#f5f5f5">
      {{ dateStr }}
    </div>
    <section class="flex items-center space-x-70px">
      <div text="180px #555 dark:#f5f5f5">
        {{ currentTime }}
      </div>
      <div class="clock h-260px aspect-square flex-c rounded-full transition-all bg-cover">
        <transition name="fade-in-standard">
          <div v-show="currentTheme === 'light'" class="marker"></div>
        </transition>
        <div class="hour w-8em aspect-square" :style="{ transform: `rotateZ(${hAngle}deg)` }"></div>
        <div class="min w-12em aspect-square" :style="{ transform: `rotateZ(${mAngle}deg)` }"></div>
        <div class="sec w-13em aspect-square" :style="{ transform: `rotateZ(${sAngle}deg)` }"></div>
      </div>
    </section>
    <div ref="settingRef" class="setting_wrapper fixed right-0 bottom-0 translate-y-100%" @click.stop="() => {}">
      <a-time-picker v-model="localTime" :allow-clear="false" style="width: 200px" :popup-container="settingRef" />
    </div>
  </div>
</template>

<script setup>
import dayjs from 'dayjs'
const { isFullscreen, toggle } = useFullscreen()
const { idle } = useIdle(2 * 1000) // 闲置时间2s

const currentTheme = ref('')
const now = useNow()
const dateStr = ref('')
const currentTime = ref('')
const settingRef = ref()
const reg = /^(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d$/ // 校验时间格式的正则
const defaultTime = '13:30:00' // 默认更换主题时间
const localTime = useStorage('LOCALTIME', defaultTime) // 响应式LocalStorage
// 全屏切换
function changeFullScreen() {
  toggle()
}
// 监控时间，到点儿了自动切主题
watchEffect(() => {
  const getUpStr = `${useDateFormat(now, 'YYYY-MM-DD').value} ${localTime.value}`
  const isAfter = dayjs().isAfter(dayjs(getUpStr))
  currentTheme.value = isAfter ? 'light' : 'dark'
})

// 监控localStorage的里面值的合法性
watchEffect(() => {
  if (!reg.test(localTime.value)) {
    localTime.value = defaultTime
  }
})

// 时针角度
const hAngle = computed(() => {
  const hour = now.value.getHours()
  const min = now.value.getMinutes()
  const sec = now.value.getSeconds()
  return (hour % 12) * 30 + min * 0.5 + sec * (0.5 / 60)
})

// 分针角度
const mAngle = computed(() => {
  const min = now.value.getMinutes()
  const sec = now.value.getSeconds()
  return min * 6 + sec * 0.1
})

// 秒针角度
const sAngle = computed(() => {
  const sec = now.value.getSeconds()
  return sec * 6
})

function setText() {
  const date = useDateFormat(now, 'MM月DD日').value
  const formatter = new Intl.DateTimeFormat('zh-CN', { weekday: 'short' })
  const week = formatter.format(now.value)
  dateStr.value = `${date} · ${week}`
  currentTime.value = useDateFormat(now, 'HH:mm:ss').value
}

useRafFn(setText)
</script>

<style lang="scss" scoped>
.main_wrapper {
  &.dark {
    --main-bg-color: #1e1f26;
    --main-text-color: #ccc;
    --shadow-color: #0000004d;
    --shadow: 0 -15px 15px rgba(255, 255, 255, 0.05), inset 0 -15px 15px rgba(255, 255, 255, 0.05),
      0 15px 15px #0000004d, inset 0 15px 15px #0000004d;
  }
}
.main_wrapper {
  @apply h-full flex flex-col items-center transition-all;
  --main-bg-color: #e4ebf5;
  --main-text-color: #9baacf;
  --shadow-color: #c8d0e7;
  --shadow: 0.3rem 0.3rem 0.6rem #c8d0e7, -0.2rem -0.2rem 0.5rem #fff;
  background-color: var(--main-bg-color);
  text-shadow: -1px 4px 6px rgb(0 0 0 / 19%);
}

.clock {
  background-color: var(--main-bg-color);
  background-image: url('../assets/imgs/t01d98352ceb686ac6b.webp');
  background-position: center;
  border: 4px solid var(--main-bg-color);
  box-shadow: var(--shadow);
  .marker {
    width: 95%;
    height: 95%;
    border-radius: 50%;
    position: relative;
    box-shadow: inset 0.2rem 0.2rem 0.5rem #c8d0e7, inset -0.2rem -0.2rem 0.5rem #fff;
  }
}
.clock:before {
  content: '';
  @apply w-12px aspect-square absolute rounded-full z-1000 transition-all;
  background-color: var(--main-text-color);
  border: 2px solid var(--main-bg-color);
}

.hour,
.min,
.sec {
  @apply absolute rounded-full flex justify-center;
  &::before {
    content: '';
  }
}

.hour:before {
  @apply absolute h-50% w-6px rounded-6px;
  background-color: var(--main-text-color);
}

.min:before {
  @apply h-50% w-4px rounded-4px;
  background-color: var(--main-text-color);
}

.sec:before {
  @apply h-60% w-2px bg-[#6d5dfc] rounded-2px dark:bg-[#f00];
}
.setting_wrapper {
  @apply transition-all;
  &:hover {
    @apply transition-all translate-y-0;
  }
  &::before {
    transform: scale();
    content: '';
    @apply absolute transform-origin-rb scale-x-150 scale-y-200  w-full h-full bg-transparent;
  }
}
</style>
