import { Dayjs } from 'dayjs'
export const getSeletedDMY = (data: Dayjs): Record<string, number> => {
  const date = data.date()
  const month = data.month()
  const year = data.year()
  return { date, month, year }

}