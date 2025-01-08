import { type NextRequest, NextResponse } from 'next/server'

import { prisma } from '@/lib/prisma'

export async function POST(req: NextRequest) {
  try {
    const { username } = await req.json()

    if (!username) {
      return NextResponse.json(
        { message: 'Username is required' },
        { status: 400 }
      )
    }

    let user = await prisma.user.findUnique({
      where: { username },
    })

    if (!user) {
      user = await prisma.user.create({
        data: { username },
      })
    }

    return NextResponse.json(user)
  } catch {
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    )
  }
}
