import { useEffect, useState } from "react"
import { getCategories } from "../../managers/categoryManager"

export const ExpenseForm = ({
  handleSubmit,
  formHeading,
  user,
  expense,
  setExpense,
  userTeams,
  personalTeam,
  isShared,
  setIsShared,
  categories,
  setCategories,
}) => {
  const [teamId, setTeamId] = useState(0)

  useEffect(() => {
    getCategories().then((res) => setCategories(res))
  }, [user, setCategories])

  useEffect(() => {
    const expenseCopy = { ...expense }
    expenseCopy.team_Id = teamId
    setExpense(expenseCopy)
  }, [teamId, setExpense])

  useEffect(() => {
    const expenseCopy = { ...expense }
    if (isShared === true) {
      setTeamId("")
    } else {
      setTeamId(personalTeam?.teamId)
    }
    setExpense(expenseCopy)
  }, [isShared, personalTeam])

  const handleInput = (e) => {
    const expenseCopy = { ...expense }
    if (e.target.id === "amount") {
      expenseCopy[e.target.id] = parseFloat(e.target.value)
    } else if (e.target.id === "categoryId") {
      expenseCopy[e.target.id] = parseInt(e.target.value)
    } else {
      expenseCopy[e.target.id] = e.target.value
    }
    setExpense(expenseCopy)
  }

  return (
    <div className="expense-form">
      <form className="form">
        <h2 className="form-heading">{formHeading}</h2>
        <fieldset className="form-group">
          <label className="form-label" htmlFor="date">
            <div className="label-text">Date:</div>
          </label>
          <input
            className="form-input"
            type="date"
            id="date"
            required
            value={expense.date ? expense.date : ""}
            onChange={handleInput}
          />
        </fieldset>
        <fieldset className="form-group">
          <label className="form-label" htmlFor="description">
            <div className="label-text">Description:</div>
          </label>
          <input
            className="form-input"
            type="text"
            id="description"
            required
            value={expense.description ? expense.description : ""}
            onChange={handleInput}
          />
        </fieldset>
        <fieldset className="form-group">
          <label className="form-label" htmlFor="amount">
            <div className="label-text">Amount:</div>
          </label>
          <input
            className="form-input"
            type="number"
            min="0"
            step="0.01"
            required
            id="amount"
            value={expense.amount ? expense.amount : ""}
            onChange={handleInput}
          />
        </fieldset>
        <fieldset className="form-group">
          <label className="form-label" htmlFor="categoryId">
            <div className="label-text">Category:</div>
          </label>
          <select
            id="categoryId"
            className="form-input"
            required
            value={expense.categoryId ? expense.categoryId : ""}
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
        <fieldset className="form-group">
          <label className="form-label" htmlFor="isShared">
            <div className="label-text">
              Is this charged shared with a team?
            </div>
          </label>
          <select
            id="isShared"
            className="form-input"
            required
            value={isShared !== "" ? isShared : ""}
            onChange={(e) => {
              setIsShared(JSON.parse(e.target.value))
              if (isShared === false) {
                setTeamId(personalTeam.teamId)
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
          <fieldset className="form-group">
            <label className="form-label" htmlFor="teamId">
              <div className="label-text">Team:</div>
            </label>
            <select
              className="form-input"
              id="teamId"
              required
              value={isShared === true ? teamId : personalTeam.teamId}
              onChange={(e) => {
                setTeamId(parseInt(e.target.value))
              }}
            >
              <option id="0" value="" disabled>
                Select a team
              </option>
              {userTeams.map((userTeam) => (
                <option
                  id={userTeam.teamId}
                  key={`userTeam-${userTeam.id}`}
                  value={userTeam.teamId}
                >
                  {userTeam.team.name}
                </option>
              ))}
            </select>
          </fieldset>
        )}

        <button className="submit-btn" onClick={handleSubmit}>
          Submit Expense
        </button>
      </form>
    </div>
  )
}
