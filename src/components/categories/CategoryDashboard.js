import { useEffect, useState } from "react"
import { Bar, Line } from "react-chartjs-2"
import { DateFilter } from "../filterbar/DateFilter"
import { formatCurrency } from "../../utils/functions"

export const CategoryDashboard = ({
  user,
  expenses,
  categories,
  userTeams,
  personalTeam,
}) => {
  const [dateFilteredExpenses, setDateFilteredExpenses] = useState([])
  const [selectedCategoryId, setSelectedCategoryId] = useState(0)
  const [chartData, setChartData] = useState({})
  const [expensesByCategory, setExpensesByCategory] = useState([])
  const [allExpensesByCategory, setAllExpensesByCategory] = useState([])

  useEffect(() => {
    if (selectedCategoryId && dateFilteredExpenses) {
      const categoryExpenses = dateFilteredExpenses.filter(
        (expense) =>
          parseInt(expense.category.id) === parseInt(selectedCategoryId)
      )
      const categoryExpensesAll = expenses.filter(
        (expense) => expense.category.id === selectedCategoryId
      )
      setExpensesByCategory(categoryExpenses)
      setAllExpensesByCategory(categoryExpensesAll)
    } else setExpensesByCategory(dateFilteredExpenses)
  }, [dateFilteredExpenses, selectedCategoryId, expenses])

  useEffect(() => {
    let totalSpent = 0
    const spendingByUserTeam = {
      Personal: 0,
    }
    userTeams.forEach((ut) => (spendingByUserTeam[ut.team.name] = 0))

    const today = new Date()
    const spendingByMonth = {}
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ]

    for (let i = 12; i > 0; i--) {
      let month = today.getMonth() - i
      let year = today.getFullYear()
      if (month < 0) {
        month += 12
        year--
      }
      const key = `${year}-${months[month]}`
      spendingByMonth[key] = 0

      const filteredByMonth = allExpensesByCategory.filter((expense) => {
        const expenseDate = new Date(expense.date)
        return (
          expenseDate.getMonth() === month &&
          expenseDate.getFullYear() === year &&
          expense.category.group !== 4
        )
      })

      filteredByMonth.forEach((expense) => {
        if (expense.team.id === personalTeam.team.id) {
          spendingByMonth[key] += expense.amount
        } else {
          const foundUT = userTeams.find((ut) => ut.team.id === expense.team.id)
          spendingByMonth[key] += (expense.amount * foundUT.splitFraction) / 100
        }
      })
    }

    expensesByCategory.forEach((e) => {
      if (e.category.group !== 4) {
        if (e.team.id === personalTeam.team.id) {
          spendingByUserTeam.Personal += e.amount
        } else {
          const foundUT = userTeams.find((ut) => ut.team.id === e.team.id)
          spendingByUserTeam[foundUT.team.name] +=
            (e.amount * foundUT.splitFraction) / 100
        }
      }
    })

    const spending = Object.values(spendingByUserTeam)
    spending.forEach((amount) => (totalSpent += amount))

    const combinedData = {
      totalSpent: totalSpent,
      spendingByUserTeam: spendingByUserTeam,
      spendingByMonth: spendingByMonth,
    }
    setChartData(combinedData)
  }, [expensesByCategory, allExpensesByCategory, user, userTeams, personalTeam])

  return (
    // Global Container
    <div className="bg-gray-100 p-6 rounded-md shadow-md shadow-gray-400 text-orange-800 w-11/12 mx-auto max-w-[1500px]">
      <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4">
        {/* Date & Category Filter Card */}
        <div className="flex flex-col bg-gray-200 space-y-8 rounded-md py-10 w-full lg:w-1/4">
          <DateFilter
            filteredExpenses={expenses}
            setDateFilteredExpenses={setDateFilteredExpenses}
          />
          {/* Category Dropdown */}
          <div className="px-4 pb-4">
            <select
              className="bg-white h-10 focus:outline-none w-4/5"
              onChange={(e) => setSelectedCategoryId(parseInt(e.target.value))}
            >
              <option value="" disabled>
                Select Category
              </option>
              <option value="0">All Categories</option>
              {categories.map((c) => (
                <option key={`category-${c.id}`} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        {/* Amount Stats Card */}
        <div className="w-full lg:w-1/4">
          {/* Amount Spent */}
          {chartData.totalSpent && (
            <div>
              {chartData.totalSpent.toLocaleString("en-us", formatCurrency)}
            </div>
          )}
          {/* Bar, Amount By Team */}
          {chartData.spendingByUserTeam && (
            <div className="h-[50vh]">
              <Bar
                data={{
                  labels: Object.keys(chartData.spendingByUserTeam),
                  datasets: [
                    {
                      label: "Spending By Team",
                      data: Object.values(chartData.spendingByUserTeam),
                    },
                  ],
                }}
                options={{
                  plugins: {
                    title: {
                      text: "Spending By Team",
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
        {/* Amount Graph Card */}
        {chartData.spendingByMonth && (
          <div className="w-full lg:w-1/2">
            <Line
              data={{
                labels: Object.keys(chartData.spendingByMonth),
                datasets: [
                  {
                    label: "Spending Per Month",
                    data: Object.values(chartData.spendingByMonth),
                  },
                ],
              }}
              options={{
                // scales: {
                //   x: {
                //     type: "time",
                //     time: {
                //       unit: "month",
                //     },
                //   },
                // },
                plugins: {
                  title: {
                    text: "Spending By Category, Past 12 Months",
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
    </div>
  )
}
