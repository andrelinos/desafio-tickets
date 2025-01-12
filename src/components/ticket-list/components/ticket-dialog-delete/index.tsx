import type { TicketProps } from '@/_types/ticket'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { handleTicket } from '@/services'
import { AlertCircle, Trash } from 'lucide-react'

interface Props {
  data: TicketProps
}

export function DialogDeleteTicket({ data }: Props) {
  async function deleteTicket() {
    handleTicket({ ticket: data, method: 'DELETE' })
  }

  console.log('DELETE')

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="-translate-y-1/2 absolute top-1/2 right-0 hidden size-8 min-h-8 min-w-8 rounded-full border border-white p-2 group-hover:flex [&_svg]:size-4"
          variant="destructive"
          type="button"
        >
          <Trash />
        </Button>
      </DialogTrigger>
      <DialogContent className="h-80 sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Apagar ticket</DialogTitle>
          <DialogDescription>
            Esta ação não poderá ser desfeita
          </DialogDescription>
        </DialogHeader>
        <div className="flex gap-4 py-4">
          <AlertCircle className="text-red-400" size={42} strokeWidth={1} />
          <h2>
            Quer mesmo apagar o ticket{' '}
            <strong>
              {data.ticketId} - {data.title}
            </strong>
            ?
          </h2>
        </div>
        <DialogFooter className="flex gap-4">
          <DialogClose asChild>
            <Button variant="outline" className="flex-1" type="button">
              Cancelar
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button
              variant="destructive"
              className="flex-1"
              type="button"
              onClick={deleteTicket}
            >
              Continuar
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
