export const formatDate = (ISOdateString) => {
  const dateParts = ISOdateString.split("-")
  const year = parseInt(dateParts[0])
  const month = parseInt(dateParts[1] - 1)
  const day = parseInt(dateParts[2])

  const dateObj = new Date(year, month, day)

  const withYear = new Intl.DateTimeFormat("en-us", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  }).format(dateObj)

  const withoutYear = new Intl.DateTimeFormat("en-us", {
    month: "short",
    day: "2-digit",
  }).format(dateObj)

  const formattedDate = { withYear: withYear, withoutYear: withoutYear }

  return formattedDate
}

export const formatCurrency = {
  style: "currency",
  currency: "USD",
}

export const formatDescription = (description) => {
  return description[0].toUpperCase() + description.slice(1)
}

export const calculateShare = (expense, user) => {
  const userPersonalUserTeam = user.user_teams.find(
    (ut) => ut.splitFraction === 100
  )
  if (expense.team.id === userPersonalUserTeam.team.id) {
    return expense.amount
  } else {
    const utForExpense = user.user_teams.find(
      (ut) => ut.team === expense.team.id
    )

    const userPercent = utForExpense?.splitFraction
    const userTotal = (expense.amount * userPercent) / 100
    return userTotal
  }
}

export const calculatePaid = (selectedExpense, participant) => {
  let amountPaid = 0

  if (selectedExpense.payments.length) {
    const participantPayments = selectedExpense.payments.filter(
      (p) => p.user === participant.id
    )
    participantPayments.forEach((p) => (amountPaid += p.amount))
  }

  return amountPaid
}
