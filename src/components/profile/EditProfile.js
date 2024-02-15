import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getUserByUsername, updateUser } from "../../managers/userManager"
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
    const userCopy = {
      id: user.id,
      username: username,
      firstName: firstName,
      lastName: lastName,
    }

    getUserByUsername(username).then((foundUsers) => {
      if (foundUsers[0]?.username === user.username) {
        setUser(userCopy)

        updateUser(userCopy).then(() => {
          navigate(`/profile/${user.id}`)
        })
      } else if (foundUsers.length > 0) {
        window.alert("That username is already taken. Please try again.")
      } else {
        setUser(userCopy)

        updateUser(userCopy).then(() => {
          navigate(`/profile/${user.id}`)
        })
      }
    })
  }

  return (
    <div className="bg-gray-300 min-h-screen flex justify-center">
      <div className="w-11/12 lg:w-1/2 lg:min-w-[600px] mt-16">
        <form className="bg-gray-100 p-6 h-auto rounded-xl shadow-lg text-orange-800 shadow-gray-400">
          <h2 className="text-center text-3xl mb-2 mt-12">Edit Your Profile</h2>
          <fieldset className="flex flex-col space-y-1 items-center mt-12 mb-8">
            <label className="form-label" htmlFor="username">
              <div className="label-text">Username:</div>
            </label>
            <input
              type="text"
              id="username"
              className="h-10 w-44 text-center"
              value={username ? username : ""}
              onChange={(e) => setUsername(e.target.value)}
            />
          </fieldset>
          <fieldset className="flex flex-col space-y-1 items-center mt-12 mb-8">
            <label className="form-label" htmlFor="firstName">
              <div className="label-text">First Name:</div>
            </label>
            <input
              type="text"
              id="firstName"
              className="h-10 w-44 text-center"
              value={firstName ? firstName : ""}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </fieldset>
          <fieldset className="flex flex-col space-y-1 items-center mt-12 mb-8">
            <label className="form-label" htmlFor="lastName">
              <div className="label-text">Last Name:</div>
            </label>
            <input
              type="text"
              id="lastName"
              className="h-10 w-44 text-center"
              value={lastName ? lastName : ""}
              onChange={(e) => setLastName(e.target.value)}
            />
          </fieldset>
          <div className="flex justify-center">
            <button
              className="mt-6 mb-12 py-2 px-4 bg-teal-500 text-white rounded-lg text-md shadow-gray-500 shadow-md hover:-translate-y-0.5 duration-150"
              onClick={handleSubmit}
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
