'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import clsx from 'clsx'
import { SendHorizontal } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { Controller, type SubmitHandler, useForm } from 'react-hook-form'
import { ClipLoader } from 'react-spinners'
import { toast } from 'sonner'
import { z } from 'zod'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import type { CommentProps, TicketProps } from '@/_types/ticket'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Textarea } from '@/components/ui/textarea'

import { getClientCookie } from '@/hooks/cookies'

import { api, handleTicket } from '@/services'

import { getLocaleDateInBrazil } from '@/utils/formatters'
import { revalidateTag } from '@/utils/revalidate'

interface TicketFormProps {
  data?: TicketProps
  isNew?: boolean
  onOpen: boolean
  onChange: () => void
}

const formSchema = z.object({
  title: z.string().min(3).max(100),
  description: z.string().min(3).max(500).optional(),
  userId: z.string().optional(),
  status: z.enum(['all', 'open', 'closed', 'in-progress']),
})

type FormSchema = z.infer<typeof formSchema>

export function TicketForm({ data, isNew = false, onChange }: TicketFormProps) {
  const divRef = useRef<HTMLDivElement>(null)
  const [comments, setComments] = useState<CommentProps[]>(data?.comments || [])
  const [comment, setComment] = useState('')
  const [isSubmittingComment, setIsSubmittingComment] = useState(false)

  const {
    register,
    handleSubmit,
    control,

    formState: { errors, isSubmitting },
  } = useForm<FormSchema>({
    defaultValues: data ?? {},
    resolver: zodResolver(formSchema),
  })

  const user = getClientCookie('user_cookie')
  const createTicketPayload = (values: FormSchema): any => {
    return {
      ...values,
      userId: user?.id,
    }
  }

  const updateTicketPayload = (
    data: TicketProps,
    values: FormSchema
  ): TicketProps => ({ ...data, ...values })

  const onSubmit: SubmitHandler<FormSchema> = async values => {
    if (isNew) {
      const valueToSendOnCreate = createTicketPayload(values)
      await handleTicket({
        ticket: valueToSendOnCreate as TicketProps,
        method: 'POST',
      })
    } else {
      const valueToSendOnUpdate = updateTicketPayload(
        data as TicketProps,
        values
      )
      await handleTicket({
        ticket: valueToSendOnUpdate as TicketProps,
        method: 'PUT',
      })
    }

    onChange()
  }

  async function handleSaveComment() {
    setIsSubmittingComment(true)

    try {
      if (!comment || !data) {
        return
      }

      const contentToSave = {
        userId: user?.id,
        content: comment,
        ticketId: data.id,
      }

      const response = await api('/api/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contentToSave),
        next: {
          tags: ['tickets'],
        },
      })

      setComments([...comments, response])

      setComment('')

      await revalidateTag('tickets')

      toast.success('Seu comentário foi salvo com sucesso!')
    } catch (error) {
      if (error instanceof Error) {
        const response = (error as any).response
        if (response) {
          response?.data?.code === 4004
          return toast.error('Saida da aplicação e faça o login novamente.')
        }
        toast.error('Ops! Erro ao realizar a operação.')
      }
    }
    setIsSubmittingComment(false)
    goToEndScroll()
  }

  function goToEndScroll() {
    if (divRef?.current) {
      divRef.current.scrollTo({
        top: divRef.current.scrollHeight,
        behavior: 'smooth',
      })
    }
  }

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    goToEndScroll()
  }, [])

  return (
    <ScrollArea className="flex max-h-full w-full flex-col pt-6 pb-16">
      <div className="flex size-full flex-col gap-4 px-6 pb-24">
        <div className="flex flex-col gap-1">
          <Input
            title="Título"
            id="title"
            defaultValue={data?.title}
            className="col-span-3"
            error={errors.title}
            maxLength={100}
            {...register('title')}
          />
        </div>
        <div
          className={clsx('flex flex-col gap-1', {
            hidden: isNew,
          })}
        >
          <Label htmlFor="status" className="space-y-1 bg-transparent">
            Informe o status
          </Label>
          <Controller
            name="status"
            control={control}
            defaultValue={data?.status || 'open'}
            render={({ field: { onChange, onBlur, value, name, ref } }) => (
              <Select name={name} onValueChange={onChange} value={value}>
                <SelectTrigger ref={ref} onBlur={onBlur}>
                  <SelectValue placeholder="Selecione um status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Estados</SelectLabel>
                    <SelectItem value="open">Aberto</SelectItem>
                    <SelectItem value="closed">Fechado</SelectItem>
                    <SelectItem value="in-progress">Em andamento</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          />
        </div>
        <div className="flex flex-col gap-1">
          <Label htmlFor="username">Descrição</Label>
          <Textarea
            defaultValue={data?.description}
            placeholder="Descrição do problema"
            className="resize-none"
            error={errors.description}
            maxLength={500}
            {...register('description')}
          />
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex w-full flex-col border-b pb-8"
        >
          <div className="block w-full px-4 pb-2 text-sm">
            {data?.user && (
              <>
                Ticket criado por <strong>{data?.user.username}</strong> em{' '}
                {getLocaleDateInBrazil(data?.createdAt)}
              </>
            )}
          </div>
          <div className="ml-auto flex w-full max-w-96 gap-4 pt-8">
            <Button
              variant="outline"
              className="flex-1 font-semibold"
              type="button"
              disabled={isSubmitting}
              onClick={onChange}
            >
              Cancelar
            </Button>

            <Button
              variant="default"
              className="flex-1 font-semibold text-white"
              type="submit"
              disabled={isSubmitting}
            >
              Salvar
            </Button>
          </div>
        </form>
        {!isNew && (
          <div className="h-auto w-full pt-4">
            <Label className="font-semibold text-xl" htmlFor="username">
              Comentários
            </Label>
            <div className="flex w-full flex-col gap-4 rounded-lg border">
              <div
                ref={divRef}
                className="custom-scrollbar flex h-96 max-h-96 w-full flex-col gap-4 overflow-y-auto p-4 pt-8 pb-20"
              >
                {comments?.map((comment, i) => {
                  return (
                    <div
                      key={comment.id}
                      className={clsx('w-full ', {
                        'pl-6': comment.userId === user?.id,
                        'pr-6': comment.userId !== user?.id,
                      })}
                    >
                      <div
                        className={clsx(
                          'flex w-fit flex-col items-end rounded-md p-2 shadow-md',
                          {
                            'ml-auto bg-green-200': comment.userId === user?.id,
                            'bg-zinc-100': comment.userId !== user?.id,
                          }
                        )}
                      >
                        <span className="w-full">{comment?.content}</span>
                        <span className="text-xs text-zinc-500 italic">
                          - {comment?.user?.username}
                        </span>
                      </div>
                    </div>
                  )
                })}
              </div>

              <div className="flex items-center gap-1 p-2">
                <Textarea
                  placeholder="Digite uma mensagem"
                  className="resize-none text-lg"
                  value={comment}
                  onChange={e => setComment(e.target.value)}
                />
                <Button
                  variant="secondary"
                  className="flex size-14 items-center justify-center [&_svg]:size-8"
                  onClick={handleSaveComment}
                  disabled={isSubmittingComment || !comment}
                >
                  {isSubmittingComment ? (
                    <ClipLoader size={22} className="m-0 opacity-75" />
                  ) : (
                    <SendHorizontal strokeWidth={1} />
                  )}
                </Button>
              </div>
            </div>
            <div className="w-full py-1 text-center text-muted-foreground text-xs">
              Total de comentários: {data?._count?.comments}
            </div>
          </div>
        )}
      </div>
    </ScrollArea>
  )
}
