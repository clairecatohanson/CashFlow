export const getUserTeamsByUser = async (user) => {
  const response = await fetch(
    `http://localhost:8088/userTeams?userId=${user.id}&_expand=team`
  )
  return await response.json()
}

export const getUserTeamsByTeam = async (teamId) => {
  const response = await fetch(
    `http://localhost:8088/userTeams?teamId=${teamId}&_expand=user&_expand=team`
  )
  return await response.json()
}

export const createTeam = async (newTeam) => {
  const postOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newTeam),
  }

  const response = await fetch("http://localhost:8088/teams", postOptions)
  return response.json()
}

export const createUserTeam = async (userTeam) => {
  const postOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userTeam),
  }

  const response = await fetch("http://localhost:8088/userTeams", postOptions)
  return await response.json()
}

export const deleteTeam = async (teamId) => {
  const deleteOptions = {
    method: "DELETE",
  }
  return await fetch(`http://localhost:8088/teams/${teamId}`, deleteOptions)
}
