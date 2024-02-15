import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { ExpenseForm } from "../forms/ExpenseForm"
import {
  deleteExpense,
  getExpenseById,
  updateExpense,
} from "../../managers/expenseManager"
import { getPayments } from "../../managers/paymentManager"

export const EditExpense = ({
  user,
  selectedExpense,
  setSelectedExpense,
  setPayments,
  userTeams,
  personalTeam,
  categories,
  setCategories,
  getAndSetUserExpenses,
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

  const renderButtons = () => {
    return (
      <div className="flex flex-col">
        <button
          className="mt-6 py-4 px-8 bg-teal-500 text-white rounded-lg text-lg shadow-gray-500 shadow-md hover:-translate-y-0.5 duration-150"
          onClick={handleSubmit}
        >
          Update Expense
        </button>
        <p className="text-center mt-8">or</p>
        <button
          className="mt-4 py-4 px-8 bg-orange-600 text-orange-100 rounded-lg text-lg shadow-gray-500 shadow-md hover:-translate-y-0.5 duration-150"
          onClick={handleDelete}
        >
          Delete Expense
        </button>
      </div>
    )
  }

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
        getAndSetUserExpenses()
        setSelectedExpense(updatedExpenseWithDetails)
        navigate("/expenses")
      })
    } else {
      window.alert("Please select a team before submitting")
    }
  }

  const handleDelete = () => {
    deleteExpense(selectedExpense.id).then(() => {
      getAndSetUserExpenses()
      setSelectedExpense({})
      getPayments().then((pRes) => {
        setPayments(pRes)
      })
    })
    navigate("/expenses")
  }

  return (
    <div className="bg-gray-300 min-h-screen flex justify-center pb-16">
      <div className="w-11/12 lg:w-1/2 lg:min-w-[600px] mt-16">
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
          renderButtons={renderButtons}
        />
      </div>
    </div>
  )
}
