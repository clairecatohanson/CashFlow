export const addExpense = async (newExpense) => {
  const postOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newExpense),
  }
  return await fetch("http://localhost:8088/expenses", postOptions)
}

export const updateExpense = async (updatedExpense) => {
  const putOptions = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedExpense),
  }
  return await fetch(
    `http://localhost:8088/expenses/${updatedExpense.id}`,
    putOptions
  )
}

export const getExpenseById = async (expenseId) => {
  const response = await fetch(`http://localhost:8088/expenses/${expenseId}`)
  return await response.json()
}
