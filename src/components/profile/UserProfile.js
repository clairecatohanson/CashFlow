import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import "./UserProfile.css"
import { getUserById } from "../../managers/userManager"

export const UserProfile = ({ user }) => {
  const { userId } = useParams()
  const navigate = useNavigate()

  const [userProfile, setUserProfile] = useState({})

  useEffect(() => {
    getUserById(userId).then((res) => {
      setUserProfile(res)
    })
  }, [userId])

  const handleSubmit = (e) => {
    e.preventDefault()
    navigate("/profile/edit")
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
        {parseInt(userId) === user.id && (
          <div className="profile-currentUser">
            <div className="profile-teams">teams</div>
            <div className="profile-expenses">expenses</div>
          </div>
        )}
      </div>
    </>
  )
}
