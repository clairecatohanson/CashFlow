import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { getUserTeamsByTeam } from "../../managers/teamManager"
import { CurrentTeamMembers } from "./CurrentTeamMembers"

export const TeamDetails = () => {
  const { teamId } = useParams()

  const [currentUserTeams, setCurrentUserTeams] = useState([])

  useEffect(() => {
    getUserTeamsByTeam(teamId).then((res) => {
      setCurrentUserTeams(res)
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
        </section>
        <section className="team-net-debts-card">
          <h3 className="card-heading">Net Unsettled Debts</h3>
        </section>
      </div>
    </div>
  )
}
