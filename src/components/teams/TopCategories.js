import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { formatCurrency } from "../../utils/functions"

export const TopCategories = ({ user, teamExpenses }) => {
  const { teamId } = useParams()

  const [sortedExpenseData, setSortedExpenseData] = useState([])

  useEffect(() => {
    if (user.userTeams) {
      const expenseData = []
      teamExpenses.forEach((expense) => {
        let adjustedAmount = 0
        if (!teamId) {
          const expenseTeamId = expense.team_Id
          const foundUT = user.userTeams.find(
            (ut) => ut.teamId === expenseTeamId
          )
          adjustedAmount = (foundUT.splitPercent * expense.amount) / 100
        } else {
          adjustedAmount = expense.amount
        }
        expenseData.push({
          categoryId: expense.categoryId,
          category: expense.category,
          amount: adjustedAmount,
          teamId: expense.team_Id,
        })
      })

      const analyzedData = []
      expenseData.forEach((data) => {
        if (
          analyzedData.find((aData) => aData.categoryId === data.categoryId)
        ) {
          const foundIndex = analyzedData.findIndex(
            (aData) => aData.categoryId === data.categoryId
          )
          analyzedData[foundIndex].amount += data.amount
        } else {
          analyzedData.push({
            categoryId: data.categoryId,
            category: data.category,
            amount: data.amount,
            teamId: data.team_Id,
          })
        }
      })

      analyzedData.sort((a, b) => b.amount - a.amount)
      setSortedExpenseData(analyzedData)
    }
  }, [user, teamExpenses, teamId])

  return (
    <div className="text-center">
      {sortedExpenseData.map((dataObj, i) => {
        if (i < 3) {
          return (
            <div key={`category-${dataObj.categoryId}`} className="mb-4">
              <div className="">{dataObj.category.name}</div>
              <div className="">
                {dataObj.amount.toLocaleString("en-us", formatCurrency)}
              </div>
            </div>
          )
        } else return ""
      })}
    </div>
  )
}
