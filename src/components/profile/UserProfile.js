import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
// import "./UserProfile.css"
import { getUserById } from "../../managers/userManager"
import { SharedExpenses } from "../expenses/SharedExpenses"
import { getUserTeamsByTeam } from "../../managers/teamManager"

export const UserProfile = ({ user, userTeams }) => {
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
          return getUserTeamsByTeam(ut.teamId)
        })
        Promise.all(utPromises).then((res) => {
          res.forEach((arr) => {
            const foundUT = arr.find((ut) => ut.userId === parseInt(userId))
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
      <div className="profile-teams">
        <h3 className="section-heading">Your Teams</h3>
        <ul className="team-name-list">
          {userTeams.length ? (
            userTeams.map((ut) => (
              <li
                key={`userteam-${ut.id}`}
                className="team-name-item"
                onClick={() => {
                  navigate(`/teams/${ut.id}`)
                }}
              >
                {ut.team.name}
              </li>
            ))
          ) : (
            <li>You are not currently on any expense sharing teams.</li>
          )}
        </ul>
      </div>
    )
  }

  const renderSharedTeams = () => {
    return (
      <div className="profile-teams">
        <h3 className="section-heading">
          Your Teams with {userProfile.firstName}
        </h3>
        <ul className="team-name-list">
          {commonUserTeams.length ? (
            commonUserTeams.map((ut) => (
              <li
                key={`userteam-${ut.id}`}
                className="team-name-item"
                onClick={() => {
                  navigate(`/teams/${ut.teamId}`)
                }}
              >
                {ut.team.name}
              </li>
            ))
          ) : (
            <li>
              You are not currently on any expense sharing teams with @
              {userProfile.username}.
            </li>
          )}
        </ul>
      </div>
    )
  }

  return (
    <>
      <div className="profile-container">
        <div className="profile-user">
          <div className="user-avatar">
            <i className="fa-solid fa-user"></i>
          </div>
          <div className="user-name">
            {userProfile.firstName} {userProfile.lastName}
          </div>
          <div className="user-username">@{userProfile.username}</div>
          {parseInt(userId) === user.id && (
            <button className="edit-btn" onClick={handleSubmit}>
              Edit Profile
            </button>
          )}
        </div>
        <div className="profile-currentUser">
          {parseInt(userId) === user.id
            ? renderYourTeams()
            : renderSharedTeams()}
          <div className="profile-expenses">
            <h3 className="section-heading">Recent Shared Expenses</h3>
            <SharedExpenses
              user={user}
              userTeams={userTeams}
              commonUserTeams={commonUserTeams}
            />
          </div>
        </div>
      </div>
    </>
  )
}
