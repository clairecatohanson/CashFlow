import { useState, useRef } from "react"
import { getUserByUsername } from "../../managers/userManager"

export const AddTeamMember = ({
  teamUserTeams,
  setTeamUserTeams,
  tempUserTeams,
  setTempUserTeams,
}) => {
  const [searchInput, setSearchInput] = useState("")
  const [foundUser, setFoundUser] = useState({})
  const [searchStatus, setSearchStatus] = useState(false)

  const inputRef = useRef(null)
  const buttonRef = useRef(null)

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      e.preventDefault()
      buttonRef.current.click()
    }
  }

  const handleInput = (e) => {
    setSearchInput(e.target.value)
  }

  const handleSearch = (e) => {
    e.preventDefault()

    setSearchStatus(true)
    getUserByUsername(searchInput).then((foundUsers) => {
      if (foundUsers.length === 1) {
        const userMatch = foundUsers[0]
        setFoundUser(userMatch)
      } else {
        setFoundUser({})
      }
    })
  }

  const handleAdd = (e) => {
    e.preventDefault()

    const newUserTeam = {
      userId: foundUser.id,
      splitPercent: "",
    }
    const utArrayCopy = structuredClone(teamUserTeams)
    const utArrayUserIds = []
    utArrayCopy.forEach((ut) => {
      utArrayUserIds.push(ut.userId)
    })
    if (!utArrayUserIds.includes(newUserTeam.userId)) {
      utArrayCopy.push(newUserTeam)
      const tempUtsCopy = structuredClone(tempUserTeams)
      tempUtsCopy.push(newUserTeam)
      setTeamUserTeams(utArrayCopy)
      setTempUserTeams(tempUtsCopy)
    } else {
      window.alert("Cannot add the same user twice")
    }

    setSearchInput("")
    setFoundUser({})
    setSearchStatus(false)
  }

  const renderUserInfo = (foundUser) => {
    return (
      <div className="flex justify-center items-center space-x-6 mt-8">
        <div className="flex flex-col space-y-2 items-start">
          <div className="">@{foundUser.username}</div>
          <div className="">
            {foundUser.firstName} {foundUser.lastName}
          </div>
        </div>
        <div className="flex justify-center">
          <button
            className="py-2 px-4 bg-orange-600 text-white rounded text-md shadow-gray-500 shadow-md"
            onClick={handleAdd}
          >
            Add to Team
          </button>
        </div>
      </div>
    )
  }

  const renderError = () => {
    if (searchStatus) {
      return (
        <div className="text-center mt-8 w-auto bg-gray-200 rounded p-2">
          That username does not exist
        </div>
      )
    }
  }

  return (
    <fieldset>
      <div className="flex space-x-4 items-center mb-6">
        <label htmlFor="user-search">Search for user:</label>
        <input
          id="user-search"
          ref={inputRef}
          type="text"
          placeholder="username"
          value={searchInput}
          onChange={handleInput}
          onKeyDown={handleEnter}
          className="bg-white h-10 text-center w-56 focus:outline-none"
        />
      </div>
      <div className="flex justify-center">
        <button
          ref={buttonRef}
          className="py-2 px-4 bg-teal-500 text-white rounded text-md shadow-gray-500 shadow-md"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>
      {foundUser.id ? renderUserInfo(foundUser) : renderError()}
    </fieldset>
  )
}
