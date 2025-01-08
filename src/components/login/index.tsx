'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { type SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import { setServerCookie } from '@/hooks/cookies'

import { api } from '@/services'

const formSchema = z.object({
  username: z.string().min(3).max(100),
})

type FormSchema = z.infer<typeof formSchema>

export function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
  })

  const onSubmit: SubmitHandler<FormSchema> = async username => {
    const userResponse = await api('/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(username),
    })

    if (!userResponse.id) {
      throw new Error('Ops! Ocorreu um erro ao tentar acesso.')
    }

    setServerCookie('user_cookie', userResponse, {
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    })
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="rounded-lg bg-white p-8 shadow-md">
        <p className="mb-8 max-w-96 text-center text-2xl">
          Faça login para acessar o sistema de tickets
        </p>
        <h1 className="mb-6 text-center font-bold text-2xl">Acesso restrito</h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col items-center"
        >
          <div className="mb-4 w-full max-w-xs">
            <Input
              title="Usuário de acesso"
              id="username"
              type="text"
              className="w-full rounded-md border px-3 py-2"
              placeholder="Insira seu nome"
              error={errors.username}
              {...register('username')}
            />
          </div>
          <Button
            type="submit"
            className="mx-auto mt-4 w-full max-w-xs rounded-md py-2 font-semibold text-white"
            disabled={isSubmitting}
          >
            Entrar
          </Button>
        </form>
      </div>
    </div>
  )
}
