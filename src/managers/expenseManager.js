import {
  deleteOptions,
  fetchWithResponse,
  fetchWithoutResponse,
  getOptions,
  postOptions,
  putOptions,
} from "./fetcher"

export const addExpense = async (newExpense) => {
  return await fetchWithResponse("expenses", postOptions(newExpense))
}

export const updateExpense = async (updatedExpense) => {
  return await fetchWithoutResponse(
    `expenses/${updatedExpense.id}`,
    putOptions(updatedExpense)
  )
}

export const deleteExpense = async (expenseId) => {
  return await fetchWithoutResponse(`expenses/${expenseId}`, deleteOptions())
}

export const getExpenseById = async (expenseId) => {
  return await fetchWithResponse(
    `expenses/${expenseId}?_expand=category&_expand=user&_embed=payments`,
    getOptions()
  )
}

export const getExpensesWithDetails = async () => {
  return await fetchWithResponse(
    "expenses?_expand=category&_expand=user&_embed=payments",
    getOptions()
  )
}

export const getExpenses = async () => {
  return await fetchWithResponse("expenses", getOptions())
}

export const getExpensesByTeam = async (teamId) => {
  return await fetchWithResponse(
    `expenses?team_Id=${teamId}&_expand=category&_embed=payments`,
    getOptions()
  )
}
