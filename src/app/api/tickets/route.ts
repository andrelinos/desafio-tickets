import { type NextRequest, NextResponse } from 'next/server'

import type { TicketProps } from '@/_types/ticket'

import { prisma } from '@/lib/prisma'

import { generateTicketId } from '@/utils/formatters'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const currentPage = Number(searchParams.get('current_page'))
  const pageSize = Number(searchParams.get('page_size'))

  if (currentPage && pageSize) {
    const skip = (currentPage - 1) * pageSize

    const tickets = await prisma.ticket.findMany({
      include: {
        _count: true,
        comments: true,
        user: true,
      },
      skip: skip,
      take: pageSize,
    })

    return NextResponse.json(tickets)
  }

  const tickets = await prisma.ticket.findMany({
    include: {
      _count: true,
      comments: {
        include: {
          user: true,
        },
      },
      user: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  return NextResponse.json(tickets)
}

export async function POST(req: NextRequest) {
  try {
    const { title, userId, description }: TicketProps = await req.json()

    await prisma.ticket.create({
      data: {
        title,
        userId,
        description,
        ticketId: generateTicketId(),
        status: 'open',
      },
    })

    return NextResponse.json({ message: 'success' }, { status: 201 })
  } catch {
    return NextResponse.json({ message: 'operation failed' }, { status: 400 })
  }
}

export async function PUT(req: NextRequest) {
  try {
    const { title, userId, id, description, status }: TicketProps =
      await req.json()

    const updatedAt = new Date()

    await prisma.ticket.update({
      where: { id },
      data: { title, userId, description, status, updatedAt },
    })

    return NextResponse.json({ message: 'success' }, { status: 200 })
  } catch {
    return NextResponse.json({ message: 'operation failed' }, { status: 400 })
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { id }: TicketProps = await req.json()

    await prisma.ticket.delete({
      where: { id },
    })

    return NextResponse.json({ message: 'success' }, { status: 200 })
  } catch {
    return NextResponse.json({ message: 'operation failed' }, { status: 400 })
  }
}
