<template>
  <a-list class="list__container" item-layout="horizontal" :data-source="selectedSchedule">
    <template #renderItem="{ item }">
      <a-list-item>
        <template #actions>
          <a class="list__edit" @click="doEdit(item)">更改</a>
          <a class="list__delete" @click="doDelete(item)">删除</a>
        </template>
        <span>{{ getTimeRangeStr(item.timeRange) }}</span>
        <span>{{ item.course }}</span>
      </a-list-item>
    </template>
  </a-list>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useStore } from '../stores'
import { storeToRefs } from 'pinia';
import { Dayjs } from 'dayjs';
import { IFormState } from '../constants';

const store = useStore()
const { selectedSchedule } = storeToRefs(store);

const emit = defineEmits(['handleEdit'])


const doEdit = (item: IFormState) => {
  console.log(item)
  emit('handleEdit')
}
const doDelete = (item: IFormState) => {
}

const getTimeRangeStr = (timeRange: [Dayjs, Dayjs]) => {
  const [stime, etime] = timeRange;
  return stime.format('hh:mm') + '-' + etime.format('hh:mm')
}

</script>
<style scoped>
.list__delete {
  color: red;
}
</style>
