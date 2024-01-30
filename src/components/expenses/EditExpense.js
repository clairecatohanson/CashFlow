import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { ExpenseForm } from "../forms/ExpenseForm"
import { getExpenseById, updateExpense } from "../../managers/expenseManager"

export const EditExpense = ({
  user,
  expense,
  setExpense,
  userTeams,
  personalTeam,
}) => {
  const navigate = useNavigate()
  const { expenseId } = useParams()

  const [isShared, setIsShared] = useState("")

  const formHeading = "Edit Expense"

  useEffect(() => {
    getExpenseById(expenseId).then((res) => {
      setExpense(res)
    })
  }, [expenseId, setExpense])

  useEffect(() => {
    if (personalTeam) {
      if (personalTeam.teamId === expense.teamId) {
        setIsShared(false)
      } else {
        setIsShared(true)
      }
    }
  }, [personalTeam, expense])

  const handleSubmit = (e) => {
    e.preventDefault()

    const updatedExpense = { ...expense }
    if (updatedExpense.teamId) {
      updateExpense(updatedExpense).then(() => {
        navigate("/expenses")
      })
    } else {
      window.alert("Please select a team before submitting")
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
