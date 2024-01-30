import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { getUserByUsername } from "../../managers/userManager"
import "./Login.css"

export const Login = () => {
  const [username, setUsername] = useState("")
  const navigate = useNavigate()

  const handleLogin = (e) => {
    e.preventDefault()

    return getUserByUsername(username).then((foundUsers) => {
      if (foundUsers.length === 1) {
        const user = foundUsers[0]
        localStorage.setItem(
          "numbies_user",
          JSON.stringify({
            id: user.id,
            username: user.username,
          })
        )

        navigate("/")
      } else {
        window.alert("Invalid login")
      }
    })
  }

  return (
    <main className="auth-container">
      <section>
        <form className="auth-form" onSubmit={handleLogin}>
          <h1 className="header">Numbies</h1>
          <h2>Please sign in</h2>
          <fieldset className="auth-fieldset">
            <div>
              <input
                type="username"
                value={username}
                className="auth-form-input"
                onChange={(evt) => setUsername(evt.target.value)}
                placeholder="username"
                required
                autoFocus
              />
            </div>
          </fieldset>
          <fieldset className="auth-fieldset">
            <div>
              <button type="submit">Sign in</button>
            </div>
          </fieldset>
        </form>
      </section>
      <section className="register-link">
        <Link to="/register">Not a member yet?</Link>
      </section>
    </main>
  )
}
