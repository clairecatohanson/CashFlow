import { TeamMemberCard } from "./TeamMemberCard"

export const CurrentTeamMembers = ({ currentUserTeams }) => {
  return (
    <div className="current-team-members">
      {currentUserTeams.map((ut) => (
        <TeamMemberCard ut={ut} />
      ))}
    </div>
  )
}
