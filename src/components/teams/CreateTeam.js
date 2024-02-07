import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { NewTeamForm } from "./NewTeamForm"
import { TeamMembers } from "./TeamMembers"
import { AddTeamMember } from "./AddTeamMember"
import "./Teams.css"
import { createTeam, createUserTeam } from "../../managers/teamManager"

export const CreateTeam = ({ user }) => {
  const navigate = useNavigate()

  const [teamInput, setTeamInput] = useState("")
  const [newTeam, setNewTeam] = useState({})
  const [teamUserTeams, setTeamUserTeams] = useState([])
  const [tempUserTeams, setTempUserTeams] = useState([])

  useEffect(() => {
    if (newTeam.name) {
      const firstUserTeam = {
        userId: user.id,
        splitPercent: "",
      }
      const utArray = [firstUserTeam]
      setTeamUserTeams(utArray)
      setTempUserTeams(utArray)
    }
  }, [newTeam, user])

  const handleSubmit = (e) => {
    e.preventDefault()

    const tempUtsCopy = structuredClone(tempUserTeams)

    let totalPercent = 0
    tempUtsCopy.forEach((tm) => {
      totalPercent += tm.splitPercent
    })

    if (tempUtsCopy.length === 1 && tempUtsCopy[0].userId === user.id) {
      window.alert("Error: teams must contain at least two members.")
    } else if (tempUtsCopy.find((ut) => ut.splitPercent <= 0)) {
      window.alert(
        "Error: team members must be assigned a percent that is greater than 0."
      )
    } else {
      if (totalPercent === 100.0) {
        createTeam(newTeam).then((res) => {
          const promises = tempUtsCopy.map((tm) => {
            tm.teamId = res.id
            createUserTeam(tm)
          })
          Promise.all(promises).then(() => {
            navigate(`/teams/${res.id}`)
          })
        })
      } else {
        window.alert("The sum of all percentages must equal 100.")
      }
    }
  }

  return (
    <>
      <NewTeamForm
        teamInput={teamInput}
        setTeamInput={setTeamInput}
        setNewTeam={setNewTeam}
      />
      {newTeam.name && (
        <>
          <div className="build-team-section">
            <div className="team-builder">
              <AddTeamMember
                teamUserTeams={teamUserTeams}
                setTeamUserTeams={setTeamUserTeams}
                tempUserTeams={tempUserTeams}
                setTempUserTeams={setTempUserTeams}
              />
            </div>
            <div className="team-member-list">
              <TeamMembers
                user={user}
                teamUserTeams={teamUserTeams}
                setTeamUserTeams={setTeamUserTeams}
                tempUserTeams={tempUserTeams}
                setTempUserTeams={setTempUserTeams}
              />
            </div>
          </div>
          <div className="btn-container">
            <button className="submit-btn" onClick={handleSubmit}>
              Create Team
            </button>
          </div>
        </>
      )}
    </>
  )
}
