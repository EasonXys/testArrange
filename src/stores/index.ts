import { defineStore } from 'pinia'
import { IFormState, EnumOperationType } from '../constants'
import { getSeletedDMY } from '../utils'
import dayjs, { Dayjs } from 'dayjs'
import { useStorage } from '@vueuse/core'
import { nanoid } from 'nanoid'

interface IState {
  schedule: IFormState[],
  selectedDate: Dayjs,
  needChangeSchedule: IFormState,
  isModalShow: boolean,
  modalStatus: EnumOperationType
}
interface IScheduleStore {
  id?: string,
  course: string,
  timeRange: [string, string]
}

const scheduleStore = useStorage('schedule', [] as IScheduleStore[])

const formatStr2Schedule = (val: IScheduleStore[]): IFormState[] => {
  return val?.map(v => {
    return {
      ...v,
      timeRange: [
        dayjs(v.timeRange[0]),
        dayjs(v.timeRange[1])
      ]
    }
  })
}
const formatSchedule2Str = (val: IFormState[]): IScheduleStore[] => {
  return val?.map(v => {
    return {
      ...v,
      timeRange: [
        v.timeRange[0].toJSON(),
        v.timeRange[1].toJSON()
      ]
    }
  })
}

export const useStore = defineStore('arrange', {
  // other options...
  state: (): IState => {
    return {
      schedule: formatStr2Schedule(scheduleStore.value) || [],
      selectedDate: dayjs(),
      needChangeSchedule: null as unknown as IFormState,
      isModalShow: false,
      modalStatus: EnumOperationType.None
    }
  },
  getters: {
    selectedSchedule: (state) => state.schedule
      .filter(item => item.timeRange[0].isSame(state.selectedDate, 'day'))
      .sort((a, b) => {
        const astime = a.timeRange[0]
        const bstime = b.timeRange[0]
        return astime.hour() - bstime.hour()
      })
  },
  actions: {
    closeModal() {
      this.isModalShow = false;
      this.modalStatus = EnumOperationType.None;
      this.needChangeSchedule = null as unknown as IFormState
    },
    showModal(status: EnumOperationType) {
      this.isModalShow = true;
      this.modalStatus = status;
    },
    getNeedChangeSchedule(data: IFormState) {
      this.needChangeSchedule = data
    },
    getSelectedDate(data: Dayjs) {
      this.selectedDate = data
    },
    addSchedule(data: IFormState) {
      const { timeRange } = data

      const stime = timeRange[0]
      const etime = timeRange[1]

      const { date, month, year } = getSeletedDMY(this.selectedDate)
      let stime_new = stime.date(date).month(month).year(year)
      let etime_new = etime.date(date).month(month).year(year)
      data.timeRange = [stime_new, etime_new]
      data.id = nanoid()
      this.schedule = [...this.schedule, data]
      console.log('==========================')
      if (!this.schedule.length) return
      scheduleStore.value = formatSchedule2Str(this.schedule)
      this.schedule?.map(item => {
        console.log(item.course + " " + item.timeRange[0]?.format() + ":" + item.timeRange[1]?.format())
      })
    },
    editSchedule(data: IFormState) {
      const { id } = data;
      console.log(data)
      const schedule = this.schedule
      this.schedule = schedule.map((item) => {
        if (id === item.id) {
          return data
        }
        return item
      })
      scheduleStore.value = formatSchedule2Str(this.schedule)
      this.schedule?.map(item => {
        console.log(item.course + " " + item.timeRange[0]?.format() + ":" + item.timeRange[1]?.format())
      })

    },
    deleteSchedule(data: IFormState) {
      const { id } = data
      console.log(data)
      const schedule = this.schedule
      const idx = schedule.findIndex(s => s.id === id)
      console.log(idx)
      schedule.splice(idx, 1)
      this.schedule = schedule
      scheduleStore.value = formatSchedule2Str(this.schedule)

    },

  }
})