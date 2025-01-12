import { Suspense } from 'react'

import type { TicketProps } from '@/_types/ticket'

import { Login } from '@/components/login'
import { LogoutButton } from '@/components/logout'
import { TicketTablet } from '@/components/ticket-list'

import { getServerCookie } from '@/hooks/cookies'

import { api } from '@/services/api'

export default async function Home() {
  const user = await getServerCookie('user_cookie')

  const tickets: TicketProps[] = await api('/api/tickets', {
    method: 'GET',
    next: {
      tags: ['tickets'],
    },
  })

  if (!user?.id) {
    return <Login />
  }

  return (
    <Suspense
      fallback={
        <div>
          <div className="spinner-border text-primary">
            <span className="sr-only">Loading...</span>
          </div>
          <p className="mt-4 text-gray-500">Carregando os dados...</p>
        </div>
      }
    >
      <div className="flex min-h-screen max-w-full flex-col">
        <header className="flex w-full justify-end p-4 text-xs">
          {user.username && (
            <div className="flex gap-2 pr-4">
              <div>
                Seja bem vindo de volta: <strong>{user.username}</strong>
              </div>
              <LogoutButton />
            </div>
          )}
        </header>
        <h1 className="p-16 text-center font-bold text-xl">
          Sistema de Tickets
        </h1>
        <TicketTablet data={tickets} />
      </div>
    </Suspense>
  )
}
