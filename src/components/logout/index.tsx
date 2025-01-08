'use client'

import { Button } from '@/components/ui/button'

import { setServerCookie } from '@/hooks/cookies'

export function LogoutButton() {
  function logout() {
    setServerCookie('user_cookie', '')
  }
  return (
    <Button variant="link" className="h-4 p-0 text-red-400" onClick={logout}>
      sair
    </Button>
  )
}
