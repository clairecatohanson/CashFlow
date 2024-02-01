export const ExpenseList = () => {
  return (
    <ul className="expense-list">
      <li className="expense-item header-row">
        <div className="date">Date</div>
        <div className="amount">Amount</div>
        <div className="description">Description</div>
        <div className="category">Category</div>
        <div className="expense-type">Expense Type</div>
      </li>
    </ul>
  )
}
