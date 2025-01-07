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
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { getLocaleDateInBrazil } from '@/utils/formatters/get-locale-date'
import clsx from 'clsx'
import { SendHorizontal } from 'lucide-react'
import { useRef } from 'react'
import { ScrollArea } from '../ui/scroll-area'
import { Textarea } from '../ui/textarea'

interface Props {
  data: TicketProps
}

export function ModalTicketInfo({ data }: Props) {
  const selectRef = useRef<HTMLSelectElement | null>(null)

  const handleFilterTickets = () => {
    {
      const selectedItem = selectRef?.current?.value
      console.log(selectedItem)
    }
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="link">{data.title}</Button>
      </DialogTrigger>
      <DialogContent className="w-full sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>
            {data.id
              ? `Ticket: ${data.ticketId}: ${data.title}`
              : 'Adicionar ticket'}
          </DialogTitle>
          <DialogDescription>
            Altere ou insira novos dados e clique em salvar.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 pt-4 pb-6">
          <div className="flex flex-col gap-1">
            <Label htmlFor="name" className="font-semibold">
              Título
            </Label>
            <Input id="name" defaultValue={data.title} className="col-span-3" />
          </div>
          <div className="flex flex-col gap-1">
            <Label htmlFor="username" className="font-semibold">
              Status do ticket
            </Label>
            <select
              id="username"
              defaultValue={data.status}
              className="rounded-lg px-2 pt-2 pb-3"
              ref={selectRef}
              onChange={handleFilterTickets}
            >
              <option value="all">Todos</option>
              <option value="open">Aberto</option>
              <option value="in-progress">Em Progresso</option>
              <option value="closed">Concluído</option>
            </select>
          </div>

          <div>
            <Label htmlFor="username" className="font-semibold">
              Comentários
            </Label>
            <div className="flex w-full flex-col gap-4 rounded-lg border">
              <div className="flex items-center gap-1 p-2">
                <Textarea
                  placeholder="Digite uma mensagem"
                  className="resize-none"
                />
                <Button
                  variant="secondary"
                  className="flex size-14 items-center justify-center [&_svg]:size-8"
                >
                  <SendHorizontal strokeWidth={1} />
                </Button>
              </div>
              <ScrollArea className="h-96 max-h-96 w-full">
                <div className="flex w-full flex-col gap-4 p-2">
                  {data.comments.map((comment, i) => {
                    return (
                      <div
                        key={String(i)}
                        className={clsx('w-full ', {
                          'pl-6': comment.user === data.creator,
                          'pr-6': comment.user !== data.creator,
                        })}
                      >
                        <div
                          className={clsx(
                            'flex w-fit flex-col items-end rounded-md bg-zinc-100 p-2',
                            {
                              'ml-auto bg-green-200':
                                comment.user === data.creator,
                            }
                          )}
                        >
                          <span className="w-full">{comment.comment}</span>
                          <span className="text-xs text-zinc-500 italic">
                            {comment.user}
                          </span>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </ScrollArea>
            </div>
          </div>
        </div>
        <DialogFooter>
          <div className="flex w-full flex-col justify-between sm:flex-row">
            <div>
              Ticket criado por <strong>{data.creator}</strong> em{' '}
              {getLocaleDateInBrazil(data.createdAt)}
            </div>
            <div className="flex gap-4">
              <DialogClose asChild>
                <Button variant="outline" type="submit">
                  Cancelar
                </Button>
              </DialogClose>
              <Button variant="default" type="submit">
                Salvar
              </Button>
            </div>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
