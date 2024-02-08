import { useEffect, useState } from "react"
import { getExpensesByTeam } from "../../managers/expenseManager"
import {
  formatCurrency,
  formatDate,
  formatDescription,
} from "../../utils/functions"

export const SharedExpenses = ({ user, userTeams, commonUserTeams }) => {
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
      <div className="shared-expenses">
        <ul className="shared-expense-list">
          {sharedExpenses.map((expense, i) => {
            if (i < 10) {
              return (
                <li
                  key={`expense-${expense.id}`}
                  className="shared-expense-item"
                >
                  <div className="shared-expense-date">
                    {formatDate(expense.date).withoutYear}
                  </div>
                  <div className="shared-expense-amount">
                    {expense.amount.toLocaleString("en-us", formatCurrency)}
                  </div>
                  <div className="shared-expense-description">
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
    return "You do not have any shared expenses with this user."
  }

  return (
    <div className="shared-expenses-module">
      {sharedExpenses.length ? renderSharedExpenses() : renderNothingShared()}
    </div>
  )
}
