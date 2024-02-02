import { useState } from "react"
import { ExpenseList } from "./ExpenseList"
import { ExpenseDetails } from "./ExpenseDetails"

export const AllExpenses = ({
  user,
  expenses,
  personalTeam,
  userTeams,
  getAndSetUserExpenses,
  userPayments,
  setUserPayments,
  payments,
  setPayments,
  selectedExpense,
  setSelectedExpense,
}) => {
  // const [selectedExpense, setSelectedExpense] = useState({})

  return (
    <div className="your-expenses">
      <div className="expenses-container">
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
        <div className="expenses">
          <h3 className="section-heading">Your Expenses</h3>
          <div className="filter-bar">Filter Bar</div>
          <ExpenseList
            expenses={expenses}
            personalTeam={personalTeam}
            userTeams={userTeams}
            setSelectedExpense={setSelectedExpense}
          />
        </div>
      </div>
    </div>
  )
}
