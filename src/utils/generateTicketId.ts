import { nanoid } from 'nanoid'

export const generateTicketId = () => {
  const day = new Date().getDate().toString().padStart(2, '0')
  const fullYear = new Date().getFullYear()
  const year = fullYear.toString().slice(-2)
  const uniqueId = nanoid(10)
  return `${year}${day}-RKW-${uniqueId}`
}
