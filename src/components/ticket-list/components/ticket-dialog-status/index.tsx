'use client'

import type { TicketProps } from '@/_types/ticket'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { statusMap } from '../ticket-status/utils'

interface Props {
  data: TicketProps
  status?: string
  isOpen?: boolean
  onOpenChange?: () => void
  onConfirmChange?: () => Promise<void>
}

export function TicketDialogStatus({
  data,
  status,
  isOpen,
  onOpenChange,
  onConfirmChange,
}: Props) {
  return (
    <>
      <Dialog open={isOpen} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Alterar o status do ticket?</DialogTitle>
          </DialogHeader>

          <div className="flex items-center gap-2 py-4">
            <div className="text-muted-foreground">
              Deseja alterar o status do ticket <strong>{data.title}</strong> de
              "<strong>{status && statusMap[data.status]}</strong>" para "
              <strong>{status && statusMap[status]}</strong>"?
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-semibold text-muted-foreground text-xs">
              Ticket ID:
            </span>
            <p className="font-mono">{data.ticketId}</p>
          </div>
          <DialogFooter className="mt-6 flex gap-4">
            <Button
              variant="outline"
              className="flex-1"
              type="button"
              onClick={onOpenChange}
            >
              Cancelar
            </Button>

            <Button className="flex-1" type="button" onClick={onConfirmChange}>
              Continuar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
