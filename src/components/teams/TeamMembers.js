import { TeamMember } from "./TeamMember"

export const TeamMembers = ({
  user,
  teamUserTeams,
  setTeamUserTeams,
  tempUserTeams,
  setTempUserTeams,
}) => {
  return (
    <ul className="flex flex-col space-y-6 items-start">
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
