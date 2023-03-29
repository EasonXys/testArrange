<template>
  <div class="modal__container">
    <a-modal v-model:visible="isModalShow" :title="modalTitle" @ok="handleOk" :closable="false">
      <a-form name="basic" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }" :model="formState" ref="formRef"
        :rules="rules">
        <a-form-item label="备注" name="course" required message="备注必填">
          <a-input v-model:value="formState.course" />
        </a-form-item>
        <a-form-item label="时间段" name="timeRange" required message="时间段必选">
          <a-time-range-picker v-model:value="formState.timeRange" format="HH:mm" :minuteStep="5" />
          <!-- :disabledTime="getDisabledTime" -->
        </a-form-item>
      </a-form>
      <template #footer>
        <a-button key="back" @click="handleCancel">取消</a-button>
        <a-button key="submit" type="primary" @click="handleOk">提交</a-button>
      </template>
    </a-modal>
  </div>
</template>

<script setup lang="ts">
import { RuleObject, ValidateErrorEntity } from 'ant-design-vue/es/form/interface';
import { Form, message, Modal } from 'ant-design-vue';
import dayjs, { Dayjs } from 'dayjs';
import { defineProps, computed, ref, reactive, watch } from "vue"
import { EnumOperationType, operationMap, IFormState } from "../constants";
import { useStore } from '../stores'
import { storeToRefs } from 'pinia'
import { cloneDeep } from 'lodash-es'
import { getSeletedTime } from '../utils'

const store = useStore()
const formRef = ref()
const { modalStatus, isModalShow, needChangeSchedule, selectedDate, schedule } = storeToRefs(store)

let formState = reactive({} as IFormState);

const checkCross = (rule: RuleObject, value: [Dayjs, Dayjs]) => {
  if (!value) return Promise.reject('请完整输入时间范围')
  const inputStime = getSeletedTime(selectedDate.value, value[0])?.unix()
  const inputEtime = getSeletedTime(selectedDate.value, value[1])?.unix()
  let res = true
  let sch = selectedDateAllSchedule.value
  sch?.forEach(item => {
    const stime = item.timeRange[0].unix()
    const etime = item.timeRange[1].unix()
    if (needChangeSchedule.value?.id && item?.id === needChangeSchedule.value?.id) return true
    if (inputStime >= etime || inputEtime <= stime) {

      res = true
    } else {
      res = false
      return
    }

  })
  return res ? Promise.resolve() : Promise.reject('时间范围有重叠，请检查输入')

}
const rules = {
  course: [{ required: true, trigger: 'change', message: '备注为必填项' }],
  timeRange: [{ required: true, validator: checkCross, trigger: 'change', message: '时间范围为必填项且不能重叠' }],
};

const modalTitle = computed(() => {
  return operationMap.get(modalStatus.value) + '时间段'
})

const selectedDateAllSchedule = computed(() => {
  return schedule.value.filter(item => item.timeRange[0].isSame(selectedDate.value, 'day'))
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
    const state = cloneDeep(formState)
    if (modalStatus.value === EnumOperationType.Create) {
      store.addSchedule(state)
    } else {
      return new Promise((resolve) => {
        Modal.confirm({
          title: () => '确认更改吗',
          onOk() {
            store.editSchedule(state)
            resolve(true)
          },
          onCancel() {
            resolve(true)
          },
        });
      })
    }
  }).then(() => {
    store.closeModal()
    formRef.value.resetFields();
  }).catch((error: Error) => {
    console.log(error)
    message.error('请检查输入')
  })


}
const handleCancel = () => {
  store.closeModal()
  formRef.value.resetFields();
}
watch(() => isModalShow.value, (newVal) => {
  if (modalStatus.value === EnumOperationType.Edit && needChangeSchedule && newVal) {
    formState = reactive(cloneDeep(needChangeSchedule.value))
  }
})


</script>

<style lang="scss" scoped></style>
