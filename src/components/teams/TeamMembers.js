import { TeamMember } from "./TeamMember"

export const TeamMembers = ({
  user,
  userTeams,
  setUserTeams,
  tempUserTeams,
  setTempUserTeams,
}) => {
  return (
    <ul className="team-members">
      {userTeams.map((userTeam) => (
        <TeamMember
          key={`userTeam-${userTeam.userId}`}
          user={user}
          userTeam={userTeam}
          userTeams={userTeams}
          setUserTeams={setUserTeams}
          tempUserTeams={tempUserTeams}
          setTempUserTeams={setTempUserTeams}
        />
      ))}
    </ul>
  )
}
