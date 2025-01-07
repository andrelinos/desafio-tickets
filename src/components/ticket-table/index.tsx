'use client'

import { useRef, useState } from 'react'

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import type { TicketProps } from '@/_types/ticket'
import { SheetTicketInfo } from '@/components/sheetl-ticket-info'
import { TableDropdownMenu } from '@/components/table-dropdown-menu'
import { getLocaleDateInBrazil } from '@/utils/formatters/get-locale-date'
import { translateStatus } from '@/utils/formatters/translate-status'

interface Props {
  data: TicketProps[]
}

export function TicketTablet({ data }: Props) {
  const filterRef = useRef<HTMLSelectElement | null>(null)
  const [tickets, setTickets] = useState<TicketProps[] | null>(data)
  const [ticketSelected, setTicketSelected] = useState<
    TicketProps | undefined
  >()
  const [showSheet, setShowSheet] = useState(false)

  function onClose() {
    setShowSheet(false)
    setTicketSelected(undefined)
  }

  const handleFilterTickets = () => {
    {
      const selectedFilter = filterRef?.current?.value
      const filteredTickets = data?.filter(
        ticket => ticket.status === selectedFilter || selectedFilter === 'all'
      )
      if (filteredTickets?.length) {
        setTickets(filteredTickets)
      }
    }
  }

  function handleOpenTicket(ticket: TicketProps) {
    setTicketSelected(ticket)
    setShowSheet(true)
  }

  return (
    <>
      <div className="flex h-screen w-full max-w-screen flex-col gap-4 overflow-hidden">
        {data?.length ? (
          <>
            <div className="flex w-full items-center justify-end gap-2 px-4">
              <label htmlFor="">Filtrar por Status: </label>
              <select
                className="p-2"
                ref={filterRef}
                onChange={handleFilterTickets}
              >
                <option value="all">Todos</option>
                <option value="open">Aberto</option>
                <option value="in-progress">Em Progresso</option>
                <option value="closed">Concluído</option>
              </select>
            </div>

            <div className="flex h-full w-full max-w-full justify-end overflow-x-auto px-4">
              <Table className="w-full min-w-[800px]">
                <TableCaption>Sua lista de tickets.</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[156px]">Id do Ticket</TableHead>
                    <TableHead className="min-w-[400px]">Título</TableHead>
                    <TableHead className="w-[200px]">Status</TableHead>
                    <TableHead className="w-[200px] text-right">
                      Última atualização
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tickets?.map(ticket => (
                    <TableRow key={ticket.id}>
                      <TableCell>{ticket.ticketId}</TableCell>
                      <TableCell>
                        <SheetTicketInfo data={ticket} />
                        teste
                      </TableCell>
                      <TableCell>
                        <TableDropdownMenu
                          title={translateStatus(ticket.status)}
                          status={ticket.status}
                          onChange={status => {
                            // Update ticket status here
                            console.log('Updating ticket status:', status)
                          }}
                        />
                      </TableCell>
                      <TableCell className="max-w-20 text-right">
                        {getLocaleDateInBrazil(ticket.updatedAt)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TableCell colSpan={3}>Total de tickets</TableCell>
                    <TableCell className="text-right">
                      {tickets?.length}
                    </TableCell>
                  </TableRow>
                </TableFooter>
              </Table>
            </div>
          </>
        ) : (
          <div>Nenhum conteúdo</div>
        )}
      </div>
    </>
  )
}
