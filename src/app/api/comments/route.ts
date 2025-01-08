import { type NextRequest, NextResponse } from 'next/server'

import type { CommentProps } from '@/_types/ticket'

import { prisma } from '@/lib/prisma'

import { revalidateTag } from '@/utils/revalidate'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const currentPage = Number(searchParams.get('current_page'))
  const pageSize = Number(searchParams.get('page_size'))

  if (currentPage && pageSize) {
    const skip = (currentPage - 1) * pageSize

    const comments = await prisma.comment.findMany({
      include: {
        user: true,
      },
      skip: skip,
      take: pageSize,
    })

    return NextResponse.json(comments)
  }

  const comments = await prisma.comment.findMany({
    include: {
      user: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  return NextResponse.json(comments)
}

export async function POST(req: NextRequest) {
  try {
    const { ticketId, userId, content }: CommentProps = await req.json()

    const userAlreadyExists = await prisma.user.findFirst({
      where: { id: userId },
    })

    if (!userAlreadyExists) {
      return NextResponse.json(
        { message: 'User not found or invalid', code: 4004 },
        { status: 400 }
      )
    }

    const comment = await prisma.comment.create({
      data: {
        ticketId,
        userId,
        content,
      },
    })

    await revalidateTag('comments')
    await revalidateTag('tickets')

    return NextResponse.json(comment)
  } catch {
    return NextResponse.json({ message: 'Operation failed' }, { status: 400 })
  }
}
