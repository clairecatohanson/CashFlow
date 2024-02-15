import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { addExpense } from "../../managers/expenseManager"
import { ExpenseForm } from "../forms/ExpenseForm"
import { CategoryForm } from "../categories/CategoryForm"
// import "./Expenses.css"

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

  const renderButtons = () => {
    return (
      <>
        <button
          className="mt-6 py-4 px-8 bg-teal-500 text-white rounded-lg text-lg shadow-gray-500 shadow-md hover:-translate-y-0.5 duration-150"
          onClick={handleSubmit}
        >
          Submit Expense
        </button>
      </>
    )
  }

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
    <div className="bg-gray-300 min-h-screen pb-16">
      <div className="flex flex-col items-center space-y-6 lg:flex-row lg:justify-end lg:items-center lg:space-y-0 lg:space-x-6 px-6">
        <div className="lg:ml-auto w-11/12 lg:w-1/2 lg:min-w-[600px] mt-16">
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
        <div className="w-1/4 min-w-[355px] lg:mt-16">
          <CategoryForm
            user={user}
            categories={categories}
            setCategories={setCategories}
          />
        </div>
      </div>
    </div>
  )
}
