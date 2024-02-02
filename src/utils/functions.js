export const formatDate = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "short",
  day: "2-digit",
})

export const formatCurrency = {
  style: "currency",
  currency: "USD",
}

export const formatDescription = (description) => {
  return description[0].toUpperCase() + description.slice(1)
}

export const calculateShare = (expense, personalTeam, userTeams) => {
  if (expense.team_Id === personalTeam?.teamId) {
    return expense.amount
  } else {
    const expenseUT = userTeams.find((ut) => ut.teamId === expense.team_Id)
    const utSplit = expenseUT?.splitPercent
    return (expense.amount * utSplit) / 100
  }
}

export const calculatePaid = (selectedExpense, participant) => {
  let amountPaid = 0
  const participantUserPayments = participant.userPayments

  const expensePaymentIds = []
  selectedExpense.payments?.forEach((p) => {
    expensePaymentIds.push(p.id)
  })
  if (participantUserPayments?.length) {
    const madeUserPayments = participantUserPayments.filter((up) =>
      expensePaymentIds.includes(up.paymentId)
    )
    const madePaymentIds = []
    madeUserPayments.forEach((up) => madePaymentIds.push(up.paymentId))
    const madePayments = selectedExpense.payments?.filter((p) =>
      madePaymentIds.includes(p.id)
    )
    madePayments?.forEach((p) => (amountPaid += p.amount))
  }
  return amountPaid
}
