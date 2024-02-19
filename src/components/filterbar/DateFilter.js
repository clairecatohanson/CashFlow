import { useEffect, useState } from "react"

export const DateFilter = ({ filteredExpenses, setDateFilteredExpenses }) => {
  const [dateDropdown, setDateDropdown] = useState(0)
  const [dateRange, setDateRange] = useState({})

  useEffect(() => {
    const today = new Date()
    const currentMonth = today.getMonth()
    const currentYear = today.getFullYear()

    if (!dateDropdown) {
      setDateRange({})
    } else if (dateDropdown === 1) {
      const firstOfMonth = new Date(currentYear, currentMonth, 1)
      const range = {
        start: firstOfMonth,
        end: today,
      }
      setDateRange(range)
    } else if (dateDropdown === 2) {
      const thirtyDaysAgo = new Date()
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
      const range = {
        start: thirtyDaysAgo,
        end: today,
      }
      setDateRange(range)
    } else if (dateDropdown === 3) {
      const ninetyDaysAgo = new Date()
      ninetyDaysAgo.setDate(ninetyDaysAgo.getDate() - 90)
      const range = {
        start: ninetyDaysAgo,
        end: today,
      }
      setDateRange(range)
    } else if (dateDropdown === 4) {
      const firstOfYear = new Date(currentYear, 0, 1)
      const range = {
        start: firstOfYear,
        end: today,
      }
      setDateRange(range)
    }
  }, [dateDropdown])

  useEffect(() => {
    if (dateRange.start && dateRange.end) {
      const filteredByDate = filteredExpenses.filter((expense) => {
        const expenseDate = new Date(expense.date)
        return expenseDate >= dateRange.start && expenseDate <= dateRange.end
      })
      setDateFilteredExpenses(filteredByDate)
    } else setDateFilteredExpenses(filteredExpenses)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dateRange, filteredExpenses])

  return (
    // Date Filter Container
    <div className="flex flex-col space-y-4 w-full px-4 pt-4 bg-gray-200 text-teal-800 rounded-t-md">
      {/* This Month / Last Month / 90 Days / YTD / Custom Dropdown */}
      <div className="flex w-80">
        <select
          name="date-range-dropdown"
          defaultValue=""
          onChange={(e) => setDateDropdown(parseInt(e.target.value))}
          className="h-10 focus:outline-none"
        >
          <option id="label" value="" disabled>
            Select Date Range
          </option>
          <option id="all" value="0">
            Show All
          </option>
          <option id="MTD" value="1">
            This Month
          </option>
          <option id="30D" value="2">
            Last 30 Days
          </option>
          <option id="90D" value="3">
            Last 90 Days
          </option>
          <option id="YTD" value="4">
            Year to Date
          </option>
          <option id="Custom" value="5">
            Custom Date Range
          </option>
        </select>
      </div>
      {/* If Custom selected, display date picker container */}
      {dateDropdown === 5 && (
        <div className="flex flex-col space-y-4">
          {/* Start Date Input */}
          <div>
            <input
              id="start-date"
              type="date"
              onChange={(e) => {
                const startDate = new Date(e.target.value)
                const rangeCopy = { ...dateRange }
                rangeCopy.start = startDate
                setDateRange(rangeCopy)
              }}
              className="h-10 focus:outline-none"
            />
          </div>
          {/* End Date Input */}
          <div>
            <input
              id="end-date"
              type="date"
              onChange={(e) => {
                const endDate = new Date(e.target.value)
                const rangeCopy = { ...dateRange }
                rangeCopy.end = endDate
                setDateRange(rangeCopy)
              }}
              className="h-10 focus:outline-none"
            />
          </div>
        </div>
      )}
    </div>
  )
}
