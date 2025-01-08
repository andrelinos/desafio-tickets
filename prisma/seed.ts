import { faker } from '@faker-js/faker'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

function generateTicketId() {
  const year = new Date().getFullYear()
  return `${year}-${faker.string.ulid().slice(0, 10).toUpperCase()}`
}

async function main() {
  await prisma.user.deleteMany()

  // Criação de usuários
  const usersData = Array.from({ length: 5 }).map(() => ({
    username: faker.person.fullName(),
  }))

  const createdUsers = await prisma.user.createMany({
    data: usersData,
  })

  console.info(`${createdUsers.count} users created`)

  // Recuperar usuários criados
  const users = await prisma.user.findMany()

  // Criação de tickets
  for (const user of users) {
    const ticketIds = new Set()
    const statuses = ['open', 'closed', 'in-progress']

    const ticketsData = Array.from({ length: 5 }).map((_, index) => {
      let ticketId: string
      do {
        ticketId = generateTicketId()
      } while (ticketIds.has(ticketId))

      ticketIds.add(ticketId)
      const status = statuses[index % statuses.length]

      return {
        title: faker.lorem.sentence(),
        status,
        description: faker.lorem.paragraph(),
        userId: user?.id,
        ticketId,
      }
    })

    const createdTickets = await prisma.ticket.createMany({
      data: ticketsData,
    })

    console.info(
      `${createdTickets.count} tickets created for user ${user.username}`
    )
  }

  // Recuperar tickets criados
  const tickets = await prisma.ticket.findMany()

  function getRandomUser() {
    const randomIndex = Math.floor(Math.random() * users.length)
    return users[randomIndex]
  }

  // Criação de tickets
  for (const ticket of tickets) {
    const commentsData = Array.from({ length: 5 }).map(() => {
      const randomUser = getRandomUser()
      return {
        content: faker.lorem.sentence(19),
        userId: randomUser.id,
        ticketId: ticket.id,
      }
    })

    const createdComments = await prisma.comment.createMany({
      data: commentsData,
    })

    console.info(
      `${createdComments.count} comments created for ticket ${ticket.title}`
    )
  }

  console.info('Seed completed successfully!')
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
