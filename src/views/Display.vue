<template>
  <div class="display__container">
    <router-link to="/edit">跳转编辑页</router-link>
    <Clock />
    <div class="display__timeline">
      <a-timeline mode="left">
        <div v-for="(item) in todaySchedule">
          <a-timeline-item>
            <div class="display__timeline--item">
              <p :class="[getIsDot(item) ? 'active__dot' : 'inactive__dot', 'display__timeline--title']">{{
                getSingleScheduleStr(item) }}</p>
              <div v-if="getIsDot(item)" class="display__timeline--progress">
                <a-progress type="circle" :percent="percent" :width="30" />
              </div>
            </div>
          </a-timeline-item>
        </div>
      </a-timeline>
    </div>
  </div>
</template>


<script setup lang="ts">
import { computed, ref, onMounted, onBeforeUnmount } from 'vue'
import dayjs, { Dayjs } from 'dayjs';
import Clock from '../components/Clock.vue'
import { useStore } from '../stores'
import { storeToRefs } from 'pinia';
import { IFormState } from '../constants';
import isBetween from 'dayjs/plugin/isBetween'
const now = ref(dayjs())
const timer1 = ref<number>(0)
dayjs.extend(isBetween)

const store = useStore()
const { schedule } = storeToRefs(store);
const todaySchedule = computed(() => schedule.value.filter(item => item.timeRange[0].isSame(dayjs(), 'day')))

const percent = computed(() => {
  const currentSchedule = todaySchedule.value
    .find(item => now.value.isBetween(item.timeRange[0], item.timeRange[1], 'minute', '[]'))
  if (!currentSchedule) return
  const [stime, etime] = currentSchedule.timeRange
  const res = Math.floor((now.value.unix() - stime.unix()) / (etime.unix() - stime.unix()) * 100)
  console.log(res)
  return res
})
const getSingleScheduleStr = (item: IFormState) => {
  return item.timeRange[0].format('HH:mm') + '-'
    + item.timeRange[1].format('HH:mm') + '\n'
    + item.course
}
const getIsDot = (item: IFormState) => {
  return now.value.isBetween(item.timeRange[0], item.timeRange[1], 'minute', '[]')
}
onMounted(() => {
  timer1.value = window.setInterval(() => {
    now.value = dayjs()
    console.log(now.value.format())
  }, 60000)
})
onBeforeUnmount(() => {
  clearInterval(timer1.value)
})

</script>

<style lang="scss" scoped>
.display__container {
  margin: 0;
  padding: 0;
  width: 100vw;
  height: 100vh;
  // background-color: #bfbfbf;
  display: flex;

}

.display__timeline {
  margin: auto;

  &--item {
    position: relative;

  }

  &--progress {
    position: absolute;
    left: -36px;
    top: 0;
    background-color: aliceblue;
    border-radius: 50%;
  }

  &--title {
    width: 200px;
    white-space: pre-wrap;
  }

  .active__dot {
    color: red;
  }

  .inactive__dot {
    color: green;
  }
}
</style>
