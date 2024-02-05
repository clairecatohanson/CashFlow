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

export const deleteExpense = async (expenseId) => {
  const deleteOptions = {
    method: "DELETE",
  }

  return await fetch(
    `http://localhost:8088/expenses/${expenseId}`,
    deleteOptions
  )
}

export const getExpenseById = async (expenseId) => {
  const response = await fetch(
    `http://localhost:8088/expenses/${expenseId}?_expand=category&_expand=user&_embed=payments`
  )
  return await response.json()
}

export const getExpensesWithDetails = async () => {
  const response = await fetch(
    "http://localhost:8088/expenses?_expand=category&_expand=user&_embed=payments"
  )
  return await response.json()
}

export const getExpenses = async () => {
  const response = await fetch("http://localhost:8088/expenses")
  return await response.json()
}
