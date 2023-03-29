<template>
  <div class="setting__container">
    <a-card :title="title">
      <CourseList />
    </a-card>
    <a-button type="primary" style="margin-top: 16px" @click="store.showModal(EnumOperationType.Create)">添加一项</a-button>
    <Modal />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import dayjs, { Dayjs } from 'dayjs'
import { defineProps, computed } from "vue"
import Modal from './Modal.vue'
import CourseList from './CourseList.vue'
import { storeToRefs } from 'pinia'
import { useStore } from '../stores'
import { EnumOperationType } from "../constants"

const store = useStore()
const { selectedDate } = storeToRefs(store)


const title = computed(() => {
  return (selectedDate.value?.format('YYYY-MM-DD') || '') + '复习安排'
})
</script>

<style lang="scss" scoped>
.setting__container {
  height: 100vh;
  width: 30%;
}
</style>
