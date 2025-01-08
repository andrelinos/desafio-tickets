import type { TicketStatusProps } from '@/_types/ticket'

export function translateStatus(
  status: TicketStatusProps | undefined
): JSX.Element | string {
  if (!status) {
    return 'Status Desconhecido'
  }

  const statusMap: { [key in string]: string } = {
    all: 'Todos',
    open: 'Aberto',
    closed: 'Concluído',
    'in-progress': 'Em Progresso',
  }

  return statusMap[status]
}
