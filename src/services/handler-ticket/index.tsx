import type { TicketProps } from '@/_types/ticket'
import { api } from '@/services/api'
import { revalidateTag } from '@/utils/revalidate'
import { toast } from 'sonner'

interface Props {
  ticket: TicketProps
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE'
}

export async function handleTicket({ ticket, method = 'GET' }: Props) {
  try {
    await api('/api/tickets', {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(ticket),
      next: {
        tags: ['tickets'],
      },
    })

    await revalidateTag('tickets')

    const successMessage = getSuccessMessage(method)

    toast.success(successMessage)
  } catch (err) {
    toast.error('Ops! Erro ao realizar a operação.')
  }
}

function getSuccessMessage(method: string): string {
  switch (method) {
    case 'POST':
      return 'Ticket criado com sucesso!'
    case 'PUT':
      return 'Ticket atualizado com sucesso!'
    case 'DELETE':
      return 'Ticket excluído com sucesso!'
    default:
      return 'Operação realizada com sucesso!'
  }
}
