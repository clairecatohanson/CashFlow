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
      setPercentInput(userTeam.splitPercent)
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

  const handleBlur = () => {
    const foundTeamUtIndex = teamUserTeams.findIndex(
      (ut) => ut.userId === userTeam.userId
    )
    const teamUTsCopy = structuredClone(teamUserTeams)
    teamUTsCopy[foundTeamUtIndex].splitPercent = parseFloat(percentInput)
    setTeamUserTeams(teamUTsCopy)
    setIsEditable(false)
  }

  const renderButtons = (userTeam) => {
    return (
      <div className="">
        <button
          className="py-1 px-3 bg-gray-200 text-gray-900 border-2 border-gray-900 rounded hover:-translate-y-0.5 hover:shadow-md hover:shadow-gray-400 ml-2"
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
    <li className="flex justify-end items-center space-x-4">
      <div className="w-[200px]">
        {currentTM.firstName} {currentTM.lastName}
      </div>
      {isEditable ? (
        <div className="flex justify-start items-center space-x-1 w-1/3">
          <label htmlFor={`userTeam-${userTeam.userId}-percent`}>%</label>
          <input
            type="number"
            // autoFocus
            id={`userTeam-${userTeam.userId}-percent`}
            className="w-[4.5rem] h-10 text-center outline outline-1 rounded"
            value={percentInput}
            onChange={handleInput}
            onBlur={handleBlur}
          />
        </div>
      ) : (
        <div className="flex justify-start items-center space-x-1 w-1/3">
          <div className={`current-userTeam-${userTeam.userId}-percent`}>
            {percentInput}%
          </div>
          {renderButtons(userTeam)}
        </div>
      )}
      <div className="w-1/3">
        <button
          className="py-1 px-3 bg-gray-200 text-gray-900 border-2 border-gray-900 rounded hover:-translate-y-0.5 hover:shadow-md hover:shadow-gray-400 ml-6"
          onClick={handleDelete}
        >
          {/* <i className="fa-regular fa-trash-can"></i> */}
          Remove
        </button>
      </div>
    </li>
  )
}
