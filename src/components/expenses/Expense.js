import { useEffect, useState } from "react"
import {
  calculateShare,
  formatCurrency,
  formatDate,
  formatDescription,
} from "../../utils/functions"

export const Expense = ({
  user,
  expense,
  personalTeam,
  setSelectedExpense,
  categories,
}) => {
  const [expenseAmount, setExpenseAmount] = useState(0.0)
  const [categoryName, setCategoryName] = useState("")

  useEffect(() => {
    if (user.userTeams && expense.id) {
      const splitAmount = calculateShare(expense, user)
      setExpenseAmount(splitAmount)
    }
  }, [expense, user])

  useEffect(() => {
    if (categories.length && expense.id) {
      const expenseCategory = categories.find(
        (c) => c.id === expense.categoryId
      )
      setCategoryName(expenseCategory.name)
    }
  }, [categories, expense])

  return (
    <li
      className="expense-item"
      key={`expense=${expense.id}`}
      onClick={() => {
        setSelectedExpense(expense)
      }}
    >
      <div className="expense-date">{formatDate(expense.date)}</div>
      <div className="expense-amount">
        {expenseAmount.toLocaleString("en-us", formatCurrency)}
      </div>
      <div className="expense-description">
        {formatDescription(expense.description)}
      </div>
      <div className="expense-category">{categoryName}</div>
      <div className="expense-type">
        {expense.team_Id === personalTeam.teamId ? "Personal" : "Shared"}
      </div>
    </li>
  )
}
