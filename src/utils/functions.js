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

export const calculateAmount = (expense, personalTeam, userTeams) => {
  if (expense.team_Id === personalTeam?.teamId) {
    return expense.amount
  } else {
    const expenseUT = userTeams.find((ut) => ut.teamId === expense.team_Id)
    const utSplit = expenseUT?.splitPercent
    return (expense.amount * utSplit) / 100
  }
}
