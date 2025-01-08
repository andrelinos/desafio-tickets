'use server'

import { cookies } from 'next/headers'

interface CookieOptions {
  path?: string
  maxAge?: number
}

export const setServerCookie = (
  name: string,
  value: any,
  options: CookieOptions = {}
) => {
  const cookieStore = cookies()
  if (typeof name !== 'string' || !name) {
    console.error('Invalid cookie name')
    return
  }

  cookieStore.set(name, JSON.stringify(value), options)
}

export const getServerCookie = (name: string) => {
  const cookieStore = cookies()
  const cookieValue = cookieStore ? cookieStore.get(name)?.value : undefined
  return cookieValue ? JSON.parse(cookieValue) : null
}
