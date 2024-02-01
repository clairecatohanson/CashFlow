import { Expense } from "./Expense"

export const ExpenseList = ({
  expenses,
  personalTeam,
  userTeams,
  setSelectedExpense,
}) => {
  return (
    <ul className="expense-list">
      <li className="list-header">
        <div className="expense-date">Date</div>
        <div className="expense-amount">Amount</div>
        <div className="expense-description">Description</div>
        <div className="expense-category">Category</div>
        <div className="expense-type">Expense Type</div>
      </li>
      {personalTeam?.teamId &&
        expenses.map((expense) => (
          <Expense
            key={`expense=${expense.id}`}
            expense={expense}
            personalTeam={personalTeam}
            userTeams={userTeams}
            setSelectedExpense={setSelectedExpense}
          />
        ))}
    </ul>
  )
}
