import { Dayjs } from 'dayjs'
export const getSelectedDMY = (data: Dayjs): Record<string, number> => {
  const date = data.date()
  const month = data.month()
  const year = data.year()
  return { date, month, year }
}
/**
 * 
 * @param selectedDate 被选中的日期
 * @param time 选择的时间
 * @returns 被选中的时间
 */
export const getSeletedTime = (selectedDate: Dayjs, time: Dayjs): Dayjs => {
  const { date, month, year } = getSelectedDMY(selectedDate);
  return time.date(date).month(month).year(year)
}