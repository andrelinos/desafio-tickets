import {
  differenceInHours,
  differenceInMinutes,
  formatDistanceToNow,
} from 'date-fns'
import { ptBR } from 'date-fns/locale'

export function getDifferenceTimeFromDate(date: string | undefined) {
  if (date) {
    const nowDate = new Date()

    try {
      const differenceMinutes = differenceInMinutes(nowDate, date)
      const diferenceHours = differenceInHours(nowDate, date)

      if (differenceMinutes < 60) {
        return formatDistanceToNow(date, {
          locale: ptBR,
          addSuffix: false,
        })
      }
      if (diferenceHours < 24) {
        return `${diferenceHours} hora${diferenceHours === 1 ? '' : 's'}`
      }
      return `${formatDistanceToNow(date, { locale: ptBR, addSuffix: false })}`
    } catch {
      return ''
    }
  }
}
