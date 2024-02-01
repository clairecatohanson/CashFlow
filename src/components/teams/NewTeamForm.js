export const NewTeamForm = ({ teamInput, setTeamInput, setNewTeam }) => {
  const handleInput = (event) => {
    setTeamInput(event.target.value)
  }

  const handleNext = (event) => {
    event.preventDefault()

    if (teamInput) {
      const teamObj = {
        name: teamInput,
      }
      setNewTeam(teamObj)
    } else if (teamInput === "") {
      window.alert("Please enter a team name before clicking Next.")
    }
  }

  return (
    <div className="team-form">
      <form className="form">
        <h2 className="form-heading">Create a New Team</h2>
        <fieldset className="form-group">
          <label className="form-label" htmlFor="team-name">
            Team Name:
          </label>
          <input
            id="team-name"
            type="text"
            value={teamInput}
            onChange={handleInput}
          />
        </fieldset>
        <button className="next-btn" onClick={handleNext}>
          Next
        </button>
      </form>
    </div>
  )
}
