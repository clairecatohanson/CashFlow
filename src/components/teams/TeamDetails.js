import { useParams, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { getUserTeamsByTeam } from "../../managers/teamManager"
import { CurrentTeamMembers } from "./CurrentTeamMembers"
import { TopCategories } from "./TopCategories"
import { NetTeamDebts } from "./NetTeamDebts"
import { getExpensesByTeam } from "../../managers/expenseManager"

export const TeamDetails = ({ user, categories }) => {
  const { teamId } = useParams()
  const navigate = useNavigate()

  const [currentUserTeams, setCurrentUserTeams] = useState([])
  const [teamExpenses, setTeamExpenses] = useState([])

  useEffect(() => {
    getUserTeamsByTeam(teamId).then((res) => {
      setCurrentUserTeams(res)
    })

    getExpensesByTeam(teamId).then((res) => {
      setTeamExpenses(res)
    })
  }, [teamId])

  return (
    <div className="team-details-container">
      <h2 className="page-heading">Team Details</h2>
      <h3 className="section-heading">{currentUserTeams[0]?.team.name}</h3>
      <div className="team-details-cards">
        <section className="team-members-card">
          <h3 className="card-heading">Team Members</h3>
          <CurrentTeamMembers currentUserTeams={currentUserTeams} />
        </section>
        <section className="team-spending-card">
          <h3 className="card-heading">Top Spending Categories</h3>
          <TopCategories teamExpenses={teamExpenses} />
        </section>
        <section className="team-net-debts-card">
          <h3 className="card-heading">Net Unsettled Debts</h3>
          <NetTeamDebts
            user={user}
            currentUserTeams={currentUserTeams}
            teamExpenses={teamExpenses}
          />
        </section>
      </div>
      <button
        className="edit-btn"
        onClick={() => {
          navigate(`/edit-team/${teamId}`)
        }}
      >
        Edit Team
      </button>
    </div>
  )
}
