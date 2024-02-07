import { useEffect, useState } from "react"
import { getUserById } from "../../managers/userManager"

export const TeamMember = ({
  user,
  userTeam,
  teamUserTeams,
  setTeamUserTeams,
  tempUserTeams,
  setTempUserTeams,
}) => {
  const [currentTM, setCurrentTM] = useState({})
  const [percentInput, setPercentInput] = useState("")
  const [isEditable, setIsEditable] = useState(false)

  useEffect(() => {
    if (userTeam.userId) {
      getUserById(userTeam.userId).then((res) => {
        setCurrentTM(res)
      })
      // setPercentInput(userTeam.splitPercent)
    }
    if (!userTeam.splitPercent) {
      setIsEditable(true)
    }
  }, [userTeam])

  useEffect(() => {
    if (percentInput) {
      const updatedUserTeam = {
        userId: userTeam.userId,
        splitPercent: parseFloat(percentInput),
      }

      const foundIndex = tempUserTeams.findIndex(
        (ut) => ut.userId === userTeam.userId
      )

      const tempUTsCopy = structuredClone(tempUserTeams)
      tempUTsCopy[foundIndex] = updatedUserTeam
      setTempUserTeams(tempUTsCopy)
    }
  }, [percentInput, userTeam])

  const handleInput = (e) => {
    setPercentInput(e.target.value)
  }

  const handleDelete = (e) => {
    if (userTeam.userId === user.id) {
      window.alert(
        "Error: you cannot remove yourself from a team that you are creating or editing."
      )
    } else {
      const foundTempUtIndex = tempUserTeams.findIndex(
        (ut) => ut.userId === userTeam.userId
      )
      const tempUtsCopy = structuredClone(tempUserTeams)
      tempUtsCopy.splice(foundTempUtIndex, 1)
      setTempUserTeams(tempUtsCopy)

      const foundUtIndex = teamUserTeams.findIndex(
        (ut) => ut.userId === userTeam.userId
      )
      const UtsCopy = structuredClone(teamUserTeams)
      UtsCopy.splice(foundUtIndex, 1)
      setTeamUserTeams(UtsCopy)
    }
  }

  const handleEdit = (userTeam) => {
    if (userTeam.splitPercent) {
      setPercentInput(userTeam.splitPercent)
    }
    setIsEditable(true)
  }

  const renderButtons = (userTeam) => {
    return (
      <div className="list-btns">
        <button
          className="edit-btn-small"
          onClick={() => {
            handleEdit(userTeam)
          }}
        >
          <i className="fa-regular fa-pen-to-square"></i>
        </button>
      </div>
    )
  }

  return (
    <li className="team-member">
      <div className="team-member-name">
        {currentTM.firstName} {currentTM.lastName}
      </div>
      {isEditable ? (
        <>
          <label htmlFor={`userTeam-${userTeam.userId}-percent`}>%:</label>
          <input
            type="number"
            id={`userTeam-${userTeam.userId}-percent`}
            className="percent-input"
            value={percentInput}
            onChange={handleInput}
          />
        </>
      ) : (
        <>
          <div className={`current-userTeam-${userTeam.userId}-percent`}>
            : {userTeam.splitPercent}%
          </div>
          {renderButtons(userTeam)}
        </>
      )}
      <div className="team-member-btns">
        <button className="delete-btn-small" onClick={handleDelete}>
          Remove
        </button>
      </div>
    </li>
  )
}
