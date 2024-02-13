import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { updateUser } from "../../managers/userManager"
// import "../forms/Forms.css"

export const EditProfile = ({ user, setUser }) => {
  const navigate = useNavigate()

  const [username, setUsername] = useState(user.username)
  const [firstName, setFirstName] = useState(user.firstName)
  const [lastName, setLastName] = useState(user.lastName)

  useEffect(() => {
    setUsername(user.username)
    setFirstName(user.firstName)
    setLastName(user.lastName)
  }, [user])

  const handleSubmit = (e) => {
    e.preventDefault()
    const userCopy = { ...user }
    userCopy.username = username
    userCopy.firstName = firstName
    userCopy.lastName = lastName

    setUser(userCopy)

    updateUser(userCopy).then(() => {
      navigate(`/profile/${user.id}`)
    })
  }

  return (
    <form className="form">
      <h2 className="form-heading">Edit Your Profile</h2>
      <fieldset className="form-group">
        <label className="form-label" htmlFor="username">
          <div className="label-text">Username:</div>
        </label>
        <input
          type="text"
          id="username"
          className="form-input"
          value={username ? username : ""}
          onChange={(e) => setUsername(e.target.value)}
        />
      </fieldset>
      <fieldset className="form-group">
        <label className="form-label" htmlFor="firstName">
          <div className="label-text">First Name:</div>
        </label>
        <input
          type="text"
          id="firstName"
          className="form-input"
          value={firstName ? firstName : ""}
          onChange={(e) => setFirstName(e.target.value)}
        />
      </fieldset>
      <fieldset className="form-group">
        <label className="form-label" htmlFor="lastName">
          <div className="label-text">Last Name:</div>
        </label>
        <input
          type="text"
          id="lastName"
          className="form-input"
          value={lastName ? lastName : ""}
          onChange={(e) => setLastName(e.target.value)}
        />
      </fieldset>
      <button className="submit-btn" onClick={handleSubmit}>
        Save Changes
      </button>
    </form>
  )
}
