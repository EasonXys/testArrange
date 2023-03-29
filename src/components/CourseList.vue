<template>
  <a-list class="list__container" item-layout="horizontal" :data-source="selectedSchedule">
    <template #renderItem="{ item }">
      <a-list-item>
        <template #actions>
          <a class="list__edit" @click="handleEdit(item)">更改</a>
          <a class="list__delete" @click="handleDelete(item)">删除</a>
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
import { EnumOperationType, IFormState } from '../constants';
import { Modal } from 'ant-design-vue';

const store = useStore()
const { selectedSchedule } = storeToRefs(store);


const getTimeRangeStr = (timeRange: [Dayjs, Dayjs]) => {
  const [stime, etime] = timeRange;
  return stime.format('HH:mm') + '-' + etime.format('HH:mm')
}
const handleEdit = (item: IFormState) => {
  store.showModal(EnumOperationType.Edit)
  store.getNeedChangeSchedule(item)

}
const handleDelete = (item: IFormState) => {
  Modal.confirm({
    title: () => '确认删除吗',
    onOk() {
      console.log('ok')
      store.deleteSchedule(item)
    },
    onCancel() {
    },
  });
}


</script>
<style scoped>
.list__delete {
  color: red;
}
</style>
