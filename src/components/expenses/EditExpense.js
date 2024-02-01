import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { ExpenseForm } from "../forms/ExpenseForm"
import {
  deleteExpense,
  getExpenseById,
  getExpenses,
  updateExpense,
} from "../../managers/expenseManager"
import {
  deleteUserPayment,
  getPayments,
  getUserPayments,
} from "../../managers/paymentManager"

export const EditExpense = ({
  user,
  expense,
  setExpense,
  setExpenses,
  payments,
  setPayments,
  userPayments,
  setUserPayments,
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
      setExpense(res)
    })
  }, [expenseId, setExpense])

  useEffect(() => {
    if (personalTeam) {
      if (personalTeam.teamId === expense.team_Id) {
        setIsShared(false)
      } else {
        setIsShared(true)
      }
    }
  }, [personalTeam, expense])

  const handleSubmit = (e) => {
    e.preventDefault()

    const updatedExpense = { ...expense }
    if (updatedExpense.team_Id) {
      updateExpense(updatedExpense).then(() => {
        navigate("/expenses")
      })
    } else {
      window.alert("Please select a team before submitting")
    }
  }

  const handleDelete = () => {
    const associatedPayments = payments.filter(
      (p) => p.expenseId === expense.id
    )
    const paymentIds = []
    associatedPayments.map((p) => {
      paymentIds.push(p.id)
    })
    const associatedUserPayments = userPayments.filter((up) =>
      paymentIds.includes(up.paymentId)
    )

    const upPromises = associatedUserPayments.map((up) =>
      deleteUserPayment(up.id)
    )
    Promise.all(upPromises).then(() => {
      getUserPayments().then((upRes) => {
        setUserPayments(upRes)
        deleteExpense(expense.id).then(() => {
          getExpenses().then((eRes) => {
            setExpenses(eRes)
            getPayments().then((pRes) => {
              setPayments(pRes)
              navigate("/expenses")
            })
          })
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
        expense={expense}
        setExpense={setExpense}
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
