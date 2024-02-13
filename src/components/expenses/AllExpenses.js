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
    // Global Container
    <div className="bg-gray-100 min-h-screen">
      {/* Header & Buttons Container */}
      <div className="flex flex-col items-center justify-between md:flex-row md:items-center w-full bg-gray-200 p-6 mx-auto">
        {/* Header */}
        <div className="m-2 text-center md:text-left">
          <h2 className="text-4xl mb-2">Expenses</h2>
          <h3 className="text-xl">
            All of your personal and shared expenses in one place
          </h3>
        </div>
        {/* Buttons */}
        <div className="m-2">
          <button
            className="p-4 bg-orange-300 rounded-md text-lg shadow-orange-700 shadow hover:-translate-y-0.5 duration-150"
            onClick={() => {
              navigate("/new-expense")
            }}
          >
            Add New Expense
          </button>
        </div>
      </div>
      {/* Expense List & Expense Details Container */}
      <div className="flex flex-col-reverse justify-between space-y-reverse space-y-4 items-center xl:flex-row xl:justify-between xl:items-start xl:space-y-reverse-0 xl:space-x-4 mt-8 mx-4 pb-12 text-teal-800 rounded-md">
        {/* Expense List Container */}
        <div className="w-full shadow-gray-300 shadow-md bg-gray-100 rounded-md">
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
            filteredExpenses={filteredExpenses}
            userTeams={userTeams}
            setSelectedExpense={setSelectedExpense}
            categories={categories}
          />
        </div>
        {/* Expense Details Container */}
        <div className="w-[32rem] min-w-[32rem] border-2 border-teal-600 bg-[#F4F8F2] rounded-xl p-4 ">
          <ExpenseDetails
            user={user}
            selectedExpense={selectedExpense}
            setSelectedExpense={setSelectedExpense}
            personalTeam={personalTeam}
            userTeams={userTeams}
            getAndSetUserExpenses={getAndSetUserExpenses}
            setPayments={setPayments}
          />
        </div>
      </div>
    </div>
  )
}
