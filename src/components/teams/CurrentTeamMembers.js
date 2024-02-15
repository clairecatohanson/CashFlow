import { TeamMemberItem } from "./TeamMemberItem"

export const CurrentTeamMembers = ({ currentUserTeams }) => {
  return (
    // Team Members Container
    <div className="p-6 flex flex-col items-center space-y-6">
      {currentUserTeams.map((ut) => (
        <TeamMemberItem key={`userteam-${ut.id}`} ut={ut} />
      ))}
    </div>
  )
}
