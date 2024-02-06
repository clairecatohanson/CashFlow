import { TeamMemberCard } from "./TeamMemberCard"

export const CurrentTeamMembers = ({ currentUserTeams }) => {
  return (
    <div className="current-team-members">
      {currentUserTeams.map((ut) => (
        <TeamMemberCard key={`userteam-${ut.id}`} ut={ut} />
      ))}
    </div>
  )
}
