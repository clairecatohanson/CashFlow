export const deletePayment = async (id) => {
  const deleteOptions = {
    method: "DELETE",
  }

  return await fetch(`http://localhost:8088/payments/${id}`, deleteOptions)
}

export const deleteUserPayment = async (userPaymentId) => {
  const deleteOptions = {
    method: "DELETE",
  }

  return await fetch(
    `http://localhost:8088/userPayments/${userPaymentId}`,
    deleteOptions
  )
}

export const getPayments = async () => {
  const response = await fetch("http://localhost:8088/payments")
  return await response.json()
}

export const getUserPayments = async () => {
  const response = await fetch("http://localhost:8088/userPayments")
  return await response.json()
}
