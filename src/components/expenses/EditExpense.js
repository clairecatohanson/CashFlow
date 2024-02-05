import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { ExpenseForm } from "../forms/ExpenseForm"
import {
  deleteExpense,
  getExpenseById,
  getExpenses,
  getExpensesWithDetails,
  updateExpense,
} from "../../managers/expenseManager"
import { getPayments } from "../../managers/paymentManager"

export const EditExpense = ({
  user,
  selectedExpense,
  setSelectedExpense,
  setExpenses,
  payments,
  setPayments,
  userTeams,
  personalTeam,
  categories,
  setCategories,
}) => {
  const navigate = useNavigate()
  const { expenseId } = useParams()

  const [isShared, setIsShared] = useState("")

  const formHeading = "Edit Expense"

  useEffect(() => {
    getExpenseById(expenseId).then((res) => {
      setSelectedExpense(res)
    })
  }, [expenseId])

  useEffect(() => {
    if (personalTeam) {
      if (personalTeam.teamId === selectedExpense.team_Id) {
        setIsShared(false)
      } else {
        setIsShared(true)
      }
    }
  }, [personalTeam, selectedExpense])

  const handleSubmit = (e) => {
    e.preventDefault()

    const updatedExpenseWithDetails = { ...selectedExpense }
    const updatedExpense = {
      id: selectedExpense.id,
      date: selectedExpense.date,
      description: selectedExpense.description,
      amount: selectedExpense.amount,
      categoryId: selectedExpense.categoryId,
      userId: selectedExpense.userId,
      team_Id: selectedExpense.team_Id,
    }
    if (updatedExpense.team_Id) {
      updateExpense(updatedExpense).then(() => {
        getExpensesWithDetails().then((eRes) => {
          setExpenses(eRes)
          setSelectedExpense(updatedExpenseWithDetails)
          navigate("/expenses")
        })
      })
    } else {
      window.alert("Please select a team before submitting")
    }
  }

  const handleDelete = () => {
    deleteExpense(selectedExpense.id).then(() => {
      getExpensesWithDetails().then((eRes) => {
        setExpenses(eRes)
        setSelectedExpense({})
        getPayments().then((pRes) => {
          setPayments(pRes)
          navigate("/expenses")
        })
      })
    })
  }

  return (
    <>
      <ExpenseForm
        handleSubmit={handleSubmit}
        formHeading={formHeading}
        user={user}
        selectedExpense={selectedExpense}
        setSelectedExpense={setSelectedExpense}
        userTeams={userTeams}
        personalTeam={personalTeam}
        isShared={isShared}
        setIsShared={setIsShared}
        categories={categories}
        setCategories={setCategories}
      />
      <button className="delete-btn" onClick={handleDelete}>
        Delete Expense
      </button>
    </>
  )
}
