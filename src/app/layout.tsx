import '@/styles/globals.css'

import { Toaster } from 'sonner'

import type { Metadata } from 'next'
import { Inter as FontSans } from 'next/font/google'

import { ScrollArea } from '@/components/ui/scroll-area'

import { cn } from '@/lib/utils'

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
})

export const metadata: Metadata = {
  title: 'Ticket Services',
  description: 'Sistema de gerenciamento de tickets e interação com o usuário',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          'size-full h-screen overflow-hidden bg-background font-sans text-zinc-700 antialiased',
          fontSans.variable
        )}
      >
        <ScrollArea className="size-full max-h-screen">
          <div className="flex size-full min-h-screen flex-col justify-between">
            <main className="size-full flex-1">{children}</main>
          </div>
        </ScrollArea>

        <Toaster richColors expand closeButton position="top-right" />
      </body>
    </html>
  )
}
