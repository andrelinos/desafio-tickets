import clsx from 'clsx'
import type { ReactNode } from 'react'

import type { TicketStatusProps } from '@/_types/ticket'

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

interface Props {
  title: ReactNode
  status: string | undefined
  onChange: (status: TicketStatusProps) => void
}

export function TableDropdownMenu({ title, onChange, status }: Props) {
  return (
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
          {title}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Alterar status do ticket</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem
            disabled={status === 'closed'}
            className="cursor-pointer"
            onClick={() => onChange('closed')}
          >
            <span>Concluído</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            disabled={status === 'in-progress'}
            className="cursor-pointer"
            onClick={() => onChange('in-progress')}
          >
            <span>Em andamento</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            disabled={status === 'open'}
            className="cursor-pointer"
            onClick={() => onChange('open')}
          >
            <span>Aberto</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
