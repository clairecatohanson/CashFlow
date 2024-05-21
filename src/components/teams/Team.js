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
      const foundTeam = teams.find((t) => t.id === ut.team.id)
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
    <>
      {userCount ? (
        <li
          className="flex flex-col items-center lg:flex-row lg:text-lg lg:justify-between text-center border-2 rounded-lg p-6 hover:border-teal-600"
          onClick={() => {
            navigate(`/teams/${teamMatch.id}`)
          }}
        >
          <div className="lg:w-1/3">{teamMatch.name}</div>
          <div className="lg:w-1/3">{userCount} team members</div>
          <div className="lg:w-1/3">
            {expenseCount}{" "}
            {expenseCount === 1 ? "shared expense" : "shared expenses"}
          </div>
        </li>
      ) : (
        ""
      )}
    </>
  )
}
