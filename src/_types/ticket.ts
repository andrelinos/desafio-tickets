export type TicketStatusProps =
  | 'all'
  | 'open'
  | 'closed'
  | 'in-progress'
  | undefined

type Comment = {
  user: string
  comment: string
}

export interface TicketProps {
  id: number
  ticketId: string
  title: string
  status: TicketStatusProps
  updatedAt: string
  description: string
  creator: string
  createdAt: string
  comments: Comment[]
}
