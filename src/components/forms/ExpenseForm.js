import { useEffect, useState } from "react"
import { getCategories } from "../../managers/categoryManager"

export const ExpenseForm = ({
  handleSubmit,
  formHeading,
  user,
  selectedExpense,
  setSelectedExpense,
  userTeams,
  personalTeam,
  isShared,
  setIsShared,
  categories,
  setCategories,
  renderButtons,
}) => {
  const [teamId, setTeamId] = useState(0)

  useEffect(() => {
    getCategories().then((res) => setCategories(res))
  }, [])

  useEffect(() => {
    const expenseCopy = { ...selectedExpense }
    expenseCopy.team_Id = teamId
    setSelectedExpense(expenseCopy)
  }, [teamId])

  useEffect(() => {
    if (personalTeam.team?.id) {
      const expenseCopy = { ...selectedExpense }
      if (isShared === true) {
        // setTeamId(expenseCopy.team_Id)
        setTeamId("")
      } else {
        setTeamId(personalTeam.team.id)
      }
      setSelectedExpense(expenseCopy)
    }
  }, [isShared, personalTeam])

  const handleInput = (e) => {
    const expenseCopy = { ...selectedExpense }
    if (e.target.id === "amount") {
      expenseCopy[e.target.id] = parseFloat(e.target.value)
    } else if (e.target.id === "categoryId") {
      expenseCopy[e.target.id] = parseInt(e.target.value)
    } else {
      expenseCopy[e.target.id] = e.target.value
    }
    setSelectedExpense(expenseCopy)
  }

  return (
    <>
      <form className="bg-gray-100 p-6 h-auto rounded-xl shadow-lg text-orange-800 shadow-gray-400">
        <h2 className="text-center text-3xl mb-2 mt-12">{formHeading}</h2>
        <fieldset className="flex flex-col space-y-1 items-center mt-12 mb-8">
          <label className="form-label" htmlFor="date">
            Date:
          </label>
          <input
            className="h-10 w-44 text-center"
            type="date"
            id="date"
            required
            value={selectedExpense.date ? selectedExpense.date : ""}
            onChange={handleInput}
          />
        </fieldset>
        <fieldset className="flex flex-col space-y-1 items-center mb-8">
          <label className="form-label" htmlFor="description">
            Description:
          </label>
          <input
            className="h-10 w-4/5 text-center"
            type="text"
            id="description"
            required
            value={
              selectedExpense.description ? selectedExpense.description : ""
            }
            onChange={handleInput}
          />
        </fieldset>
        <fieldset className="flex flex-col space-y-1 items-center mb-8">
          <label className="form-label" htmlFor="amount">
            Amount:
          </label>
          <input
            className="h-10 w-44 text-center"
            type="number"
            min="0"
            step="0.01"
            required
            id="amount"
            value={selectedExpense.amount ? selectedExpense.amount : ""}
            onChange={handleInput}
          />
        </fieldset>
        <fieldset className="flex flex-col space-y-1 items-center mb-8">
          <label className="form-label" htmlFor="categoryId">
            Category:
          </label>
          <select
            id="categoryId"
            className="h-10 w-44 text-center"
            required
            value={selectedExpense.categoryId ? selectedExpense.categoryId : ""}
            onChange={handleInput}
          >
            <option id="0" value="" disabled>
              Select a category
            </option>
            {categories.map((c) => (
              <option id={c.id} key={`category-${c.id}`} value={c.id}>
                {c.name ? c.name : ""}
              </option>
            ))}
          </select>
        </fieldset>
        <fieldset className="flex flex-col space-y-1 items-center mb-8">
          <label className="form-label" htmlFor="isShared">
            Is this charged shared with a team?
          </label>
          <select
            id="isShared"
            className="h-10 w-44 text-center"
            required
            value={isShared !== "" ? isShared : ""}
            onChange={(e) => {
              setIsShared(JSON.parse(e.target.value))
              if (isShared === false) {
                setTeamId(personalTeam.team.id)
              }
            }}
          >
            <option id="0" value="" disabled>
              Select a response
            </option>
            <option id="yes" value={true}>
              Yes
            </option>
            <option id="no" value={false}>
              No
            </option>
          </select>
        </fieldset>
        {isShared && (
          <fieldset className="flex flex-col space-y-1 items-center mb-8">
            <label className="form-label" htmlFor="teamId">
              Team:
            </label>
            <select
              className="h-10 w-44 text-center"
              id="team_Id"
              required
              value={isShared === true ? teamId : personalTeam.team.id}
              onChange={(e) => {
                setTeamId(parseInt(e.target.value))
              }}
            >
              <option id="0" value="" disabled>
                Select a team
              </option>
              {userTeams.map((userTeam) => (
                <option
                  id={userTeam.team.id}
                  key={`userTeam-${userTeam.id}`}
                  value={userTeam.team.id}
                >
                  {userTeam.team.name}
                </option>
              ))}
            </select>
          </fieldset>
        )}
        <fieldset className="flex justify-center mb-12">
          {renderButtons()}
        </fieldset>
      </form>
    </>
  )
}
