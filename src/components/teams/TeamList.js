import { useEffect, useState } from "react"

import { Team } from "./Team"
import { getTeams } from "../../managers/teamManager"

export const TeamList = ({ userTeams }) => {
  const [teams, setTeams] = useState([])

  useEffect(() => {
    getTeams().then((res) => {
      const teamIds = []
      userTeams.forEach((ut) => teamIds.push(ut.teamId))
      const currentTeams = res.filter((t) => teamIds.includes(t.id))
      setTeams(currentTeams)
    })
  }, [userTeams])

  return (
    <ul className="team-list">
      {userTeams.map((ut) => (
        <Team key={`userteam-${ut.id}`} ut={ut} teams={teams} />
      ))}
    </ul>
  )
}
