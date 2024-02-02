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

export const createPayment = async (payment) => {
  const postOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payment),
  }

  const response = await fetch("http://localhost:8088/payments", postOptions)
  return await response.json()
}

export const createUserPayment = async (userPayment) => {
  const postOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userPayment),
  }

  return await fetch("http://localhost:8088/userPayments", postOptions)
}
