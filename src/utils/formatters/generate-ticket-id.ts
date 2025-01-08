import { nanoid } from 'nanoid'

export const generateTicketId = () => {
  const year = new Date().getFullYear()
  const uniqueId = nanoid(10)
  return `${year}-${uniqueId}`
}
