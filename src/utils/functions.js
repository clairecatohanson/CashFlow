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
  const userPersonalUserTeam = user.userTeams.find(
    (ut) => ut.splitPercent === 100
  )
  if (expense.team_Id === userPersonalUserTeam?.teamId) {
    return expense.amount
  } else {
    const utForExpense = user.userTeams.find(
      (ut) => ut.teamId === expense.team_Id
    )

    const userPercent = utForExpense?.splitPercent
    const userTotal = (expense.amount * userPercent) / 100
    return userTotal
  }
}

export const calculatePaid = (selectedExpense, participant) => {
  let amountPaid = 0

  if (selectedExpense.payments.length) {
    const participantPayments = selectedExpense.payments.filter(
      (p) => p.userId === participant.id
    )
    participantPayments.forEach((p) => (amountPaid += p.amount))
  }

  return amountPaid
}
