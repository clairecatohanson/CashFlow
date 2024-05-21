import {
  fetchWithResponse,
  fetchWithoutResponse,
  deleteOptions,
  getOptions,
  postOptions,
} from "./fetcher"

export const deletePayment = async (id) => {
  return await fetchWithoutResponse(`payments/${id}`, deleteOptions())
}

export const getPayments = async () => {
  return await fetchWithResponse("payments", getOptions())
}

export const createPayment = async (payment) => {
  return await fetchWithResponse("payments", postOptions(payment))
}
