import { useState } from "react"
import { ExpenseList } from "./ExpenseList"
import { ExpenseDetails } from "./ExpenseDetails"

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
            payments={payments}
            setPayments={setPayments}
          />
        </div>
        <div className="expenses">
          <h3 className="section-heading">Your Expenses</h3>
          <div className="filter-bar">Filter Bar</div>
          <ExpenseList
            user={user}
            expenses={expenses}
            personalTeam={personalTeam}
            userTeams={userTeams}
            setSelectedExpense={setSelectedExpense}
            categories={categories}
          />
        </div>
      </div>
    </div>
  )
}
