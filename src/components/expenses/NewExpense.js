import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { addExpense } from "../../managers/expenseManager"
import { ExpenseForm } from "../forms/ExpenseForm"
import { CategoryForm } from "../categories/CategoryForm"
import "./Expenses.css"

export const NewExpense = ({
  user,
  selectedExpense,
  setSelectedExpense,
  userTeams,
  personalTeam,
  categories,
  setCategories,
  getAndSetUserExpenses,
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
      team_Id: personalTeam ? personalTeam.teamId : "",
    }
    setSelectedExpense(blankExpense)
  }, [user, personalTeam])

  const handleSubmit = (e) => {
    e.preventDefault()

    const newExpense = { ...selectedExpense }
    if (newExpense.categoryId && isShared !== "" && newExpense.team_Id) {
      addExpense(newExpense).then(() => {
        getAndSetUserExpenses()
        setSelectedExpense({})
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
    if (!newExpense.team_Id) {
      window.alert("please select a team before clicking submit")
    }
  }

  return (
    <div className="new-expense-container">
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
      <CategoryForm
        user={user}
        categories={categories}
        setCategories={setCategories}
      />
    </div>
  )
}
