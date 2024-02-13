import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getExpensesByTeam } from "../../managers/expenseManager"
import {
  formatCurrency,
  formatDate,
  formatDescription,
} from "../../utils/functions"

export const SharedExpenses = ({ commonUserTeams, setSelectedExpense }) => {
  const navigate = useNavigate()

  const [sharedExpenses, setSharedExpenses] = useState([])

  useEffect(() => {
    if (commonUserTeams.length) {
      const teamIds = []
      commonUserTeams.forEach((ut) => teamIds.push(ut.teamId))
      const expensePromises = teamIds.map((teamId) => getExpensesByTeam(teamId))
      Promise.all(expensePromises).then((expenseRes) => {
        const sharedTeamExpenses = expenseRes.flat()
        sharedTeamExpenses.sort((a, b) => new Date(a.date) - new Date(b.date))
        setSharedExpenses(sharedTeamExpenses)
      })
    }
  }, [commonUserTeams])

  const renderSharedExpenses = () => {
    return (
      <div className="">
        <ul className="py-4 text-sm md:text-base">
          <li className="flex flex-nowrap space-x-2 mb-2 p-2 font-semibold md:text-lg">
            <div className="w-1/6 min-w-[100px]">Date</div>
            <div className="w-1/6 min-w-[80px]">Amount</div>
            <div className="w-2/3">Description</div>
          </li>
          {sharedExpenses.map((expense, i) => {
            if (i < 10) {
              return (
                <li
                  key={`expense-${expense.id}`}
                  className="flex items-center flex-nowrap space-x-2 p-2 rounded-md even:bg-gray-200 hover:bg-opacity-50 hover:outline hover:outline-2 hover:outline-teal-500/50"
                  onClick={() => {
                    setSelectedExpense(expense)
                    navigate("/expenses")
                  }}
                >
                  <div className="w-1/6 min-w-[100px]">
                    {formatDate(expense.date).withoutYear}
                  </div>
                  <div className="w-1/6 min-w-[80px]">
                    {expense.amount.toLocaleString("en-us", formatCurrency)}
                  </div>
                  <div className="w-2/3">
                    {formatDescription(expense.description)}
                  </div>
                </li>
              )
            }
          })}
        </ul>
      </div>
    )
  }

  const renderNothingShared = () => {
    return (
      <div className="text-center p-4">
        You do not have any shared expenses with this user.
      </div>
    )
  }

  return (
    <div className="shared-expenses-module">
      {sharedExpenses.length ? renderSharedExpenses() : renderNothingShared()}
    </div>
  )
}
