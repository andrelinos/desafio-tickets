import { revalidateTag } from '@/utils/revalidate'
import { redirect } from 'next/navigation'

export interface FetchOptions extends RequestInit {
  headers?: HeadersInit
}

export function setupFetchAPIClient(): (
  endpoint: string,
  options?: FetchOptions,
  dynamicTags?: string[]
) => Promise<any> {
  const baseURL: string | undefined = process.env.NEXT_PUBLIC_BASE_URL

  if (!baseURL) {
    throw new Error(
      'A variável de ambiente NEXT_PUBLIC_BASE_URL não está definida.'
    )
  }

  const fetchAPI = async (
    endpoint: string,
    options: FetchOptions = {}
  ): Promise<any> => {
    const url: string = `${baseURL}/${endpoint}`
    const response: Response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    })

    if (response.status === 404 || response.status === 401) {
      redirect('/')
    }

    await revalidateTag('tickets')

    if (!response.ok) {
      const errorData = await response.json()
      const error = new Error(`Error ${response.status}`)
      ;(error as any).response = { status: response.status, data: errorData }
      throw error
    }

    return response.json()
  }

  return fetchAPI
}

export const api = setupFetchAPIClient()
