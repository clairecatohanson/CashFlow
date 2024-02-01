import { useState } from "react"
import { getUserByUsername } from "../../managers/userManager"

export const AddTeamMember = ({
  userTeams,
  setUserTeams,
  tempUserTeams,
  setTempUserTeams,
}) => {
  const [searchInput, setSearchInput] = useState("")
  const [foundUser, setFoundUser] = useState({})
  const [searchStatus, setSearchStatus] = useState(false)

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
      splitFraction: "",
    }
    const utArrayCopy = structuredClone(userTeams)
    const utArrayUserIds = []
    utArrayCopy.map((ut) => {
      utArrayUserIds.push(ut.userId)
    })
    if (!utArrayUserIds.includes(newUserTeam.userId)) {
      utArrayCopy.push(newUserTeam)
      const tempUtsCopy = structuredClone(tempUserTeams)
      tempUtsCopy.push(newUserTeam)
      setUserTeams(utArrayCopy)
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
      <div className="found-user">
        <div className="user-details">
          <div className="user-username">{foundUser.username}</div>
          <div className="user-name">
            {foundUser.firstName} {foundUser.lastName}
          </div>
        </div>
        <div className="btn-container">
          <button className="add-btn" onClick={handleAdd}>
            Add to Team
          </button>
        </div>
      </div>
    )
  }

  const renderError = () => {
    if (searchStatus) {
      return <div className="error-message">That username does not exist</div>
    }
  }

  return (
    <form className="form">
      <fieldset className="form-group">
        <label htmlFor="user-search">Search for user:</label>
        <input
          id="user-search"
          type="text"
          placeholder="username"
          value={searchInput}
          onChange={handleInput}
        />
      </fieldset>
      <button className="search-btn" onClick={handleSearch}>
        Search
      </button>
      {foundUser.id ? renderUserInfo(foundUser) : renderError()}
    </form>
  )
}
