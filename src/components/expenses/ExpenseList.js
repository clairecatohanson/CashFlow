import { Expense } from "./Expense"

export const ExpenseList = ({
  user,
  userTeams,
  setSelectedExpense,
  categories,
  filteredExpenses,
}) => {
  return (
    // Expense List
    <ul className="py-4 text-sm md:text-base rounded-b-md">
      {/* Header Row */}
      <li className="flex flex-nowrap space-x-2 mb-2 p-2 font-semibold md:text-lg">
        <div className="w-1/6 min-w-[100px]">Date</div>
        <div className="w-1/6 min-w-[80px]">Amount</div>
        <div className="w-1/2">Description</div>
        <div className="w-1/6">Category</div>
      </li>
      {filteredExpenses.map((expense) => (
        <Expense
          key={`expense=${expense.id}`}
          user={user}
          expense={expense}
          userTeams={userTeams}
          setSelectedExpense={setSelectedExpense}
          categories={categories}
        />
      ))}
    </ul>
  )
}
