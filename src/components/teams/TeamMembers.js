import { TeamMember } from "./TeamMember"

export const TeamMembers = ({
  user,
  teamUserTeams,
  setTeamUserTeams,
  tempUserTeams,
  setTempUserTeams,
}) => {
  return (
    <ul className="team-members">
      {teamUserTeams.map((userTeam) => (
        <TeamMember
          key={`userTeam-${userTeam.userId}`}
          user={user}
          userTeam={userTeam}
          teamUserTeams={teamUserTeams}
          setTeamUserTeams={setTeamUserTeams}
          tempUserTeams={tempUserTeams}
          setTempUserTeams={setTempUserTeams}
        />
      ))}
    </ul>
  )
}
