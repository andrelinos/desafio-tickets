'use client'

import clsx from 'clsx'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import type { TicketProps } from '@/_types/ticket'
import { TicketDialogStatus } from '..'
import { statusMap, updateTicketStatus } from './utils'

interface Props {
  data: TicketProps | undefined
}

export function TicketStatus({ data }: Props): JSX.Element {
  const [isOpen, setIsOpen] = useState(false)
  const [statusSelected, setStatusSelected] = useState('')

  if (!data) {
    return <span>'Status Desconhecido'</span>
  }

  const status = data.status

  function onOpenChange() {
    setIsOpen(!isOpen)
  }

  function handleUpdateTicketStatus(ticketNewStatus: string) {
    setStatusSelected(ticketNewStatus)
    setIsOpen(!isOpen)
  }

  async function updateTicket() {
    const ticketUpdated = {
      ...data,
      status: statusSelected,
    } as TicketProps

    await updateTicketStatus({ ticket: ticketUpdated })
    setIsOpen(false)
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="link"
            className={clsx(
              'max-w-fit cursor-pointer select-none text-zinc.400',
              {
                'text-green-500': status === 'open',
                'text-red-500': status === 'closed',
                'text-blue-500': status === 'in-progress',
              }
            )}
            title="Clique para alterar status"
          >
            {statusMap[status]}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>Alterar status do ticket</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem
              disabled={status === 'closed'}
              className="cursor-pointer"
              onClick={() => handleUpdateTicketStatus('closed')}
            >
              <span>Concluído</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              disabled={status === 'in-progress'}
              className="cursor-pointer"
              onClick={() => handleUpdateTicketStatus('in-progress')}
            >
              <span>Em andamento</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              disabled={status === 'open'}
              className="cursor-pointer"
              onClick={() => handleUpdateTicketStatus('open')}
            >
              <span>Aberto</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      <TicketDialogStatus
        isOpen={isOpen}
        status={statusSelected}
        data={data}
        onOpenChange={onOpenChange}
        onConfirmChange={updateTicket}
      />
    </>
  )
}
