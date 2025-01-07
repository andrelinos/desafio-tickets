export const getLocaleDateInBrazil = (
  date: string | Date | null | undefined
) => {
  let newDate: Date
  if (date) {
    newDate = new Date(date)
    if (Number.isNaN(newDate.getTime())) {
      newDate = new Date()
    }
  } else {
    newDate = new Date()
  }

  const options: Intl.DateTimeFormatOptions = {
    timeZone: 'America/Sao_Paulo',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }
  return newDate.toLocaleDateString('pt-BR', options)
}
