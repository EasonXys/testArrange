import { Dayjs } from 'dayjs'
export enum EnumOperationType {
  Create = 0,
  Edit,
  Delete
}

export const operationMap = new Map([
  [EnumOperationType.Create, '新建'],
  [EnumOperationType.Edit, '编辑'],
  [EnumOperationType.Delete, '删除'],
])

export interface IFormState {
  id?: string,
  course: string,
  timeRange: [Dayjs, Dayjs]
}