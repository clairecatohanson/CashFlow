import { Expense } from "./Expense"

export const ExpenseList = ({
  user,
  expenses,
  personalTeam,
  userTeams,
  setSelectedExpense,
  categories,
  filteredExpenses,
}) => {
  return (
    <ul className="expense-list">
      <li className="list-header">
        <div className="expense-date">Date</div>
        <div className="expense-amount">Amount</div>
        <div className="expense-description">Description</div>
        <div className="expense-category">Category</div>
      </li>
      {filteredExpenses.map((expense) => (
        <Expense
          key={`expense=${expense.id}`}
          user={user}
          expense={expense}
          personalTeam={personalTeam}
          userTeams={userTeams}
          setSelectedExpense={setSelectedExpense}
          categories={categories}
        />
      ))}
    </ul>
  )
}
