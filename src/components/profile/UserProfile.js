import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
// import "./UserProfile.css"
import { getUserById } from "../../managers/userManager"
import { SharedExpenses } from "../expenses/SharedExpenses"
import { getUserTeamsByTeam } from "../../managers/teamManager"

export const UserProfile = ({ user, userTeams, setSelectedExpense }) => {
  const { userId } = useParams()
  const navigate = useNavigate()

  const [userProfile, setUserProfile] = useState({})
  const [commonUserTeams, setCommonUserTeams] = useState([])

  useEffect(() => {
    getUserById(userId).then((res) => {
      setUserProfile(res)
    })
  }, [userId])

  useEffect(() => {
    if (userTeams.length) {
      if (user.id === parseInt(userId)) {
        setCommonUserTeams(userTeams)
      } else {
        const sharedUTs = []
        const utPromises = userTeams.map((ut) => {
          return getUserTeamsByTeam(ut.team.id)
        })
        Promise.all(utPromises).then((res) => {
          res.forEach((arr) => {
            const foundUT = arr.find((ut) => ut.user.id === parseInt(userId))
            if (foundUT) {
              sharedUTs.push(foundUT)
            }
          })
          setCommonUserTeams(sharedUTs)
        })
      }
    }
  }, [userId, user, userTeams])

  const handleSubmit = (e) => {
    e.preventDefault()
    navigate("/profile/edit")
  }

  const renderYourTeams = () => {
    return (
      <div className="w-11/12 lg:w-1/2 bg-gray-100 rounded-md p-3 mx-4 shadow-xl shadow-gray-500 h-fit">
        <h3 className="text-xl my-4 text-center font-semibold">Your Teams</h3>
        <ul className="flex flex-col items-center space-y-2 my-6">
          {userTeams.length ? (
            userTeams.map((ut) => (
              <li
                key={`userteam-${ut.id}`}
                className="w-4/5 text-center p-2 rounded-md hover:bg-opacity-50 hover:outline hover:outline-2 hover:outline-teal-500/50"
                onClick={() => {
                  navigate(`/teams/${ut.team.id}`)
                }}
              >
                {ut.team.name}
              </li>
            ))
          ) : (
            <li className="text-center p-4">
              You are not currently on any expense sharing teams.
            </li>
          )}
        </ul>
      </div>
    )
  }

  const renderSharedTeams = () => {
    return (
      <div className="w-11/12 lg:w-1/2 bg-gray-100 rounded-md p-3 mx-4 shadow-xl shadow-gray-500 h-fit">
        <h3 className="text-xl my-4 text-center font-semibold">
          Your Teams with {userProfile.first_name}
        </h3>
        <ul className="flex flex-col items-center">
          {commonUserTeams.length ? (
            commonUserTeams.map((ut) => (
              <li
                key={`userteam-${ut.id}`}
                className="w-4/5 text-center p-2 rounded-md hover:bg-opacity-50 hover:outline hover:outline-2 hover:outline-teal-500/50"
                onClick={() => {
                  navigate(`/teams/${ut.team.id}`)
                }}
              >
                {ut.team.name}
              </li>
            ))
          ) : (
            <li className="text-center p-4">
              You are not currently on any expense sharing teams with @
              {userProfile.username}.
            </li>
          )}
        </ul>
      </div>
    )
  }

  return (
    // Global Container
    <div className="min-h-screen bg-gray-300 py-16 text-orange-800">
      <div className="flex flex-col items-center lg:flex-row lg:items-start lg:justify-end">
        {/* User Details */}
        <div className="flex flex-col justify items-center space-y-2 w-1/2 text-center">
          {/* Avatar */}
          <div className="text-8xl">
            <i className="fa-solid fa-user"></i>
          </div>
          {/* Name */}
          <div className="text-4xl tracking-wide">
            {userProfile.first_name} {userProfile.last_name}
          </div>
          {/* Username */}
          <div className="text-xl">@{userProfile.username}</div>
        </div>
        {/* Edit Profile Button Container */}
        <div className="flex justify-center w-1/4 mt-10">
          {parseInt(userId) === user.id && (
            <button
              className="p-4 bg-orange-300 rounded-md text-lg shadow-orange-700 shadow hover:-translate-y-0.5 duration-150"
              onClick={handleSubmit}
            >
              Edit Profile
            </button>
          )}
        </div>
      </div>
      {/* Card Container */}
      <div className="flex flex-col space-y-6 lg:flex-row lg:space-y-0 mt-10">
        {/* Teams Card */}
        {parseInt(userId) === user.id ? renderYourTeams() : renderSharedTeams()}

        {/* Shared Expenses Card */}
        <div className="w-11/12 lg:w-1/2 bg-gray-100 rounded-md p-3 mx-4 shadow-xl shadow-gray-500 h-fit">
          <h3 className="text-xl my-4 text-center font-semibold">
            Recent Shared Expenses
          </h3>
          <SharedExpenses
            user={user}
            setSelectedExpense={setSelectedExpense}
            commonUserTeams={commonUserTeams}
          />
        </div>
      </div>
    </div>
  )
}
