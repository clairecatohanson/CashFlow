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
import {
  deleteUserPayment,
  getPayments,
  getUserPayments,
} from "../../managers/paymentManager"
import { getUserById } from "../../managers/userManager"

export const ExpenseDetails = ({
  user,
  selectedExpense,
  setSelectedExpense,
  personalTeam,
  userTeams,
  getAndSetUserExpenses,
  userPayments,
  setUserPayments,
  payments,
  setPayments,
}) => {
  const navigate = useNavigate()

  const [originalPayor, setOriginalPayor] = useState({})
  const [isPersonal, setIsPersonal] = useState(false)
  const [isPaidByUser, setIsPaidByUser] = useState(false)
  const [borrowers, setBorrowers] = useState([])

  useEffect(() => {
    if (selectedExpense.userId) {
      getUserById(selectedExpense?.userId).then((res) => {
        setOriginalPayor(res)
      })
    }

    if (selectedExpense?.team_Id === personalTeam?.teamId) {
      setIsPersonal(true)
    } else {
      setIsPersonal(false)
      setIsPaidByUser(false)

      if (selectedExpense.userId === user.id) {
        setIsPaidByUser(true)
      }
    }
  }, [selectedExpense, personalTeam, user])

  const loggedInUserShare = calculateShare(
    selectedExpense,
    personalTeam,
    userTeams
  )

  const foundUserTeam = userTeams.find(
    (ut) => ut.teamId === selectedExpense.team_Id
  )

  useEffect(() => {
    getUserTeamsByTeam(selectedExpense?.team_Id).then((UTs) => {
      const selfRemoved = UTs.filter((ut) => ut.userId !== user.id)
      setBorrowers(selfRemoved)
    })
  }, [selectedExpense, user])

  const expenseDate = new Date(selectedExpense?.date)

  const handleDelete = (expense) => {
    const associatedPayments = payments.filter(
      (p) => p.expenseId === expense.id
    )
    const paymentIds = []
    associatedPayments.forEach((p) => {
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
      })
    })

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
        <div className="personal-expense-details">
          <h3 className="details-expense-type">Personal Expense</h3>
          <div className="details-date">{formatDate.format(expenseDate)}</div>
          <div className="details-full-amount">
            {loggedInUserShare.toLocaleString("en-us", formatCurrency)}
          </div>
          <div className="details-description">
            {formatDescription(selectedExpense.description)}
          </div>
        </div>
      )
    } else if (isPaidByUser) {
      return (
        <div className="shared-expense-details">
          <h3 className="details-expense-type">Shared Expense</h3>
          <div className="team-info">
            <div className="details-team-name">
              Team: {foundUserTeam?.team.name}
            </div>
            <div className="details-payor">Paid by: You</div>
          </div>
          <div className="details-description">
            {formatDescription(selectedExpense.description)}
          </div>
          <div className="expense-info">
            <div className="details-date">{formatDate.format(expenseDate)}</div>
            <div className="details-full-amount">
              Total Cost:{" "}
              {selectedExpense.amount.toLocaleString("en-us", formatCurrency)}
            </div>
          </div>
          <div className="details-fractional-amount">
            Your Share:{" "}
            {loggedInUserShare.toLocaleString("en-us", formatCurrency)}
          </div>
          <div className="details-amount-owed">
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
          <div className="btns">
            <button
              className="edit-btn"
              onClick={() => {
                navigate(`/expenses/${selectedExpense.id}/edit`)
              }}
            >
              Edit Expense
            </button>
            <button
              className="delete-btn"
              onClick={() => {
                handleDelete(selectedExpense)
              }}
            >
              Delete Expense
            </button>
          </div>
        </div>
      )
    } else {
      return (
        <div className="shared-expense-details">
          <h3 className="details-expense-type">Shared Expense</h3>
          <div className="team-info">
            <div className="details-team-name">
              Team: {foundUserTeam?.team.name}
            </div>
            <div className="details-payor">
              Paid by: {originalPayor.firstName}
            </div>
          </div>
          <div className="details-description">
            {formatDescription(selectedExpense.description)}
          </div>
          <div className="expense-info">
            <div className="details-date">{formatDate.format(expenseDate)}</div>
            <div className="details-full-amount">
              Total Cost:{" "}
              {selectedExpense.amount.toLocaleString("en-us", formatCurrency)}
            </div>
          </div>
          <div className="details-fractional-amount">
            Your Share:{" "}
            {loggedInUserShare.toLocaleString("en-us", formatCurrency)}
          </div>
          <div className="details-amount-owed">
            <UserDebt
              key={`user-${user.id}`}
              borrowerUT={personalTeam}
              user={user}
              selectedExpense={selectedExpense}
            />
          </div>
        </div>
      )
    }
  }

  return (
    <section className="details-card">
      <h3 className="section-heading">Expense Details</h3>
      {selectedExpense?.id ? (
        renderDetails(selectedExpense)
      ) : (
        <div className="none-selected">
          Select an expense to see more details.
        </div>
      )}
    </section>
  )
}
