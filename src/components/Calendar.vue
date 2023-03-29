<template>
  <a-calendar class="calendar__container" v-model:value="value" @select="handleSelect">
    <template #dateCellRender="{ current }">
      <ul class="events">
        <li v-for="(item, index) in getListData(current)" :key="index">
          <template v-if="item.range">
            <a-badge :status="item.type" :text="item.content" />
            <span> {{ item.range }}</span>
          </template>
        </li>
      </ul>
    </template>
  </a-calendar>
</template>
<script setup lang="ts">
import { ref, onMounted, unref, watch } from 'vue';
import dayjs, { Dayjs } from 'dayjs';
import 'dayjs/locale/zh-cn';
import { useStore } from '../stores';
import { storeToRefs } from 'pinia'
import { cloneDeep } from 'lodash-es'
import { IFormState } from '../constants';

dayjs.locale('zh-cn');
const store = useStore()
const { schedule } = storeToRefs(store)


const value = ref();
const handleSelect = (date: Dayjs) => {
  store.getSelectedDate(date)
}
const getListData = (value: Dayjs) => {
  const sch = cloneDeep(schedule.value).sort((a: IFormState, b: IFormState) => {
    const astime = a.timeRange[0].hour()
    const bstime = b.timeRange[0].hour()
    return astime - bstime
  })

  let listData;
  listData = sch?.map(item => {
    let [stime, etime] = item.timeRange
    const range = stime.format('HH:mm') +
      '-' + etime.format('HH:mm')
    if (stime.isSame(value, 'day')) {
      return {
        type: 'success',
        content: item.course,
        range
      }
    }
    return {}

  })

  return listData || [];
};

</script>
<style lang="scss">
.calendar__container {
  border: 1px solid #eee;
  border-bottom: none;
  box-shadow: -10px -10px 10px #eee;
  width: 70%;

  .ant-radio-group {
    // display: none;
    visibility: hidden;
  }

  .ant-picker-content {
    th {
      color: #1990ff;
      font-weight: bolder;
    }
  }



}

.events {
  list-style: none;
  margin: 0;
  padding: 0;
}

.events .ant-badge-status {
  overflow: hidden;
  white-space: nowrap;
  width: 100%;
  text-overflow: ellipsis;
  font-size: 12px;
}

.notes-month {
  text-align: center;
  font-size: 28px;
}

.notes-month section {
  font-size: 28px;
}
</style>