import { ExpenseList } from "./ExpenseList"

export const Expenses = () => {
  return (
    <div className="your-expenses">
      <h2 className="page-header">Your Expenses</h2>
      <div className="actions-container">
        <div className="filter-bar">Filter Bar</div>
        <div className="btns-container">
          <button className="add-btn">Add New Expense</button>
        </div>
      </div>
      <div className="expenses-container">
        <div className="expenses">
          <ExpenseList />
        </div>
        <div className="expense-details">Expense Details</div>
      </div>
    </div>
  )
}
