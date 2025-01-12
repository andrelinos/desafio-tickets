import type { TicketProps } from '@/_types/ticket'
import { handleTicket } from '@/services'

interface MenuDropdownProps {
  ticket: TicketProps
}

export async function updateTicketStatus({ ticket }: MenuDropdownProps) {
  if (!ticket) {
    return
  }

  return handleTicket({ ticket, method: 'PUT' })
}
