import {
  fetchWithResponse,
  fetchWithoutResponse,
  deleteOptions,
  getOptions,
  postOptions,
  putOptions,
} from "./fetcher"

export const getUserTeamsByUser = async (user) => {
  return await fetchWithResponse(
    `userteams?userId=${user.id}&_expand=team`,
    getOptions()
  )
}

export const getUserTeamsByTeam = async (teamId) => {
  return await fetchWithResponse(
    `userteams?teamId=${teamId}&_expand=user&_expand=team`,
    getOptions()
  )
}

export const createTeam = async (newTeam) => {
  return await fetchWithResponse("teams", postOptions(newTeam))
}

export const createUserTeam = async (userTeam) => {
  return await fetchWithResponse("userteams", postOptions(userTeam))
}

export const deleteTeam = async (teamId) => {
  return await fetchWithoutResponse(`teams/${teamId}`, deleteOptions())
}

export const editTeam = async (team) => {
  return await fetchWithoutResponse(`teams/${team.id}`, putOptions(team))
}

export const getTeams = async () => {
  return await fetchWithResponse("teams", getOptions())
}

export const getTeamById = async (teamId) => {
  return await fetchWithResponse(`teams/${teamId}`, getOptions())
}

export const deleteUserTeam = async (userTeamId) => {
  return await fetchWithoutResponse(`userteams/${userTeamId}`, deleteOptions())
}
