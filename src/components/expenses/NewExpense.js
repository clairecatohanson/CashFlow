import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { addExpense } from "../../managers/expenseManager"
import { ExpenseForm } from "../forms/ExpenseForm"

export const NewExpense = ({
  user,
  expense,
  setExpense,
  userTeams,
  personalTeam,
}) => {
  const navigate = useNavigate()

  const [isShared, setIsShared] = useState("")

  const formHeading = "Enter a New Expense"
  useEffect(() => {
    setIsShared("")

    const blankExpense = {
      date: "",
      description: "",
      amount: "",
      categoryId: "",
      userId: user.id,
      teamId: personalTeam ? personalTeam.teamId : "",
    }
    setExpense(blankExpense)
  }, [user, setExpense, personalTeam])

  const handleSubmit = (e) => {
    e.preventDefault()

    const newExpense = { ...expense }
    if (newExpense.categoryId && isShared !== "" && newExpense.teamId) {
      addExpense(newExpense).then(() => {
        navigate("/expenses")
      })
    }
    if (!newExpense.categoryId) {
      window.alert("please select a category before clicking submit.")
    }
    if (isShared === "") {
      window.alert(
        "please indicate whether this charge is personal or shared before clicking submit"
      )
    }
    if (!newExpense.teamId) {
      window.alert("please select a team before clicking submit")
    }
  }

  return (
    <ExpenseForm
      handleSubmit={handleSubmit}
      formHeading={formHeading}
      user={user}
      expense={expense}
      setExpense={setExpense}
      userTeams={userTeams}
      personalTeam={personalTeam}
      isShared={isShared}
      setIsShared={setIsShared}
    />
  )
}
