import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import {
  calculateShare,
  formatCurrency,
  formatDate,
  formatDescription,
} from "../../utils/functions"
import { deleteExpense } from "../../managers/expenseManager"
import { getUserTeamsByTeam } from "../../managers/teamManager"
import { UserDebt } from "./UserDebt"
import { getPayments } from "../../managers/paymentManager"
import { getUserById } from "../../managers/userManager"

export const ExpenseDetails = ({
  user,
  selectedExpense,
  setSelectedExpense,
  personalTeam,
  userTeams,
  getAndSetUserExpenses,
  setPayments,
}) => {
  const navigate = useNavigate()

  const [originalPayor, setOriginalPayor] = useState({})
  const [isPersonal, setIsPersonal] = useState(false)
  const [isPaidByUser, setIsPaidByUser] = useState(false)
  const [borrowers, setBorrowers] = useState([])
  const [currentUserShare, setCurrentUserShare] = useState(0.0)
  const [expenseUserTeams, setExpenseUserTeams] = useState([])

  useEffect(() => {
    if (selectedExpense.id && personalTeam.id && user.id) {
      getUserById(selectedExpense.userId).then((res) => {
        setOriginalPayor(res)
      })

      if (selectedExpense.team_Id === personalTeam.teamId) {
        setIsPersonal(true)
        setIsPaidByUser(true)
      } else {
        setIsPersonal(false)
        setIsPaidByUser(false)
        if (selectedExpense.userId === user.id) {
          setIsPaidByUser(true)
        }
      }
    }
  }, [selectedExpense, personalTeam, user])

  useEffect(() => {
    if (user.userTeams && selectedExpense.id && userTeams.length) {
      const loggedInUserShare = calculateShare(selectedExpense, user)
      setCurrentUserShare(loggedInUserShare)
    }

    if (selectedExpense.team_Id) {
      getUserTeamsByTeam(selectedExpense.team_Id).then((UTs) => {
        setExpenseUserTeams(UTs)
        const selfRemoved = UTs.filter((ut) => ut.userId !== user.id)
        setBorrowers(selfRemoved)
      })
    }
  }, [selectedExpense, user, userTeams])

  const handleDelete = (expense) => {
    deleteExpense(expense.id).then(() => {
      getAndSetUserExpenses()
      setSelectedExpense({})
    })

    getPayments().then((pRes) => {
      setPayments(pRes)
    })
  }

  const renderDetails = (selectedExpense) => {
    if (isPersonal) {
      return (
        // Peronsal Expense
        <>
          <h4 className="underline underline-offset-4 ml-6">
            Personal Expense
          </h4>
          <div className="bg-white rounded-xl p-4 m-4">
            <div className="italic">
              {formatDescription(selectedExpense.description)}
            </div>
            <div className="flex justify-between items-center">
              <div>{formatDate(selectedExpense.date).withYear}</div>
              <div className="bg-orange-300 rounded-xl p-2">
                {currentUserShare.toLocaleString("en-us", formatCurrency)}
              </div>
            </div>
          </div>
          {/* Buttons Container */}
          <div className="flex justify-center space-x-10">
            <button
              className="bg-teal-700 text-gray-100 rounded-lg p-4 hover:-translate-y-0.5 duration-150 hover:shadow-md hover:shadow-gray-400"
              onClick={() => {
                navigate(`/expenses/${selectedExpense.id}/edit`)
              }}
            >
              Edit Expense
            </button>
            <button
              className="bg-orange-600 text-gray-100 rounded-lg p-4 hover:-translate-y-0.5 duration-150 hover:shadow-md hover:shadow-gray-400"
              onClick={() => {
                handleDelete(selectedExpense)
              }}
            >
              Delete Expense
            </button>
          </div>
        </>
      )
    } else {
      return (
        // Shared Expense
        <>
          <h4 className="underline underline-offset-4 ml-6">Shared Expense</h4>
          {/* Payor Info */}
          <div className="ml-6 mt-4">
            <div>Team: {expenseUserTeams[0]?.team.name}</div>
            <div>Paid by: {isPaidByUser ? "You" : originalPayor.firstName}</div>
          </div>
          {/* Date & Description */}
          <div className="bg-white rounded-xl p-4 m-4">
            <div>{formatDate(selectedExpense.date).withYear}</div>
            <div className="italic mb-2">
              {formatDescription(selectedExpense.description)}
            </div>
            {/* Total and Shared Costs */}
            <div className="flex justify-between items-center">
              <div>
                Total Cost:{" "}
                {selectedExpense.amount.toLocaleString("en-us", formatCurrency)}
              </div>
              {/* User Share */}
              <div className="bg-orange-300 rounded-xl p-2">
                Your Share:{" "}
                {currentUserShare.toLocaleString("en-us", formatCurrency)}
              </div>
            </div>
          </div>
          {/* Amount Owed to User Container */}
          {isPaidByUser ? (
            // If originally paid by user, display amount owed to user by others
            <div className="mx-6">
              {borrowers.map((borrowerUT) => (
                <UserDebt
                  key={`user-${borrowerUT.userId}`}
                  borrowerUT={borrowerUT}
                  user={user}
                  selectedExpense={selectedExpense}
                  originalPayor={originalPayor}
                />
              ))}
            </div>
          ) : (
            // If someone else originally paid, display amount owed by user
            <div className="mx-6">
              <UserDebt
                key={`user-${user.id}`}
                borrowerUT={personalTeam}
                user={user}
                selectedExpense={selectedExpense}
                originalPayor={originalPayor}
              />
            </div>
          )}
          {/* Buttons Container */}
          {isPaidByUser ? (
            <div className="flex justify-center space-x-10">
              <button
                className="bg-teal-700 text-gray-100 rounded-lg p-4 hover:-translate-y-0.5 duration-150 hover:shadow-md hover:shadow-gray-400"
                onClick={() => {
                  navigate(`/expenses/${selectedExpense.id}/edit`)
                }}
              >
                Edit Expense
              </button>
              <button
                className="bg-orange-600 text-gray-100 rounded-lg p-4 hover:-translate-y-0.5 duration-150 hover:shadow-md hover:shadow-gray-400"
                onClick={() => {
                  handleDelete(selectedExpense)
                }}
              >
                Delete Expense
              </button>
            </div>
          ) : (
            ""
          )}
        </>
      )
    }
  }

  return (
    <>
      <h3 className="text-xl my-4 text-center font-semibold">
        Expense Details
      </h3>
      {selectedExpense?.id ? (
        renderDetails(selectedExpense)
      ) : (
        <p className="text-center">Select an expense to see more details.</p>
      )}
    </>
  )
}
