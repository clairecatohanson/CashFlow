import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { createUser, getUserByUsername } from "../../managers/userManager"

export const Register = (props) => {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    username: "",
  })
  let navigate = useNavigate()

  const registerNewUser = () => {
    const newUser = {
      ...user,
    }

    createUser(newUser).then((createdUser) => {
      if (createdUser.hasOwnProperty("id")) {
        localStorage.setItem(
          "numbies_user",
          JSON.stringify({
            id: createdUser.id,
            username: createdUser.username,
          })
        )

        navigate("/")
      }
    })
  }

  const handleRegister = (e) => {
    e.preventDefault()
    getUserByUsername(user.username).then((response) => {
      if (response.length > 0) {
        // Duplicate username. No good.
        window.alert(
          "Account with that username already exists. Please try a new one."
        )
      } else {
        // Good username, create user.
        registerNewUser()
      }
    })
  }

  const updateUser = (evt) => {
    const copy = { ...user }
    copy[evt.target.id] = evt.target.value
    setUser(copy)
  }

  return (
    <main className="auth-container">
      <form className="auth-form" onSubmit={handleRegister}>
        <h1 className="header">Numbies</h1>
        <h2>Please Register</h2>
        <fieldset className="auth-fieldset">
          <div>
            <input
              onChange={updateUser}
              type="text"
              id="username"
              className="auth-form-input"
              placeholder="Enter your desired username"
              required
              autoFocus
            />
          </div>
        </fieldset>
        <fieldset className="auth-fieldset">
          <div>
            <input
              onChange={updateUser}
              type="text"
              id="firstName"
              className="auth-form-input"
              placeholder="First name"
              required
            />
          </div>
        </fieldset>
        <fieldset className="auth-fieldset">
          <div>
            <input
              onChange={updateUser}
              type="text"
              id="lastName"
              className="auth-form-input"
              placeholder="Last name"
              required
            />
          </div>
        </fieldset>
        <fieldset className="auth-fieldset">
          <div>
            <button type="submit">Register</button>
          </div>
        </fieldset>
      </form>
    </main>
  )
}
