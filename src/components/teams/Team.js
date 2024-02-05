import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getUserTeamsByTeam } from "../../managers/teamManager"
import { getExpensesByTeam } from "../../managers/expenseManager"

export const Team = ({ ut, teams }) => {
  const navigate = useNavigate()

  const [teamMatch, setTeamMatch] = useState({})
  const [userCount, setUserCount] = useState(0)
  const [expenseCount, setExpenseCount] = useState(0)

  useEffect(() => {
    if (teams.length && ut.id) {
      const foundTeam = teams.find((t) => t.id === ut.teamId)
      setTeamMatch(foundTeam)
    }
  }, [ut, teams])

  useEffect(() => {
    if (teamMatch.id) {
      getUserTeamsByTeam(teamMatch.id).then((res) => {
        const count = res.length
        setUserCount(count)
      })

      getExpensesByTeam(teamMatch.id).then((res) => {
        const count = res.length
        setExpenseCount(count)
      })
    }
  }, [teamMatch])

  return (
    <li
      className="team-list-item"
      onClick={() => {
        navigate(`/teams/${teamMatch.id}`)
      }}
    >
      <div className="team-name">{teamMatch.name}</div>
      <div className="team-member-count">{userCount} team members</div>
      <div className="team-expense-count">
        {expenseCount}{" "}
        {expenseCount === 1 ? "shared expense" : "shared expenses"}
      </div>
    </li>
  )
}
