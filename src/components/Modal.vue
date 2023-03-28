<template>
  <div class="modal__container">
    <a-modal v-model:visible="props.showModal" :title="modalTitle" @ok="handleOk" :closable="false">
      <a-form name="basic" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }" @finish="handleFinish"
        @finishFailed="handleFailed" :model="formState" ref="formRef">
        <a-form-item label="备注" name="course">
          <a-input v-model:value="formState.course" />
        </a-form-item>
        <a-form-item label="时间段" name="timeRange">
          <a-time-range-picker v-model:value="formState.timeRange" format="HH:mm" :disabledTime="getDisabledTime" />
        </a-form-item>
      </a-form>
      <template #footer>
        <a-button key="back" @click="handleCancel">Return</a-button>
        <a-button key="submit" type="primary" @click="handleOk">Submit</a-button>
      </template>
    </a-modal>
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount } from 'vue';
import { Form } from 'ant-design-vue';
import dayjs, { Dayjs } from 'dayjs';
import { defineProps, computed, ref, reactive, toRaw } from "vue"
import { EnumOperationType, operationMap, IFormState } from "../constants";
import { useStore } from '../stores'
import { storeToRefs } from 'pinia'
import { cloneDeep } from 'lodash-es'

const store = useStore()
const formRef = ref()

const props = defineProps({
  showModal: {
    type: Boolean,
  },
  operationType: {
    type: Number,
    required: true
  }
})

let formState = reactive({} as IFormState);

const emit = defineEmits(['closeModal'])
const modalTitle = computed(() => {
  return operationMap.get(props.operationType) + '时间段'
})

const getDisabledTime = () => {
  return {
    disabledHours: () => [0, 1, 2, 3, 4, 5, 6, 22, 23]
  }
}

const handleOk = (e: any) => {
  e.preventDefault();
  e.stopPropagation();
  formRef.value.validate().then(() => {
    store.addSchedule(cloneDeep(formState))
  }).then(() => {
    emit('closeModal')
    formRef.value.resetFields();
  })


}
const handleFinish = (values: any) => {
}
const handleFailed = (values: any, errorFields: any, outOfDate: any) => {
}
const handleCancel = () => {
  emit('closeModal')
}


</script>

<style lang="scss" scoped></style>
