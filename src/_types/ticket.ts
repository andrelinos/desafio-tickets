export interface User {
  id: string
  username: string
}

export type TicketStatusProps = 'all' | 'open' | 'closed' | 'in-progress'

export interface CommentProps {
  id: string
  content: string
  createdAt: string
  ticketId: string
  userId: string
  user: User
}

export interface TicketProps {
  id: string
  ticketId: string
  title: string
  status: TicketStatusProps
  description: string
  createdAt: string
  updatedAt: string
  userId: string
  _count: {
    comments: number
  }
  comments: CommentProps[]
  user: User
}
