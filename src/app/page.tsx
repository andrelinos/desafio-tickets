import data from '@/assets/data.json'

import { TicketTablet } from '@/components/ticket-table'
import { Suspense } from 'react'

export default async function Home() {
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
      <div className="min-h-screen justify-items-center p-8 pb-20 sm:p-20">
        <h1 className="pb-24 font-bold text-xl">Sistema de Tickets</h1>
        <TicketTablet data={data as any[]} />
      </div>
    </Suspense>
  )
}
