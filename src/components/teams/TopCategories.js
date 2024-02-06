import { useEffect, useState } from "react"
import { getExpensesByTeam } from "../../managers/expenseManager"
import { formatCurrency } from "../../utils/functions"

export const TopCategories = ({ teamExpenses }) => {
  const [sortedExpenseData, setSortedExpenseData] = useState([])

  useEffect(() => {
    const expenseData = []
    teamExpenses.forEach((expense) => {
      expenseData.push({
        categoryId: expense.categoryId,
        category: expense.category,
        amount: expense.amount,
      })
    })

    const analyzedData = []
    expenseData.forEach((data) => {
      if (analyzedData.find((aData) => aData.categoryId === data.categoryId)) {
        const foundIndex = analyzedData.findIndex(
          (aData) => aData.categoryId === data.categoryId
        )
        analyzedData[foundIndex].amount += data.amount
      } else {
        analyzedData.push({
          categoryId: data.categoryId,
          category: data.category,
          amount: data.amount,
        })
      }
    })

    analyzedData.sort((a, b) => b.amount - a.amount)
    setSortedExpenseData(analyzedData)
  }, [teamExpenses])

  return (
    <div className="top-categories">
      {sortedExpenseData.map((dataObj, i) => {
        if (i < 3) {
          return (
            <div
              key={`category-${dataObj.categoryId}`}
              className="top-category"
            >
              <div className="top-category-name">{dataObj.category.name}</div>
              <div className="top-category-amount">
                {dataObj.amount.toLocaleString("en-us", formatCurrency)}
              </div>
            </div>
          )
        } else return ""
      })}
    </div>
  )
}
