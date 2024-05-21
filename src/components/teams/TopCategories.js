import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { formatCurrency } from "../../utils/functions"
import { Pie, Bar } from "react-chartjs-2"

export const TopCategories = ({ user, teamExpenses }) => {
  const { teamId } = useParams()

  const [sortedExpenseData, setSortedExpenseData] = useState([])
  const [expenseGroups, setExpenseGroups] = useState({})
  const [expenseGroupTotals, setExpenseGroupTotals] = useState({})

  useEffect(() => {
    if (user.user_teams?.length && teamExpenses.length) {
      const expenseData = []
      teamExpenses.forEach((expense) => {
        let adjustedAmount = 0
        if (!teamId) {
          const expenseTeamId = expense.team.id
          const foundUT = user.user_teams.find(
            (ut) => ut.team === expenseTeamId
          )
          adjustedAmount = (foundUT.splitFraction * expense.amount) / 100
        } else {
          adjustedAmount = expense.amount
        }
        expenseData.push({
          categoryId: expense.category.id,
          category: expense.category,
          amount: adjustedAmount,
          teamId: expense.team.id,
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
            teamId: data.teamId,
          })
        }
      })

      analyzedData.sort((a, b) => b.amount - a.amount)
      setSortedExpenseData(analyzedData)
    }
  }, [user, teamExpenses, teamId])

  useEffect(() => {
    if (sortedExpenseData.length) {
      const expenseGroupArrays = {
        Essential: [],
        NonEssential: [],
        Savings: [],
        Business: [],
        Tax: [],
        Special: [],
      }

      sortedExpenseData.forEach((expense) => {
        if (expense.category?.group === 1) {
          expenseGroupArrays.Essential.push(expense)
        } else if (expense.category?.group === 2) {
          expenseGroupArrays.NonEssential.push(expense)
        } else if (expense.category?.group === 3) {
          expenseGroupArrays.Savings.push(expense)
        } else if (expense.category?.group === 5) {
          expenseGroupArrays.Business.push(expense)
        } else if (expense.category?.group === 6) {
          expenseGroupArrays.Tax.push(expense)
        } else if (expense.category?.group === 7) {
          expenseGroupArrays.Special.push(expense)
        }
      })
      setExpenseGroups(expenseGroupArrays)
    }
  }, [sortedExpenseData])

  useEffect(() => {
    const egTotalsObj = {}
    Object.entries(expenseGroups).forEach(([arrName, arr]) => {
      let total = 0
      arr.forEach((expense) => (total += expense.amount))
      total = total.toFixed(2)
      egTotalsObj[arrName] = total
      setExpenseGroupTotals(egTotalsObj)
    })
  }, [expenseGroups])

  return (
    <>
      <div className="text-center w-4/5 mx-auto bg-white p-3 rounded-lg shadow-gray-300 shadow-lg mb-8">
        <h3 className="text-lg my-4 text-center font-semibold">
          Top Spending Categories
        </h3>
        <div className="flex flex-row flex-wrap justify-center items-center space-x-6 text-sm">
          {sortedExpenseData.map((dataObj, i) => {
            if (dataObj.category?.groupId !== 4) {
              if (i < 4) {
                return (
                  <div key={`category-${dataObj.categoryId}`} className="mb-4">
                    <div>{dataObj.category.name}</div>
                    <div>
                      {dataObj.amount.toLocaleString("en-us", formatCurrency)}
                    </div>
                  </div>
                )
              } else return ""
            }
          })}
        </div>
      </div>
      {/* Charts Container */}
      <div className="flex flex-col space-y-6 md:flex-row md:space-y-0 md:space-x-6">
        {/* Expense Group Breakdown Container */}
        <div className="w-11/12 md:w-2/5 p-4">
          {expenseGroupTotals.Essential && (
            <div className="expense-groups h-[50vh]">
              <Bar
                data={{
                  labels: Object.keys(expenseGroupTotals),
                  datasets: [
                    {
                      label: "Expense Type",
                      data: Object.values(expenseGroupTotals),
                    },
                  ],
                }}
                options={{
                  plugins: {
                    title: {
                      text: "Expense Group Breakdown",
                    },
                    legend: {
                      display: false,
                    },
                  },
                }}
              />
            </div>
          )}
        </div>
        {/* Category Breakdown Container */}
        <div className="flex flex-col w-11/12 md:w-3/5 p-4 lg:flex-row lg:justify-start">
          {expenseGroups.Essential?.length && (
            <div className="essential w-full lg:w-1/2 h-[50vh] md:px-6">
              <Pie
                data={{
                  labels: expenseGroups.Essential.map(
                    (aData) => aData.category.name
                  ),
                  datasets: [
                    {
                      label: "Essential",
                      data: expenseGroups.Essential.map(
                        (aData) => aData.amount
                      ),
                    },
                  ],
                }}
                options={{
                  plugins: {
                    title: {
                      text: "Essential Spending Categories",
                    },
                  },
                }}
              />
            </div>
          )}
          {expenseGroups.NonEssential?.length && (
            <div className="non-essential w-full lg:w-1/2 h-[50vh] md:px-6">
              <Pie
                data={{
                  labels: expenseGroups.NonEssential.map(
                    (aData) => aData.category.name
                  ),
                  datasets: [
                    {
                      label: "Non-Essential",
                      data: expenseGroups.NonEssential.map(
                        (aData) => aData.amount
                      ),
                    },
                  ],
                }}
                options={{
                  plugins: {
                    title: {
                      text: "Non-Essential Spending Categories",
                    },
                  },
                }}
              />
            </div>
          )}
        </div>
      </div>
    </>
  )
}
