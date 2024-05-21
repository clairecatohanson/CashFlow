import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { NewTeamForm } from "./NewTeamForm"
import { TeamMembers } from "./TeamMembers"
import { AddTeamMember } from "./AddTeamMember"
// import "./Teams.css"
import { createTeam, createUserTeam } from "../../managers/teamManager"
import { getUserById } from "../../managers/userManager"

export const CreateTeam = ({ user, setUser, getAndSetUserTeams }) => {
  const navigate = useNavigate()

  const [teamInput, setTeamInput] = useState("")
  const [newTeam, setNewTeam] = useState({})
  const [teamUserTeams, setTeamUserTeams] = useState([])
  const [tempUserTeams, setTempUserTeams] = useState([])

  useEffect(() => {
    if (newTeam.name) {
      const firstUserTeam = {
        userId: user.id,
        splitFraction: "",
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
        createTeam(newTeam).then((res) => {
          const promises = tempUtsCopy.map((tm) => {
            tm.team.id = res.id
            createUserTeam(tm)
          })
          Promise.all(promises).then(() => {
            getAndSetUserTeams(user)
            getUserById(user.id).then((res) => {
              setUser(res)
            })
            navigate(`/teams/${res.id}`)
          })
        })
      } else {
        window.alert("The sum of all percentages must equal 100.")
      }
    }
  }

  return (
    <div className="bg-gray-300 min-h-screen flex justify-center">
      <div className="w-full px-2 mx-2 md:p-6 md:mx-12 md:min-w-[700px] lg:min-w-[1000px] lg:w-1/2 my-16 bg-gray-100 rounded-xl shadow-lg text-orange-800 shadow-gray-400 h-fit">
        <NewTeamForm
          teamInput={teamInput}
          setTeamInput={setTeamInput}
          setNewTeam={setNewTeam}
        />
        {newTeam.name && (
          <>
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
            <div className="flex justify-center items-center mt-16 mb-6">
              <button
                className="mt-6 py-4 px-8 bg-teal-500 text-white rounded-lg text-lg shadow-gray-500 shadow-md hover:-translate-y-0.5 duration-150"
                onClick={handleSubmit}
              >
                Create Team
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
