import { useEffect, useState } from "react"
import { getUserById } from "../../managers/userManager"

export const TeamMember = ({
  user,
  userTeam,
  userTeams,
  setUserTeams,
  tempUserTeams,
  setTempUserTeams,
}) => {
  const [currentTM, setCurrentTM] = useState({})
  const [percentInput, setPercentInput] = useState(0)

  useEffect(() => {
    if (userTeam.userId) {
      getUserById(userTeam.userId).then((res) => {
        setCurrentTM(res)
      })
    }
  }, [userTeam])

  useEffect(() => {
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
  }, [percentInput, userTeam])

  const handleInput = (e) => {
    setPercentInput(e.target.value)
  }

  const handleDelete = (e) => {
    if (userTeam.userId === user.id) {
      window.alert(
        "Error: you cannot remove yourself from a team that you are creating."
      )
    } else {
      const foundTempUtIndex = tempUserTeams.findIndex(
        (ut) => ut.userId === userTeam.userId
      )
      const tempUtsCopy = structuredClone(tempUserTeams)
      tempUtsCopy.splice(foundTempUtIndex, 1)
      setTempUserTeams(tempUtsCopy)

      const foundUtIndex = userTeams.findIndex(
        (ut) => ut.userId === userTeam.userId
      )
      const UtsCopy = structuredClone(userTeams)
      UtsCopy.splice(foundUtIndex, 1)
      setUserTeams(UtsCopy)
    }
  }

  return (
    <li className="team-member">
      <div className="team-member-name">
        {currentTM.firstName} {currentTM.lastName}
      </div>
      <div className="team-member-percent">
        <label htmlFor={`userTeam-${userTeam.userId}-percent`}>%:</label>
        <input
          type="number"
          id={`userTeam-${userTeam.userId}-percent`}
          className="percent-input"
          value={percentInput}
          onChange={handleInput}
        />
      </div>
      <div className="team-member-btns">
        <button className="delete-btn" onClick={handleDelete}>
          Remove
        </button>
      </div>
    </li>
  )
}
