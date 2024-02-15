import { useEffect } from "react"
// import "./FilterBar.css"

export const FilterBar = ({
  categories,
  expenses,
  personalTeam,
  userTeams,
  searchInput,
  setSearchInput,
  categoryDropdown,
  setCategoryDropdown,
  setFilteredExpenses,
  dropdownFilteredExpenses,
  setDropdownFilteredExpenses,
  teamDropdown,
  setTeamDropdown,
}) => {
  useEffect(() => {
    if (!categoryDropdown && !teamDropdown) {
      setDropdownFilteredExpenses(expenses)
    } else if (categoryDropdown && !teamDropdown) {
      const categoryMatches = expenses.filter(
        (e) => e.categoryId === categoryDropdown
      )
      setDropdownFilteredExpenses(categoryMatches)
    } else if (!categoryDropdown && teamDropdown) {
      const teamMatches = expenses.filter((e) => e.team_Id === teamDropdown)
      setDropdownFilteredExpenses(teamMatches)
    } else if (categoryDropdown && teamDropdown) {
      const categoryMatches = expenses.filter(
        (e) => e.categoryId === categoryDropdown
      )
      const categoryTeamMatches = categoryMatches.filter(
        (e) => e.team_Id === teamDropdown
      )
      setDropdownFilteredExpenses(categoryTeamMatches)
    }
  }, [expenses, categoryDropdown, teamDropdown])

  useEffect(() => {
    const foundExpenses = dropdownFilteredExpenses.filter((e) =>
      e.description.toLowerCase().includes(searchInput.toLowerCase())
    )
    setFilteredExpenses(foundExpenses)
  }, [searchInput, dropdownFilteredExpenses])

  const renderJSX = () => {
    if (personalTeam?.id && userTeams && categories.length) {
      return (
        // Filter bar Container
        <div className="flex flex-wrap space-y-4 md:flex-nowrap md:space-y-0 md:space-x-8 w-full p-4 bg-gray-200 text-teal-800 rounded-t-md">
          {/* Description Search Bar */}
          <div className="flex w-80 bg-white h-10">
            <label
              htmlFor="search-input"
              className="flex justify-center items-center"
            >
              <i className="fa-solid fa-magnifying-glass bg-white p-2"></i>
            </label>
            <input
              className="w-full placeholder:text-teal-800 focus:outline-none"
              id="search-input"
              type="text"
              value={searchInput}
              placeholder="Description"
              onChange={(e) => setSearchInput(e.target.value)}
            />
          </div>
          {/* Dropdowns Container */}
          <div className="flex justify-around space-x-4 min-w-[400px]">
            {/* Team Dropdown */}
            <div className="w-full md:w-1/2">
              <select
                className="w-full h-10 focus:outline-none"
                name="team-dropdown"
                defaultValue=""
                onChange={(e) => {
                  setTeamDropdown(parseInt(e.target.value))
                }}
              >
                <option value="" disabled>
                  Team
                </option>
                <option value="0">All Teams</option>
                <option value={personalTeam.teamId}>Personal Expenses</option>
                {userTeams.map((ut) => (
                  <option
                    key={`team-${ut.teamId}`}
                    value={ut.teamId}
                    id={ut.teamId}
                  >
                    {ut.team.name}
                  </option>
                ))}
              </select>
            </div>
            {/* Category Dropdown */}
            <div className="w-full md:w-1/2">
              <select
                className="w-full h-10 focus:outline-none"
                name="category-dropdown"
                defaultValue=""
                onChange={(e) => {
                  setCategoryDropdown(parseInt(e.target.value))
                }}
              >
                <option value="" disabled>
                  Category
                </option>
                <option value="0">All Categories</option>
                {categories.map((c) => (
                  <option key={`category-${c.id}`} value={c.id} id={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      )
    }
  }

  return renderJSX()
}
