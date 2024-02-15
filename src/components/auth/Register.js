import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
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
    <div className="login-container min-h-screen bg-gray-100 font-sans">
      {/* // Nav Bar */}
      <nav>
        <ul className="flex justify-between min-h-16 bg-teal-500 p-4">
          {/* Logo */}
          <li className="flex justify-center items-center">
            <Link to="/login">
              <div className="w-14 h-14 bg-orange-100 text-gray-900 font-sans text-xl text-center rounded">
                Logo
              </div>
            </Link>
          </li>
          {/* Buttons Container */}
          <div className="flex justify-between min-w-56">
            {/* Log In Button */}
            <li className="flex justify-center items-center">
              <Link to="/login">
                <div className="flex justify-center items-center w-24 h-12 bg-orange-500 text-orange-100 font-sans text-xl text-center rounded">
                  <div>Log In</div>
                </div>
              </Link>
            </li>
            {/* Register Button */}
            <li className="flex justify-center items-center">
              <Link to="/register">
                <div className="flex justify-center items-center w-24 h-12 bg-gray-100 text-gray-800 font-sans text-xl text-center rounded">
                  <div>Register</div>
                </div>
              </Link>
            </li>
          </div>
        </ul>
      </nav>
      {/* Register Card */}
      <div className="w-9/12 md:w-3/5 md:max-w-2xl mx-auto mt-16 bg-white rounded-xl shadow-2xl">
        <form className="py-8 px-4" onSubmit={handleRegister}>
          {/* Headings */}
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4 text-orange-700">
              CashFlow
            </h1>
            <h2 className="text-2xl text-gray-900">Please Register</h2>
          </div>
          {/* Input Username */}
          <fieldset>
            <div className="flex justify-center items-center">
              <input
                onChange={updateUser}
                type="text"
                id="username"
                className="w-4/5 text-center text-orange-700 m-6 p-4 border border-teal-400 focus:outline-none"
                placeholder="Username"
                required
                autoFocus
              />
            </div>
          </fieldset>
          {/* Input First Name */}
          <fieldset>
            <div className="flex justify-center items-center">
              <input
                onChange={updateUser}
                type="text"
                id="firstName"
                className="w-4/5 text-center text-orange-700 m-6 p-4 border border-teal-400 focus:outline-none"
                placeholder="First name"
                required
              />
            </div>
          </fieldset>
          {/* Input Last Name */}
          <fieldset>
            <div className="flex justify-center items-center">
              <input
                onChange={updateUser}
                type="text"
                id="lastName"
                className="w-4/5 text-center text-orange-700 m-6 p-4 border border-teal-400 focus:outline-none"
                placeholder="Last name"
                required
              />
            </div>
          </fieldset>
          {/* Button Container */}
          <fieldset className="flex flex-col space-y-6 justify-center items-center text-center text-gray-900 mt-8">
            <div className="w-3/5 text-lg bg-orange-300 shadow-sm shadow-orange-400 h-10 flex items-center justify-center rounded-lg hover:-translate-y-0.5 duration-150">
              <button type="submit">Register</button>
            </div>
          </fieldset>
        </form>
      </div>
    </div>
  )
}
