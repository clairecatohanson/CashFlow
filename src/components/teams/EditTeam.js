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
import { getUserById } from "../../managers/userManager"

export const EditTeam = ({ user, setUser, getAndSetUserTeams }) => {
  const { teamId } = useParams()
  const navigate = useNavigate()

  const [teamUserTeams, setTeamUserTeams] = useState([])
  const [tempUserTeams, setTempUserTeams] = useState([])
  const [teamNameInput, setTeamNameInput] = useState("")
  const [nameIsEditable, setNameIsEditable] = useState(false)

  useEffect(() => {
    if (teamId) {
      getUserTeamsByTeam(teamId).then((res) => {
        res.forEach((ut) => {
          ut.userId = ut.user.id
          ut.teamId = ut.team.id
        })
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

  const handleBlur = () => {
    setNameIsEditable(false)
  }

  const handleSave = async (e) => {
    e.preventDefault()

    const tempUtsCopy = structuredClone(tempUserTeams)

    let totalPercent = 0
    tempUtsCopy.forEach((tm) => {
      const roundedTmPercent = Math.round(tm.splitFraction * 1000) / 1000
      totalPercent += roundedTmPercent
    })
    const roundedTotalPercent = Math.round(totalPercent * 1000) / 1000

    if (tempUtsCopy.length === 1 && tempUtsCopy[0].user.id === user.id) {
      window.alert("Error: teams must contain at least two members.")
    } else if (tempUtsCopy.find((ut) => ut.splitFraction <= 0)) {
      window.alert(
        "Error: team members must be assigned a percent that is greater than 0."
      )
    } else {
      if (roundedTotalPercent === 100) {
        const utsInApi = await getUserTeamsByTeam(teamId)
        const deletePromises = utsInApi.map((ut) => deleteUserTeam(ut.id))
        Promise.all(deletePromises).then(() => {
          const createPromises = tempUtsCopy.map((ut) => {
            const newUT = {
              userId: ut.userId,
              teamId: parseInt(teamId),
              splitFraction: ut.splitFraction,
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
              getUserById(user.id).then((res) => {
                setUser(res)
              })
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
    // Global Container
    <div className="bg-gray-300 min-h-screen flex justify-center">
      {/* Form Container */}
      <div className="w-full px-2 md:min-w-[700px] lg:min-w-[1000px] lg:w-1/2  mt-16">
        {/* Form */}
        <form className="bg-gray-100 p-6 h-auto rounded-xl shadow-lg text-orange-800 shadow-gray-400">
          <h2 className="text-center text-3xl mb-12 mt-6">Edit Team</h2>
          {nameIsEditable ? (
            <fieldset className="flex justify-center items-center">
              <input
                className="h-10 w-96 text-center bg-white text-xl"
                autoFocus
                type="text"
                value={teamNameInput}
                onChange={handleInput}
                onBlur={handleBlur}
              />
            </fieldset>
          ) : (
            <fieldset className="flex justify-center items-center space-x-4">
              <div className="text-lg">{teamNameInput}</div>
              <button
                className="py-1 px-3 bg-gray-200 text-gray-900 border-2 border-gray-900 rounded hover:-translate-y-0.5 hover:shadow-md hover:shadow-gray-400"
                onClick={handleEdit}
              >
                <i className="fa-regular fa-pen-to-square"></i>
              </button>
            </fieldset>
          )}
          <div className="flex flex-col items-center space-y-6 lg:flex-row lg:justify-center lg:space-y-0 lg:space-x-24 mt-12">
            <section className="lg:w-1/2 mb-12">
              <AddTeamMember
                teamUserTeams={teamUserTeams}
                setTeamUserTeams={setTeamUserTeams}
                tempUserTeams={tempUserTeams}
                setTempUserTeams={setTempUserTeams}
              />
            </section>
            <section className="p-4 lg:w-1/2 bg-white lg:p-6 rounded-lg shadow-lg shadow-gray-300">
              <TeamMembers
                user={user}
                teamUserTeams={teamUserTeams}
                setTeamUserTeams={setTeamUserTeams}
                tempUserTeams={tempUserTeams}
                setTempUserTeams={setTempUserTeams}
              />
            </section>
          </div>
          {/* Button Container */}
          <div className="flex justify-center items-center mt-16 mb-6">
            <button
              className="mt-6 py-4 px-8 bg-teal-500 text-white rounded-lg text-lg shadow-gray-500 shadow-md hover:-translate-y-0.5 duration-150"
              onClick={handleSave}
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
