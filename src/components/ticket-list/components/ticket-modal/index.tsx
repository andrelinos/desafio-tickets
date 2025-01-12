'use client'

import type { ReactNode } from 'react'

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'

import type { TicketProps } from '@/_types/ticket'

interface TicketModalProps {
  data?: TicketProps
  onOpen: boolean
  children: ReactNode
  onChange: () => void
}

export function TicketModal({
  data,
  onOpen,
  children,
  onChange,
}: TicketModalProps) {
  return (
    <Sheet open={onOpen} onOpenChange={onChange}>
      <SheetContent
        side="full"
        className="size-full max-h-screen max-w-5xl p-0 sm:w-full"
      >
        <SheetHeader className="p-6 text-left shadow">
          <SheetTitle>
            <div className="border-b px-4 py-2 text-center">
              {data?.id ? (
                <>
                  Ticket: {data.ticketId} -{' '}
                  <span className="font-normal">{data.title}</span>
                </>
              ) : (
                'Adicionar ticket'
              )}
            </div>
          </SheetTitle>

          <SheetDescription className="text-center text-xs">
            Altere ou insira novos dados e clique em salvar.
          </SheetDescription>
        </SheetHeader>
        {children}
      </SheetContent>
    </Sheet>
  )
}
