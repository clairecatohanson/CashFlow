import { Link } from "react-router-dom"
import { useState } from "react"
import { ExpenseList } from "./ExpenseList"
import { ExpenseDetails } from "./ExpenseDetails"

export const Expenses = ({
  user,
  expenses,
  personalTeam,
  userTeams,
  getAndSetUserExpenses,
  userPayments,
  setUserPayments,
  payments,
  setPayments,
}) => {
  const [selectedExpense, setSelectedExpense] = useState({})

  return (
    <div className="your-expenses">
      <h2 className="page-header">Your Expenses</h2>
      <div className="actions-container">
        <div className="filter-bar">Filter Bar</div>
        <div className="btns-container">
          <button className="add-btn">
            <Link to="/new-expense" className="btn-link">
              Add New Expense
            </Link>
          </button>
        </div>
      </div>
      <div className="expenses-container">
        <div className="expenses">
          <ExpenseList
            expenses={expenses}
            personalTeam={personalTeam}
            userTeams={userTeams}
            setSelectedExpense={setSelectedExpense}
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
            userPayments={userPayments}
            setUserPayments={setUserPayments}
            payments={payments}
            setPayments={setPayments}
          />
        </div>
      </div>
    </div>
  )
}
