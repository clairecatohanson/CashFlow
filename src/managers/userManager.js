export const createUser = async (newUser) => {
  const postOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newUser),
  }
  const response = await fetch("http://localhost:8088/users", postOptions)
  return await response.json()
}

export const getUserByUsername = async (username) => {
  const response = await fetch(
    `http://localhost:8088/users?username=${username}`
  )
  return await response.json()
}

export const getUserById = async (userId) => {
  const response = await fetch(
    `http://localhost:8088/users/${userId}?_embed=userPayments&_embed=userTeams`
  )
  return await response.json()
}

export const updateUser = async (updatedUser) => {
  const putOptions = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedUser),
  }
  return await fetch(
    `http://localhost:8088/users/${updatedUser.id}`,
    putOptions
  )
}
