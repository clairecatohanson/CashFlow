import {
  fetchWithResponse,
  fetchWithoutResponse,
  getOptions,
  putOptions,
} from "./fetcher"

export const createUser = async (newUser) => {
  const postDetails = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newUser),
  }
  return await fetchWithResponse("register", postDetails)
}

export const login = async (user) => {
  const postDetails = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  }
  return await fetchWithResponse("login", postDetails)
}

export const getUserByUsername = async (username) => {
  return await fetchWithResponse(`users?username=${username}`, getOptions())
}

export const getUserById = async (userId) => {
  return await fetchWithResponse(
    `users/${userId}?_embed=userTeams`,
    getOptions()
  )
}

export const updateUser = async (updatedUser) => {
  return await fetchWithoutResponse(
    `users/${updatedUser.id}`,
    putOptions(updatedUser)
  )
}
