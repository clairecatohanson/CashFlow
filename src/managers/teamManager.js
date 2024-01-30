export const getUserTeamsByUser = async (user) => {
  const response = await fetch(
    `http://localhost:8088/userTeams?userId=${user.id}&_expand=team`
  )
  return await response.json()
}
