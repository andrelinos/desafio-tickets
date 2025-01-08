'use client'

import Cookies from 'js-cookie'

export const getClientCookie = (name: string) => {
  const cookieValue = Cookies.get(name)

  if (cookieValue && typeof cookieValue === 'string') {
    try {
      return JSON.parse(cookieValue)
    } catch (error) {
      console.error('Failed to parse cookie value:', error)
      return null
    }
  }

  return null
}
