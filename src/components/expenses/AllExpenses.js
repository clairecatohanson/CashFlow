import { useState } from "react"
import { ExpenseList } from "./ExpenseList"
import { ExpenseDetails } from "./ExpenseDetails"
import { FilterBar } from "../filterbar/FilterBar"
import { useNavigate } from "react-router-dom"

export const AllExpenses = ({
  user,
  expenses,
  personalTeam,
  userTeams,
  getAndSetUserExpenses,
  payments,
  setPayments,
  selectedExpense,
  setSelectedExpense,
  categories,
}) => {
  const navigate = useNavigate()

  const [searchInput, setSearchInput] = useState("")
  const [categoryDropdown, setCategoryDropdown] = useState(0)
  const [teamDropdown, setTeamDropdown] = useState(0)
  const [dropdownFilteredExpenses, setDropdownFilteredExpenses] = useState([])
  const [filteredExpenses, setFilteredExpenses] = useState([])

  return (
    <div className="your-expenses">
      <h2 className="page-heading">Expenses</h2>
      <div className="btns-container">
        <button
          className="next-btn"
          onClick={() => {
            navigate("/new-expense")
          }}
        >
          Add New Expense
        </button>
      </div>
      <div className="expenses-container">
        <div className="expenses">
          <FilterBar
            categories={categories}
            expenses={expenses}
            personalTeam={personalTeam}
            userTeams={userTeams}
            searchInput={searchInput}
            setSearchInput={setSearchInput}
            setFilteredExpenses={setFilteredExpenses}
            categoryDropdown={categoryDropdown}
            setCategoryDropdown={setCategoryDropdown}
            dropdownFilteredExpenses={dropdownFilteredExpenses}
            setDropdownFilteredExpenses={setDropdownFilteredExpenses}
            teamDropdown={teamDropdown}
            setTeamDropdown={setTeamDropdown}
          />
          <ExpenseList
            user={user}
            expenses={expenses}
            filteredExpenses={filteredExpenses}
            personalTeam={personalTeam}
            userTeams={userTeams}
            setSelectedExpense={setSelectedExpense}
            categories={categories}
          />
        </div>
        <div className="expense-details">
          <ExpenseDetails
            user={user}
            selectedExpense={selectedExpense}
            setSelectedExpense={setSelectedExpense}
            personalTeam={personalTeam}
            userTeams={userTeams}
            getAndSetUserExpenses={getAndSetUserExpenses}
            payments={payments}
            setPayments={setPayments}
          />
        </div>
      </div>
    </div>
  )
}
