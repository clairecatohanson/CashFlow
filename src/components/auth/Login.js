import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { getUserByUsername } from "../../managers/userManager"
// import "./Login.css"
import cashflow from "../../images/cashflow-logo.png"

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
    <div className="login-container min-h-screen bg-gray-100 font-sans">
      {/* // Nav Bar */}
      <nav>
        <ul className="flex justify-between min-h-16 bg-teal-500 p-4">
          {/* Logo */}
          <li className="flex justify-center items-center">
            <Link to="/login">
              <div className="w-14 h-14">
                <img src={cashflow} alt="cashflow logo" />
              </div>
            </Link>
          </li>
          {/* Buttons Container */}
          <div className="flex justify-between min-w-56">
            {/* Log In Button */}
            <li className="flex justify-center items-center">
              <Link to="/login">
                <div className="flex justify-center items-center w-24 h-12 bg-orange-500 text-orange-100 font-sans text-center rounded">
                  <div>Log In</div>
                </div>
              </Link>
            </li>
            {/* Register Button */}
            <li className="flex justify-center items-center">
              <Link to="/register">
                <div className="flex justify-center items-center w-24 h-12 bg-gray-100 text-gray-800 font-sans text-center rounded">
                  <div>Register</div>
                </div>
              </Link>
            </li>
          </div>
        </ul>
      </nav>
      {/* // Login Card */}
      <div className="w-9/12 md:w-3/5 md:max-w-2xl mx-auto mt-16 bg-white rounded-xl shadow-2xl">
        <form onSubmit={handleLogin} className="py-8 px-4">
          {/* // Headings */}
          <div className="font-sans text-center">
            <h1 className="text-4xl font-bold mb-4 text-orange-700">
              CashFlow
            </h1>
            <h2 className="text-2xl text-gray-900">Log In</h2>
          </div>
          {/* // Input username */}
          <fieldset>
            <div className="flex justify-center items-center">
              <input
                type="username"
                id="username"
                value={username}
                className="w-4/5 text-center text-orange-700 m-6 p-4 border border-teal-400 focus:outline-none"
                onChange={(evt) => setUsername(evt.target.value)}
                placeholder="Enter your username"
                required
                autoFocus
              />
            </div>
          </fieldset>
          {/* // Buttons Container */}
          <fieldset className="flex flex-col space-y-6 justify-center items-center text-center text-gray-900 mt-8">
            <div className="w-3/5 bg-orange-300 shadow-sm shadow-orange-400 h-10 flex items-center justify-center rounded-lg hover:-translate-y-0.5 duration-150">
              <button type="submit">Sign in</button>
            </div>
            <div className="w-3/5 border border-orange-300 shadow-sm shadow-orange-400 h-10 flex items-center justify-center rounded-lg hover:-translate-y-0.5 duration-150">
              <Link to="/register">Not a member yet?</Link>
            </div>
          </fieldset>
        </form>
      </div>
    </div>
  )
}
