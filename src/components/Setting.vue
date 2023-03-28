<template>
  <div class="setting__container">
    <a-card :title="title">
      <CourseList @handleEdit="handleEdit" />
    </a-card>
    <a-button type="primary" style="margin-top: 16px" @click="handleAdd">添加一项</a-button>
    <Modal :showModal="showModal" :operationType="operationType" @closeModal="closeModal" />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import dayjs, { Dayjs } from 'dayjs'
import { defineProps, computed } from "vue"
import Modal from './Modal.vue'
import CourseList from './CourseList.vue'
import { EnumOperationType } from '../constants'
import { storeToRefs } from 'pinia'
import { useStore } from '../stores'

const store = useStore()
const { selectedDate } = storeToRefs(store)

const showModal = ref(false)
const operationType = ref(EnumOperationType.Create)
// const operationType = ref(null as unknown as EnumOperationType)

const title = computed(() => {
  return (selectedDate.value?.format('YYYY-MM-DD') || '') + '复习安排'
})
const handleAdd = () => {
  showModal.value = !showModal.value
  operationType.value = EnumOperationType.Create
}
const handleEdit = () => {
  showModal.value = !showModal.value
  operationType.value = EnumOperationType.Edit

}

const closeModal = () => {
  showModal.value = false
}
</script>

<style lang="scss" scoped>
.setting__container {
  height: 100vh;
  width: 30%;
}
</style>
