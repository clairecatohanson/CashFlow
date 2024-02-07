import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { AddTeamMember } from "./AddTeamMember"
import { TeamMembers } from "./TeamMembers"
import {
  createUserTeam,
  deleteUserTeam,
  editTeam,
  getUserTeamsByTeam,
} from "../../managers/teamManager"

export const EditTeam = ({ user, getAndSetUserTeams }) => {
  const { teamId } = useParams()
  const navigate = useNavigate()

  const [teamUserTeams, setTeamUserTeams] = useState([])
  const [tempUserTeams, setTempUserTeams] = useState([])
  const [teamNameInput, setTeamNameInput] = useState("")
  const [nameIsEditable, setNameIsEditable] = useState(false)

  useEffect(() => {
    if (teamId) {
      getUserTeamsByTeam(teamId).then((res) => {
        setTeamUserTeams(res)
        setTempUserTeams(res)
        setTeamNameInput(res[0].team.name)
      })
    }
  }, [teamId])

  const handleInput = (e) => {
    setTeamNameInput(e.target.value)
  }

  const handleEdit = () => {
    setNameIsEditable(true)
  }

  const handleSave = async (e) => {
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
        const utsInApi = await getUserTeamsByTeam(teamId)
        const deletePromises = utsInApi.map((ut) => deleteUserTeam(ut.id))
        Promise.all(deletePromises).then(() => {
          const createPromises = tempUtsCopy.map((ut) => {
            const newUT = {
              userId: ut.userId,
              teamId: parseInt(teamId),
              splitPercent: ut.splitPercent,
            }
            return createUserTeam(newUT)
          })
          Promise.all(createPromises).then(() => {
            const teamObj = {
              id: parseInt(teamId),
              name: teamNameInput,
            }
            editTeam(teamObj).then(() => {
              getAndSetUserTeams(user)
              navigate(`/teams/${teamId}`)
            })
          })
        })
      } else {
        window.alert("The sum of all percentages must equal 100.")
      }
    }
  }

  return (
    <div className="edit-team-container">
      <h2 className="page-heading">Edit Team</h2>
      {nameIsEditable ? (
        <input
          className="edit-team-name-input"
          type="text"
          value={teamNameInput}
          onChange={handleInput}
        />
      ) : (
        <div className="edit-team-name">
          <div className="current-name">{teamUserTeams[0]?.team.name}</div>
          <button className="edit-btn-small" onClick={handleEdit}>
            <i className="fa-regular fa-pen-to-square"></i>
          </button>
        </div>
      )}
      <div className="edit-team-members">
        <section className="edit-add-members">
          <AddTeamMember
            teamUserTeams={teamUserTeams}
            setTeamUserTeams={setTeamUserTeams}
            tempUserTeams={tempUserTeams}
            setTempUserTeams={setTempUserTeams}
          />
        </section>
        <section className="edit-update-members">
          <TeamMembers
            user={user}
            teamUserTeams={teamUserTeams}
            setTeamUserTeams={setTeamUserTeams}
            tempUserTeams={tempUserTeams}
            setTempUserTeams={setTempUserTeams}
          />
        </section>
      </div>
      <div className="btns-container">
        <button className="save-btn" onClick={handleSave}>
          Save Changes
        </button>
      </div>
    </div>
  )
}
