import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'

import type { TicketProps } from '@/_types/ticket'

import { Button } from '@/components/ui/button'
import { getLocaleDateInBrazil } from '@/utils/formatters/get-locale-date'
import clsx from 'clsx'
import { SendHorizontal } from 'lucide-react'
import { useRef } from 'react'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { ScrollArea } from '../ui/scroll-area'
import { Textarea } from '../ui/textarea'

interface Props {
  data: TicketProps | undefined
}

export function SheetTicketInfo({ data }: Props) {
  const selectRef = useRef<HTMLSelectElement | null>(null)

  const handleFilterTickets = () => {
    {
      const selectedItem = selectRef?.current?.value
      console.log(selectedItem)
    }
  }

  if (!data) return null

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="link">{data.title}</Button>
      </SheetTrigger>
      <SheetContent
        side="full"
        className="size-full max-h-screen p-0 sm:w-full"
      >
        <ScrollArea className="flex max-h-full w-full flex-col">
          <SheetHeader className="p-6 text-left">
            <SheetTitle>
              {' '}
              {data.id
                ? `Ticket: ${data.ticketId}: ${data.title}`
                : 'Adicionar ticket'}
            </SheetTitle>
            <SheetDescription>
              Altere ou insira novos dados e clique em salvar.
            </SheetDescription>
          </SheetHeader>
          <div className="flex size-full flex-col gap-4 px-6 pb-24">
            <div className="flex flex-col gap-1">
              <Label htmlFor="name">Título</Label>
              <Input
                id="name"
                defaultValue={data.title}
                className="col-span-3"
              />
            </div>
            <div className="flex flex-col gap-1">
              <Label htmlFor="username">Status do ticket</Label>
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
            <Label className="mt-4" htmlFor="username">
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
                            'flex w-fit flex-col items-end rounded-md p-2',
                            {
                              'ml-auto bg-green-200':
                                comment.user.trim().toLowerCase() ===
                                data.creator.trim().toLowerCase(),
                              'bg-zinc-100':
                                comment.user.trim().toLowerCase() !==
                                data.creator.trim().toLowerCase(),
                            }
                          )}
                        >
                          <span className="w-full">{comment.comment}</span>
                          <span className="text-xs text-zinc-500 italic">
                            - {comment.user}
                          </span>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </ScrollArea>
            </div>
            <SheetFooter>
              <div className="flex w-full flex-col justify-between sm:flex-row">
                <div className="flex-1 p-2 text-sm">
                  Ticket criado por <strong>{data.creator}</strong> em{' '}
                  {getLocaleDateInBrazil(data.createdAt)}
                </div>
                <div className="flex gap-4 pt-6 sm:min-w-64">
                  <SheetClose asChild className="">
                    <Button variant="outline" type="submit">
                      Cancelar
                    </Button>
                  </SheetClose>
                  <SheetClose asChild className="flex-1">
                    <Button variant="default" type="submit">
                      Salvar
                    </Button>
                  </SheetClose>
                </div>
              </div>
            </SheetFooter>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}
