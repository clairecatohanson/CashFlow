import { useEffect, useState } from "react"
import {
  calculateShare,
  formatCurrency,
  formatDate,
  formatDescription,
} from "../../utils/functions"

export const Expense = ({
  expense,
  personalTeam,
  userTeams,
  setSelectedExpense,
}) => {
  const [expenseAmount, setExpenseAmount] = useState(0.0)

  useEffect(() => {
    const splitAmount = calculateShare(expense, personalTeam, userTeams)
    setExpenseAmount(splitAmount)
  }, [personalTeam, userTeams, expense])

  const date = new Date(expense.date)

  return (
    <li
      className="expense-item"
      key={`expense=${expense.id}`}
      onClick={() => {
        setSelectedExpense(expense)
      }}
    >
      <div className="expense-date">{formatDate.format(date)}</div>
      <div className="expense-amount">
        {expenseAmount.toLocaleString("en-us", formatCurrency)}
      </div>
      <div className="expense-description">
        {formatDescription(expense.description)}
      </div>
      <div className="expense-category">{expense.category?.name}</div>
      <div className="expense-type">
        {expense.team_Id === personalTeam.teamId ? "Personal" : "Shared"}
      </div>
    </li>
  )
}
