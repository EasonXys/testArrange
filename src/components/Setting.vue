<template>
  <div class="setting__container">
    <div>
      <router-link to="/">跳转展示页</router-link>

      <p class="setting__title"><span>{{ title }}</span> 复习安排</p>
      <CourseList />
    </div>
    <a-button type="primary" style="margin-top: 16px" @click="store.showModal(EnumOperationType.Create)">添加一项</a-button>
    <Modal />
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue"
import dayjs, { Dayjs } from 'dayjs'
import { defineProps, computed } from "vue"
import Modal from './Modal.vue'
import CourseList from './CourseList.vue'
import { storeToRefs } from 'pinia'
import { useStore } from '../stores'
import { EnumOperationType } from "../constants"
import { TransitionPresets, useTransition } from '@vueuse/core'

const store = useStore()
const { selectedDate } = storeToRefs(store)
const title = computed(() => {
  return (selectedDate.value?.format('YYYY-MM-DD') || '')
})
</script>

<style lang="scss" scoped>
.setting__container {
  height: 100vh;
  width: 30%;
}

.setting__title {
  margin: 20px;
  font-size: 22px;

  span {
    font-weight: bold;
  }
}
</style>
