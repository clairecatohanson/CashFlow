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
  userTeams,
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

  const renderNeedsAttentionIcon = (expense) => {
    if (expense.userId !== user.id && expense.amount > 0) {
      if (!expense.payments.length) {
        return (
          <div className="w-1/12">
            <i className="fa-solid fa-magnifying-glass-dollar"></i>
          </div>
        )
      } else if (expense.payments.length) {
        let paymentSum = 0
        expense.payments.forEach((payment) => (paymentSum += payment.amount))
        const foundUT = userTeams.find((ut) => ut.teamId === expense.team_Id)
        if (paymentSum < (expense.amount * foundUT.splitPercent) / 100) {
          return (
            <div className="w-1/12">
              <i className="fa-solid fa-magnifying-glass-dollar"></i>
            </div>
          )
        } else return <div className="w-1/12"> </div>
      }
    } else return <div className="w-1/12"> </div>
  }

  return (
    <li
      className="flex items-center flex-nowrap space-x-2 p-2 rounded-md even:bg-gray-200 hover:bg-opacity-50 hover:outline hover:outline-2 hover:outline-teal-500/50"
      key={`expense=${expense.id}`}
      onClick={() => {
        setSelectedExpense(expense)
      }}
    >
      <div className="w-1/6 min-w-[100px]">
        {formatDate(expense.date).withYear}
      </div>
      <div className="w-1/6 min-w-[80px]">
        {expenseAmount.toLocaleString("en-us", formatCurrency)}
      </div>
      <div className="w-1/2">{formatDescription(expense.description)}</div>
      <div className="w-1/6 min-w-[110px]">{categoryName}</div>
      {renderNeedsAttentionIcon(expense)}
    </li>
  )
}
