'use client'

import { useEffect, useState } from 'react'

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

import type { TicketProps, TicketStatusProps } from '@/_types/ticket'

import { TableDropdownMenu } from '@/components/table-dropdown-menu'
import { TicketFormDetails } from '@/components/ticket-details'
import { Button } from '@/components/ui/button'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'

import { getDifferenceTimeFromDate, translateStatus } from '@/utils/formatters'

import { handleTicket } from '@/services'

import { AddTicketForm } from '../add-ticket'
import { TicketStatusFilter, ticketCustomToast } from './components'
import { DialogDeleteTicket } from './components/dialog-delete-ticket'

interface MenuDropdownProps {
  id: string
  ticketId: string
  ticketNewStatus: TicketStatusProps
}

interface Props {
  data: TicketProps[]
}

export function TicketTablet({ data }: Props) {
  const [selectedFilter, setSelectedFilter] = useState('all')
  const [tickets, setTickets] = useState<TicketProps[]>(data)
  const [ticketSelected, setTicketSelected] = useState<TicketProps>()
  const [onOpenTicket, setOnOpenTicket] = useState(false)
  const [onOpenTicketAdd, setOnOpenTicketAdd] = useState(false)

  function onChangeTicket() {
    setOnOpenTicket(!onOpenTicket)
  }

  function onChangeTicketAdd() {
    setOnOpenTicketAdd(!onOpenTicketAdd)
  }

  function handleSelectTicket(ticket: TicketProps) {
    setTicketSelected(ticket)
    console.log(ticket)
    setOnOpenTicket(!onOpenTicket)
  }

  function handleUpdateTicketStatus({
    id,
    ticketId,
    ticketNewStatus,
  }: MenuDropdownProps) {
    if (!tickets) {
      return
    }

    const updatedTickets = tickets.map(ticket =>
      ticket.id === id ? { ...ticket, status: ticketNewStatus } : ticket
    )

    const ticketUpdated = updatedTickets.find(t => t.id === id)

    async function updateTicketStatus() {
      if (!ticketUpdated) {
        return
      }
      handleTicket({ ticket: ticketUpdated, method: 'PUT' })
    }

    ticketCustomToast(ticketId, updateTicketStatus)
  }

  function handleStatusSelect(value: string) {
    setSelectedFilter(value)
  }

  useEffect(() => {
    function handleFilterTickets() {
      const filteredTickets = data?.filter(
        ticket => ticket.status === selectedFilter || selectedFilter === 'all'
      )
      if (filteredTickets?.length) {
        setTickets(filteredTickets)
      } else {
        setTickets([])
      }
    }

    handleFilterTickets()
  }, [selectedFilter, data])

  return (
    <>
      <div className="flex w-full max-w-screen flex-col gap-4">
        {data?.length ? (
          <>
            <div className="mx-auto flex w-full max-w-7xl flex-col gap-2 sm:flex-row sm:justify-end sm:px-6">
              <div className="hidden flex-1 sm:flex" />
              <TicketStatusFilter
                selectedFilter={selectedFilter}
                onSelect={handleStatusSelect}
              />
              <AddTicketForm
                isNew
                onOpen={onOpenTicketAdd}
                onChange={onChangeTicketAdd}
              />
            </div>

            <ScrollArea className="mx-auto w-full max-w-[360px] rounded-md border px-2 py-6 md:max-w-[700px] lg:max-w-[1000px] xl:max-w-7xl">
              <Table className="w-full">
                <TableCaption>Sua lista de tickets.</TableCaption>
                <TableHeader className="select-none">
                  <TableRow>
                    <TableHead className="w-[156px] whitespace-nowrap">
                      Id do Ticket
                    </TableHead>
                    <TableHead className="min-w-[400px]">Título</TableHead>
                    <TableHead className="min-w-[200px]">Status</TableHead>
                    <TableHead className="w-[200px] text-right">
                      Última atualização
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tickets.map(ticket => (
                    <TableRow key={ticket.id} className="group relative">
                      <TableCell className="whitespace-nowrap font-mono text-xs">
                        {ticket.ticketId}
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="link"
                          className="text-zinc-700"
                          onClick={() => handleSelectTicket(ticket)}
                        >
                          {ticket.title}
                        </Button>
                      </TableCell>
                      <TableCell>
                        <TableDropdownMenu
                          title={translateStatus(ticket.status)}
                          status={ticket.status}
                          onChange={value =>
                            handleUpdateTicketStatus({
                              id: ticket.id,
                              ticketId: ticket.ticketId,
                              ticketNewStatus: value,
                            })
                          }
                        />
                      </TableCell>
                      <TableCell className="max-w-20 text-right">
                        {getDifferenceTimeFromDate(ticket.updatedAt)}
                        <DialogDeleteTicket data={ticket} />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                <TableFooter className="select-none">
                  <TableRow>
                    <TableCell colSpan={2} />
                    <TableCell colSpan={2} className="px-4 text-right">
                      Total de tickets: {tickets?.length}
                    </TableCell>
                  </TableRow>
                </TableFooter>
              </Table>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </>
        ) : (
          <div className="size-full">
            <div className="flex w-full justify-end gap-2">
              <AddTicketForm
                isNew
                onOpen={onOpenTicketAdd}
                onChange={onChangeTicketAdd}
              />
            </div>
            <div className="flex size-full flex-1 items-center justify-center pt-16">
              <p className="text-center text-muted-foreground ">
                Nenhum ticket encontrado.
              </p>
            </div>
          </div>
        )}
      </div>

      {onOpenTicket && (
        <TicketFormDetails
          data={ticketSelected}
          onOpen={onOpenTicket}
          onChange={onChangeTicket}
        />
      )}
    </>
  )
}
