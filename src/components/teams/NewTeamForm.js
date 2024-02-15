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
    <form className="">
      <h2 className="text-center text-3xl mb-12 mt-6">Create a New Team</h2>
      <fieldset className="flex flex-col space-y-2 justify-center items-center md:flex-row md:space-y-0 md:space-x-4">
        <label className="" htmlFor="team-name">
          Team Name:
        </label>
        <input
          id="team-name"
          className="h-10 w-96 text-center bg-white text-xl"
          type="text"
          value={teamInput}
          onChange={handleInput}
        />
      </fieldset>
      <fieldset className="flex justify-center mt-6">
        <button
          className="py-2 px-4 bg-teal-500 text-white rounded text-md shadow-gray-500 shadow-md"
          onClick={handleNext}
        >
          Next
        </button>
      </fieldset>
    </form>
  )
}
