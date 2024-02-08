import { useEffect } from "react"
import "./FilterBar.css"

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
        <div className="filter-bar">
          <div className="description-filter">
            <label htmlFor="search-input">
              <i className="fa-solid fa-magnifying-glass"></i>
            </label>
            <input
              className="search-input"
              id="search-input"
              type="text"
              value={searchInput}
              placeholder="Description"
              onChange={(e) => setSearchInput(e.target.value)}
            />
          </div>
          <div className="team-filter">
            <select
              className="team-dropdown"
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
          <div className="category-filter">
            <select
              className="category-dropdown"
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
      )
    }
  }

  return renderJSX()
}
